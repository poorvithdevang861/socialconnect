import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import SectionHeader from '../components/SectionHeader'
import { isAddedToCalendar, openGoogleCalendarFromRegistration, subscribeCalendarAdded } from '../utils/calendarAdded'
import { getRegisteredEvents } from '../utils/registrations'

function formatDurationHours(startIso, endIso) {
  if (!startIso || !endIso) return null
  try {
    const a = new Date(startIso).getTime()
    const b = new Date(endIso).getTime()
    if (Number.isNaN(a) || Number.isNaN(b) || b <= a) return null
    const hrs = Math.round(((b - a) / 36e5) * 10) / 10
    return hrs === Math.floor(hrs) ? `${Math.floor(hrs)} hours` : `${hrs} hours`
  } catch {
    return null
  }
}

function EventsPage() {
  const navigate = useNavigate()
  const [version, setVersion] = useState(0)
  const events = useMemo(() => getRegisteredEvents(), [version])

  useEffect(() => {
    return subscribeCalendarAdded(() => setVersion((v) => v + 1))
  }, [])

  return (
    <main className="mx-auto min-h-[60vh] w-full max-w-[1600px] premium-shell shell-pad-lg">
      <div className="mb-8">
        <SectionHeader
          title="My Events"
          subtitle="Track your upcoming volunteering commitments."
          titleClassName="premium-h1"
        />
      </div>

      {events.length === 0 ? (
        <div className="cc-card cc-card-pad-lg text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
            <span className="material-symbols-outlined text-3xl">event_busy</span>
          </div>
          <h2 className="text-2xl font-bold text-ink">No upcoming events</h2>
          <p className="mx-auto mt-2 max-w-md text-slate-500">
            You haven&apos;t joined any opportunity yet. Explore causes and register for your first
            event.
          </p>
          <Button className="mt-6" onClick={() => navigate('/home')}>
            Join Opportunities
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {events.map((event) => {
            const calendarAdded = isAddedToCalendar(event.id)
            const durationLabel = formatDurationHours(event.startIso, event.endIso)
            return (
              <article
                className="@container cc-card overflow-hidden shadow-lg shadow-primary/5"
                key={event.id}
              >
                <div className="grid grid-cols-1 sm:grid-cols-[minmax(200px,280px)_1fr] sm:items-stretch lg:grid-cols-[minmax(220px,300px)_1fr]">
                  <div className="relative aspect-[5/4] max-h-[220px] w-full shrink-0 overflow-hidden bg-slate-100 sm:aspect-auto sm:h-auto sm:max-h-none sm:min-h-[200px] sm:max-h-[min(280px,50vh)]">
                    <img
                      alt={event.title}
                      className="absolute inset-0 h-full w-full object-cover"
                      src={event.image}
                    />
                  </div>

                  <div className="flex min-h-0 min-w-0 flex-col p-4 sm:p-5">
                    <div className="min-w-0 flex-1">
                      <span className="inline-flex rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-primary">
                        Registered
                      </span>
                      <h3 className="mt-2 text-xl font-black leading-tight text-ink sm:text-2xl cq-tight-title">
                        {event.title}
                      </h3>

                      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-x-4 sm:gap-y-2">
                        <div className="flex min-w-0 gap-2.5">
                          <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                            <span className="material-symbols-outlined text-[20px]">calendar_today</span>
                          </span>
                          <div className="min-w-0">
                            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">When</p>
                            <p className="text-sm font-semibold leading-snug text-slate-900">{event.dateTime}</p>
                            {durationLabel ? (
                              <p className="text-xs text-slate-600">{durationLabel}</p>
                            ) : null}
                          </div>
                        </div>
                        <div className="flex min-w-0 gap-2.5 sm:col-span-1">
                          <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                            <span className="material-symbols-outlined text-[20px]">location_on</span>
                          </span>
                          <div className="min-w-0">
                            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Where</p>
                            <p className="text-sm font-semibold leading-snug text-slate-900">{event.location}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-1 gap-3 border-t border-black/[0.06] pt-4 sm:grid-cols-2">
                      <Button
                        variant="secondary"
                        className="h-11 w-full justify-center border-2 border-slate-300 bg-white font-bold text-slate-900 shadow-sm hover:border-primary/50 hover:bg-primary/[0.06] hover:text-primary"
                        onClick={() => navigate('/event')}
                      >
                        View event details
                      </Button>
                      <Button
                        disabled={calendarAdded}
                        variant={calendarAdded ? 'secondary' : 'primary'}
                        className={`h-11 w-full justify-center gap-2 font-bold ${
                          calendarAdded
                            ? 'border-2 border-slate-200 bg-slate-100 text-slate-500'
                            : 'shadow-lg shadow-primary/25 ring-2 ring-primary/25 ring-offset-2 ring-offset-beige'
                        }`}
                        onClick={() => openGoogleCalendarFromRegistration(event)}
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[20px]">
                          {calendarAdded ? 'event_available' : 'calendar_add_on'}
                        </span>
                        {calendarAdded ? 'Added to calendar' : 'Add to my calendar'}
                      </Button>
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      )}
    </main>
  )
}

export default EventsPage
