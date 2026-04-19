import { GREEN_EARTH_EVENT, getRegisteredEvents } from './registrations'

const STORAGE_KEY = 'socialconnect.calendarAdded'
export const CALENDAR_ADDED_EVENT = 'socialconnect-calendar-added'

/** @typedef {{ id: string, title: string, location: string, startIso: string, endIso: string, details?: string }} CalendarEventMeta */

/** @type {Record<string, CalendarEventMeta>} */
export const CALENDAR_EVENTS_BY_ID = {
  [GREEN_EARTH_EVENT.id]: {
    id: GREEN_EARTH_EVENT.id,
    title: GREEN_EARTH_EVENT.title,
    location: GREEN_EARTH_EVENT.location,
    startIso: '2026-10-24T09:00:00',
    endIso: '2026-10-24T12:00:00',
    details:
      'Volunteering with CauseConnect — Green Earth Tree Plantation. Bring a water bottle and sturdy shoes.',
  },
}

/**
 * @param {CalendarEventMeta} ev
 * @returns {string}
 */
export function buildGoogleCalendarUrl(ev) {
  const start = new Date(ev.startIso)
  const end = new Date(ev.endIso)
  const fmt = (d) => {
    const pad = (n) => String(n).padStart(2, '0')
    return (
      d.getFullYear() +
      pad(d.getMonth() + 1) +
      pad(d.getDate()) +
      'T' +
      pad(d.getHours()) +
      pad(d.getMinutes()) +
      '00'
    )
  }
  const dates = `${fmt(start)}/${fmt(end)}`
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: ev.title,
    dates,
    details: ev.details ?? '',
    location: ev.location ?? '',
  })
  return `https://calendar.google.com/calendar/render?${params.toString()}`
}

/** @param {{ id: string, title: string, location: string, dateTime?: string }} reg */
export function calendarMetaFromRegistration(reg) {
  const known = CALENDAR_EVENTS_BY_ID[reg.id]
  if (known) return known
  return {
    id: reg.id,
    title: reg.title,
    location: reg.location,
    startIso: '2026-10-24T09:00:00',
    endIso: '2026-10-24T12:00:00',
    details: `Volunteering: ${reg.title}`,
  }
}

/** @returns {string[]} */
export function getCalendarAddedIds() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function persistAndNotify(ids) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
  window.dispatchEvent(new Event(CALENDAR_ADDED_EVENT))
}

/** @param {string} id */
export function addToMyCalendar(id) {
  const list = getCalendarAddedIds()
  if (list.includes(id)) return false
  persistAndNotify([...list, id])
  return true
}

/** @param {string} id */
export function isAddedToCalendar(id) {
  return getCalendarAddedIds().includes(id)
}

/** @param {( ) => void} callback */
export function subscribeCalendarAdded(callback) {
  window.addEventListener(CALENDAR_ADDED_EVENT, callback)
  return () => window.removeEventListener(CALENDAR_ADDED_EVENT, callback)
}

/**
 * Opens Google Calendar prefilled and records the event as added.
 * @param {string} eventId
 */
export function openGoogleCalendarAndSave(eventId) {
  let meta = CALENDAR_EVENTS_BY_ID[eventId]
  if (!meta) {
    const reg = getRegisteredEvents().find((r) => r.id === eventId)
    if (!reg) return
    meta = calendarMetaFromRegistration(reg)
  }
  addToMyCalendar(eventId)
  window.open(buildGoogleCalendarUrl(meta), '_blank', 'noopener,noreferrer')
}

/**
 * @param {{ id: string, title: string, location: string }} reg
 */
export function openGoogleCalendarFromRegistration(reg) {
  const meta = calendarMetaFromRegistration(reg)
  addToMyCalendar(meta.id)
  window.open(buildGoogleCalendarUrl(meta), '_blank', 'noopener,noreferrer')
}

/** @returns {CalendarEventMeta[]} */
export function getCalendarEntriesForProfile() {
  const ids = getCalendarAddedIds()
  const registered = getRegisteredEvents()
  return ids
    .map((id) => {
      const meta = CALENDAR_EVENTS_BY_ID[id]
      if (meta) return meta
      const reg = registered.find((r) => r.id === id)
      return reg ? calendarMetaFromRegistration(reg) : null
    })
    .filter(Boolean)
}
