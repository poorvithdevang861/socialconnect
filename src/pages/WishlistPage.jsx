import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import SectionHeader from '../components/SectionHeader'
import { getWishlist, removeFromWishlist, subscribeWishlist } from '../utils/wishlist'

function WishlistPage() {
  const navigate = useNavigate()
  const [items, setItems] = useState(getWishlist)

  useEffect(() => {
    const sync = () => setItems(getWishlist())
    sync()
    return subscribeWishlist(sync)
  }, [])

  return (
    <main className="mx-auto min-h-[60vh] w-full max-w-[1600px] premium-shell shell-pad-lg">
      <div className="mb-8">
        <SectionHeader
          title="Wishlist"
          subtitle="Opportunities you saved from discovery — open one to join when you are ready."
          titleClassName="premium-h1"
        />
      </div>

      {items.length === 0 ? (
        <div className="cc-card cc-card-pad-lg text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
            <span className="material-symbols-outlined text-3xl">bookmark_border</span>
          </div>
          <h2 className="text-2xl font-bold text-ink">No saved opportunities yet</h2>
          <p className="mx-auto mt-2 max-w-md text-slate-500">
            Tap the bookmark on any card on Home to save it here.
          </p>
          <Button className="mt-6" onClick={() => navigate('/home')}>
            Browse opportunities
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {items.map((event) => (
            <article className="@container cc-card overflow-hidden shadow-lg shadow-primary/5" key={event.id}>
              <div className="grid grid-cols-1 md:grid-cols-[340px_1fr] lg:grid-cols-[380px_1fr]">
                <img alt={event.title} className="h-full w-full object-cover" src={event.img} />
                <div className="p-6 cq-tight-card">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
                      {event.cause}
                    </span>
                    <button
                      className="inline-flex items-center gap-1 text-sm font-bold text-slate-500 transition-colors hover:text-primary"
                      onClick={() => removeFromWishlist(event.id)}
                      type="button"
                    >
                      <span className="material-symbols-outlined text-lg">bookmark_remove</span>
                      Remove
                    </button>
                  </div>
                  <h3 className="mt-3 text-2xl font-black text-ink cq-tight-title">{event.title}</h3>
                  <p className="mt-2 line-clamp-3 text-slate-600">{event.desc}</p>
                  <div className="mt-4 space-y-2 text-slate-600">
                    <p className="flex items-center gap-2 text-sm">
                      <span className="material-symbols-outlined text-primary">calendar_today</span>
                      {event.dateShort}
                    </p>
                    {event.timeRange ? (
                      <p className="flex items-center gap-2 text-sm">
                        <span className="material-symbols-outlined text-primary">schedule</span>
                        {event.timeRange}
                      </p>
                    ) : null}
                  </div>
                  <Button variant="secondary" className="mt-6" onClick={() => navigate(event.route ?? '/event')}>
                    View opportunity
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

export default WishlistPage
