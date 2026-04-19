import { useMemo, useState } from 'react'
import Button from '../components/Button'
import NgoLayout from '../components/NgoLayout'
import { getNgoOpportunities, saveNgoOpportunities } from '../utils/ngoOpportunities'
import { getNgoProfile } from '../utils/ngoProfile'

function NgoManageEventsPage() {
  const profile = getNgoProfile()
  const [items, setItems] = useState(() => getNgoOpportunities())
  const sortedItems = useMemo(
    () => [...items].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
    [items],
  )

  const removeItem = (id) => {
    const next = items.filter((entry) => entry.id !== id)
    setItems(next)
    saveNgoOpportunities(next)
  }

  return (
    <NgoLayout
      title="Manage events"
      subtitle={`${profile?.orgName ?? 'Organization'} · Track and update your posted opportunities.`}
      maxWidthClass="max-w-6xl"
    >
        {sortedItems.length === 0 ? (
          <div className="cc-card cc-card-pad-lg text-center">
            <div className="mx-auto mb-3 flex size-14 items-center justify-center rounded-full bg-primary/15 text-primary">
              <span className="material-symbols-outlined text-3xl">event_busy</span>
            </div>
            <h2 className="premium-h2">No opportunities posted yet</h2>
            <p className="premium-body mt-2">Post your first volunteer opportunity to start receiving signups.</p>
          </div>
        ) : (
          <div className="responsive-grid-main">
            {sortedItems.map((item) => (
              <article className="cc-card overflow-hidden h-full" key={item.id}>
                <div className="aspect-[16/10] w-full overflow-hidden bg-slate-100">
                  {item.coverImage ? (
                    <img alt="" className="h-full w-full object-cover" src={item.coverImage} />
                  ) : (
                    <div className="flex h-full min-h-[140px] items-center justify-center">
                      <span className="material-symbols-outlined text-5xl text-slate-300">image</span>
                    </div>
                  )}
                </div>
                <div className="cc-card-pad">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="text-lg font-extrabold text-ink">{item.title}</h3>
                      <p className="mt-1 text-sm text-slate-600">
                        {item.date} · {item.location}
                      </p>
                      <p className="mt-1 text-sm text-slate-600">
                        {item.duration} · {item.spots} volunteers
                      </p>
                    </div>
                    <Button variant="secondary" className="h-10 shrink-0 px-4" onClick={() => removeItem(item.id)} type="button">
                      Remove
                    </Button>
                  </div>
                  <p className="mt-3 text-sm text-slate-600">{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        )}
    </NgoLayout>
  )
}

export default NgoManageEventsPage
