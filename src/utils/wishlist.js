const STORAGE_KEY = 'socialconnect.wishlist'

export const WISHLIST_EVENT = 'socialconnect-wishlist-updated'

/**
 * @typedef {{
 *   id: string,
 *   title: string,
 *   cause: string,
 *   desc: string,
 *   dateShort: string,
 *   img: string,
 *   route?: string,
 *   joined?: string,
 *   openings?: string,
 *   verified?: boolean,
 *   timeRange?: string,
 * }} WishlistOpportunity
 */

/** @returns {WishlistOpportunity[]} */
export function getWishlist() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function persistAndNotify(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
  window.dispatchEvent(new Event(WISHLIST_EVENT))
}

/** @param {string} id */
export function isWishlisted(id) {
  return getWishlist().some((o) => o.id === id)
}

/** @param {WishlistOpportunity} item */
export function addToWishlist(item) {
  const list = getWishlist()
  if (list.some((o) => o.id === item.id)) return
  persistAndNotify([...list, { ...item, route: item.route ?? '/event' }])
}

/** @param {string} id */
export function removeFromWishlist(id) {
  persistAndNotify(getWishlist().filter((o) => o.id !== id))
}

/** @param {WishlistOpportunity} item */
export function toggleWishlist(item) {
  if (isWishlisted(item.id)) {
    removeFromWishlist(item.id)
    return false
  }
  addToWishlist(item)
  return true
}

export function subscribeWishlist(callback) {
  window.addEventListener(WISHLIST_EVENT, callback)
  return () => window.removeEventListener(WISHLIST_EVENT, callback)
}

/** @param {Record<string, unknown> & { id: string }} item */
export function toWishlistPayload(item) {
  return {
    id: item.id,
    title: item.title,
    cause: item.cause,
    desc: item.desc,
    dateShort: item.dateShort,
    img: item.img,
    route: item.route ?? '/event',
    joined: item.joined,
    openings: item.openings,
    verified: item.verified,
    timeRange: item.timeRange,
  }
}
