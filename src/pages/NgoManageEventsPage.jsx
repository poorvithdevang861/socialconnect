import { useMemo, useState } from 'react'
import Button from '../components/Button'
import NgoLayout from '../components/NgoLayout'
import { DEMO_NGO_OPPORTUNITIES, getNgoOpportunities, saveNgoOpportunities } from '../utils/ngoOpportunities'
import { getNgoProfile } from '../utils/ngoProfile'

const DUMMY_VOLUNTEER_POOL = [
  'Aisha Patel',
  'Rohan Mehta',
  'Priya Nair',
  'Vikram Singh',
  'Meera Joshi',
  'Arjun Desai',
  'Sneha Iyer',
  'Karan Kapoor',
  'Divya Reddy',
  'Aditya Bose',
]

function hashId(id) {
  let h = 0
  for (let i = 0; i < id.length; i += 1) {
    h = (h * 31 + id.charCodeAt(i)) >>> 0
  }
  return h
}

/** Stable dummy registration count when not stored on the opportunity. */
function getRegisteredCount(item) {
  if (typeof item.registeredCount === 'number' && item.registeredCount >= 0) {
    return item.registeredCount
  }
  return 3 + (hashId(item.id) % 14)
}

function parseSpots(spots) {
  const n = parseInt(String(spots ?? '').replace(/\D/g, ''), 10)
  return Number.isFinite(n) && n > 0 ? n : null
}

function dummyNamesForEvent(id, count) {
  const h = hashId(id)
  const names = []
  const pool = DUMMY_VOLUNTEER_POOL.length
  const n = Math.min(Math.max(count, 0), 6)
  for (let i = 0; i < n; i += 1) {
    names.push(DUMMY_VOLUNTEER_POOL[(h + i * 7) % pool])
  }
  return names
}

