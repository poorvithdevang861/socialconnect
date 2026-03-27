const AUTH_KEY = 'socialconnect.authenticated'
const ONBOARDING_KEY = 'socialconnect.onboardingComplete'

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
