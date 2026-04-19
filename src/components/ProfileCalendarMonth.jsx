import { useEffect, useMemo, useRef, useState } from 'react'

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
  const syncedMonth = useRef(false)

  useEffect(() => {
    if (events.length === 0) {
      syncedMonth.current = false
      return
    }
    if (syncedMonth.current) return
    const d = new Date(events[0].startIso)
    setCursor(new Date(d.getFullYear(), d.getMonth(), 1))
    setSelected(new Date(d.getFullYear(), d.getMonth(), d.getDate()))
    syncedMonth.current = true
  }, [events])

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
    <div className="group/cal space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 px-0.5">
        <button
          className="flex size-8 shrink-0 items-center justify-center rounded-lg text-slate-400 opacity-70 transition-all hover:bg-slate-100 hover:text-slate-700 hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 group-hover/cal:opacity-90"
          onClick={goPrev}
          type="button"
          aria-label="Previous month"
        >
          <span className="material-symbols-outlined text-xl leading-none">chevron_left</span>
        </button>
        <h3 className="min-w-0 flex-1 text-center text-lg font-bold text-slate-900">
          {cursor.toLocaleString(undefined, { month: 'long', year: 'numeric' })}
        </h3>
        <button
          className="flex size-8 shrink-0 items-center justify-center rounded-lg text-slate-400 opacity-70 transition-all hover:bg-slate-100 hover:text-slate-700 hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 group-hover/cal:opacity-90"
          onClick={goNext}
          type="button"
          aria-label="Next month"
        >
          <span className="material-symbols-outlined text-xl leading-none">chevron_right</span>
        </button>
      </div>

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
                className={`flex min-h-[72px] flex-col items-stretch rounded-md border border-transparent bg-white p-1.5 text-left transition-colors duration-150 hover:border-primary/15 hover:bg-primary/[0.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/25 sm:min-h-[80px] sm:p-2 ${
                  isSelected ? 'bg-primary/[0.06] ring-1 ring-inset ring-primary/25' : ''
                } ${hasSaved && !isSelected ? 'bg-primary/[0.09]' : ''}`}
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

      <div className="rounded-2xl border border-black/[0.06] bg-slate-50/80 p-4">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
          {selected.toLocaleDateString(undefined, {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })}
        </p>
        {selectedEvents.length === 0 ? (
          <p className="mt-2 text-sm text-slate-600">No events on this day.</p>
        ) : (
          <ul className="mt-3 space-y-3">
            {selectedEvents.map((ev) => (
              <li className="rounded-xl border border-primary/20 bg-white p-3 shadow-sm" key={ev.id}>
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <p className="font-bold text-slate-900">{ev.title}</p>
                  <span className="shrink-0 rounded-full bg-primary/12 px-2 py-0.5 text-[10px] font-black uppercase tracking-wide text-primary">
                    On your calendar
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
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default ProfileCalendarMonth
