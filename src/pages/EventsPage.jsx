import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import SectionHeader from '../components/SectionHeader'
import { getRegisteredEvents } from '../utils/registrations'

function EventsPage() {
  const navigate = useNavigate()
  const events = useMemo(() => getRegisteredEvents(), [])

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
        <div className="space-y-6">
          {events.map((event) => (
            <article className="@container cc-card overflow-hidden shadow-lg shadow-primary/5" key={event.id}>
              <div className="grid grid-cols-1 md:grid-cols-[340px_1fr] lg:grid-cols-[380px_1fr]">
                <img alt={event.title} className="h-full w-full object-cover" src={event.image} />
                <div className="p-6 cq-tight-card">
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
                    Registered
                  </span>
                  <h3 className="mt-3 text-2xl font-black text-ink cq-tight-title">{event.title}</h3>
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
                  <Button variant="secondary" className="mt-6" onClick={() => navigate('/event')}>
                    View Event Details
                  </Button>
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
