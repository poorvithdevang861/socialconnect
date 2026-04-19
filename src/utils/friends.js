const STORAGE_KEY = 'socialconnect.friends'

/** @typedef {{ id: string, name: string, avatar: string }} Friend */

export const FRIENDS_EVENT = 'socialconnect-friends-updated'

/** @returns {Friend[]} */
export function getFriends() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw === null) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.map((f) =>
      f && typeof f === 'object'
        ? { ...f, avatar: f.avatar === undefined ? '' : f.avatar }
        : f,
    )
  } catch {
    return []
  }
}

function persistAndNotify(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
  window.dispatchEvent(new Event(FRIENDS_EVENT))
}

/** @param {Omit<Friend, 'id'> & { id?: string }} input */
export function addFriend(input) {
  const nameTrimmed = input.name.trim()
  if (!nameTrimmed) return false
  const lower = nameTrimmed.toLowerCase()
  if (getFriends().some((f) => f.name.trim().toLowerCase() === lower)) return false

  const id = input.id ?? `friend-${Date.now()}`
  const avatar = input.avatar?.trim() ?? ''
  const next = [...getFriends().filter((f) => f.id !== id), { id, name: nameTrimmed, avatar }]
  persistAndNotify(next)
  return true
}

/** @param {string} id */
export function removeFriend(id) {
  persistAndNotify(getFriends().filter((f) => f.id !== id))
}

export function subscribeFriends(callback) {
  window.addEventListener(FRIENDS_EVENT, callback)
  return () => window.removeEventListener(FRIENDS_EVENT, callback)
}
