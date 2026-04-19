import { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import SectionHeader from '../components/SectionHeader'
import ShareProfileModal from '../components/ShareProfileModal'

function ProfilePage() {
  const [activeTab, setActiveTab] = useState('activity')
  const [favoriteBadge, setFavoriteBadge] = useState('Community Hero')
  const [shareOpen, setShareOpen] = useState(false)

  const copyProfile = async () => {
    try {
      await navigator.clipboard.writeText('https://causeconnect.org/u/arjun-patel')
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <main className="mx-auto max-w-[1600px] premium-shell shell-pad-lg">
      <ShareProfileModal
        open={shareOpen}
        onClose={() => setShareOpen(false)}
        onCopy={copyProfile}
      />
      <section className="mb-6">
        <SectionHeader
          title="Your Profile"
          subtitle="Track your impact identity, badges, and recent activity."
          titleClassName="premium-h1"
        />
      </section>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <aside className="space-y-6 lg:col-span-3">
          <div className="@container cc-card cc-card-pad-lg text-center">
            <div className="relative mb-4 inline-block">
              <div className="mx-auto h-24 w-24 rounded-full bg-gradient-to-tr from-primary to-orange-300 p-1">
                <img
                  className="h-full w-full rounded-full border-2 border-white object-cover"
                  alt="Arjun Patel"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBVVEg_AagAxDk1z2vF07nGovxZSKWhHZg8fr3J_WGiKl6DRxa3JexMSJxVe0SWkIZPsMQ3goHJnODZClQ9865riV1hYX6FSrH6GOzmilItiIMBdsqIUDxIcpUikSoGzwDza9EnP1QYk0L4qWtIue4TfMN9Bu6466a99GTFSHoxxqpRKdbNTDJ-4NOl0DVJVFdu-5VcKxCLw2gsO1vh8dHfJCu00tthveB03fTZwa8d_S9fTHfOOe3FlW2h78vzd2Lj4m0urvIfaKU"
                />
              </div>
              <span className="material-symbols-outlined absolute bottom-1 right-1 rounded-full border-2 border-white bg-primary p-1 text-xs font-bold text-white">
                verified
              </span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 cq-tight-title">Arjun Patel</h2>
            <span className="mt-1 inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
              Verified Volunteer
            </span>
            <p className="mt-4 text-left text-sm leading-relaxed text-slate-500">
              Passionate about environmental sustainability and social equity. Dedicated to making a
              tangible difference in my local community.
            </p>
          </div>

          <div className="cc-card cc-card-pad-lg">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                Next Milestone
              </h3>
              <span className="material-symbols-outlined text-sm text-primary">military_tech</span>
            </div>
            <p className="mb-2 text-sm font-medium text-slate-900">Silver Badge Progress</p>
            <div className="mb-3 h-2 w-full rounded-full bg-slate-100">
              <div className="h-2 w-3/4 rounded-full bg-primary" />
            </div>
            <p className="text-xs text-slate-500">
              <span className="font-bold text-primary">12 hours</span> left to reach Silver status.
            </p>
          </div>

          <div className="cc-card cc-card-pad">
            <div className="space-y-1">
              {[
                ['edit', 'Edit Profile'],
                ['bookmark', 'Wishlist', '/wishlist'],
                ['group', 'Friends', '/friends'],
                ['help', 'Help Center', null],
              ].map(([icon, text, href]) =>
                href ? (
                  <Link
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-slate-50"
                    key={text}
                    to={href}
                  >
                    <span className="material-symbols-outlined text-slate-400">{icon}</span> {text}
                  </Link>
                ) : (
                  <button
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-slate-50"
                    key={text}
                    type="button"
                  >
                    <span className="material-symbols-outlined text-slate-400">{icon}</span> {text}
                  </button>
                ),
              )}
            </div>
            <hr className="my-4 border-slate-200" />
            <Button className="flex w-full items-center justify-center gap-2 py-3" onClick={() => setShareOpen(true)}>
              <span className="material-symbols-outlined text-sm">
                share
              </span>
              Share Profile
            </Button>
          </div>
        </aside>

        <div className="space-y-8 lg:col-span-9">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {[
              ['Total Events', '12', '+20% this month', 'trending_up'],
              ['Hours Volunteered', '48', '+15% this month', 'trending_up'],
              ['Impact Score', '850', 'Global Top 5%', 'workspace_premium'],
            ].map(([label, value, trend, icon]) => (
              <div
                className="@container cc-card cc-card-pad group relative flex flex-col items-center justify-center overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-md"
                key={label}
              >
                <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-primary/5 transition-transform group-hover:scale-150" />
                <p className="mb-1 text-sm font-medium text-slate-500 cq-tight-title">{label}</p>
                <p className="text-4xl font-extrabold text-slate-900">{value}</p>
                <div className="mt-2 flex items-center text-xs font-bold text-primary">
                  <span className="material-symbols-outlined text-xs">{icon}</span> {trend}
                </div>
              </div>
            ))}
          </div>

          <div className="border-b border-slate-200">
            <nav className="hide-scrollbar flex space-x-4 overflow-x-auto sm:space-x-8" aria-label="Tabs">
              {[
                ['activity', 'history', 'Activity'],
                ['badges', 'stars', 'Badges'],
              ].map(([tab, icon, label]) => (
                <button
                  className={`flex items-center gap-2 border-b-2 px-1 py-4 text-sm font-medium ${
                    activeTab === tab
                      ? 'border-primary font-bold text-primary'
                      : 'border-transparent text-slate-500 hover:text-slate-700'
                  }`}
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                >
                  <span className="material-symbols-outlined text-lg">{icon}</span> {label}
                </button>
              ))}
            </nav>
          </div>

          {activeTab === 'activity' ? (
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              <div className="space-y-4 lg:col-span-2">
                <h3 className="flex items-center gap-2 text-lg font-bold text-slate-900">
                  Recent Contributions
                </h3>
                <div className="space-y-3">
                  {[
                    [
                      'forest',
                      'bg-primary/10',
                      'text-primary',
                      'Planted 10 trees at Central Park',
                      'Oct 12, 2023',
                      'Environmental conservation project focused on urban canopy restoration.',
                      '+50 Impact Points',
                      '4 Hours',
                    ],
                    [
                      'school',
                      'bg-primary/10',
                      'text-primary',
                      'Tutored 5 students at Metro Library',
                      'Oct 05, 2023',
                      'Provided mathematics and science support for middle school students from underprivileged areas.',
                      '+80 Impact Points',
                      '3 Hours',
                    ],
                    [
                      'restaurant',
                      'bg-orange-100',
                      'text-orange-600',
                      'Meal Prep for City Shelter',
                      'Sep 28, 2023',
                      'Assisted kitchen staff in preparing over 200 balanced meals for community residents.',
                      '+45 Impact Points',
                      '5 Hours',
                    ],
                  ].map(([icon, wrapClass, iconClass, title, date, desc, points, hours]) => (
                    <div
                      className="cc-card cc-card-pad flex items-start gap-4 transition-all hover:shadow-md"
                      key={title}
                    >
                      <div className={`rounded-lg p-2 ${wrapClass}`}>
                        <span className={`material-symbols-outlined ${iconClass}`}>{icon}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <h4 className="text-sm font-bold text-slate-900">{title}</h4>
                          <span className="text-xs text-slate-400">{date}</span>
                        </div>
                        <p className="mt-1 text-xs text-slate-500">{desc}</p>
                        <div className="mt-2 flex items-center gap-2">
                          <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-medium uppercase tracking-tighter text-slate-500">
                            {points}
                          </span>
                          <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-medium uppercase tracking-tighter text-slate-500">
                            {hours}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="flex items-center gap-2 text-lg font-bold text-slate-900">Earned Badges</h3>
                <div className="cc-card cc-card-pad-lg">
                  <div className="grid grid-cols-2 gap-6">
                    {[
                      ['eco', 'Eco Warrior', 'Environmental champion', 'emerald'],
                      ['menu_book', 'Education Ally', 'Dedicated mentor', 'blue'],
                      ['volunteer_activism', 'Community Hero', 'Local leader badge', 'primary'],
                      ['emergency', 'First Responder', 'Locked', 'slate'],
                    ].map(([icon, title, sub, color]) => (
                      <button
                        className={`flex flex-col items-center text-center transition-all hover:scale-105 ${
                          favoriteBadge === title ? 'opacity-100' : 'opacity-90'
                        }`}
                        key={title}
                        onClick={() => setFavoriteBadge(title)}
                      >
                        <div
                          className={`mb-2 flex h-16 w-16 items-center justify-center rounded-full border-2 ${
                            color === 'emerald'
                              ? 'border-primary bg-primary/10'
                              : color === 'blue'
                                ? 'border-primary-dark bg-primary/10'
                                : color === 'primary'
                                  ? 'border-primary bg-primary/10'
                                  : 'border-slate-400 bg-slate-500/10'
                          }`}
                        >
                          <span
                            className={`material-symbols-outlined text-3xl ${
                              color === 'emerald'
                                ? 'text-primary'
                                : color === 'blue'
                                  ? 'text-primary-dark'
                                  : color === 'primary'
                                    ? 'text-primary'
                                    : 'text-slate-400'
                            }`}
                          >
                            {icon}
                          </span>
                        </div>
                        <p className="text-[10px] font-bold uppercase tracking-tight text-slate-900">{title}</p>
                        <p className="mt-1 text-[9px] leading-tight text-slate-500">{sub}</p>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm text-primary">auto_graph</span>
                    <span className="text-xs font-bold uppercase text-primary">Impact Growth</span>
                  </div>
                  <div className="flex h-16 w-full items-end gap-1 px-2">
                    <div className="h-4 flex-1 rounded-t-sm bg-primary/30 transition-all hover:h-5" />
                    <div className="h-8 flex-1 rounded-t-sm bg-primary/40 transition-all hover:h-9" />
                    <div className="h-6 flex-1 rounded-t-sm bg-primary/50 transition-all hover:h-7" />
                    <div className="h-10 flex-1 rounded-t-sm bg-primary/60 transition-all hover:h-11" />
                    <div className="h-12 flex-1 rounded-t-sm bg-primary/70 transition-all hover:h-14" />
                    <div className="h-14 flex-1 rounded-t-sm bg-primary/80 transition-all hover:h-15" />
                    <div className="h-16 flex-1 rounded-t-sm bg-primary transition-all hover:h-[68px]" />
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          {activeTab === 'badges' ? (
            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <p className="mb-4 text-sm text-slate-500">
                Tap a badge to set your featured badge on profile.
              </p>
              <p className="text-sm font-semibold text-primary">Featured: {favoriteBadge}</p>
            </div>
          ) : null}

        </div>
      </div>
    </main>
  )
}

export default ProfilePage
