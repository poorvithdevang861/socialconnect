import { useNavigate } from 'react-router-dom'

function EventDetailsPage() {
  const navigate = useNavigate()

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1)
      return
    }
    navigate('/home')
  }

  return (
    <main className="mx-auto max-w-[1440px] pb-20">
      <section className="px-6 py-6">
        <div className="group relative h-[480px] w-full overflow-hidden rounded-2xl">
          <img
            alt="Volunteers planting trees"
            className="h-full w-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA5rl4AYlwZb0sa2D0rx9umuDX0WuIOUITsB2IZSMYi5kRANvmCwEUsuavlBulk1N1h2Hdf0-UNOGzHN-yFWDlRZqJLcSdWwkY_dfF2kQ85HQEb_H5dQnlzptwcGpKbwVb03E1UttCf49B1RUyALJ6PyxGb_fax5rd6EANvUBFpwjJzYxUIgLInoWfXkkRvkESoPde8Didi7qj1PsjUyhCLNNCa5m98nSSynAOtLzkxuI8a-cNR1jZYpcIOShf4xYfHfBM0GGVjoDk"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
          <div className="absolute left-6 top-6 flex gap-3">
            <button
              className="flex items-center gap-2 rounded-xl bg-white/90 px-4 py-2 text-sm font-bold text-slate-900 shadow-lg backdrop-blur transition-all hover:bg-white"
              onClick={handleBack}
            >
              <span className="material-symbols-outlined text-lg">arrow_back</span>
              Back
            </button>
          </div>
          <div className="absolute right-6 top-6 flex gap-3">
            <button className="rounded-xl bg-white/90 p-2.5 shadow-lg backdrop-blur transition-all hover:text-primary">
              <span className="material-symbols-outlined">share</span>
            </button>
            <button className="rounded-xl bg-white/90 p-2.5 shadow-lg backdrop-blur transition-all hover:text-red-500">
              <span className="material-symbols-outlined">favorite</span>
            </button>
          </div>
          <div className="absolute bottom-8 left-8 text-white">
            <div className="mb-2 flex items-center gap-2">
              <span className="rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wider">
                Environmental
              </span>
              <span className="rounded-full bg-green-600 px-3 py-1 text-[10px] font-bold uppercase tracking-wider">
                Outdoor
              </span>
            </div>
            <h1 className="mb-2 text-5xl font-black leading-none tracking-tight">
              Green Earth Tree Plantation
            </h1>
            <div className="flex items-center gap-4 opacity-90">
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">location_on</span>
                <span className="text-sm font-medium">Ahmedabad City Park</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">calendar_today</span>
                <span className="text-sm font-medium">Sat, 24 Oct • 08:00 AM</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-4 grid grid-cols-1 gap-12 px-6 lg:grid-cols-12">
        <div className="space-y-12 lg:col-span-8">
          <div className="flex flex-wrap items-start justify-between gap-6 border-b border-slate-200 pb-8">
            <div className="flex items-center gap-4">
              <div className="flex size-14 items-center justify-center rounded-full border-2 border-primary/20 bg-primary/10">
                <span className="material-symbols-outlined text-3xl text-primary">verified_user</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-slate-900">EcoWarriors Organization</h3>
                  <span className="material-symbols-outlined text-base text-primary">verified</span>
                </div>
                <p className="text-sm text-slate-500">Organized 124 events • Verified NGO</p>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4">
              <div className="text-right">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Rating</p>
                <p className="text-xl font-black text-slate-900">
                  4.8 <span className="text-sm font-medium text-slate-400">/ 5</span>
                </p>
              </div>
              <div className="flex gap-0.5 text-primary">
                <span className="material-symbols-outlined fill-1">star</span>
                <span className="material-symbols-outlined fill-1">star</span>
                <span className="material-symbols-outlined fill-1">star</span>
                <span className="material-symbols-outlined fill-1">star</span>
                <span className="material-symbols-outlined">star_half</span>
              </div>
            </div>
          </div>

          <section>
            <h4 className="mb-4 text-xl font-bold text-slate-900">About the Event</h4>
            <p className="leading-relaxed text-slate-600">
              Join us for our biggest reforestation initiative of the year! We are aiming to plant
              over 500 indigenous tree saplings in the northern corridor of the City Park. This
              project is crucial for increasing the local canopy cover and providing habitat for
              native bird species. No prior experience is needed - our expert team will provide all
              the training and tools required.
            </p>
            <p className="mt-4 leading-relaxed text-slate-600">
              Volunteers will be split into small teams of 5, each led by a section leader. We
              provide light snacks, water, and gloves. Please wear sturdy closed-toe shoes and sun
              protection.
            </p>
            <button className="mt-4 flex items-center gap-1 text-sm font-bold text-primary hover:underline">
              Read More <span className="material-symbols-outlined text-sm">expand_more</span>
            </button>
          </section>

          <section>
            <h4 className="mb-6 text-xl font-bold text-slate-900">EcoWarriors Impact</h4>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="flex items-center gap-6 rounded-2xl border border-primary/20 bg-primary/5 p-6">
                <div className="flex size-16 items-center justify-center rounded-xl bg-primary text-white">
                  <span className="material-symbols-outlined text-4xl">park</span>
                </div>
                <div>
                  <p className="text-3xl font-black leading-none text-slate-900">1,200+</p>
                  <p className="mt-1 text-sm font-semibold text-primary">Trees Planted to Date</p>
                </div>
              </div>
              <div className="flex items-center gap-6 rounded-2xl border border-green-500/20 bg-green-500/5 p-6">
                <div className="flex size-16 items-center justify-center rounded-xl bg-green-600 text-white">
                  <span className="material-symbols-outlined text-4xl">restaurant</span>
                </div>
                <div>
                  <p className="text-3xl font-black leading-none text-slate-900">500+</p>
                  <p className="mt-1 text-sm font-semibold text-green-600">Meals Served Together</p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <div className="mb-8 flex items-center justify-between">
              <h4 className="text-xl font-bold text-slate-900">Community Feedback</h4>
              <button className="text-sm font-bold text-primary">View all 120 reviews</button>
            </div>
            <div className="space-y-8">
              <div className="flex gap-4">
                <img
                  alt="Sarah Jenkins"
                  className="size-12 shrink-0 rounded-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0kN22k0wKPFA_Ma-qltsMT0iwbjAvvqx1Z6tezXC3qxj0Dhd9CERbgzWEcdKsaaidPPE_ItH1uJ1vHibqGYiUp66Uks6GZXcdUvgkrNk2Ba7bEYTg__D4QL9R05FnA3G8gK8ruHDsy6wnad0_0aqfr832VTStxZPdDOOqz_Kajv9Fhd_fGSWCFIbBaaWypBctE9tmeL_-Ux94z4dU3hV-SBXO9xiHmjUaOpHMR9LPPNrEA5L6p8WKPBFwIwhw4BsZIthVIti-Cg4"
                />
                <div className="flex-1">
                  <div className="mb-1 flex items-center justify-between">
                    <h5 className="font-bold text-slate-900">Sarah Jenkins</h5>
                    <span className="text-xs text-slate-400">2 days ago</span>
                  </div>
                  <div className="mb-2 flex origin-left scale-75 gap-0.5 text-primary">
                    <span className="material-symbols-outlined fill-1">star</span>
                    <span className="material-symbols-outlined fill-1">star</span>
                    <span className="material-symbols-outlined fill-1">star</span>
                    <span className="material-symbols-outlined fill-1">star</span>
                    <span className="material-symbols-outlined fill-1">star</span>
                  </div>
                  <p className="text-sm leading-relaxed text-slate-600">
                    &quot;Amazing experience! This was my third event with EcoWarriors and they
                    never disappoint. Everything was so well organized and the vibe was super
                    friendly.&quot;
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <img
                  alt="Marcus Lee"
                  className="size-12 shrink-0 rounded-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTD2lnZP6cpZE48lP6rSHykdXTT4gWG8_0-OKEG3LQAjBr2g0q6Wds6PWKRp54R9HxasYakS46W-8nFH_HvscDJFUZoQ22ZxR9spKrSLDs-FeEmIss6lMRtKyzLzkaF8KxL9xVS0oZNtw-JJP5hB_5H1SYIP4Q1oXGZDS78iu_cG8vIbaGI3BWSnqQTYJ5m01GeftrBBhMF1CFZBAgKsNGKJagLaLb56mV8oVuE3sLVdq-ZZqCJW7vRzDv4a5B1cfvX8eLms6dMK4"
                />
                <div className="flex-1">
                  <div className="mb-1 flex items-center justify-between">
                    <h5 className="font-bold text-slate-900">Marcus Lee</h5>
                    <span className="text-xs text-slate-400">1 week ago</span>
                  </div>
                  <div className="mb-2 flex origin-left scale-75 gap-0.5 text-primary">
                    <span className="material-symbols-outlined fill-1">star</span>
                    <span className="material-symbols-outlined fill-1">star</span>
                    <span className="material-symbols-outlined fill-1">star</span>
                    <span className="material-symbols-outlined fill-1">star</span>
                    <span className="material-symbols-outlined">star</span>
                  </div>
                  <p className="text-sm leading-relaxed text-slate-600">
                    &quot;Great way to spend a Saturday morning. Highly recommended if you want to
                    give back to the community and meet like-minded people.&quot;
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="lg:col-span-4">
          <div className="sticky-card space-y-6">
            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-xl shadow-slate-200/50">
              <div className="mb-6">
                <div className="mb-4 flex items-center justify-between">
                  <span className="animate-pulse rounded-lg bg-red-100 px-3 py-1 text-xs font-bold text-red-600">
                    8 slots remaining
                  </span>
                  <span className="text-sm font-bold text-slate-900">Free Event</span>
                </div>
                <h4 className="mb-6 text-2xl font-black text-slate-900">Join the Event</h4>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                      <span className="material-symbols-outlined">event</span>
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                        Date &amp; Time
                      </p>
                      <p className="text-sm font-bold text-slate-900">Saturday, 24 Oct • 4 Hours</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                      <span className="material-symbols-outlined">distance</span>
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                        Location
                      </p>
                      <p className="text-sm font-bold text-slate-900">
                        Ahmedabad City Park, North Entrance
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <button
                className="mb-4 w-full rounded-xl bg-primary py-4 font-black text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary/90"
                onClick={() => navigate('/event/confirm')}
              >
                Join Event
              </button>
              <div className="text-center">
                <p className="mb-4 text-sm text-slate-500">
                  <span className="font-bold text-slate-900">32 volunteers</span> are already going
                </p>
                <div className="flex justify-center -space-x-3">
                  <img
                    className="size-10 rounded-full border-4 border-white object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1GMY-2ZMs6ZTFBuX7XzZz2g5te8ZsrJRlc25xPVCaL4tlOZAOYV-09oScq4NyKU9HUyQHy2-0QUQtB0Z2oVlpAxTP0N5BCFZDigOpK4MEaPdOVRGGp5thIHd3K1U4gJ0niKpxnl9X3IfqJXsFDDYjfs4wTQ4NBulqCg-qUvPPu-wQSa8FH30sV7NX4IQSvLlwOrhZZh7caJ4VUq8DncVBcnb25Yw3jFGJCTMyi_u525R434lnPq6NHtJSa96Fc8wYO0C0BDb5tvU"
                    alt="Volunteer 1"
                  />
                  <img
                    className="size-10 rounded-full border-4 border-white object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD3gN5pXmF_FVVH8Y6LayJLbyXO_lWv4dQBttX0RHCcqjnLLMfPGSJ4WHZWEusNNAkjYEvflpK8EEJ6flXYEdiRfKPg5gdU5Y0oX_Nzpg4fo6wlAGPuqzBvtxFFEIsV652-ptS8vCzCpu0saiD2eDNR9DNmePN3YtmIlpr_GmG69_KQ7jKLfDwkJeghe80gpi1L4lJ2i3Pu3kivEbcfYEimxZcH2vyJhc-a1CCgbnaCEqXPmoivu_1aR7HRjcEzaXvJ2jCABm2glOw"
                    alt="Volunteer 2"
                  />
                  <img
                    className="size-10 rounded-full border-4 border-white object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfz4Vr2RAcR7JwQPo78NqQdoC4T1A5O-sYJcnMor43ZpG6Ww8HIvNTHgB9IaV1h1H6eYkwpz1aDb7Rv1dztpkByR4xdr4H02JcG4aufkrrQK8MByOp7H1hqSZRbwrVm3r-gC8l1tVx_2yIMmmkKAt1P3Al8S-lISohmIXS6bRPoo37qKlsdJCPfY3SFPS5pdXKtEZ-1wcOxKjl6-YZEY3durl3YycMTNANjQw5e9qyJP6TVoNI2tHsSVTRKE1gzdseNG2AoR7NEtE"
                    alt="Volunteer 3"
                  />
                  <div className="flex size-10 items-center justify-center rounded-full border-4 border-white bg-slate-200 text-[10px] font-bold text-slate-500">
                    +29
                  </div>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white">
              <div className="flex items-center justify-between border-b border-slate-100 p-4">
                <h5 className="font-bold text-slate-900">Location Map</h5>
                <span className="material-symbols-outlined text-xl text-primary">map</span>
              </div>
              <div className="group relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-slate-200">
                  <img
                    alt="Map view"
                    className="h-full w-full object-cover grayscale opacity-60 transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBwbL_20gxFIiFJhprVlo4kPIUT2kvuljSUnBVctKrc9WjvBy1rJ-VMWPeY9mTC-fVlBi-JuQ04y7rHF5jTidy9XIbmkv6g2CHfUTOORRfyJhWP5po5YQCQO4Eo-VY4KM4eWH2Fc8eZSQ-xL_vDKf3X_f5D7faBPa2kc1m8Sn1VXCpMmu3CmMbe8rcytXsDdQUfgM5K595Gxc86gwYenh_fchPYsQmGKO4RnXX7F0paDEl8G_uOP24f7QF7fqZeNvrkXl4oU48zzY8"
                  />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <div className="absolute -inset-4 animate-ping rounded-full bg-primary/30" />
                    <div className="relative z-10 flex size-8 items-center justify-center rounded-full bg-primary text-white">
                      <span className="material-symbols-outlined text-sm">location_on</span>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-2 left-2 rounded-md bg-white/90 px-2 py-1 text-[10px] font-bold tracking-tight">
                  Open in Maps
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-white p-6">
              <h5 className="mb-4 font-bold text-slate-900">Friends Signed Up</h5>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <img
                    className="size-10 rounded-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCHmoNWSv3SxMiPF-1iz845iM7-kZ31qR_yQIOIKqcpOkJJY2ayqFsUWxIDYQeewomqxbTwH58PrR_XFInLpk9N2txHgehQT1o1IVBgBI9N5bZPphA5bO0kghgkxNMpp1Pgc74MHFIThmy9wq9nobtPcizGxyD0EnJwS8DBjxzYxehu6rSG1LG_blNrS7uxhotVE6WknCLuWd6ez_Npy9zzx84tabb3RllBKAcq31IC0Uqjh6-ro7NizU553Oeh7wTNUJZ5LkFZ3Wk"
                    alt="Alex Rivera"
                  />
                  <div>
                    <p className="text-sm font-bold text-slate-900">Alex Rivera</p>
                    <p className="text-xs text-slate-500">Signed up yesterday</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <img
                    className="size-10 rounded-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLMpF4NLMbSqzoINSJpArRQah69Mzeoj1fAECJn8dH-a-Q7jb10G2pXVlFU5t18Rq8VrqFU7f0LcRzSo1dMWuohZn0Js8xMjF5T7cpEQ3nL_b9jIBBtAKNqR9FQ06jzEOgGuFK7IBWPzrGau4R8_f9RorWBX1oyuiS5cdyr4gGQUmcVvw86BdXgDX9c5WX8m0M4DW_hWuuDAo66joBXGJ4gIZwxH-8hwaSFeRzC_HIr6ohqgYpq3I8a8U_7-ix_28YYw6KU4UtS8k"
                    alt="Maya Patel"
                  />
                  <div>
                    <p className="text-sm font-bold text-slate-900">Maya Patel</p>
                    <p className="text-xs text-slate-500">Signed up 3h ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white p-4 lg:hidden">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="mb-1 text-xs font-bold uppercase leading-none tracking-widest text-slate-400">
              Saturday, 24 Oct
            </p>
            <p className="text-sm font-black text-slate-900">Free • 8 slots left</p>
          </div>
          <button
            className="rounded-xl bg-primary px-8 py-3 text-sm font-black text-white shadow-lg shadow-primary/25"
            onClick={() => navigate('/event/confirm')}
          >
            Join Event
          </button>
        </div>
      </div>
    </main>
  )
}

export default EventDetailsPage
