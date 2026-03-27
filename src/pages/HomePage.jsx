import { useNavigate } from 'react-router-dom'

function HomePage() {
  const navigate = useNavigate()
  return (
    <main className="mx-auto max-w-7xl px-4 py-8 md:px-10">
        <section className="mb-10">
          <h2 className="text-3xl font-black leading-tight text-slate-900 md:text-4xl">
            Welcome back, <span className="text-primary">Arjun!</span>
          </h2>
          <p className="mt-2 text-lg text-slate-500">
            There are 12 new volunteering opportunities in Ahmedabad today.
          </p>
        </section>

        <div className="hide-scrollbar mb-10 flex gap-3 overflow-x-auto pb-2">
          <button className="whitespace-nowrap rounded-xl bg-primary px-5 py-2 text-sm font-bold text-white">
            All Causes
          </button>
          <button className="flex items-center gap-2 whitespace-nowrap rounded-xl border border-slate-200 bg-white px-5 py-2 text-sm font-medium transition-colors hover:border-primary">
            <span className="material-symbols-outlined text-lg text-green-500">eco</span> Environment
          </button>
          <button className="flex items-center gap-2 whitespace-nowrap rounded-xl border border-slate-200 bg-white px-5 py-2 text-sm font-medium transition-colors hover:border-primary">
            <span className="material-symbols-outlined text-lg text-blue-500">school</span> Education
          </button>
          <button className="flex items-center gap-2 whitespace-nowrap rounded-xl border border-slate-200 bg-white px-5 py-2 text-sm font-medium transition-colors hover:border-primary">
            <span className="material-symbols-outlined text-lg text-red-500">volunteer_activism</span>{' '}
            Health
          </button>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="space-y-12 lg:col-span-8">
            <section>
              <div className="mb-6 flex items-center justify-between">
                <h3 className="flex items-center gap-2 text-2xl font-extrabold">
                  <span className="material-symbols-outlined text-primary">near_me</span>
                  Near You
                </h3>
                <a className="text-sm font-bold text-primary hover:underline" href="#">
                  View map
                </a>
              </div>

              <div className="hide-scrollbar -mx-2 flex gap-6 overflow-x-auto px-2 pb-4">
                {[
                  {
                    title: 'Green Earth Tree Plantation',
                    desc: "Help us restore the green cover of Ahmedabad. We're planting 500 indigenous saplings this weekend.",
                    date: 'July 15, 07:00 AM',
                    joined: '50+ Joined',
                    openings: '12 Openings',
                    route: '/event',
                    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCdHY3U9iXi2PjUs2zf6o6CEcIdI9b9DekpZ2Jg_KmD5bjXzx8orawvH0Fj5AFhz7AWwaz7O5cai9llap37-AtCWcpGJj7fwVYxxbLWEZrq-x44_FLuBhGxIEeexa1Jd515zvePM5vY31QEEYcwMACuFJ2gHAz7WyMEUG9PzUKALQJg9z64ii_clerVdOhfNKH75XE6DlU6_BK5eIqLbEiMc17gmaRVj0yIED44M-5v7wqBNOJvmc982OJVvvca9fcEi24mTpZBVvM',
                  },
                  {
                    title: 'Sabarmati River Cleanup',
                    desc: 'Join the community effort to preserve our lifeline. Cleaning tools and safety gear provided.',
                    date: 'July 18, 06:30 AM',
                    joined: '120+ Joined',
                    openings: '24 Openings',
                    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCKfMCYSYKMNIiPUrKfBcM1Cc1pnOLCOzaMv5y0jN7Kx1nG7VETRpbnEHg9uC8jMZ0NneugB_Y7CAjw5Lx862R6QqOxMlKQi_NjqY-VxNk35KVHx7fkk8HW0ig7sZh6iju6NBWmyLUTR4kFLAc6pGg-5JOHLM10aUoH67Pg9gIiBVdBJkKbPKZuflWjIazykJV5CCsHukgMqh7sQNUAQJdYMv1Ibdgn-zX4WeFX_MT4dy-NKWfVrEmmW1TI_imDMDOIJUPiWOjUbXM',
                  },
                ].map((item) => (
                  <div
                    className="group min-w-[320px] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-xl md:min-w-[400px]"
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
                    </div>
                    <div className="p-5">
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

            <section>
              <div className="mb-6 flex items-center justify-between">
                <h3 className="flex items-center gap-2 text-2xl font-extrabold">
                  <span className="material-symbols-outlined text-primary">trending_up</span>
                  Trending This Week
                </h3>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="flex gap-4 rounded-xl border border-slate-200 bg-white p-4 transition-colors hover:border-primary/50">
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
                <div className="flex gap-4 rounded-xl border border-slate-200 bg-white p-4 transition-colors hover:border-primary/50">
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
            <section className="rounded-2xl border border-slate-200 bg-white p-6">
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
