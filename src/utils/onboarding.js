const AUTH_KEY = 'socialconnect.authenticated'
const ONBOARDING_KEY = 'socialconnect.onboardingComplete'
const ROLE_KEY = 'socialconnect.userRole'
const VOLUNTEER_PREFS_KEY = 'socialconnect.volunteerPreferences'

export const STUDENT_DEMOGRAPHIC_SEGMENT = 'students-18-24'
export const MOTIVATION_OPTIONS = [
  { id: 'resume', label: 'Build resume & portfolio' },
  { id: 'impact', label: 'Create visible community impact' },
  { id: 'friends', label: 'Volunteer with friends' },
  { id: 'skills', label: 'Develop practical skills' },
]
export const AVAILABILITY_OPTIONS = [
  { id: 'weekday-evening', label: 'Weekday evenings' },
  { id: 'weekend-morning', label: 'Weekend mornings' },
  { id: 'weekend-afternoon', label: 'Weekend afternoons' },
]
export const EFFORT_BAND_OPTIONS = [
  { id: '1-2h', label: '1-2 hours' },
  { id: '2-4h', label: '2-4 hours' },
  { id: '4h+', label: '4+ hours' },
]

const DEFAULT_VOLUNTEER_PREFERENCES = {
  demographicSegment: STUDENT_DEMOGRAPHIC_SEGMENT,
  motivations: ['impact', 'skills'],
  availabilityWindows: ['weekend-morning'],
  effortBand: '2-4h',
}

export function isAuthenticated() {
  return localStorage.getItem(AUTH_KEY) === 'true'
}

export function setAuthenticated(value) {
  localStorage.setItem(AUTH_KEY, value ? 'true' : 'false')
}

export function isOnboardingComplete() {
  return localStorage.getItem(ONBOARDING_KEY) === 'true'
}

export function setOnboardingComplete(value) {
  localStorage.setItem(ONBOARDING_KEY, value ? 'true' : 'false')
}

/** @param {'volunteer' | 'ngo' | null} role */
export function setUserRole(role) {
  if (role) {
    localStorage.setItem(ROLE_KEY, role)
  } else {
    localStorage.removeItem(ROLE_KEY)
  }
}

export function getUserRole() {
  const v = localStorage.getItem(ROLE_KEY)
  return v === 'ngo' || v === 'volunteer' ? v : null
}

function cleanList(value, allowedIds) {
  if (!Array.isArray(value)) return []
  const unique = [...new Set(value.filter((entry) => typeof entry === 'string' && allowedIds.includes(entry)))]
  return unique
}

export function getVolunteerPreferences() {
  try {
    const raw = localStorage.getItem(VOLUNTEER_PREFS_KEY)
    if (!raw) return DEFAULT_VOLUNTEER_PREFERENCES
    const parsed = JSON.parse(raw)
    const motivations = cleanList(parsed?.motivations, MOTIVATION_OPTIONS.map((m) => m.id))
    const availabilityWindows = cleanList(parsed?.availabilityWindows, AVAILABILITY_OPTIONS.map((a) => a.id))
    const effortBand = EFFORT_BAND_OPTIONS.some((e) => e.id === parsed?.effortBand)
      ? parsed.effortBand
      : DEFAULT_VOLUNTEER_PREFERENCES.effortBand
    return {
      demographicSegment: STUDENT_DEMOGRAPHIC_SEGMENT,
      motivations: motivations.length ? motivations : DEFAULT_VOLUNTEER_PREFERENCES.motivations,
      availabilityWindows: availabilityWindows.length ? availabilityWindows : DEFAULT_VOLUNTEER_PREFERENCES.availabilityWindows,
      effortBand,
    }
  } catch {
    return DEFAULT_VOLUNTEER_PREFERENCES
  }
}

export function setVolunteerPreferences(next) {
  const current = getVolunteerPreferences()
  const merged = {
    ...current,
    ...next,
    demographicSegment: STUDENT_DEMOGRAPHIC_SEGMENT,
  }
  localStorage.setItem(VOLUNTEER_PREFS_KEY, JSON.stringify(merged))
}
