const STORAGE_KEY = 'socialconnect.friends'

/** @typedef {{ id: string, name: string, avatar: string }} Friend */

export const FRIENDS_EVENT = 'socialconnect-friends-updated'

/** @returns {Friend[]} */
export function getFriends() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw === null) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
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
  const avatar =
    input.avatar?.trim() ||
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBVVEg_AagAxDk1z2vF07nGovxZSKWhHZg8fr3J_WGiKl6DRxa3JexMSJxVe0SWkIZPsMQ3goHJnODZClQ9865riV1hYX6FSrH6GOzmilItiIMBdsqIUDxIcpUikSoGzwDza9EnP1QYk0L4qWtIue4TfMN9Bu6466a99GTFSHoxxqpRKdbNTDJ-4NOl0DVJVFdu-5VcKxCLw2gsO1vh8dHfJCu00tthveB03fTZwa8d_S9fTHfOOe3FlW2h78vzd2Lj4m0urvIfaKU'
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
