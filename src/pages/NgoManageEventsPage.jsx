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

const FEEDBACK_SNIPPETS = [
  'Great coordination and clear instructions.',
  'Friendly team and smooth event check-in.',
  'Well managed timing and volunteer support.',
  'Meaningful impact and positive atmosphere.',
]

const STATUS_COPY = {
  pending_review: {
    label: 'Pending approval',
    tone: 'border-amber-200 bg-amber-50 text-amber-700',
    summary: 'Waiting for platform review before volunteers can see this event.',
  },
  approved: {
    label: 'Approved',
    tone: 'border-success-green/30 bg-success-green/10 text-success-green',
    summary: 'Live for volunteers on CauseConnect.',
  },
  rejected: {
    label: 'Needs changes',
    tone: 'border-red-200 bg-red-50 text-red-700',
    summary: 'Not visible to volunteers. Update details and submit again.',
  },
}

function getOpportunityStatus(item) {
  if (item.isDemo) return 'approved'
  return item.status ?? 'pending_review'
}

function feedbackForEvent(id) {
  const h = hashId(id)
  const rating = (4.1 + ((h % 9) / 10)).toFixed(1)
  const reviews = 8 + (h % 37)
  const quote = FEEDBACK_SNIPPETS[h % FEEDBACK_SNIPPETS.length]
  return { rating, reviews, quote }
}

function NgoManageEventsPage() {
  const profile = getNgoProfile()
  const [items, setItems] = useState(() => getNgoOpportunities())
  const sortedItems = useMemo(
    () => [...items].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
    [items],
  )

  const hasNgoItems = sortedItems.length > 0
  const showingDemo = !hasNgoItems
  const displayItems = [...sortedItems, ...DEMO_NGO_OPPORTUNITIES]

  const enriched = useMemo(
    () =>
      displayItems.map((item) => {
        const status = getOpportunityStatus(item)
        const registered = getRegisteredCount(item)
        const capacity = parseSpots(item.spots)
        const open = capacity != null ? Math.max(0, capacity - registered) : null
        const fillPct = capacity != null && capacity > 0 ? Math.min(100, Math.round((registered / capacity) * 100)) : null
        return { item, status, registered, capacity, open, fillPct, previewNames: dummyNamesForEvent(item.id, Math.min(registered, 6)) }
      }),
    [displayItems],
  )

  const totals = useMemo(() => {
    const approved = enriched.filter((row) => row.status === 'approved')
    const pending = enriched.filter((row) => row.status === 'pending_review')
    const totalRegs = approved.reduce((acc, row) => acc + row.registered, 0)
    const withFill = approved.filter((r) => r.fillPct != null)
    const avgFill =
      withFill.length === 0 ? 0 : Math.round(withFill.reduce((acc, row) => acc + (row.fillPct ?? 0), 0) / withFill.length)
    return {
      totalRegs,
      avgFill,
      count: enriched.length,
      approvedCount: approved.length,
      pendingCount: pending.length,
      hasFill: withFill.length > 0,
    }
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
      subtitle={`${profile?.orgName ?? 'Organization'} · Track approval status and approved-event performance.`}
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

      {!showingDemo ? (
        <div className="mb-6 rounded-2xl border border-dashed border-primary/35 bg-primary/[0.06] px-4 py-4 text-center sm:px-6 sm:text-left">
          <p className="text-sm font-bold text-primary">Demo samples are still shown</p>
          <p className="premium-body mt-1 text-sm text-slate-700">
            Your submitted events appear first, followed by sample listings so you can compare card states.
          </p>
        </div>
      ) : null}

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <article className="cc-card cc-card-pad flex flex-col gap-1 border border-black/[0.06] shadow-[0_8px_24px_rgba(15,15,16,0.06)]">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Submitted events</span>
          <p className="text-3xl font-black tabular-nums text-ink">{totals.count}</p>
          <p className="text-sm text-slate-600">{hasNgoItems ? 'Your events + sample listings' : 'Sample opportunities (preview)'}</p>
        </article>
        <article className="cc-card cc-card-pad flex flex-col gap-1 border border-black/[0.06] shadow-[0_8px_24px_rgba(15,15,16,0.06)]">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Pending approval</span>
          <p className="text-3xl font-black tabular-nums text-amber-600">{totals.pendingCount}</p>
          <p className="text-sm text-slate-600">Hidden from volunteers until approved</p>
        </article>
        <article className="cc-card cc-card-pad flex flex-col gap-1 border border-black/[0.06] shadow-[0_8px_24px_rgba(15,15,16,0.06)]">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total registered</span>
          <p className="text-3xl font-black tabular-nums text-primary">{totals.totalRegs}</p>
          <p className="text-sm text-slate-600">Volunteers across approved events</p>
        </article>
        <article className="cc-card cc-card-pad flex flex-col gap-1 border border-black/[0.06] shadow-[0_8px_24px_rgba(15,15,16,0.06)]">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Approved live</span>
          <p className="text-3xl font-black tabular-nums text-ink">{totals.approvedCount}</p>
          <p className="text-sm text-slate-600">
            {totals.hasFill ? `${totals.avgFill}% avg. fill rate` : 'No approved-event fill data yet'}
          </p>
        </article>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {enriched.map(({ item, status, registered, capacity, open, fillPct, previewNames }) => {
          const feedback = feedbackForEvent(item.id)
          const statusCopy = STATUS_COPY[status] ?? STATUS_COPY.pending_review
          const isApproved = status === 'approved'
          return (
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
                    <span className={`rounded-lg border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${statusCopy.tone}`}>
                      {statusCopy.label}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-slate-600">
                    {item.date} · {item.location}
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    {item.duration}
                    {item.spots ? ` · ${item.spots} volunteers` : ''}
                  </p>
                </div>
                {item.isDemo ? null : (
                  <Button variant="secondary" className="h-10 shrink-0 px-4" onClick={() => removeItem(item.id)} type="button">
                    {isApproved ? 'Remove' : 'Cancel request'}
                  </Button>
                )}
              </div>

              {!isApproved ? (
                <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-4">
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined mt-0.5 text-amber-600">hourglass_top</span>
                    <div>
                      <p className="font-bold text-amber-800">{statusCopy.summary}</p>
                      <p className="mt-1 text-sm leading-relaxed text-amber-700">
                        Registration counts, feedback, and volunteer sign-ups unlock only after platform approval.
                      </p>
                    </div>
                  </div>
                </div>
              ) : null}

              {isApproved ? (
                <>
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

              <div className="rounded-2xl border border-black/[0.08] bg-white px-3 py-3">
                <div className="mb-1 flex items-center justify-between">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Feedback</p>
                  <div className="inline-flex items-center gap-1 text-xs font-bold text-amber-600">
                    <span className="material-symbols-outlined fill-1 text-[15px]">star</span>
                    <span>{feedback.rating}</span>
                    <span className="text-slate-500">({feedback.reviews})</span>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-slate-600">{feedback.quote}</p>
              </div>

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
                </>
              ) : null}

              <p className="text-sm leading-relaxed text-slate-600">{item.description}</p>
            </div>
          </article>
          )
        })}
      </div>
    </NgoLayout>
  )
}

export default NgoManageEventsPage
