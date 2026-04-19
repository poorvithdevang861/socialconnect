/** Legacy default image used before initials — treat as “no photo” */
export const LEGACY_DEFAULT_AVATAR =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBVVEg_AagAxDk1z2vF07nGovxZSKWhHZg8fr3J_WGiKl6DRxa3JexMSJxVe0SWkIZPsMQ3goHJnODZClQ9865riV1hYX6FSrH6GOzmilItiIMBdsqIUDxIcpUikSoGzwDza9EnP1QYk0L4qWtIue4TfMN9Bu6466a99GTFSHoxxqpRKdbNTDJ-4NOl0DVJVFdu-5VcKxCLw2gsO1vh8dHfJCu00tthveB03fTZwa8d_S9fTHfOOe3FlW2h78vzd2Lj4m0urvIfaKU'

/**
 * @param {string} name
 * @returns {string} 1–2 character initials
 */
export function getFriendInitials(name) {
  const t = String(name ?? '')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
  if (t.length === 0) return '?'
  if (t.length === 1) {
    const w = t[0]
    return w.length >= 2 ? w.slice(0, 2).toUpperCase() : w.charAt(0).toUpperCase()
  }
  return `${t[0].charAt(0)}${t[t.length - 1].charAt(0)}`.toUpperCase()
}

/**
 * @param {string} [avatar]
 * @returns {string | null} URL to load, or null to show initials
 */
export function friendPhotoUrl(avatar) {
  const u = avatar?.trim()
  if (!u || u === LEGACY_DEFAULT_AVATAR) return null
  return u
}
