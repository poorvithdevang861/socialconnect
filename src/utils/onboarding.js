const AUTH_KEY = 'socialconnect.authenticated'
const ONBOARDING_KEY = 'socialconnect.onboardingComplete'
const ROLE_KEY = 'socialconnect.userRole'

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
