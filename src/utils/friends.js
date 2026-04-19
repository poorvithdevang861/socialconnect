const STORAGE_KEY = 'socialconnect.friends'

/** @typedef {{ id: string, name: string, avatar: string }} Friend */

export const FRIENDS_EVENT = 'socialconnect-friends-updated'

/** @returns {Friend[]} */
export function getFriends() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw === null) return getDefaultFriends()
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

/** Demo friends so event pages show data before the user adds anyone */
function getDefaultFriends() {
  return [
    {
      id: 'friend-1',
      name: 'Alex Rivera',
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuALtYMSPoL8r1t95GkS9OzKImRcsBfQK-qC9SE4X0-6Msb6GfpQ21z1R5EPbvnVVs7RbOXE4Gt3czG91HFUjsSjSXjv_KkothysL7l5GOiZpD8GYiA3YMrOD5L5tDF3uGDRWK6kRLyeofKWmvEaYnjMc-FpI972g4TVNwXdRzfIZq0efR5D05JM-1o4P49Ilf2042v08WoX1aXngsP0vtpSgRC9JYdztUoEx8-1MR_M5-J_BG3BhkpGutuQF4pXdiSiVMhuqWvmr9U',
    },
    {
      id: 'friend-2',
      name: 'Maya Patel',
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCZLuI2upBqx9_KT_WxJ7w-5qsCgtWO_cmtL-NA9XyoPlAkYslyrjIU0fgwCToPB0T4SgUTO7KVcNh6gDT37yA7yQKSpyNVBJTzBh5Ro5VDaPr-5sIWtXXc0e2fXfNTqVkfFsDjhw3e-2WzR6CnJIIldTTGo8FkgO7MBnGgnv6ntBP6OJ89dWGnWgWCXVpVnQLNTiVUrVj0PuauYg8rzyJ1atpxr3E91pjE9lT0KC7hIx8vHF3kC9JqLDOYwYNX_-mK5dLhQfu-CkE',
    },
    {
      id: 'friend-3',
      name: 'Jordan Kim',
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAjZvEOu4fIy7itLsjFWm-jkcoEhBKewN4lJRl1rIfy-OZg-pN33J3gcC9cA7y2AKCafiPCKhdzEQuYmTv0Dn6q_UrSw_azRqdGapd1epMcCa9VPHiGus0Y-qd4dpcP01oEVttsze9TU1sbn_HKT7rtbTt_W_mbAHgEnFEgaZCiPkAH7wUMS3DdAw4OsqaqCa4dHj3b7gu6U86T7eWBOIW2-x6UZYFRCZpmHCfcXyV4iyxk8gZmmbA0FEUuJfeVkni9c4jE0NU5LVU',
    },
  ]
}

function persistAndNotify(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
  window.dispatchEvent(new Event(FRIENDS_EVENT))
}

/** @param {Omit<Friend, 'id'> & { id?: string }} input */
export function addFriend(input) {
  const id = input.id ?? `friend-${Date.now()}`
  const avatar =
    input.avatar?.trim() ||
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBVVEg_AagAxDk1z2vF07nGovxZSKWhHZg8fr3J_WGiKl6DRxa3JexMSJxVe0SWkIZPsMQ3goHJnODZClQ9865riV1hYX6FSrH6GOzmilItiIMBdsqIUDxIcpUikSoGzwDza9EnP1QYk0L4qWtIue4TfMN9Bu6466a99GTFSHoxxqpRKdbNTDJ-4NOl0DVJVFdu-5VcKxCLw2gsO1vh8dHfJCu00tthveB03fTZwa8d_S9fTHfOOe3FlW2h78vzd2Lj4m0urvIfaKU'
  const next = [...getFriends().filter((f) => f.id !== id), { id, name: input.name.trim(), avatar }]
  persistAndNotify(next)
}

/** @param {string} id */
export function removeFriend(id) {
  persistAndNotify(getFriends().filter((f) => f.id !== id))
}

export function subscribeFriends(callback) {
  window.addEventListener(FRIENDS_EVENT, callback)
  return () => window.removeEventListener(FRIENDS_EVENT, callback)
}
