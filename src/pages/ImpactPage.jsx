import { useMemo, useState } from 'react'
import Button from '../components/Button'
import SectionHeader from '../components/SectionHeader'
import ShareProfileModal from '../components/ShareProfileModal'

function ImpactPage() {
  const [range, setRange] = useState('year')
  const [shareOpen, setShareOpen] = useState(false)

  const copyImpactLink = async () => {
    try {
      await navigator.clipboard.writeText('https://causeconnect.org/impact/arjun-patel')
    } catch {
      /* clipboard unavailable */
    }
  }

  const months = useMemo(
    () =>
      range === 'year'
        ? [
            { label: 'Jan', hours: 4 },
            { label: 'Feb', hours: 6 },
            { label: 'Mar', hours: 3 },
            { label: 'Apr', hours: 8 },
            { label: 'May', hours: 5 },
            { label: 'Jun', hours: 4 },
            { label: 'Jul', hours: 7 },
          ]
        : [
            { label: 'Feb', hours: 2 },
            { label: 'Mar', hours: 3 },
            { label: 'Apr', hours: 5 },
            { label: 'May', hours: 3 },
            { label: 'Jun', hours: 2 },
            { label: 'Jul', hours: 4 },
          ],
    [range],
  )
  const maxHours = useMemo(() => Math.max(...months.map((m) => m.hours), 1), [months])

  return (
    <main className="mx-auto w-full max-w-[1600px] premium-shell shell-pad-lg">
      <ShareProfileModal
        label="Share impact"
        onClose={() => setShareOpen(false)}
        onCopy={copyImpactLink}
        open={shareOpen}
        shareText="See my CauseConnect impact dashboard"
        title="Share your impact"
        url="https://causeconnect.org/impact/arjun-patel"
      />
      <div className="section-gap-lg">
        <SectionHeader
          className="gap-4"
          title="Your Impact"
          subtitle="Every hour you give helps build a stronger community. You&apos;re making a real difference."
          titleClassName="premium-h1"
          action={
            <Button className="px-5 py-3 sm:px-7 sm:py-3.5" onClick={() => setShareOpen(true)}>
              <span className="material-symbols-outlined !text-xl">share</span>
              <span>Share My Impact</span>
            </Button>
          }
        />

        <div className="grid grid-cols-1 gap-8">
          <section className="cc-card cc-card-pad-lg group relative overflow-hidden">
            <div className="absolute -right-32 -top-32 h-64 w-64 rounded-full bg-primary/5 blur-3xl transition-colors group-hover:bg-primary/10" />
            <div className="relative z-10">
              <div className="mb-8 flex items-start justify-between">
                <div>
                  <p className="mb-1 text-xs font-bold uppercase tracking-widest text-primary">
                    Total Impact
                  </p>
                  <h2 className="text-3xl font-bold text-slate-900">48 Hours Volunteered</h2>
                </div>
                <div className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-sm font-bold text-primary">
                  <span className="material-symbols-outlined !text-sm">trending_up</span>
                  <span>+12% this month</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-end justify-between">
                  <span className="text-sm font-medium text-slate-500">Goal: 100 Hours</span>
                  <span className="font-bold text-slate-900">48% Complete</span>
                </div>
                <div className="h-6 w-full overflow-hidden rounded-full bg-slate-100 p-1">
                  <div className="relative h-full w-[48%] rounded-full bg-primary transition-all duration-1000">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20" />
                  </div>
                </div>
                <p className="text-sm italic text-slate-400">
                  Only 52 hours left to reach your Platinum Milestone!
                </p>
              </div>
            </div>
          </section>
        </div>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {[
            { label: 'Events Completed', value: '12', icon: 'event_available', tone: 'primary' },
            { label: 'Causes Supported', value: '5', icon: 'favorite', tone: 'success' },
            { label: 'Certificates Earned', value: '3', icon: 'workspace_premium', tone: 'amber' },
            { label: 'Lives Impacted', value: '120+', icon: 'groups_3', tone: 'blue' },
          ].map((stat) => {
            const tone =
              stat.tone === 'success'
                ? 'bg-primary/15 text-primary'
                : stat.tone === 'amber'
                  ? 'bg-primary/10 text-primary-dark'
                  : stat.tone === 'blue'
                    ? 'bg-primary/20 text-primary'
                    : 'bg-primary/10 text-primary'
            return (
              <div
                className="@container cc-card cc-card-pad group transition-colors hover:border-primary/30"
                key={stat.label}
              >
                <div
                  className={`mb-4 flex size-12 items-center justify-center rounded-xl transition-transform group-hover:scale-110 ${tone}`}
                >
                  <span className="material-symbols-outlined">{stat.icon}</span>
                </div>
                <p className="text-xs font-medium text-slate-500 sm:text-sm cq-tight-title">{stat.label}</p>
                <p className="mt-1 text-2xl font-black text-slate-900 xs:text-3xl">{stat.value}</p>
              </div>
            )
          })}
        </section>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          <section className="rounded-2xl border border-primary/20 bg-primary/[0.04] p-5 sm:p-6 lg:col-span-3">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">calendar_month</span>
                <h2 className="text-lg font-extrabold text-slate-900">Monthly activity</h2>
              </div>
              <p className="text-sm text-slate-600 sm:max-w-xs sm:text-right">
                Hours volunteered by month — summary stats below reflect the selected range.
              </p>
            </div>

            <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { label: 'Hours (range)', value: range === 'year' ? '42' : '18', sub: 'total volunteer time', icon: 'schedule' },
                { label: 'Sessions', value: range === 'year' ? '14' : '6', sub: 'events logged', icon: 'event' },
                { label: 'Peak month', value: 'Apr', sub: '8 hours', icon: 'trending_up' },
                { label: 'Avg / month', value: range === 'year' ? '6' : '3', sub: 'hours', icon: 'calendar_view_month' },
              ].map((s) => (
                <div
                  className="rounded-xl border border-primary/15 bg-white/90 px-3 py-3 shadow-sm ring-1 ring-black/[0.04]"
                  key={s.label}
                >
                  <div className="flex items-center gap-1.5 text-primary">
                    <span className="material-symbols-outlined text-[18px]">{s.icon}</span>
                    <span className="text-[10px] font-bold uppercase tracking-wide text-slate-500">{s.label}</span>
                  </div>
                  <p className="mt-1 text-2xl font-black text-slate-900">{s.value}</p>
                  <p className="text-[11px] text-slate-500">{s.sub}</p>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 sm:p-5">
              <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-primary">show_chart</span>
                  <span className="text-xs font-bold uppercase tracking-wide text-primary">Hours by month</span>
                </div>
                <div className="flex gap-2">
                  <button
                    className={`rounded-full px-3 py-1.5 text-xs font-bold transition-colors ${
                      range === 'half'
                        ? 'bg-primary text-white shadow-md shadow-primary/20'
                        : 'bg-white/80 text-slate-600 ring-1 ring-black/[0.06] hover:bg-white'
                    }`}
                    onClick={() => setRange('half')}
                    type="button"
                  >
                    6 months
                  </button>
                  <button
                    className={`rounded-full px-3 py-1.5 text-xs font-bold transition-colors ${
                      range === 'year'
                        ? 'bg-primary text-white shadow-md shadow-primary/20'
                        : 'bg-white/80 text-slate-600 ring-1 ring-black/[0.06] hover:bg-white'
                    }`}
                    onClick={() => setRange('year')}
                    type="button"
                  >
                    1 year
                  </button>
                </div>
              </div>
              <div className="flex h-56 w-full items-end justify-between gap-2 rounded-xl border border-primary/10 bg-white/80 px-3 py-4 sm:gap-3">
                {months.map((m) => (
                  <div className="flex min-w-0 flex-1 flex-col items-center gap-2" key={m.label}>
                    <span className="text-[10px] font-bold text-slate-500">{m.hours}h</span>
                    <div className="relative flex h-40 w-full max-w-[2.4rem] items-end rounded-md bg-slate-100/90">
                      <div
                        className="w-full rounded-md bg-primary transition-all duration-500"
                        style={{
                          height: `${Math.max(12, Math.round((m.hours / maxHours) * 100))}%`,
                          opacity: 0.45 + (m.hours / maxHours) * 0.55,
                        }}
                      />
                    </div>
                    <span className="text-[10px] font-bold uppercase text-slate-500">{m.label}</span>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-xs text-slate-500">
                Tap a range to compare — peaks show when you volunteered most.
              </p>
            </div>
          </section>

          <section className="cc-card cc-card-pad-lg flex flex-col gap-6 overflow-hidden lg:col-span-1">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">Achievements</h2>
              <button className="text-xs font-bold uppercase tracking-widest text-primary hover:underline" type="button">
                View All
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Eco Warrior', icon: 'eco', tone: 'success' },
                { label: 'Education Ally', icon: 'menu_book', tone: 'blue' },
                { label: 'First Responder', icon: 'emergency', tone: 'primary' },
                { label: 'Community Hero', icon: 'diversity_1', tone: 'purple' },
              ].map((a) => {
                const tone =
                  a.tone === 'success'
                    ? 'from-primary/20 to-primary/5 border-primary/30 text-primary shadow-primary/10'
                    : a.tone === 'blue'
                      ? 'from-primary/30 to-primary/10 border-primary/35 text-primary-dark shadow-primary/15'
                      : a.tone === 'purple'
                        ? 'from-primary/25 to-primary/5 border-primary/25 text-primary shadow-primary/10'
                        : 'from-primary/20 to-primary/5 border-primary/30 text-primary shadow-primary/10'
                return (
                  <div className="group flex min-w-0 flex-col items-center gap-3" key={a.label}>
                    <div
                      className={`relative flex size-16 items-center justify-center rounded-full bg-gradient-to-br border-2 shadow-md transition-transform group-hover:scale-105 sm:size-20 ${tone}`}
                    >
                      <span className="material-symbols-outlined !text-3xl sm:!text-4xl">{a.icon}</span>
                      <div className="absolute -bottom-1 -right-1 rounded-full bg-white p-1 border border-black/5">
                        <span className="material-symbols-outlined !text-xs fill-1">verified</span>
                      </div>
                    </div>
                    <span className="text-center text-[11px] font-bold text-slate-900 sm:text-xs">{a.label}</span>
                  </div>
                )
              })}
            </div>

            <div className="mt-auto rounded-2xl bg-slate-50 p-4">
              <div className="flex items-center gap-4">
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <span className="material-symbols-outlined">auto_awesome</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Next Unlock</p>
                  <p className="text-[10px] text-slate-500">
                    Reach 50 hours for &apos;Impact Titan&apos; badge
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}

export default ImpactPage
