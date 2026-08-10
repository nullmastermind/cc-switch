/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: ["selector", ".dark"],
  theme: {
    extend: {
      colors: {
        /* ── New design-system tokens ─────────────────────────── */
        bg: "var(--bg)",
        "bg-subtle": "var(--bg-subtle)",
        surface: "var(--surface)",
        raised: "var(--raised)",
        active: "var(--active)",
        "border-color": "var(--border)",
        "border-strong": "var(--border-strong)",
        text: "var(--text)",
        "text-secondary": "var(--text-secondary)",
        "text-disabled": "var(--text-disabled)",
        accent: {
          DEFAULT: "var(--accent)",
          hover: "var(--accent-hover)",
          subtle: "var(--accent-subtle)",
        },
        "on-accent": "var(--on-accent)",
        hover: "var(--hover)",
        positive: "var(--positive)",
        negative: "var(--negative)",
        info: "var(--info)",
        warning: "var(--warning)",
        gold: "var(--gold)",
        "agent-claude": "var(--agent-claude)",
        scrim: "var(--scrim)",

        /* Git status */
        git: {
          modified: "var(--git-modified)",
          added: "var(--git-added)",
          deleted: "var(--git-deleted)",
          renamed: "var(--git-renamed)",
          untracked: "var(--git-untracked)",
          conflict: "var(--git-conflict)",
          ignored: "var(--git-ignored)",
        },

        /* Git log lanes (ref by index via arbitrary value when needed) */
        "git-lane-0": "var(--git-lane-0)",
        "git-lane-1": "var(--git-lane-1)",
        "git-lane-2": "var(--git-lane-2)",
        "git-lane-3": "var(--git-lane-3)",
        "git-lane-4": "var(--git-lane-4)",
        "git-lane-5": "var(--git-lane-5)",
        "git-lane-6": "var(--git-lane-6)",
        "git-lane-7": "var(--git-lane-7)",

        /* Git ref chips */
        "git-ref-local": "var(--git-ref-local)",
        "git-ref-remote": "var(--git-ref-remote)",
        "git-ref-tag": "var(--git-ref-tag)",
        "git-ref-head": "var(--git-ref-head)",

        /* ── shadcn/Radix compat (existing components) ───────────
           These now resolve via CSS var chains defined in index.css */
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",

        /* Kept for any direct usage in components */
        blue: {
          400: "#409CFF",
          500: "#0A84FF",
          600: "#0060DF",
        },
        gray: {
          50: "#fafafa",
          100: "#f4f4f5",
          200: "#e4e4e7",
          300: "#d4d4d8",
          400: "#a1a1aa",
          500: "#71717a",
          600: "#636366",
          700: "#48484A",
          800: "#3A3A3C",
          900: "#2C2C2E",
          950: "#1C1C1E",
        },
        green: {
          100: "#d1fae5",
          500: "#10b981",
        },
        red: {
          100: "#fee2e2",
          500: "#ef4444",
        },
        amber: {
          100: "#fef3c7",
          500: "#f59e0b",
        },
      },

      /* ── Spacing (4px grid) ────────────────────────────────── */
      spacing: {
        xs: "var(--space-xs)",
        "sm-token": "var(--space-sm)",
        "md-token": "var(--space-md)",
        "lg-token": "var(--space-lg)",
        "xl-token": "var(--space-xl)",
        /* Chrome dimensions */
        "panel-header": "var(--panel-header-height)",
        "control-md": "var(--control-md)",
        "quick-card": "var(--quick-start-card-size)",
        "quick-icon": "var(--quick-start-icon-size)",
      },

      /* ── Border radius ─────────────────────────────────────── */
      borderRadius: {
        xs: "var(--radius-xs)",
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        DEFAULT: "var(--radius-md)",
      },

      /* ── Typography ────────────────────────────────────────── */
      fontSize: {
        "2xs": ["var(--font-xs)", { lineHeight: "1.4" }],
        xs: ["var(--font-sm)", { lineHeight: "1.4" }],
        sm: ["var(--font-md)", { lineHeight: "1.5" }],
        base: ["var(--font-lg)", { lineHeight: "1.5" }],
        lg: ["var(--font-xl)", { lineHeight: "1.4" }],
      },

      fontFamily: {
        sans: [
          '"IBM Plex Sans Variable"',
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          '"Helvetica Neue"',
          "Arial",
          "sans-serif",
        ],
        mono: [
          '"Lilex"',
          "ui-monospace",
          "SFMono-Regular",
          '"SF Mono"',
          "Consolas",
          '"Liberation Mono"',
          "Menlo",
          "monospace",
        ],
      },

      /* ── Motion / transitions ──────────────────────────────── */
      transitionDuration: {
        fast: "var(--motion-fast)",
        medium: "var(--motion-medium)",
        slow: "var(--motion-slow)",
      },
      transitionTimingFunction: {
        "out-cubic": "var(--motion-easing)",
      },

      boxShadow: {
        sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
      },

      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
        "slide-down": "slideDown 0.3s ease-out",
        "slide-in-right": "slideInRight 0.3s ease-out",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideInRight: {
          "0%": { transform: "translateX(100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
    },
  },
  plugins: [],
};