function NgoManageEventsPage() {
  const profile = getNgoProfile()
  const [items, setItems] = useState(() => getNgoOpportunities())
  const sortedItems = useMemo(
    () => [...items].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
    [items],
  )

  const showingDemo = sortedItems.length === 0
  const displayItems = showingDemo ? DEMO_NGO_OPPORTUNITIES : sortedItems

  const enriched = useMemo(
    () =>
      displayItems.map((item) => {
        const registered = getRegisteredCount(item)
        const capacity = parseSpots(item.spots)
        const open = capacity != null ? Math.max(0, capacity - registered) : null
        const fillPct = capacity != null && capacity > 0 ? Math.min(100, Math.round((registered / capacity) * 100)) : null
        return { item, registered, capacity, open, fillPct, previewNames: dummyNamesForEvent(item.id, Math.min(registered, 6)) }
      }),
    [displayItems],
  )

  const totals = useMemo(() => {
    const totalRegs = enriched.reduce((acc, row) => acc + row.registered, 0)
    const totalCap = enriched.reduce((acc, row) => acc + (row.capacity ?? 0), 0)
    const withFill = enriched.filter((r) => r.fillPct != null)
    const avgFill =
      withFill.length === 0 ? 0 : Math.round(withFill.reduce((acc, row) => acc + (row.fillPct ?? 0), 0) / withFill.length)
    return { totalRegs, totalCap, avgFill, count: enriched.length, hasFill: withFill.length > 0 }
  }, [enriched])

  const removeItem = (id) => {
    const target = items.find((e) => e.id === id)
    if (target?.isDemo) return
    const next = items.filter((entry) => entry.id !== id)
    setItems(next)
    saveNgoOpportunities(next)
  }

  return (
    <NgoLayout
      title="Manage events"
      subtitle={`${profile?.orgName ?? 'Organization'} · Track registrations and update your posted opportunities.`}
    >
      {showingDemo ? (
        <div className="mb-6 rounded-2xl border border-dashed border-primary/35 bg-primary/[0.06] px-4 py-4 text-center sm:px-6 sm:text-left">
          <p className="text-sm font-bold text-primary">Preview with sample listings</p>
          <p className="premium-body mt-1 text-sm text-slate-700">
            These cards show how many people registered and who signed up (demo names). Post your own opportunity from{' '}
            <span className="font-semibold text-ink">Home</span> to replace this preview with your real data.
          </p>
        </div>
      ) : null}

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <article className="cc-card cc-card-pad flex flex-col gap-1 border border-black/[0.06] shadow-[0_8px_24px_rgba(15,15,16,0.06)]">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Active listings</span>
          <p className="text-3xl font-black tabular-nums text-ink">{totals.count}</p>
          <p className="text-sm text-slate-600">{showingDemo ? 'Sample opportunities (preview)' : 'Opportunities live on CauseConnect'}</p>
        </article>
        <article className="cc-card cc-card-pad flex flex-col gap-1 border border-black/[0.06] shadow-[0_8px_24px_rgba(15,15,16,0.06)]">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total registered</span>
          <p className="text-3xl font-black tabular-nums text-primary">{totals.totalRegs}</p>
          <p className="text-sm text-slate-600">Volunteers across {showingDemo ? 'preview' : 'all'} events</p>
        </article>
        <article className="cc-card cc-card-pad flex flex-col gap-1 border border-black/[0.06] shadow-[0_8px_24px_rgba(15,15,16,0.06)]">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total capacity</span>
          <p className="text-3xl font-black tabular-nums text-ink">{totals.totalCap || '—'}</p>
          <p className="text-sm text-slate-600">Spots you listed (where set)</p>
        </article>
        <article className="cc-card cc-card-pad flex flex-col gap-1 border border-black/[0.06] shadow-[0_8px_24px_rgba(15,15,16,0.06)]">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Avg. fill rate</span>
          <p className="text-3xl font-black tabular-nums text-ink">{totals.hasFill ? `${totals.avgFill}%` : '—'}</p>
          <p className="text-sm text-slate-600">Across events with capacity set</p>
        </article>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {enriched.map(({ item, registered, capacity, open, fillPct, previewNames }) => (
          <article className="cc-card flex h-full flex-col overflow-hidden" key={item.id}>
            <div className="aspect-[16/10] w-full shrink-0 overflow-hidden bg-slate-100">
              {item.coverImage ? (
                <img alt="" className="h-full w-full object-cover" src={item.coverImage} />
              ) : (
                <div className="flex h-full min-h-[140px] flex-col items-center justify-center gap-2 px-4 text-center">
                  <span className="material-symbols-outlined text-5xl text-slate-300">volunteer_activism</span>
                  {item.isDemo ? (
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Demo listing</span>
                  ) : null}
                </div>
              )}
            </div>
            <div className="cc-card-pad flex min-h-0 flex-1 flex-col gap-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-extrabold text-ink">{item.title}</h3>
                    {item.isDemo ? (
                      <span className="rounded-lg bg-primary/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary">
                        Sample
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-1 text-sm text-slate-600">
                    {item.date} · {item.location}
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    {item.duration}
                    {item.spots ? ` · ${item.spots} volunteers` : ''}
                  </p>
                </div>
                {item.isDemo ? (
                  <span className="inline-flex h-10 shrink-0 items-center rounded-xl border border-dashed border-slate-300 px-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                    Preview
                  </span>
                ) : (
                  <Button variant="secondary" className="h-10 shrink-0 px-4" onClick={() => removeItem(item.id)} type="button">
                    Remove
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-primary/25 bg-primary/5 px-3 py-3">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-primary/80">Registered</p>
                  <p className="mt-1 text-3xl font-black tabular-nums leading-none text-ink">{registered}</p>
                  <p className="mt-1 text-xs text-slate-500">{item.isDemo ? 'Demo count' : 'Current sign-ups'}</p>
                </div>
                <div className="rounded-2xl border border-black/[0.08] bg-background-light px-3 py-3">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Capacity</p>
                  <p className="mt-1 text-3xl font-black tabular-nums leading-none text-ink">{capacity ?? '—'}</p>
                  <p className="mt-1 text-xs text-slate-500">Spots listed</p>
                </div>
                <div className="rounded-2xl border border-black/[0.08] bg-background-light px-3 py-3">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Open spots</p>
                  <p className="mt-1 text-3xl font-black tabular-nums leading-none text-ink">{open ?? '—'}</p>
                  <p className="mt-1 text-xs text-slate-500">Remaining</p>
                </div>
              </div>

              {fillPct != null ? (
                <div>
                  <div className="mb-1 flex justify-between text-xs font-semibold text-slate-600">
                    <span>Fill</span>
                    <span>{fillPct}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-200">
                    <div className="h-full rounded-full bg-primary transition-[width]" style={{ width: `${fillPct}%` }} />
                  </div>
                </div>
              ) : null}

              <div className="rounded-2xl border border-black/[0.08] bg-background-light/80 px-3 py-3">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  {item.isDemo ? 'Demo sign-ups (example names)' : 'Recent sign-ups'}
                </p>
                <ul className="mt-3 grid grid-cols-1 gap-2 text-sm text-ink sm:grid-cols-2">
                  {previewNames.map((name) => (
                    <li className="flex min-w-0 items-center gap-2" key={`${item.id}-${name}`}>
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary">
                        {name
                          .split(' ')
                          .map((p) => p[0])
                          .join('')
                          .slice(0, 2)}
                      </span>
                      <span className="min-w-0 truncate font-medium">{name}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-sm leading-relaxed text-slate-600">{item.description}</p>
            </div>
          </article>
        ))}
      </div>
    </NgoLayout>
  )
}

export default NgoManageEventsPage
