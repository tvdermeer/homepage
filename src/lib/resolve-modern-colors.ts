/**
 * Resolves modern CSS color functions (oklch, oklab, lab, lch) to computed
 * rgb values that html2canvas v1.x can parse.
 *
 * The browser resolves modern color functions to rgb() in computed styles.
 * This function reads those computed values and sets them as inline styles
 * with !important, overriding stylesheet values that html2canvas can't parse.
 *
 * Called via html2canvas's `onclone` option.
 */
export function resolveModernColors(clonedDoc: Document): void {
  const win = clonedDoc.defaultView || window;

  const COLOR_PROPS = [
    "color",
    "background-color",
    "border-color",
    "border-top-color",
    "border-right-color",
    "border-bottom-color",
    "border-left-color",
    "outline-color",
    "text-decoration-color",
    "fill",
    "stroke",
    "caret-color",
    "column-rule-color",
    "accent-color",
    "box-shadow",
    "text-shadow",
  ] as const;

  const elements = clonedDoc.querySelectorAll("*");

  for (const el of elements) {
    const htmlEl = el as HTMLElement;
    const computed = win.getComputedStyle(htmlEl);

    for (const prop of COLOR_PROPS) {
      const value = computed.getPropertyValue(prop);
      if (value) {
        htmlEl.style.setProperty(prop, value, "important");
      }
    }
  }
}
