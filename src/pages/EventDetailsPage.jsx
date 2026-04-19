import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import FriendsAttendingBlock from '../components/FriendsAttendingBlock'
import { GREEN_EARTH_WISHLIST } from '../utils/registrations'
import { isWishlisted, subscribeWishlist, toWishlistPayload, toggleWishlist } from '../utils/wishlist'
import { GREEN_EARTH_VENUE_QUERY, googleMapsSearchHref } from '../utils/maps'

const DETAIL_TABS = [
  { id: 'about', label: 'About' },
  { id: 'details', label: 'Details' },
  { id: 'reviews', label: 'Reviews' },
]

function EventDetailsPage() {
  const navigate = useNavigate()
  const [detailTab, setDetailTab] = useState('about')
  const [, setWishTick] = useState(0)
  useEffect(() => {
    return subscribeWishlist(() => setWishTick((t) => t + 1))
  }, [])

  const wishlisted = isWishlisted(GREEN_EARTH_WISHLIST.id)

  const handleWishlistToggle = () => {
    toggleWishlist(toWishlistPayload(GREEN_EARTH_WISHLIST))
  }

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1)
      return
    }
    navigate('/home')
  }

  return (
    <main className="mx-auto max-w-[1600px] bg-background-light pb-16">
      <div className="min-h-screen w-full premium-shell bg-white pb-[max(116px,calc(104px+env(safe-area-inset-bottom)))] md:hidden">
        <div className="relative h-[280px] w-full overflow-hidden rounded-b-[24px] bg-slate-200">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 60%), url('https://lh3.googleusercontent.com/aida-public/AB6AXuCI5L64VCMp7RFxFZXVayQCDJXVfw-tGkrBtgyqXvThtwy8mCOOQHYugNlaR5XzCH64Pou42No7Ls2sApXNTRGL3Ivq5aNRiVhkHfeAvOQsrc-bhL1zRm_LAdL7boe8m3xOSczGXhVGI86lrYoCq30f02l8OOmKIF4zXp7nqYxc6_ji0W6MN30CZgn-lwzrXYtE4P8dVpQ5P5JRGrZV4D-P6i1nC0zdfmqMv20pGNe4-ZYY3PQVIqeB0IyjpCfLOTP_Ocy8hfvRCuU')",
            }}
          />
          <div className="absolute left-4 right-4 top-[max(12px,env(safe-area-inset-top))] flex items-center justify-between">
            <button
              className="flex size-10 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-md"
              onClick={handleBack}
              type="button"
            >
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <div className="flex gap-2">
              <button
                className="flex size-10 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-md"
                type="button"
                aria-label="Share"
              >
                <span className="material-symbols-outlined text-[20px]">share</span>
              </button>
              <button
                className="flex size-10 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-md"
                type="button"
                aria-label={wishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
                onClick={handleWishlistToggle}
              >
                <span
                  className={`material-symbols-outlined text-[20px] ${wishlisted ? 'fill-1 text-amber-300' : ''}`}
                >
                  bookmark
                </span>
              </button>
            </div>
          </div>
          <div className="absolute bottom-4 left-4">
            <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
              Environment
            </span>
          </div>
          <div className="absolute bottom-4 right-4 flex items-center gap-1 rounded-full bg-primary/90 px-3 py-1 text-xs font-semibold text-white">
            <span className="material-symbols-outlined text-[14px]">verified</span>
            <span>Verified</span>
          </div>
        </div>

        <div className="px-4 pb-2 pt-5 sm:px-5 sm:pt-6">
          <p className="text-xs font-bold uppercase tracking-wider text-primary">Environment</p>
          <h1 className="mt-1 text-[22px] font-bold leading-tight text-ink">
            Green Earth Tree Plantation
          </h1>
          <p className="mt-2 text-base text-slate-600">EcoWarriors Organization</p>
          <p className="mt-1 text-sm text-slate-500">Sabarmati Riverfront Road, Ahmedabad</p>
          <div className="mt-2 flex items-center gap-1">
            <span className="material-symbols-outlined fill-1 text-lg text-amber-400">star</span>
            <span className="text-sm font-bold">4.8</span>
            <span className="text-sm text-slate-500">(120 reviews)</span>
          </div>
        </div>

        <div className="hide-scrollbar flex gap-0 border-b border-slate-200/80 px-4">
          {DETAIL_TABS.map((t) => {
            const active = detailTab === t.id
            return (
              <button
                className={`min-w-0 flex-1 border-b-2 py-3 text-center text-sm font-bold transition-colors ${
                  active ? 'border-primary text-primary' : 'border-transparent text-slate-500'
                }`}
                key={t.id}
                onClick={() => setDetailTab(t.id)}
                type="button"
              >
                {t.label}
              </button>
            )
          })}
        </div>

        <div className={`px-4 sm:px-5 ${detailTab !== 'details' ? 'hidden' : ''}`}>
          <div className="mt-4 space-y-4 rounded-2xl bg-white p-5 shadow-card ring-1 ring-black/[0.06]">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <span className="material-symbols-outlined">calendar_today</span>
              </div>
              <div>
                <p className="text-sm font-semibold">Sat, 18 Jul 2026</p>
                <p className="text-xs text-slate-500">09:00 AM – 12:00 PM</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <span className="material-symbols-outlined">schedule</span>
              </div>
              <div>
                <p className="text-sm font-semibold">3 hours</p>
                <p className="text-xs text-slate-500">Duration</p>
              </div>
            </div>
            <a
              className="-mx-1 flex items-center gap-4 rounded-xl border border-transparent px-1 py-1 transition-colors hover:border-primary/15 hover:bg-primary/[0.06]"
              href={googleMapsSearchHref(GREEN_EARTH_VENUE_QUERY)}
              rel="noopener noreferrer"
              target="_blank"
              title="Open in Google Maps"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <span className="material-symbols-outlined">location_on</span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold">Ahmedabad City Park, North Entrance</p>
                <p className="text-xs text-slate-500">Sabarmati Riverfront Road, Ahmedabad · Maps</p>
              </div>
              <span className="material-symbols-outlined shrink-0 text-lg text-primary">open_in_new</span>
            </a>
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <span className="material-symbols-outlined">group</span>
              </div>
              <div>
                <p className="text-sm font-semibold">32 volunteers going</p>
                <p className="text-xs text-slate-500">8 slots remaining</p>
              </div>
            </div>
          </div>
        </div>

        <div className={`mt-8 px-4 sm:px-5 ${detailTab !== 'details' ? 'hidden' : ''}`}>
          <h2 className="mb-3 text-lg font-semibold">Friends on your list</h2>
          <FriendsAttendingBlock
            inviteEventTitle="Green Earth Tree Plantation"
            showInviteButton
          />
        </div>

        <div className={`mt-8 px-4 sm:px-5 ${detailTab !== 'about' ? 'hidden' : ''}`}>
          <h2 className="mb-3 text-lg font-semibold">About This Event</h2>
          <p className="text-sm leading-relaxed text-slate-600">
            Join us for our biggest reforestation initiative of the year! We are aiming to plant
            over 500 indigenous tree saplings in the northern corridor of the City Park. This
            project is crucial for increasing the local canopy cover and providing habitat for
            native bird species.
          </p>
          <button className="mt-2 text-sm font-semibold text-primary" type="button">Read More</button>
        </div>

        <div className={`mt-8 ${detailTab !== 'about' ? 'hidden' : ''}`}>
          <h2 className="mb-4 px-4 text-lg font-semibold sm:px-5">Impact From Previous Events</h2>
          <div className="hide-scrollbar flex gap-3 overflow-x-auto px-4 pb-2 sm:gap-4 sm:px-5">
            <div className="w-36 flex-none rounded-2xl border border-primary/20 bg-primary/5 p-4 sm:w-40">
              <span className="material-symbols-outlined mb-2 text-primary">park</span>
              <p className="text-xl font-bold text-primary-dark">1,200+</p>
              <p className="text-xs font-medium text-primary">Trees Planted to Date</p>
            </div>
            <div className="w-36 flex-none rounded-2xl border border-primary/20 bg-primary/5 p-4 sm:w-40">
              <span className="material-symbols-outlined mb-2 text-primary">restaurant</span>
              <p className="text-xl font-bold text-primary-dark">500+</p>
              <p className="text-xs font-medium text-primary">Meals Served Together</p>
            </div>
            <div className="w-36 flex-none rounded-2xl border border-primary/20 bg-primary/5 p-4 sm:w-40">
              <span className="material-symbols-outlined mb-2 text-primary">volunteer_activism</span>
              <p className="text-xl font-bold text-primary-dark">40</p>
              <p className="text-xs font-medium text-primary">Volunteers Last Event</p>
            </div>
          </div>
        </div>

        <div className={`mt-8 px-4 pb-12 sm:px-5 ${detailTab !== 'reviews' ? 'hidden' : ''}`}>
          <h2 className="mb-4 text-lg font-semibold">Community Feedback</h2>
          <div className="space-y-6">
            <div className="flex gap-3">
              <img className="h-10 w-10 rounded-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAO648chqeyGae-2Xjqud1u8imQMe6WQtd9pQIetK85_Onu9SOHvJZbIg_G3nVB4HpquwFJrDJlBbrcffCTO0dyMHbZGHlAZGPlLD4JhKYp9oDYFzp3TLGuadYj_PaAh2q5KvshzQsThjur9obpfDvqDKgXw-eiTP15KAKhilyubNf7pLl267fBVbw_uJW5yalOyvIXQ8Svq5FNobmj_U91EB5RSFPFAmiV62LLlZf6MVqPNcPyu3Qks0IvNdE5IH1Wf-xns5zTftg" alt="Arjun Patel" />
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <h4 className="text-sm font-bold">Arjun Patel</h4>
                  <div className="flex text-yellow-500">
                    <span className="material-symbols-outlined fill-1 text-sm">star</span>
                    <span className="material-symbols-outlined fill-1 text-sm">star</span>
                    <span className="material-symbols-outlined fill-1 text-sm">star</span>
                    <span className="material-symbols-outlined fill-1 text-sm">star</span>
                    <span className="material-symbols-outlined fill-1 text-sm">star</span>
                  </div>
                </div>
                <p className="mb-1 text-xs text-slate-400">2 days ago</p>
                <p className="text-sm text-slate-600">
                  Great organization and very friendly team. Felt good to contribute!
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="fixed inset-x-0 bottom-0 z-50 px-4 pb-[max(12px,env(safe-area-inset-bottom))] pt-2 md:hidden">
          <div className="mx-auto flex max-w-lg items-center justify-between gap-3 rounded-2xl border border-black/[0.06] bg-white/95 p-4 shadow-[0_8px_32px_rgba(234,88,12,0.15)] backdrop-blur-md">
            <div>
              <p className="text-lg font-bold">3 hours</p>
              <p className="text-xs font-semibold uppercase text-slate-500">Commitment</p>
            </div>
            <Button
              className="px-6 py-3.5 sm:px-10"
              onClick={() => navigate('/event/confirm')}
            >
              Join Event
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-4 hidden premium-shell bg-white md:block">
      <section className="px-4 py-4 lg:px-5 lg:py-5">
        <div className="group relative h-[460px] w-full overflow-hidden rounded-2xl xl:h-[500px]">
          <img
            alt="Volunteers planting trees"
            className="h-full w-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA5rl4AYlwZb0sa2D0rx9umuDX0WuIOUITsB2IZSMYi5kRANvmCwEUsuavlBulk1N1h2Hdf0-UNOGzHN-yFWDlRZqJLcSdWwkY_dfF2kQ85HQEb_H5dQnlzptwcGpKbwVb03E1UttCf49B1RUyALJ6PyxGb_fax5rd6EANvUBFpwjJzYxUIgLInoWfXkkRvkESoPde8Didi7qj1PsjUyhCLNNCa5m98nSSynAOtLzkxuI8a-cNR1jZYpcIOShf4xYfHfBM0GGVjoDk"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
          <div className="absolute left-5 top-5 flex gap-2.5">
            <button
              className="flex items-center gap-2 rounded-xl bg-white/90 px-4 py-2 text-sm font-bold text-slate-900 shadow-lg backdrop-blur transition-all hover:bg-white"
              onClick={handleBack}
            >
              <span className="material-symbols-outlined text-lg">arrow_back</span>
              Back
            </button>
          </div>
          <div className="absolute right-5 top-5 flex gap-2.5">
            <button className="rounded-xl bg-white/90 p-2.5 shadow-lg backdrop-blur transition-all hover:text-primary">
              <span className="material-symbols-outlined">share</span>
            </button>
            <button
              className="rounded-xl bg-white/90 p-2.5 shadow-lg backdrop-blur transition-all hover:text-primary-dark"
              type="button"
              aria-label={wishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
              onClick={handleWishlistToggle}
            >
              <span className={`material-symbols-outlined ${wishlisted ? 'fill-1 text-primary' : ''}`}>
                bookmark
              </span>
            </button>
          </div>
          <div className="absolute bottom-6 left-6 text-white">
            <div className="mb-2 flex items-center gap-1.5">
              <span className="rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wider">
                Environmental
              </span>
              <span className="rounded-full bg-shell-soft px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">
                Outdoor
              </span>
            </div>
            <h1 className="text-[2.8rem] font-black leading-none tracking-tight xl:text-5xl">
              Green Earth Tree Plantation
            </h1>
          </div>
        </div>
      </section>

      <div className="mt-4 grid grid-cols-1 gap-6 px-4 pb-4 lg:grid-cols-[minmax(0,2.1fr)_minmax(320px,1fr)] lg:gap-5 lg:px-5 lg:pb-5 xl:grid-cols-[minmax(0,2.2fr)_minmax(340px,1fr)]">
        <div className="space-y-6">
          <div className="flex flex-wrap items-start justify-between gap-4 rounded-2xl border border-black/[0.06] bg-white p-4 md:p-5">
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
            <div className="flex items-center gap-3 rounded-2xl border border-black/[0.06] bg-white px-4 py-3 shadow-sm">
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

          <section className="rounded-2xl border border-black/[0.06] bg-white p-4 md:p-5">
            <h4 className="mb-4 text-[1.32rem] font-extrabold tracking-[-0.01em] text-slate-900">About the Event</h4>
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

          <section className="rounded-2xl border border-black/[0.06] bg-white p-4 md:p-5">
            <h4 className="mb-5 text-[1.32rem] font-extrabold tracking-[-0.01em] text-slate-900">EcoWarriors Impact</h4>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex items-center gap-6 rounded-2xl border border-primary/20 bg-primary/5 p-6">
                <div className="flex size-16 items-center justify-center rounded-xl bg-primary text-white">
                  <span className="material-symbols-outlined text-4xl">park</span>
                </div>
                <div>
                  <p className="text-3xl font-black leading-none text-slate-900">1,200+</p>
                  <p className="mt-1 text-sm font-semibold text-primary">Trees Planted to Date</p>
                </div>
              </div>
              <div className="flex items-center gap-6 rounded-2xl border border-primary/20 bg-primary/5 p-6">
                <div className="flex size-16 items-center justify-center rounded-xl bg-primary-dark text-white">
                  <span className="material-symbols-outlined text-4xl">restaurant</span>
                </div>
                <div>
                  <p className="text-3xl font-black leading-none text-slate-900">500+</p>
                  <p className="mt-1 text-sm font-semibold text-primary">Meals Served Together</p>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-black/[0.06] bg-white p-4 md:p-5">
            <div className="mb-6 flex items-center justify-between">
              <h4 className="text-[1.32rem] font-extrabold tracking-[-0.01em] text-slate-900">Community Feedback</h4>
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

        <div>
          <div className="sticky-card space-y-5">
            <div className="cc-card border-slate-100 cc-card-pad-lg shadow-xl shadow-slate-200/50">
              <div className="mb-6">
                <div className="mb-4 flex items-center justify-between">
                  <span className="animate-pulse rounded-xl bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
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
                      <p className="text-sm font-bold text-slate-900">Saturday, 18 Jul 2026</p>
                      <p className="mt-0.5 text-xs font-semibold text-slate-600">09:00 AM – 12:00 PM · 3 hrs</p>
                    </div>
                  </div>
                  <a
                    className="-mx-1 flex items-center gap-4 rounded-xl border border-transparent px-1 py-1 transition-colors hover:border-primary/15 hover:bg-primary/[0.06]"
                    href={googleMapsSearchHref(GREEN_EARTH_VENUE_QUERY)}
                    rel="noopener noreferrer"
                    target="_blank"
                    title="Open in Google Maps"
                  >
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                      <span className="material-symbols-outlined">distance</span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                        Location
                      </p>
                      <p className="text-sm font-bold text-slate-900">
                        Ahmedabad City Park, North Entrance
                      </p>
                      <p className="mt-0.5 text-xs font-semibold text-primary">Open in Maps</p>
                    </div>
                  </a>
                </div>
              </div>
              <Button
                className="mb-4 mx-auto flex w-auto min-w-[220px] justify-center px-8 py-3.5"
                onClick={() => navigate('/event/confirm')}
              >
                Join Event
              </Button>
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

            <a
              className="group cc-card block cursor-pointer overflow-hidden border-slate-100 transition-all hover:shadow-[0_12px_40px_-12px_rgba(234,88,12,0.2)] hover:ring-2 hover:ring-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              href={googleMapsSearchHref(GREEN_EARTH_VENUE_QUERY)}
              rel="noopener noreferrer"
              target="_blank"
              title="Open location in Google Maps"
            >
              <div className="flex items-center justify-between border-b border-slate-100 p-4">
                <h5 className="font-bold text-slate-900">Location Map</h5>
                <span className="material-symbols-outlined text-xl text-primary transition-transform group-hover:translate-x-0.5">
                  map
                </span>
              </div>
              <div className="relative h-48 overflow-hidden">
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
                    <div className="relative z-10 flex size-8 items-center justify-center rounded-full bg-primary text-white shadow-lg ring-4 ring-white/50 transition-transform group-hover:scale-110">
                      <span className="material-symbols-outlined text-sm">location_on</span>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-2 left-2 rounded-md bg-white/95 px-2 py-1 text-[10px] font-bold tracking-tight shadow-sm ring-1 ring-black/[0.06]">
                  Open in Maps
                </div>
              </div>
            </a>

            <div className="cc-card border-slate-100 cc-card-pad-lg">
              <h5 className="mb-4 font-bold text-slate-900">Friends on your list</h5>
              <FriendsAttendingBlock
                inviteEventTitle="Green Earth Tree Plantation"
                showInviteButton
              />
            </div>
          </div>
        </div>
      </div>

      {/* desktop/tablet uses right-side sticky join card */}
      </div>
    </main>
  )
}

export default EventDetailsPage
