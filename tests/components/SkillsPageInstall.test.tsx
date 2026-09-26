import { createRef } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi, beforeEach } from "vitest";

import { toast } from "sonner";
import {
  SkillsPage,
  getSkillsPageHeaderActions,
  type SkillsPageHandle,
} from "@/components/skills/SkillsPage";
import type {
  DiscoverableSkill,
  InstalledSkill,
  SkillRepo,
  SkillsShDiscoverableSkill,
  SkillsShSearchResult,
} from "@/lib/api/skills";

const installMutateAsyncMock = vi.fn();
const uninstallMutateAsyncMock = vi.fn();
let discoverableSkillsMock: DiscoverableSkill[] = [];
let skillReposMock: SkillRepo[] = [];
let installedSkillsMock: InstalledSkill[] = [];
const refetchDiscoverableMock = vi.fn();

// Stable cache so repeated renders see referentially-equal data.
// SkillsPage has `useEffect([skillsShResult, ...])` that calls setState — a
// fresh object every render would loop forever.
const searchCache = new Map<
  string,
  {
    data: SkillsShSearchResult | undefined;
    isLoading: boolean;
    isFetching: boolean;
    isPlaceholderData?: boolean;
  }
>();

const setSearchResult = (
  query: string,
  offset: number,
  result: SkillsShSearchResult | undefined,
  state: Partial<{
    isLoading: boolean;
    isFetching: boolean;
    isPlaceholderData: boolean;
  }> = {},
) => {
  searchCache.set(`${query}:${offset}`, {
    data: result,
    isLoading: false,
    isFetching: false,
    ...state,
  });
};

vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
  },
}));

vi.mock("@/hooks/useSkills", () => ({
  useDiscoverableSkills: () => ({
    data: discoverableSkillsMock,
    isLoading: false,
    isFetching: false,
    refetch: refetchDiscoverableMock,
  }),
  useInstalledSkills: () => ({
    data: installedSkillsMock,
    isLoading: false,
  }),
  useInstallSkill: () => ({
    mutateAsync: installMutateAsyncMock,
  }),
  useUninstallSkill: () => ({
    mutateAsync: uninstallMutateAsyncMock,
  }),
  useSkillRepos: () => ({
    data: skillReposMock,
    refetch: vi.fn(),
  }),
  useAddSkillRepo: () => ({
    mutateAsync: vi.fn(),
  }),
  useRemoveSkillRepo: () => ({
    mutateAsync: vi.fn(),
  }),
  useSearchSkillsSh: (query: string, _limit: number, offset: number) => {
    const cached = searchCache.get(`${query}:${offset}`);
    if (cached) return cached;
    return { data: undefined, isLoading: false, isFetching: false };
  },
}));

const makeSkillsShSkill = (
  overrides: Partial<SkillsShDiscoverableSkill> = {},
): SkillsShDiscoverableSkill => ({
  key: "agent-browser:owner-a:repo-a",
  name: "Agent Browser",
  directory: "agent-browser",
  repoOwner: "owner-a",
  repoName: "repo-a",
  repoBranch: "main",
  installs: 100,
  readmeUrl: "https://example.com/a",
  ...overrides,
});

const makeDiscoverableSkill = (
  overrides: Partial<DiscoverableSkill> = {},
): DiscoverableSkill => ({
  key: "repo-skill:owner-a:repo-a",
  name: "Repo Skill",
  description: "Skill from a configured repository",
  directory: "repo-skill",
  readmeUrl: "https://example.com/repo-skill",
  repoOwner: "owner-a",
  repoName: "repo-a",
  repoBranch: "main",
  ...overrides,
});

const makeSkillRepo = (overrides: Partial<SkillRepo> = {}): SkillRepo => ({
  owner: "owner-a",
  name: "repo-a",
  branch: "main",
  enabled: true,
  ...overrides,
});

const makeInstalledSkill = (
  overrides: Partial<InstalledSkill> = {},
): InstalledSkill => ({
  id: "installed-dev-browser",
  name: "dev-browser",
  directory: "dev-browser",
  apps: {
    claude: true,
    codex: false,
    gemini: false,
    opencode: false,
    openclaw: false,
    hermes: false,
    pi: false,
  },
  installedAt: 0,
  updatedAt: 0,
  ...overrides,
});

