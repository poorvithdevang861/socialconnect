export const GREEN_EARTH_EVENT = {
  id: 'green-earth-tree-plantation',
  title: 'Green Earth Tree Plantation',
  /** Shown on My Events — matches event detail & confirmation (09:00–12:00, 3 hrs) */
  dateTime: 'Sat, 18 Jul 2026 • 09:00 AM – 12:00 PM',
  /** ISO local times — profile calendar + Google Calendar export */
  startIso: '2026-07-18T09:00:00',
  endIso: '2026-07-18T12:00:00',
  location: 'Central Park North, Meeting Point B',
  image:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBHFg7Lb1J2UB23UIzivsG38PCbA_c-m8AsYnHhVdYIZWBEUgF2f1-PUAqHttRpyBndUM6WegLt-VYdkLI-4hrm7wQVnvQwfOkIzNNivEPrljPFkFhBzi0IiI05YdrOD8IBx7EvE4sBCl6YMaGdtQRWeFVwNpz27x5tMwVZSQwq7Z_lzeiV2kOIIaiXILdzZmoOGGlRyLZavPc-7qCzajqGxct-FQvYIYCiOqYfvl7BPc1W4YWCqERRPGKTsCC1NLwOxfQQb0ieeak',
}

/** Snapshot for bookmark / wishlist (same id as registered event) */
export const GREEN_EARTH_WISHLIST = {
  id: GREEN_EARTH_EVENT.id,
  title: GREEN_EARTH_EVENT.title,
  cause: 'Environment',
  desc: 'Join us for our biggest reforestation initiative — plant indigenous saplings at City Park.',
  dateShort: 'Sat, 18 Jul',
  img: GREEN_EARTH_EVENT.image,
  route: '/event',
  joined: '32 volunteers going',
  openings: '8 slots remaining',
  verified: true,
  timeRange: '09:00 AM – 12:00 PM',
}

const STORAGE_KEY = 'socialconnect.registeredEvents'

/** Merge stored rows with canonical definitions so dates/locations stay in sync after app updates. */
const CANONICAL_BY_ID = {
  [GREEN_EARTH_EVENT.id]: GREEN_EARTH_EVENT,
}

export function getRegisteredEvents() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const list = raw ? JSON.parse(raw) : []
    if (!Array.isArray(list)) return []
    return list.map((event) => {
      const canonical = event?.id ? CANONICAL_BY_ID[event.id] : null
      return canonical ? { ...event, ...canonical } : event
    })
  } catch {
    return []
  }
}

export function registerGreenEarthEvent() {
  const existing = getRegisteredEvents()
  if (existing.some((event) => event.id === GREEN_EARTH_EVENT.id)) return
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...existing, GREEN_EARTH_EVENT]))
}
