import { PlaceholderValue } from "next/dist/shared/lib/get-img-props";

/**
 * Creates a custom loading placeholder with "Loading..." text for Next.js Image components
 * @param width - Width of the placeholder SVG
 * @param height - Height of the placeholder SVG
 * @param fontSize - Font size for the loading text
 * @returns A data URL string that can be used as the placeholder prop
 */
export function createLoadingPlaceholder(
  width: number = 400,
  height: number = 300,
  fontSize: number = 24
): PlaceholderValue {
  return `data:image/svg+xml;base64,${btoa(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f3f4f6"/>
      <text x="50%" y="50%" font-family="monospace" font-size="${fontSize}" fill="#6b7280" text-anchor="middle" dy=".3em">Loading...</text>
    </svg>
  `)}`;
}