describe("SkillsPage - skills.sh install (regression)", () => {
  beforeEach(() => {
    installMutateAsyncMock.mockReset();
    installMutateAsyncMock.mockResolvedValue({});
    uninstallMutateAsyncMock.mockReset();
    uninstallMutateAsyncMock.mockResolvedValue({});
    discoverableSkillsMock = [];
    skillReposMock = [];
    installedSkillsMock = [];
    refetchDiscoverableMock.mockReset();
    searchCache.clear();
    vi.mocked(toast.error).mockClear();
    vi.mocked(toast.success).mockClear();
  });

  it("defaults to skills.sh on the left and shows trending without searching", async () => {
    skillReposMock = [makeSkillRepo()];
    const trending = makeSkillsShSkill({
      key: "vercel-labs/skills/find-skills",
      name: "find-skills",
      directory: "find-skills",
      repoOwner: "vercel-labs",
      repoName: "skills",
      installs: 3572189,
    });
    setSearchResult("", 0, {
      skills: [trending],
      totalCount: 1,
      query: "",
    });

    render(<SkillsPage initialApp="claude" />);

    await waitFor(() => {
      expect(screen.getByText("find-skills")).toBeInTheDocument();
    });
    expect(screen.getByText("skills.skillssh.trending")).toBeInTheDocument();

    const skillsSh = screen.getByRole("button", { name: /skills\.sh/i });
    const repos = screen.getByRole("button", {
      name: "skills.searchSource.repos",
    });
    expect(
      skillsSh.compareDocumentPosition(repos) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  it("installs the second skill when two results share the same directory", async () => {
    const first = makeSkillsShSkill({
      key: "agent-browser:owner-a:repo-a",
      name: "Agent Browser A",
      repoOwner: "owner-a",
      repoName: "repo-a",
    });
    const second = makeSkillsShSkill({
      key: "agent-browser:owner-b:repo-b",
      name: "Agent Browser B",
      repoOwner: "owner-b",
      repoName: "repo-b",
    });

    setSearchResult("agent", 0, {
      skills: [first, second],
      totalCount: 2,
      query: "agent",
    });

    const ref = createRef<SkillsPageHandle>();
    render(<SkillsPage ref={ref} initialApp="claude" />);

    const user = userEvent.setup();

    // Switch to skills.sh source
    await user.click(screen.getByRole("button", { name: /skills\.sh/i }));

    // Type a query and submit
    const input = screen.getByPlaceholderText(
      "skills.skillssh.searchPlaceholder",
    );
    await user.type(input, "agent");
    await user.click(screen.getByRole("button", { name: "skills.search" }));

    // Wait for both cards to render
    await waitFor(() => {
      expect(screen.getByText("Agent Browser A")).toBeInTheDocument();
      expect(screen.getByText("Agent Browser B")).toBeInTheDocument();
    });

    // Click install on the SECOND card (Agent Browser B)
    const secondCard = screen
      .getByText("Agent Browser B")
      .closest("div.skill-card");
    expect(secondCard).not.toBeNull();
    const installButton = secondCard!.querySelector(
      "button:last-of-type",
    ) as HTMLButtonElement;
    expect(installButton).not.toBeNull();
    await user.click(installButton);

    // Verify the SECOND skill was passed to the install mutation, not the first
    await waitFor(() => {
      expect(installMutateAsyncMock).toHaveBeenCalledTimes(1);
    });
    const callArgs = installMutateAsyncMock.mock.calls[0][0];
    expect(callArgs.skill.repoOwner).toBe("owner-b");
    expect(callArgs.skill.repoName).toBe("repo-b");
    expect(callArgs.skill.name).toBe("Agent Browser B");
  });

  it("keeps skills.sh results when submitting the same query again", async () => {
    const figmaSkill = makeSkillsShSkill({
      key: "figma-use:figma:mcp-server-guide",
      name: "figma-use",
      directory: "figma-use",
      repoOwner: "figma",
      repoName: "mcp-server-guide",
    });

    setSearchResult("figma", 0, {
      skills: [figmaSkill],
      totalCount: 1,
      query: "figma",
    });

    render(<SkillsPage initialApp="claude" />);
    const user = userEvent.setup();

    await user.click(screen.getByRole("button", { name: /skills\.sh/i }));
    const input = screen.getByPlaceholderText(
      "skills.skillssh.searchPlaceholder",
    );
    await user.type(input, "figma");

    const searchButton = screen.getByRole("button", {
      name: "skills.search",
    });
    await user.click(searchButton);

    await waitFor(() => {
      expect(screen.getByText("figma-use")).toBeInTheDocument();
    });

    await user.click(searchButton);

    expect(screen.getByText("figma-use")).toBeInTheDocument();
  });

  it("shows the skills.sh loading state while a new query is fetching", async () => {
    const figmaSkill = makeSkillsShSkill({
      key: "figma-use:figma:mcp-server-guide",
      name: "figma-use",
      directory: "figma-use",
      repoOwner: "figma",
      repoName: "mcp-server-guide",
    });

    setSearchResult("figma", 0, {
      skills: [figmaSkill],
      totalCount: 1,
      query: "figma",
    });
    setSearchResult("react", 0, undefined, { isFetching: true });

    render(<SkillsPage initialApp="claude" />);
    const user = userEvent.setup();

    await user.click(screen.getByRole("button", { name: /skills\.sh/i }));
    const input = screen.getByPlaceholderText(
      "skills.skillssh.searchPlaceholder",
    );
    await user.type(input, "figma");

    const searchButton = screen.getByRole("button", {
      name: "skills.search",
    });
    await user.click(searchButton);

    await waitFor(() => {
      expect(screen.getByText("figma-use")).toBeInTheDocument();
    });

    await user.clear(input);
    await user.type(input, "react");
    await user.click(searchButton);

    expect(screen.getByText("skills.skillssh.loading")).toBeInTheDocument();
  });

  it("reports the effective skills.sh source to parent chrome", async () => {
    const onSourceChange = vi.fn();

    render(<SkillsPage initialApp="claude" onSourceChange={onSourceChange} />);

    await waitFor(() => {
      expect(onSourceChange).toHaveBeenCalledWith("skillssh");
    });
  });

  it("keeps the repository source when configured repositories return no discoverable skills", async () => {
    skillReposMock = [makeSkillRepo()];
    const onSourceChange = vi.fn();
    const user = userEvent.setup();

    render(<SkillsPage initialApp="claude" onSourceChange={onSourceChange} />);

    await user.click(
      screen.getByRole("button", { name: "skills.searchSource.repos" }),
    );

    await waitFor(() => {
      expect(onSourceChange).toHaveBeenCalledWith("repos");
    });
    expect(
      screen.getByPlaceholderText("skills.searchPlaceholder"),
    ).toBeVisible();
  });

  it("can switch back to repository results after discoverable skills refresh", async () => {
    const onSourceChange = vi.fn();
    const user = userEvent.setup();
    const { rerender } = render(
      <SkillsPage initialApp="claude" onSourceChange={onSourceChange} />,
    );

    await waitFor(() => {
      expect(onSourceChange).toHaveBeenCalledWith("skillssh");
    });

    await user.click(screen.getByRole("button", { name: /skills\.sh/i }));

    discoverableSkillsMock = [makeDiscoverableSkill()];
    skillReposMock = [makeSkillRepo()];
    rerender(
      <SkillsPage initialApp="claude" onSourceChange={onSourceChange} />,
    );

    await user.click(
      screen.getByRole("button", { name: "skills.searchSource.repos" }),
    );

    expect(screen.getByText("Repo Skill")).toBeInTheDocument();
    expect(onSourceChange).toHaveBeenCalledWith("repos");
  });

  it("exposes repository-only header actions for the parent chrome", () => {
    expect(
      getSkillsPageHeaderActions("repos").map((action) => action.key),
    ).toEqual(["refresh-repos", "manage-repos"]);
    expect(
      getSkillsPageHeaderActions("skillssh").map((action) => action.key),
    ).toEqual(["manage-repos"]);
  });

  it("shows Replace when the directory is occupied by another skill", async () => {
    installedSkillsMock = [makeInstalledSkill()];
    const incoming = makeSkillsShSkill({
      key: "dev-browser:sawyerhood:dev-browser",
      name: "dev-browser",
      directory: "dev-browser",
      repoOwner: "sawyerhood",
      repoName: "dev-browser",
    });
    setSearchResult("", 0, {
      skills: [incoming],
      totalCount: 1,
      query: "",
    });

    render(<SkillsPage initialApp="claude" />);

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: "skills.replace" }),
      ).toBeInTheDocument();
    });
    expect(
      screen.queryByRole("button", { name: "skills.install" }),
    ).not.toBeInTheDocument();
  });

  it("replaces the occupying skill then installs the incoming one", async () => {
    installedSkillsMock = [makeInstalledSkill({ id: "old-dev-browser" })];
    const incoming = makeSkillsShSkill({
      key: "dev-browser:sawyerhood:dev-browser",
      name: "dev-browser",
      directory: "dev-browser",
      repoOwner: "sawyerhood",
      repoName: "dev-browser",
    });
    setSearchResult("", 0, {
      skills: [incoming],
      totalCount: 1,
      query: "",
    });

    render(<SkillsPage initialApp="claude" />);
    const user = userEvent.setup();

    await user.click(screen.getByRole("button", { name: "skills.replace" }));

    await waitFor(() => {
      expect(uninstallMutateAsyncMock).toHaveBeenCalledWith("old-dev-browser");
      expect(installMutateAsyncMock).toHaveBeenCalledTimes(1);
    });
    expect(installMutateAsyncMock.mock.calls[0][0].skill.repoOwner).toBe(
      "sawyerhood",
    );
  });

  it("offers Replace on the install-conflict toast", async () => {
    const incoming = makeSkillsShSkill({
      key: "dev-browser:sawyerhood:dev-browser",
      name: "dev-browser",
      directory: "dev-browser",
      repoOwner: "sawyerhood",
      repoName: "dev-browser",
    });
    setSearchResult("", 0, {
      skills: [incoming],
      totalCount: 1,
      query: "",
    });
    installMutateAsyncMock.mockRejectedValue(
      new Error(
        JSON.stringify({
          code: "SKILL_DIRECTORY_CONFLICT",
          context: {
            directory: "dev-browser",
            existing_repo: "unknown/unknown",
            new_repo: "sawyerhood/dev-browser",
          },
          suggestion: "uninstallFirst",
        }),
      ),
    );

    render(<SkillsPage initialApp="claude" />);
    const user = userEvent.setup();

    await user.click(screen.getByRole("button", { name: "skills.install" }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalled();
    });
    const toastOpts = (toast.error as ReturnType<typeof vi.fn>).mock.calls[0][1];
    expect(toastOpts.action.label).toBe("skills.replace");
  });
});
