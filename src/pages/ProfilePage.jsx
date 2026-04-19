import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import FriendAvatar from '../components/FriendAvatar'
import ProfileCalendarMonth from '../components/ProfileCalendarMonth'
import SectionHeader from '../components/SectionHeader'
import ShareProfileModal from '../components/ShareProfileModal'
import { getCalendarEntriesForProfile, subscribeCalendarAdded } from '../utils/calendarAdded'
import { addFriend, getFriends, removeFriend, subscribeFriends } from '../utils/friends'

function ProfilePage() {
  const [activeTab, setActiveTab] = useState('activity')
  const [shareOpen, setShareOpen] = useState(false)
  const [calVersion, setCalVersion] = useState(0)
  const [friendsVersion, setFriendsVersion] = useState(0)
  const [friendName, setFriendName] = useState('')
  const [friendAddError, setFriendAddError] = useState('')

  useEffect(() => {
    return subscribeCalendarAdded(() => setCalVersion((v) => v + 1))
  }, [])

  useEffect(() => {
    return subscribeFriends(() => setFriendsVersion((v) => v + 1))
  }, [])

  const calendarEntries = useMemo(() => getCalendarEntriesForProfile(), [calVersion])
  const friends = useMemo(() => getFriends(), [friendsVersion])

  const handleAddFriendFromProfile = (e) => {
    e.preventDefault()
    const n = friendName.trim()
    if (!n) {
      setFriendAddError('')
      return
    }
    const ok = addFriend({ name: n })
    if (ok) {
      setFriendName('')
      setFriendAddError('')
    } else {
      setFriendAddError('That name is already on your list.')
    }
  }

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
          subtitle="Track your impact, calendar, and recent activity."
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

          <div className="cc-card cc-card-pad-lg">
            <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-slate-900">
              <span className="material-symbols-outlined text-primary">group</span>
              Volunteer friends
            </h3>
            <p className="text-sm text-slate-600">
              People you add appear on event pages as possible co-volunteers. Nothing is suggested automatically.
            </p>
            {friends.length > 0 ? (
              <ul className="mt-4 max-h-48 space-y-2 overflow-y-auto pr-1">
                {friends.slice(0, 5).map((f) => (
                  <li className="flex items-center gap-2" key={f.id}>
                    <FriendAvatar avatar={f.avatar} name={f.name} />
                    <p className="min-w-0 flex-1 truncate text-sm font-bold text-slate-900">{f.name}</p>
                    <button
                      className="shrink-0 rounded-lg p-1 text-slate-400 transition-colors hover:bg-slate-50 hover:text-red-600"
                      onClick={() => removeFriend(f.id)}
                      type="button"
                      aria-label={`Remove ${f.name}`}
                    >
                      <span className="material-symbols-outlined text-[18px]">person_remove</span>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-sm font-medium text-slate-500">You haven&apos;t added anyone yet.</p>
            )}
            {friends.length > 5 ? (
              <p className="mt-2 text-xs text-slate-500">Showing 5 of {friends.length}.</p>
            ) : null}
            <form className="mt-4 space-y-2" onSubmit={handleAddFriendFromProfile}>
              <label className="sr-only" htmlFor="profile-friend-name-sidebar">
                Friend name
              </label>
              <div className="flex flex-col gap-2">
                <input
                  className="h-10 min-w-0 rounded-xl border border-black/[0.08] bg-background-light px-3 text-sm text-ink outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/25"
                  id="profile-friend-name-sidebar"
                  onChange={(ev) => {
                    setFriendName(ev.target.value)
                    setFriendAddError('')
                  }}
                  placeholder="Add by name"
                  value={friendName}
                />
                <Button className="h-10 justify-center px-4 py-0 text-sm font-bold" type="submit">
                  Add
                </Button>
              </div>
              {friendAddError ? <p className="text-xs font-medium text-red-600">{friendAddError}</p> : null}
            </form>
            <Link
              className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
              to="/friends"
            >
              Manage friends
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
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
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ['Total Events', '12', '+20% this month', 'trending_up'],
              ['Hours Volunteered', '48', '+15% this month', 'trending_up'],
              ['Impact Score', '850', 'Global Top 5%', 'workspace_premium'],
              ['NGOs Supported', '4', 'Active partnerships', 'corporate_fare'],
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
                ['calendar', 'calendar_month', 'Calendar'],
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
            <div className="space-y-4">
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
                    '12 Apr, 2026',
                    'Environmental conservation project focused on urban canopy restoration.',
                    '+50 Impact Points',
                    '4 Hours',
                  ],
                  [
                    'school',
                    'bg-primary/10',
                    'text-primary',
                    'Tutored 5 students at Metro Library',
                    '8 Jul, 2026',
                    'Provided mathematics and science support for middle school students from underprivileged areas.',
                    '+80 Impact Points',
                    '3 Hours',
                  ],
                  [
                    'restaurant',
                    'bg-orange-100',
                    'text-orange-600',
                    'Meal Prep for City Shelter',
                    '22 Apr, 2026',
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
          ) : null}

          {activeTab === 'calendar' ? (
            <div className="space-y-4">
              <h3 className="flex items-center gap-2 text-lg font-bold text-slate-900">
                <span className="material-symbols-outlined text-primary">event</span>
                My calendar
              </h3>
              <p className="text-sm text-slate-600">
                Registered events appear here automatically. Days with an event are highlighted — hover a day for a
                soft focus, or tap to see details below.
              </p>
              {calendarEntries.length === 0 ? (
                <div className="cc-card cc-card-pad-lg text-center">
                  <span className="material-symbols-outlined mb-2 text-4xl text-slate-300">calendar_month</span>
                  <p className="font-medium text-slate-700">Nothing on your calendar yet</p>
                  <p className="mt-1 text-sm text-slate-500">
                    Join an event to see it here. You can also add dates from My Events or the success screen.
                  </p>
                </div>
              ) : (
                <div className="cc-card cc-card-pad-lg">
                  <ProfileCalendarMonth events={calendarEntries} />
                </div>
              )}
            </div>
          ) : null}

        </div>
      </div>
    </main>
  )
}

export default ProfilePage
