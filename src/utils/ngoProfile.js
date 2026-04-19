const NGO_PROFILE_KEY = 'socialconnect.ngoProfile'

/**
 * @typedef {{ orgName: string, contactName: string, email: string, city: string, mission: string }} NgoProfile
 */

/** @param {NgoProfile} profile */
export function saveNgoProfile(profile) {
  localStorage.setItem(NGO_PROFILE_KEY, JSON.stringify(profile))
}

/** @returns {NgoProfile | null} */
export function getNgoProfile() {
  try {
    const raw = localStorage.getItem(NGO_PROFILE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (
      typeof parsed?.orgName === 'string' &&
      typeof parsed?.contactName === 'string' &&
      typeof parsed?.email === 'string' &&
      typeof parsed?.city === 'string' &&
      typeof parsed?.mission === 'string'
    ) {
      return parsed
    }
    return null
  } catch {
    return null
  }
}

export function clearNgoProfile() {
  localStorage.removeItem(NGO_PROFILE_KEY)
}
