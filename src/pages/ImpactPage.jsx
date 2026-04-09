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
    () => [
      { label: 'Jan', height: 'h-[40%]', strength: 'bg-primary/20 hover:bg-primary' },
      { label: 'Feb', height: 'h-[60%]', strength: 'bg-primary/40 hover:bg-primary' },
      { label: 'Mar', height: 'h-[30%]', strength: 'bg-primary/20 hover:bg-primary' },
      { label: 'Apr', height: 'h-[85%]', strength: 'bg-primary' },
      { label: 'May', height: 'h-[55%]', strength: 'bg-primary/60 hover:bg-primary' },
      { label: 'Jun', height: 'h-[45%]', strength: 'bg-primary/40 hover:bg-primary' },
      { label: 'Jul', height: 'h-[70%]', strength: 'bg-primary/80 hover:bg-primary' },
    ],
    [],
  )

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

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <section className="cc-card cc-card-pad-lg group relative overflow-hidden lg:col-span-2">
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

          <aside className="cc-card flex flex-col overflow-hidden">
            <div className="relative h-40">
              <img
                alt="Reforestation Event"
                className="h-full w-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2DylnWNVXzdy8TfZq_PO5eBNBd_2WKsB97WlmKUwmq-bvVlphw1qjAUZDXIXwLf_Z49x9kMJdNdGQlaUr1rS8sJnq6fUMcKOiRmo-96ksq37bQvd7BVngbapXEQodxTKNOD02iTpjJWt0AcJ4LWrMSRRNj3m1JIMgeHchstujMGosv-slP8_r1iVc1WbpZe7hawjU5qQ6Pvn2TF5LvuQaf2RsznG5NuNCMun_xeH97ly2WNfkYuzvnUePGTZtMJuuRVYalyJMTdw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <span className="rounded bg-primary px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                  Latest Milestone
                </span>
              </div>
            </div>
            <div className="cc-card-pad flex flex-col gap-2">
              <h3 className="text-lg font-bold text-slate-900">Planting Change</h3>
              <p className="text-sm leading-relaxed text-slate-500">
                You contributed 6 hours to the Great Green Wall project. Together with 40 others,
                you planted over 200 saplings in Oakwood Park.
              </p>
              <button
                className="mt-2 inline-flex items-center gap-1 text-sm font-bold text-primary hover:underline"
                type="button"
              >
                Read the full story{' '}
                <span className="material-symbols-outlined !text-sm">arrow_forward</span>
              </button>
            </div>
          </aside>
        </div>

        <section className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
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

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <section className="cc-card cc-card-pad-lg lg:col-span-2">
              <div className="mb-10 flex items-center justify-between gap-3 max-w-420:stack">
              <h2 className="text-xl font-bold text-slate-900">Monthly Activity</h2>
              <div className="flex gap-2">
                <button
                  className={`rounded px-3 py-1 text-xs font-bold ${
                    range === 'half'
                      ? 'bg-primary text-white shadow-md shadow-primary/20'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                  onClick={() => setRange('half')}
                  type="button"
                >
                  6 Months
                </button>
                <button
                  className={`rounded px-3 py-1 text-xs font-bold ${
                    range === 'year'
                      ? 'bg-primary text-white shadow-md shadow-primary/20'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                  onClick={() => setRange('year')}
                  type="button"
                >
                  1 Year
                </button>
              </div>
            </div>

            <div className="flex h-48 w-full items-end justify-between gap-2 px-2 md:gap-4">
              {months.map((m) => (
                <div className="flex flex-1 flex-col items-center gap-2" key={m.label}>
                  <div className={`relative w-full rounded-t-lg bg-slate-100 ${m.height}`}>
                    <div
                      className={`absolute bottom-0 w-full rounded-t-lg transition-colors ${m.strength} h-full`}
                    />
                  </div>
                  <span className="text-[10px] font-bold uppercase text-slate-400">{m.label}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="cc-card cc-card-pad-lg flex flex-col gap-6 overflow-hidden">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">Achievements</h2>
              <button className="text-xs font-bold uppercase tracking-widest text-primary hover:underline" type="button">
                View All
              </button>
            </div>

            <div className="hide-scrollbar flex snap-x gap-6 overflow-x-auto pb-2">
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
                  <div className="group flex shrink-0 snap-center flex-col items-center gap-3" key={a.label}>
                    <div
                      className={`relative flex size-20 items-center justify-center rounded-full bg-gradient-to-br border-2 shadow-lg transition-transform group-hover:scale-105 ${tone}`}
                    >
                      <span className="material-symbols-outlined !text-4xl">{a.icon}</span>
                      <div className="absolute -bottom-1 -right-1 rounded-full bg-white p-1 border border-black/5">
                        <span className="material-symbols-outlined !text-xs fill-1">verified</span>
                      </div>
                    </div>
                    <span className="text-center text-xs font-bold text-slate-900">{a.label}</span>
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
