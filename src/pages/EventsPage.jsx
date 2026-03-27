import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { getRegisteredEvents } from '../utils/registrations'

function EventsPage() {
  const navigate = useNavigate()
  const events = useMemo(() => getRegisteredEvents(), [])

  return (
    <main className="mx-auto min-h-[60vh] w-full max-w-5xl px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-900">My Events</h1>
        <p className="mt-2 text-slate-500">Track your upcoming volunteering commitments.</p>
      </div>

      {events.length === 0 ? (
        <div className="cc-card cc-card-pad-lg text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
            <span className="material-symbols-outlined text-3xl">event_busy</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900">No upcoming events</h2>
          <p className="mx-auto mt-2 max-w-md text-slate-500">
            You haven&apos;t joined any opportunity yet. Explore causes and register for your first
            event.
          </p>
          <button
            className="mt-6 rounded-xl bg-primary px-6 py-3 font-bold text-white transition-all hover:bg-primary/90"
            onClick={() => navigate('/home')}
          >
            Join Opportunities
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {events.map((event) => (
            <article
              className="cc-card overflow-hidden shadow-lg shadow-primary/5"
              key={event.id}
            >
              <div className="grid grid-cols-1 md:grid-cols-[280px_1fr]">
                <img alt={event.title} className="h-full w-full object-cover" src={event.image} />
                <div className="p-6">
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-green-700">
                    Registered
                  </span>
                  <h3 className="mt-3 text-2xl font-black text-slate-900">{event.title}</h3>
                  <div className="mt-4 space-y-3 text-slate-600">
                    <p className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary">calendar_today</span>
                      {event.dateTime}
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary">location_on</span>
                      {event.location}
                    </p>
                  </div>
                  <button
                    className="mt-6 rounded-xl border border-primary/30 px-5 py-2.5 font-semibold text-primary transition-all hover:bg-primary/5"
                    onClick={() => navigate('/event')}
                  >
                    View Event Details
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  )
}

export default EventsPage
