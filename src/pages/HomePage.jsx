import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function HomePage({ location = 'Ahmedabad', onOpenFilters }) {
  const navigate = useNavigate()
  const [activeCause, setActiveCause] = useState('All')
  const [nearYouScope, setNearYouScope] = useState('week')

  const causes = useMemo(
    () => [
      { key: 'All', label: 'All Causes', icon: 'apps', tone: 'text-slate-600' },
      { key: 'Environment', label: 'Environment', icon: 'eco', tone: 'text-green-600' },
      { key: 'Education', label: 'Education', icon: 'school', tone: 'text-blue-600' },
      { key: 'Health', label: 'Health', icon: 'volunteer_activism', tone: 'text-rose-600' },
      { key: 'Food', label: 'Food Drives', icon: 'restaurant', tone: 'text-amber-600' },
      { key: 'Community', label: 'Community Care', icon: 'diversity_3', tone: 'text-purple-600' },
    ],
    [],
  )

  const allNearYou = useMemo(
    () => [
      {
        title: 'Green Earth Tree Plantation',
        cause: 'Environment',
        desc: "Help us restore the green cover of Ahmedabad. We're planting 500 indigenous saplings this weekend.",
        date: 'July 15, 07:00 AM',
        joined: '50+ Joined',
        openings: '12 Openings',
        route: '/event',
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCdHY3U9iXi2PjUs2zf6o6CEcIdI9b9DekpZ2Jg_KmD5bjXzx8orawvH0Fj5AFhz7AWwaz7O5cai9llap37-AtCWcpGJj7fwVYxxbLWEZrq-x44_FLuBhGxIEeexa1Jd515zvePM5vY31QEEYcwMACuFJ2gHAz7WyMEUG9PzUKALQJg9z64ii_clerVdOhfNKH75XE6DlU6_BK5eIqLbEiMc17gmaRVj0yIED44M-5v7wqBNOJvmc982OJVvvca9fcEi24mTpZBVvM',
      },
      {
        title: 'Sabarmati River Cleanup',
        cause: 'Environment',
        desc: 'Join the community effort to preserve our lifeline. Cleaning tools and safety gear provided.',
        date: 'July 18, 06:30 AM',
        joined: '120+ Joined',
        openings: '24 Openings',
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCKfMCYSYKMNIiPUrKfBcM1Cc1pnOLCOzaMv5y0jN7Kx1nG7VETRpbnEHg9uC8jMZ0NneugB_Y7CAjw5Lx862R6QqOxMlKQi_NjqY-VxNk35KVHx7fkk8HW0ig7sZh6iju6NBWmyLUTR4kFLAc6pGg-5JOHLM10aUoH67Pg9gIiBVdBJkKbPKZuflWjIazykJV5CCsHukgMqh7sQNUAQJdYMv1Ibdgn-zX4WeFX_MT4dy-NKWfVrEmmW1TI_imDMDOIJUPiWOjUbXM',
      },
      {
        title: 'Weekend Tutoring for Kids',
        cause: 'Education',
        desc: 'Help students with reading and math in a 2-hour weekend session. Materials provided.',
        date: 'July 20, 10:00 AM',
        joined: '38+ Joined',
        openings: '8 Openings',
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBtVjPEQgTa5GnZj8q-80NZ3SjzxnLLVlWmdo1qjEyL1D0d4SwvhtLL77I9FnvUrRh_hmB90eT0WJ_YugBrVEFmAud6wzFUr_7bijy3PPNP9OWgpmxrbjHc5E0BFy2TUUH2AHo1KRXgW-iQZVN4W3I3dfUMW2wmP-OEU9zegVyDhKGAcnqRLdV4uZvepCKja00fmpr_zLQSRxiO-yyLIaUEbz2eNAXr6lOMXBtUSvRFcyyAz2HaSu5J2clatrZIEXT2lpuzN-4af2k',
      },
      {
        title: 'Community Kitchen Drive',
        cause: 'Food',
        desc: 'Meal prep and packaging for a local shelter kitchen. Small teams, big impact.',
        date: 'July 21, 08:30 AM',
        joined: '82+ Joined',
        openings: '18 Openings',
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCaTA_trNJ3oVwBlDd5NOyoSGD57zrqwYXcvbv4KkqP2oKAunXaR7EGT_tXXafrlEbGVYEkKFp8I-AERmRinzvja5l0KZOgbBXjTDlVYxoo-z7S7W9RsanPQ2UjYPZy1o8nHNOmX6jpHkRw_oyxgk-pwXqMlx5Ic7o9UsWpOu73f4Mbzl3F2EntNZmcBL2cuQfi4G2eET40eNHqXYX2uNRo0_ZQFFiEzlj3Hop0ku4PbwQZNX8mYaC1Kikv1mtBqGLjyZF5Sxhu6aM',
      },
    ],
    [],
  )

  const nearYou = useMemo(() => {
    const causeFiltered = activeCause === 'All' ? allNearYou : allNearYou.filter((e) => e.cause === activeCause)
    if (nearYouScope === 'week') return causeFiltered.slice(0, 3)
    if (nearYouScope === 'month') return causeFiltered
    return causeFiltered
  }, [activeCause, allNearYou, nearYouScope])

  const featuredGrid = useMemo(() => {
    const items = [
      {
        title: 'Library Reading Buddies',
        cause: 'Education',
        desc: 'Read with kids and help improve confidence in 90 minutes.',
        date: 'July 23, 05:30 PM',
        joined: '22+ Joined',
        openings: '6 Openings',
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBtVjPEQgTa5GnZj8q-80NZ3SjzxnLLVlWmdo1qjEyL1D0d4SwvhtLL77I9FnvUrRh_hmB90eT0WJ_YugBrVEFmAud6wzFUr_7bijy3PPNP9OWgpmxrbjHc5E0BFy2TUUH2AHo1KRXgW-iQZVN4W3I3dfUMW2wmP-OEU9zegVyDhKGAcnqRLdV4uZvepCKja00fmpr_zLQSRxiO-yyLIaUEbz2eNAXr6lOMXBtUSvRFcyyAz2HaSu5J2clatrZIEXT2lpuzN-4af2k',
      },
      {
        title: 'Blood Donation Camp',
        cause: 'Health',
        desc: 'Donate blood or help manage queues and donor support.',
        date: 'July 24, 09:00 AM',
        joined: '90+ Joined',
        openings: '15 Openings',
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBHFg7Lb1J2UB23UIzivsG38PCbA_c-m8AsYnHhVdYIZWBEUgF2f1-PUAqHttRpyBndUM6WegLt-VYdkLI-4hrm7wQVnvQwfOkIzNNivEPrljPFkFhBzi0IiI05YdrOD8IBx7EvE4sBCl6YMaGdtQRWeFVwNpz27x5tMwVZSQwq7Z_lzeiV2kOIIaiXILdzZmoOGGlRyLZavPc-7qCzajqGxct-FQvYIYCiOqYfvl7BPc1W4YWCqERRPGKTsCC1NLwOxfQQb0ieeak',
      },
      {
        title: 'Street Animal Care',
        cause: 'Community',
        desc: 'Help feed and check on community dogs with local NGOs.',
        date: 'July 25, 07:00 AM',
        joined: '40+ Joined',
        openings: '10 Openings',
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCKfMCYSYKMNIiPUrKfBcM1Cc1pnOLCOzaMv5y0jN7Kx1nG7VETRpbnEHg9uC8jMZ0NneugB_Y7CAjw5Lx862R6QqOxMlKQi_NjqY-VxNk35KVHx7fkk8HW0ig7sZh6iju6NBWmyLUTR4kFLAc6pGg-5JOHLM10aUoH67Pg9gIiBVdBJkKbPKZuflWjIazykJV5CCsHukgMqh7sQNUAQJdYMv1Ibdgn-zX4WeFX_MT4dy-NKWfVrEmmW1TI_imDMDOIJUPiWOjUbXM',
      },
      {
        title: 'Recycling Drop-off Drive',
        cause: 'Environment',
        desc: 'Sort and pack recyclables collected across neighborhoods.',
        date: 'July 26, 08:00 AM',
        joined: '55+ Joined',
        openings: '20 Openings',
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCdHY3U9iXi2PjUs2zf6o6CEcIdI9b9DekpZ2Jg_KmD5bjXzx8orawvH0Fj5AFhz7AWwaz7O5cai9llap37-AtCWcpGJj7fwVYxxbLWEZrq-x44_FLuBhGxIEeexa1Jd515zvePM5vY31QEEYcwMACuFJ2gHAz7WyMEUG9PzUKALQJg9z64ii_clerVdOhfNKH75XE6DlU6_BK5eIqLbEiMc17gmaRVj0yIED44M-5v7wqBNOJvmc982OJVvvca9fcEi24mTpZBVvM',
      },
      {
        title: 'Senior Companion Walk',
        cause: 'Community',
        desc: 'Join a small group to accompany seniors for an evening walk.',
        date: 'July 27, 06:00 PM',
        joined: '18+ Joined',
        openings: '5 Openings',
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA5rl4AYlwZb0sa2D0rx9umuDX0WuIOUITsB2IZSMYi5kRANvmCwEUsuavlBulk1N1h2Hdf0-UNOGzHN-yFWDlRZqJLcSdWwkY_dfF2kQ85HQEb_H5dQnlzptwcGpKbwVb03E1UttCf49B1RUyALJ6PyxGb_fax5rd6EANvUBFpwjJzYxUIgLInoWfXkkRvkESoPde8Didi7qj1PsjUyhCLNNCa5m98nSSynAOtLzkxuI8a-cNR1jZYpcIOShf4xYfHfBM0GGVjoDk',
      },
      {
        title: 'Meal Kit Packing',
        cause: 'Food',
        desc: 'Pack dry ration kits for families — quick and impactful.',
        date: 'July 28, 11:00 AM',
        joined: '70+ Joined',
        openings: '14 Openings',
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCaTA_trNJ3oVwBlDd5NOyoSGD57zrqwYXcvbv4KkqP2oKAunXaR7EGT_tXXafrlEbGVYEkKFp8I-AERmRinzvja5l0KZOgbBXjTDlVYxoo-z7S7W9RsanPQ2UjYPZy1o8nHNOmX6jpHkRw_oyxgk-pwXqMlx5Ic7o9UsWpOu73f4Mbzl3F2EntNZmcBL2cuQfi4G2eET40eNHqXYX2uNRo0_ZQFFiEzlj3Hop0ku4PbwQZNX8mYaC1Kikv1mtBqGLjyZF5Sxhu6aM',
      },
    ]

    const filtered = activeCause === 'All' ? items : items.filter((e) => e.cause === activeCause)
    return filtered
  }, [activeCause])

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 md:px-10">
        <section className="mb-10">
          <h2 className="text-3xl font-black leading-tight text-slate-900 md:text-4xl">
            Welcome back, <span className="text-primary">Arjun!</span>
          </h2>
          <p className="mt-2 text-lg text-slate-500">
            There are 12 new volunteering opportunities in {location} today.
          </p>
        </section>

        <div className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-[1fr_auto] md:items-center">
          <div className="hide-scrollbar flex gap-3 overflow-x-auto pb-2">
            {causes.map((c) => {
              const active = activeCause === c.key
              return (
                <button
                  className={`flex items-center gap-2 whitespace-nowrap rounded-xl px-5 py-2 text-sm font-bold transition-colors ${
                    active
                      ? 'bg-primary text-white'
                      : 'border border-slate-200 bg-white text-slate-700 hover:border-primary'
                  }`}
                  key={c.key}
                  onClick={() => setActiveCause(c.key)}
                  type="button"
                >
                  <span className={`material-symbols-outlined text-lg ${active ? 'text-white' : c.tone}`}>
                    {c.icon}
                  </span>
                  {c.label}
                </button>
              )
            })}
          </div>

          <div className="flex items-center justify-start gap-2 md:justify-self-end md:justify-end">
            <button
              className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-extrabold text-slate-700 shadow-sm ring-1 ring-slate-200 transition-colors hover:bg-slate-50"
              onClick={onOpenFilters}
              type="button"
            >
              <span className="material-symbols-outlined text-lg text-primary">tune</span>
              Filters
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="space-y-12 lg:col-span-8">
            <section>
              <div className="mb-6 flex items-center justify-between">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="flex items-center gap-2 text-2xl font-extrabold">
                    <span className="material-symbols-outlined text-primary">near_me</span>
                    Near You
                  </h3>
                  <div className="flex items-center gap-2 rounded-xl bg-white p-1 ring-1 ring-slate-200">
                    {[
                      ['week', 'This week'],
                      ['month', 'This month'],
                    ].map(([key, label]) => (
                      <button
                        className={`rounded-lg px-3 py-1 text-xs font-black transition-colors ${
                          nearYouScope === key ? 'bg-primary text-white' : 'text-slate-600 hover:bg-slate-50'
                        }`}
                        key={key}
                        onClick={() => setNearYouScope(key)}
                        type="button"
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline"
                  onClick={() => navigate('/events')}
                  type="button"
                >
                  View all <span className="material-symbols-outlined text-base">arrow_forward</span>
                </button>
              </div>

              <div className="hide-scrollbar -mx-2 flex gap-6 overflow-x-auto px-2 pb-4">
                {nearYou.map((item) => (
                  <div
                    className="cc-card group min-w-[320px] overflow-hidden transition-all hover:shadow-xl md:min-w-[400px]"
                    key={item.title}
                    onClick={item.route ? () => navigate(item.route) : undefined}
                    onKeyDown={
                      item.route
                        ? (event) => {
                            if (event.key === 'Enter' || event.key === ' ') {
                              event.preventDefault()
                              navigate(item.route)
                            }
                          }
                        : undefined
                    }
                    role={item.route ? 'button' : undefined}
                    tabIndex={item.route ? 0 : undefined}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        alt={item.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        src={item.img}
                      />
                      <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-lg bg-white/90 px-3 py-1 text-xs font-bold backdrop-blur">
                        <span className="h-2 w-2 rounded-full bg-green-500" /> {item.openings}
                      </div>
                      <div className="absolute bottom-4 left-4 rounded-lg bg-black/45 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-white backdrop-blur">
                        {item.cause}
                      </div>
                    </div>
                    <div className="cc-card-pad">
                      <h4 className="mb-2 text-xl font-bold leading-tight transition-colors group-hover:text-primary">
                        {item.title}
                      </h4>
                      <p className="mb-4 text-sm text-slate-500">{item.desc}</p>
                      <div className="mb-6 flex items-center gap-4 text-xs font-semibold text-slate-500">
                        <div className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-base">calendar_today</span>{' '}
                          {item.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-base">group</span>{' '}
                          {item.joined}
                        </div>
                      </div>
                      <button
                        className="w-full rounded-xl bg-primary py-3 font-bold text-white shadow-md shadow-primary/20 transition-all hover:bg-primary/90"
                        onClick={(event) => {
                          event.stopPropagation()
                          if (item.route) navigate(item.route)
                        }}
                      >
                        Join Opportunity
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="cc-card cc-card-pad-lg overflow-hidden">
              <div className="flex flex-col gap-1">
                <p className="text-xs font-black uppercase tracking-widest text-slate-400">
                  CauseConnect picks
                </p>
                <h3 className="text-2xl font-extrabold text-slate-900">Explore by cause</h3>
                <p className="mt-1 text-sm text-slate-500">
                  Jump into curated opportunities built around your interests.
                </p>
              </div>
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {[
                  { title: 'Education', sub: 'Mentor students • Weekend sessions', icon: 'school', tone: 'text-blue-600', bg: 'bg-blue-600/10' },
                  { title: 'Environment', sub: 'Plant trees • Cleanups • Recycling', icon: 'eco', tone: 'text-green-600', bg: 'bg-green-600/10' },
                  { title: 'Food Drives', sub: 'Pack meals • Distribute kits', icon: 'restaurant', tone: 'text-amber-600', bg: 'bg-amber-600/10' },
                  { title: 'Community Care', sub: 'Shelters • Elder care • NGOs', icon: 'diversity_3', tone: 'text-purple-600', bg: 'bg-purple-600/10' },
                ].map((c) => (
                  <button
                    className="cc-card-soft cc-card-pad group flex items-center gap-4 text-left transition-all hover:border-primary/30"
                    key={c.title}
                    onClick={() => setActiveCause(c.title === 'Food Drives' ? 'Food' : c.title)}
                    type="button"
                  >
                    <div className={`flex size-12 items-center justify-center rounded-xl ${c.bg} ${c.tone}`}>
                      <span className="material-symbols-outlined">{c.icon}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-extrabold text-slate-900">{c.title}</p>
                      <p className="mt-0.5 text-xs text-slate-500">{c.sub}</p>
                    </div>
                    <span className="material-symbols-outlined text-base text-slate-300 transition-colors group-hover:text-primary">
                      arrow_forward
                    </span>
                  </button>
                ))}
              </div>
            </section>

            <section>
              <div className="mb-6 flex items-center justify-between">
                <h3 className="flex items-center gap-2 text-2xl font-extrabold">
                  <span className="material-symbols-outlined text-primary">view_module</span>
                  Featured Opportunities
                </h3>
                <button
                  className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline"
                  onClick={() => navigate('/events')}
                  type="button"
                >
                  View all <span className="material-symbols-outlined text-base">arrow_forward</span>
                </button>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {featuredGrid.slice(0, 6).map((item) => (
                  <article className="cc-card overflow-hidden" key={item.title}>
                    <div className="relative h-44 overflow-hidden">
                      <img
                        alt={item.title}
                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                        src={item.img}
                      />
                      <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-lg bg-white/90 px-3 py-1 text-xs font-bold backdrop-blur">
                        <span className="h-2 w-2 rounded-full bg-green-500" /> {item.openings}
                      </div>
                      <div className="absolute bottom-4 left-4 rounded-lg bg-black/45 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-white backdrop-blur">
                        {item.cause}
                      </div>
                    </div>
                    <div className="cc-card-pad">
                      <h4 className="text-lg font-extrabold text-slate-900">{item.title}</h4>
                      <p className="mt-1 text-sm text-slate-500">{item.desc}</p>
                      <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-500">
                        <div className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-base">calendar_today</span> {item.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-base">group</span> {item.joined}
                        </div>
                      </div>
                      <button
                        className="mt-5 w-full rounded-xl bg-primary py-3 font-bold text-white shadow-md shadow-primary/20 transition-all hover:bg-primary/90"
                        onClick={() => navigate('/event')}
                        type="button"
                      >
                        Join Opportunity
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section>
              <div className="mb-6 flex items-center justify-between">
                <h3 className="flex items-center gap-2 text-2xl font-extrabold">
                  <span className="material-symbols-outlined text-primary">trending_up</span>
                  Trending This Week
                </h3>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="cc-card cc-card-pad flex gap-4 transition-colors hover:border-primary/50">
                  <img
                    alt="Education"
                    className="h-24 w-24 shrink-0 rounded-lg object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtVjPEQgTa5GnZj8q-80NZ3SjzxnLLVlWmdo1qjEyL1D0d4SwvhtLL77I9FnvUrRh_hmB90eT0WJ_YugBrVEFmAud6wzFUr_7bijy3PPNP9OWgpmxrbjHc5E0BFy2TUUH2AHo1KRXgW-iQZVN4W3I3dfUMW2wmP-OEU9zegVyDhKGAcnqRLdV4uZvepCKja00fmpr_zLQSRxiO-yyLIaUEbz2eNAXr6lOMXBtUSvRFcyyAz2HaSu5J2clatrZIEXT2lpuzN-4af2k"
                  />
                  <div className="flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-blue-500">
                        Education
                      </span>
                      <h5 className="font-bold text-slate-900">Weekend Tutoring for Kids</h5>
                      <p className="mt-1 text-xs text-slate-500">45 volunteers matched</p>
                    </div>
                    <button className="flex items-center gap-1 text-sm font-bold text-primary transition-all hover:gap-2">
                      Learn more <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </button>
                  </div>
                </div>
                <div className="cc-card cc-card-pad flex gap-4 transition-colors hover:border-primary/50">
                  <img
                    alt="Food"
                    className="h-24 w-24 shrink-0 rounded-lg object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCaTA_trNJ3oVwBlDd5NOyoSGD57zrqwYXcvbv4KkqP2oKAunXaR7EGT_tXXafrlEbGVYEkKFp8I-AERmRinzvja5l0KZOgbBXjTDlVYxoo-z7S7W9RsanPQ2UjYPZy1o8nHNOmX6jpHkRw_oyxgk-pwXqMlx5Ic7o9UsWpOu73f4Mbzl3F2EntNZmcBL2cuQfi4G2eET40eNHqXYX2uNRo0_ZQFFiEzlj3Hop0ku4PbwQZNX8mYaC1Kikv1mtBqGLjyZF5Sxhu6aM"
                  />
                  <div className="flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-red-500">
                        Social Care
                      </span>
                      <h5 className="font-bold text-slate-900">Community Kitchen Drive</h5>
                      <p className="mt-1 text-xs text-slate-500">82 volunteers matched</p>
                    </div>
                    <button className="flex items-center gap-1 text-sm font-bold text-primary transition-all hover:gap-2">
                      Learn more <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div className="space-y-8 lg:col-span-4">
            <section className="cc-card cc-card-pad-lg">
              <h3 className="mb-6 flex items-center gap-2 text-xl font-extrabold">
                <span className="material-symbols-outlined text-primary">groups</span>
                Friends Volunteering
              </h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <img
                    alt="Rahul"
                    className="h-12 w-12 shrink-0 rounded-full border-2 border-primary/20 object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBEmwbHeLtUfBQWBkjm2WsCjanWjpbuhyFGRw8z6K-FlwzXTr6ZYZOQ6jjdUetXkLi02k0DsWqW8jFQkXCJRiY6twm99t9i27SZ6fdGv3f2BpUQQzenZMaGllUwrcCpEbhrl6CV4q4btczVtoBin9TWY9r5WIfHswmKwFiGvkntBeibNeiQ7IQd91bVPPaxOUcX30gwuzRUnlO1GOx5snADkZ46T-iw8RM0a4kJ0UJIPRRElU_tfdjyXjV7Nk_pkZaCIs_WKONKaZQ"
                  />
                  <div>
                    <p className="text-sm">
                      <span className="font-bold">Rahul S.</span> and 3 others joined{' '}
                      <span className="font-bold text-primary">Beach Cleanup</span>
                    </p>
                    <p className="mt-1 text-xs text-slate-400">2 hours ago</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <img
                    alt="Siddharth"
                    className="h-12 w-12 shrink-0 rounded-full border-2 border-primary/20 object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBVE4Jxc9CcTxFekx_U9MUt8hqxxxcWdw5i_GAfLEhe_WCKha4sIqCZMKxDaXT1OEx5H1g-v_GxSpP7aO5Js0vgSDbZRsN_qy1IHJPjaQ1Et7dCdhej90xt2a4Ju8lYxvznSk2ndg5T-o_2Omtrtw9o1U_HiN8x49DyUrfG8Q8-LzCSIb1uySkQtXD1_fvUzbJc2M_TJ3CtZtdXo3zbKxG1GbTGi-e2hp6aQF54bpg3Ox3azgX_sl7Dtwn5T7u0wjSXhdMCbjt8mIc"
                  />
                  <div>
                    <p className="text-sm">
                      <span className="font-bold">Siddharth V.</span> signed up for{' '}
                      <span className="font-bold text-primary">Teach India</span>
                    </p>
                    <p className="mt-1 text-xs text-slate-400">Yesterday</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-2xl bg-gradient-to-br from-primary to-orange-600 p-6 text-white">
              <h3 className="mb-4 text-lg font-black">Your Impact</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-white/10 p-3 backdrop-blur-sm">
                  <p className="mb-1 text-xs font-bold opacity-80">Total Hours</p>
                  <p className="text-2xl font-black">24.5</p>
                </div>
                <div className="rounded-xl bg-white/10 p-3 backdrop-blur-sm">
                  <p className="mb-1 text-xs font-bold opacity-80">Events</p>
                  <p className="text-2xl font-black">08</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
  )
}

export default HomePage
