export const GREEN_EARTH_EVENT = {
  id: 'green-earth-tree-plantation',
  title: 'Green Earth Tree Plantation',
  dateTime: 'Saturday, 24 Oct • 09:00 AM',
  location: 'Central Park North, Meeting Point B',
  image:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBHFg7Lb1J2UB23UIzivsG38PCbA_c-m8AsYnHhVdYIZWBEUgF2f1-PUAqHttRpyBndUM6WegLt-VYdkLI-4hrm7wQVnvQwfOkIzNNivEPrljPFkFhBzi0IiI05YdrOD8IBx7EvE4sBCl6YMaGdtQRWeFVwNpz27x5tMwVZSQwq7Z_lzeiV2kOIIaiXILdzZmoOGGlRyLZavPc-7qCzajqGxct-FQvYIYCiOqYfvl7BPc1W4YWCqERRPGKTsCC1NLwOxfQQb0ieeak',
}

const STORAGE_KEY = 'socialconnect.registeredEvents'

export function getRegisteredEvents() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function registerGreenEarthEvent() {
  const existing = getRegisteredEvents()
  if (existing.some((event) => event.id === GREEN_EARTH_EVENT.id)) return
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...existing, GREEN_EARTH_EVENT]))
}
