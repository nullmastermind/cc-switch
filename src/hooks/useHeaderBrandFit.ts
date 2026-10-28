import { useLayoutEffect, useState, type RefObject } from "react";

/** Keep a sub-pixel margin so a layout that exactly fits does not flap. */
const FIT_EPSILON = 0.5;

interface HeaderBrandFitOptions {
  /** Row that holds [profile][slot][cluster] and owns the column gap. */
  rowRef: RefObject<HTMLElement>;
  /** Flexible slot that hosts AppSwitcher. */
  slotRef: RefObject<HTMLElement>;
  /** Right cluster (text-only nav island + utility). */
  clusterRef: RefObject<HTMLElement>;
  /** Width AppSwitcher needs to show every app without the overflow menu. 0 = not measured yet. */
  appsWidth: number;
  /** Left brand block (logo + `[data-brand-word]` wordmark). */
  brandRef: RefObject<HTMLElement>;
}

/**
 * Whether the "Viber Switch" wordmark next to the logo fits while AppSwitcher
 * still shows every app. The wordmark is the first thing to go; after that
 * AppSwitcher folds apps into its overflow menu. The budget (slot + gap +
 * cluster, plus the wordmark when it is currently shown) does not depend on
 * the wordmark state, so the result cannot feed back into itself.
 */
export function useHeaderBrandFit({
  rowRef,
  slotRef,
  clusterRef,
  brandRef,
  appsWidth,
}: HeaderBrandFitOptions): boolean {
  const [showBrand, setShowBrand] = useState(true);

  useLayoutEffect(() => {
    const row = rowRef.current;
    const slot = slotRef.current;
    const cluster = clusterRef.current;
    const brand = brandRef.current;
    if (!row || !slot || !cluster || !brand) return;

    const compute = () => {
      if (appsWidth <= 0) return;
      const clusterWidth = cluster.getBoundingClientRect().width;
      // jsdom / pre-layout: keep the current state
      if (clusterWidth <= 0) return;

      // Wordmark cost = its width + the gap to the logo. 0 = unmeasurable (brand block hidden).
      const word = brand.querySelector<HTMLElement>("[data-brand-word]");
      const wordWidth = word?.getBoundingClientRect().width ?? 0;
      const wordCost =
        wordWidth > 0
          ? wordWidth + (parseFloat(getComputedStyle(brand).columnGap) || 0)
          : 0;
      const wordShownNow = !!word && !word.hasAttribute("data-brand-hidden");

      const gap = parseFloat(getComputedStyle(row).columnGap) || 0;
      const budget =
        slot.getBoundingClientRect().width +
        gap +
        clusterWidth +
        (wordShownNow ? wordCost : 0);
      const next =
        wordCost > 0 &&
        appsWidth + gap + clusterWidth <= budget - wordCost - FIT_EPSILON;
      setShowBrand((prev) => (prev === next ? prev : next));
    };

    compute();
    const observer = new ResizeObserver(compute);
    observer.observe(slot);
    // Nav labels are always shown, so the cluster only changes width with the language.
    observer.observe(cluster);
    const word = brand.querySelector("[data-brand-word]");
    if (word) observer.observe(word);
    return () => observer.disconnect();
  }, [rowRef, slotRef, clusterRef, brandRef, appsWidth]);

  return showBrand;
}
