import { useMemo, useState } from 'react'
import { buildGoogleCalendarUrl } from '../utils/calendarAdded'

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

/**
 * @param {import('../utils/calendarAdded').CalendarEventMeta[]} events
 */
function eventDayKeys(events) {
  const map = new Map()
  for (const ev of events) {
    const d = new Date(ev.startIso)
    const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`
    if (!map.has(key)) map.set(key, [])
    map.get(key).push(ev)
  }
  return map
}

function sameDay(a, b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

/**
 * @param {{ events: import('../utils/calendarAdded').CalendarEventMeta[] }} props
 */
function ProfileCalendarMonth({ events }) {
  const [cursor, setCursor] = useState(() => {
    const d = new Date()
    return new Date(d.getFullYear(), d.getMonth(), 1)
  })
  const [selected, setSelected] = useState(() => new Date())

  const byDay = useMemo(() => eventDayKeys(events), [events])

  const year = cursor.getFullYear()
  const month = cursor.getMonth()
  const firstDow = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const today = new Date()

  const cells = []
  for (let i = 0; i < firstDow; i += 1) {
    cells.push({ type: 'pad', key: `pad-${i}` })
  }
  for (let day = 1; day <= daysInMonth; day += 1) {
    const date = new Date(year, month, day)
    const key = `${year}-${month}-${day}`
    const dayEvents = byDay.get(key) ?? []
    cells.push({ type: 'day', day, date, key: `d-${day}`, dayEvents })
  }

  function goPrev() {
    setCursor(new Date(year, month - 1, 1))
  }

  function goNext() {
    setCursor(new Date(year, month + 1, 1))
  }

  const selectedKey = `${selected.getFullYear()}-${selected.getMonth()}-${selected.getDate()}`
  const selectedEvents = byDay.get(selectedKey) ?? []

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-lg font-bold text-slate-900">
          {cursor.toLocaleString(undefined, { month: 'long', year: 'numeric' })}
        </h3>
        <div className="flex items-center gap-1">
          <button
            className="inline-flex size-10 items-center justify-center rounded-xl border border-black/[0.08] bg-white text-slate-700 transition-colors hover:bg-slate-50"
            onClick={goPrev}
            type="button"
            aria-label="Previous month"
          >
            <span className="material-symbols-outlined text-xl">chevron_left</span>
          </button>
          <button
            className="inline-flex size-10 items-center justify-center rounded-xl border border-black/[0.08] bg-white text-slate-700 transition-colors hover:bg-slate-50"
            onClick={goNext}
            type="button"
            aria-label="Next month"
          >
            <span className="material-symbols-outlined text-xl">chevron_right</span>
          </button>
        </div>
      </div>

      <p className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block size-3 rounded-sm bg-primary/25 ring-2 ring-primary/50" />
          Day with a saved event
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block size-3 rounded-sm border-2 border-primary" />
          Selected day
        </span>
      </p>

      <div className="overflow-hidden rounded-2xl border border-black/[0.08] bg-white">
        <div className="grid grid-cols-7 border-b border-black/[0.06] bg-slate-50/90">
          {WEEKDAYS.map((w) => (
            <div className="py-2 text-center text-[11px] font-bold uppercase tracking-wider text-slate-500" key={w}>
              {w}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-px bg-black/[0.06] p-px">
          {cells.map((cell) => {
            if (cell.type === 'pad') {
              return <div className="min-h-[72px] bg-slate-50/50 sm:min-h-[80px]" key={cell.key} />
            }
            const { date, day, dayEvents } = cell
            const hasSaved = dayEvents.length > 0
            const isToday = sameDay(date, today)
            const isSelected = sameDay(date, selected)
            return (
              <button
                className={`flex min-h-[72px] flex-col items-stretch border border-transparent bg-white p-1.5 text-left transition-colors hover:bg-slate-50/90 sm:min-h-[80px] sm:p-2 ${
                  isSelected ? 'z-[1] ring-2 ring-primary ring-inset' : ''
                } ${hasSaved ? 'bg-primary/[0.12]' : ''}`}
                key={cell.key}
                onClick={() => setSelected(new Date(date))}
                type="button"
              >
                <span
                  className={`inline-flex size-7 items-center justify-center rounded-full text-sm font-bold ${
                    isToday ? 'bg-primary text-white' : 'text-slate-800'
                  }`}
                >
                  {day}
                </span>
                {hasSaved ? (
                  <div className="mt-1 flex flex-wrap gap-0.5">
                    {dayEvents.slice(0, 2).map((ev) => (
                      <span
                        className="truncate rounded px-1 py-0.5 text-[9px] font-bold leading-tight text-primary sm:text-[10px]"
                        key={ev.id}
                        title={ev.title}
                      >
                        {ev.title.length > 14 ? `${ev.title.slice(0, 12)}…` : ev.title}
                      </span>
                    ))}
                    {dayEvents.length > 2 ? (
                      <span className="text-[9px] font-bold text-primary">+{dayEvents.length - 2}</span>
                    ) : null}
                  </div>
                ) : null}
              </button>
            )
          })}
        </div>
      </div>

      <div className="rounded-2xl border border-black/[0.08] bg-slate-50/80 p-4">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
          {selected.toLocaleDateString(undefined, {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })}
        </p>
        {selectedEvents.length === 0 ? (
          <p className="mt-2 text-sm text-slate-600">No saved events on this day.</p>
        ) : (
          <ul className="mt-3 space-y-3">
            {selectedEvents.map((ev) => (
              <li className="rounded-xl border border-primary/25 bg-white p-3 shadow-sm" key={ev.id}>
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <p className="font-bold text-slate-900">{ev.title}</p>
                  <span className="shrink-0 rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-black uppercase tracking-wide text-primary">
                    Saved
                  </span>
                </div>
                <p className="mt-1 text-sm text-slate-600">{ev.location}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {new Date(ev.startIso).toLocaleTimeString(undefined, {
                    hour: 'numeric',
                    minute: '2-digit',
                  })}{' '}
                  –{' '}
                  {new Date(ev.endIso).toLocaleTimeString(undefined, {
                    hour: 'numeric',
                    minute: '2-digit',
                  })}
                </p>
                <a
                  className="mt-2 inline-flex items-center gap-1 text-sm font-bold text-primary hover:underline"
                  href={buildGoogleCalendarUrl(ev)}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Open in Google Calendar
                  <span className="material-symbols-outlined text-base">open_in_new</span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default ProfileCalendarMonth
