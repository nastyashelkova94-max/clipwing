/**
 * Resolve an asset from `public/` against the Vite deployment base.
 *
 * Unlike imported assets, dynamically concatenated public paths are not
 * rewritten by Vite. Keeping that URL construction here prevents assets from
 * escaping the `/autopilot/` mount when the app is reverse proxied.
 */
export function publicAsset(path) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`
}
