import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import SectionHeader from '../components/SectionHeader'
import { getWishlist, isWishlisted, subscribeWishlist, toWishlistPayload, toggleWishlist } from '../utils/wishlist'
import { googleMapsSearchHref } from '../utils/maps'
import homeBannerImage from '../../banner1.jpg'
import homeBannerImage2 from '../../banner2.jpg'
import appLogo from '../../logo.png'

const LOCATIONS = ['Ahmedabad', 'Pune', 'Bengaluru', 'Hyderabad']

/** Subtle black/neutral selection — quick filters & Near You scope (border only; no ring — avoids extra outline when scrolling/hovering) */
const FILTER_ACTIVE_PILL =
  'border border-neutral-800/30 bg-neutral-900/[0.07] text-neutral-900 shadow-sm'
const FILTER_INACTIVE_PILL =
  'border border-neutral-200 bg-white text-neutral-900 shadow-sm hover:border-neutral-300 hover:bg-neutral-50'
const FILTER_ACTIVE_MOBILE =
  'border border-neutral-800/40 bg-neutral-900/[0.09] text-neutral-900 shadow-md'
const FILTER_INACTIVE_MOBILE = 'border border-neutral-200/95 bg-white shadow-sm'

function parseDateBadge(dateShort) {
  const parts = String(dateShort).trim().split(/\s+/)
  if (parts.length >= 2) {
    const month = parts[0].slice(0, 3).toUpperCase()
    const day = parts[1].replace(/\D/g, '') || '—'
    return { day, month }
  }
  return { day: '—', month: '---' }
}

function EventOpportunityCard({ item, navigate, carousel }) {
  const { day, month } = parseDateBadge(item.dateShort)
  const timeRange = item.timeRange ?? '07:30 PM – 09:00 PM'
  const route = item.route ?? '/event'
  const saved = item.id ? isWishlisted(item.id) : false
  const rating = typeof item.rating === 'number' ? item.rating : 4.5
  return (
    <div
      className={`@container group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-black/[0.06] transition-all duration-300 hover:shadow-card-hover ${
        carousel
          ? 'min-w-[min(100%,320px)] w-[85vw] sm:w-[300px] md:min-w-0 md:w-full md:max-w-none'
          : 'w-full md:h-full md:min-h-[410px]'
      } md:min-w-0`}
      onClick={() => navigate(route)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          navigate(route)
        }
      }}
      role="button"
      tabIndex={0}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-primary-light md:h-48 md:aspect-auto lg:h-52">
        <img
          alt={item.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          src={item.img}
        />
        <div className="absolute right-2.5 top-2.5 z-[2] flex h-8 items-center gap-2">
          <div
            className="inline-flex h-8 min-w-0 items-center gap-0.5 rounded-lg bg-black/50 px-2 text-[11px] font-bold leading-none text-white shadow-sm backdrop-blur-[2px]"
            title={`${rating.toFixed(1)} out of 5`}
          >
            <span className="material-symbols-outlined fill-1 text-[15px] leading-none text-amber-300">
              star
            </span>
            <span className="tabular-nums leading-none">{rating.toFixed(1)}</span>
          </div>
          <Button
            variant="none"
            className={`group flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/95 p-0 shadow-md ring-1 ring-black/[0.06] transition-colors ${
              saved ? 'text-primary ring-primary/35' : 'text-slate-500 hover:text-primary'
            }`}
            aria-label={saved ? 'Remove from saved' : 'Save for later'}
            onClick={(e) => {
              e.stopPropagation()
              if (!item.id) return
              toggleWishlist(toWishlistPayload(item))
            }}
            type="button"
          >
            <span
              className={`material-symbols-outlined text-[18px] leading-none transition-colors ${saved ? 'fill-1 text-primary' : 'text-slate-500 group-hover:text-primary'}`}
            >
              favorite
            </span>
          </Button>
        </div>
        <div className="absolute left-3 top-3 flex max-w-[55%] items-center gap-1.5 rounded-lg bg-white/95 px-2.5 py-1 text-[11px] font-bold text-ink shadow-sm backdrop-blur-sm">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-success-green" /> {item.openings}
        </div>
        {item.verified ? (
          <div className="absolute left-3 top-[3.25rem] rounded-lg bg-primary px-2 py-0.5 text-[9px] font-black uppercase tracking-wide text-white shadow-md">
            Verified
          </div>
        ) : null}
        <div className="absolute bottom-3 right-3 max-w-[55%] rounded-lg bg-black/45 px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-white backdrop-blur-sm">
          {item.cause}
        </div>
      </div>

      <div className="relative flex flex-1 flex-col px-4 pb-4 pt-8 cq-tight-card md:px-5 md:pb-5 md:pt-9">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-white via-primary-light/95 to-primary/18"
        />
        <div className="absolute left-4 top-0 z-20 -translate-y-1/2 rounded-xl bg-white px-2.5 py-1.5 text-center shadow-md ring-1 ring-black/[0.08] md:left-5">
          <div className="text-xl font-black leading-none text-neutral-900 md:text-[1.35rem]">{day}</div>
          <div className="mt-0.5 text-[10px] font-bold uppercase tracking-wider text-primary-dark">{month}</div>
        </div>

        <div className="relative z-[1] flex min-h-0 flex-1 flex-col">
          <div className="min-w-0 flex-1 pr-6">
            <h4 className="cq-tight-title text-[clamp(1rem,4vw,1.15rem)] font-bold leading-snug text-neutral-900 transition-colors group-hover:text-primary md:text-[clamp(1.02rem,4.2vw,1.2rem)]">
              {item.title}
            </h4>
            <p className="mt-1 text-[13px] font-medium text-neutral-600">
              {item.cause}
              <span className="text-neutral-400"> · </span>
              {item.joined}
            </p>
            <p className="mt-1 text-xs font-semibold text-neutral-800">{timeRange}</p>
          </div>

          <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-neutral-600">{item.desc}</p>

          <Button
            variant="none"
            className="mt-4 inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary-dark py-3 text-[15px] font-bold tracking-[0.01em] text-white shadow-orange-glow transition-all hover:brightness-110 active:scale-[0.98]"
            onClick={(event) => {
              event.stopPropagation()
              navigate(route)
            }}
          >
            Join Opportunity
          </Button>
        </div>
      </div>
    </div>
  )
}

function HomePage({ location = 'Ahmedabad', onLocationChange }) {
  const navigate = useNavigate()
  const [activeCause, setActiveCause] = useState('All')
  const [nearYouScope, setNearYouScope] = useState('month')
  const locRef = useRef(null)
  const [locOpen, setLocOpen] = useState(false)
  const [featuredExpanded, setFeaturedExpanded] = useState(false)
  const [bannerIndex, setBannerIndex] = useState(0)
  const [, setWishTick] = useState(0)

  useEffect(() => {
    return subscribeWishlist(() => setWishTick((t) => t + 1))
  }, [])

  useEffect(() => {
    setFeaturedExpanded(false)
  }, [activeCause])

  useEffect(() => {
    const timer = setInterval(() => {
      setBannerIndex((i) => (i + 1) % 2)
    }, 1500)
    return () => clearInterval(timer)
  }, [])

  const hasWishlistItems = getWishlist().length > 0

  useEffect(() => {
    function handlePointerDown(event) {
      if (!locRef.current?.contains(event.target)) setLocOpen(false)
    }
    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('touchstart', handlePointerDown)
    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('touchstart', handlePointerDown)
    }
  }, [])

  const causes = useMemo(
    () => [
      { key: 'All', label: 'All Causes', icon: 'apps' },
      { key: 'Environment', label: 'Environment', icon: 'eco' },
      { key: 'Education', label: 'Education', icon: 'school' },
      { key: 'Health', label: 'Health', icon: 'volunteer_activism' },
      { key: 'Food', label: 'Food Drives', icon: 'restaurant' },
      { key: 'Community', label: 'Community Care', icon: 'diversity_3' },
    ],
    [],
  )

  const allNearYou = useMemo(
    () => [
      {
        id: 'green-earth-tree-plantation',
        title: 'Green Earth Tree Plantation',
        cause: 'Environment',
        desc: "Help us restore the green cover of Ahmedabad. We're planting 500 indigenous saplings.",
        dateShort: 'April 12',
        joined: '50+ Joined',
        openings: '12 Openings',
        verified: true,
        rating: 4.8,
        route: '/event',
        img: 'https://images.pexels.com/photos/8543578/pexels-photo-8543578.jpeg',
      },
      {
        id: 'sabarmati-river-cleanup',
        title: 'Sabarmati River Cleanup',
        cause: 'Environment',
        desc: 'Join the community effort to preserve our lifeline. Tools provided.',
        dateShort: 'July 18',
        joined: '120+ Joined',
        openings: '24 Openings',
        rating: 4.3,
        route: '/event',
        img: 'https://images.pexels.com/photos/7656743/pexels-photo-7656743.jpeg',
      },
      {
        id: 'weekend-tutoring',
        title: 'Weekend Tutoring',
        cause: 'Education',
        desc: 'Help underprivileged children with their weekend lessons.',
        dateShort: 'April 20',
        joined: '15 Joined',
        openings: '5 Openings',
        rating: 4.4,
        route: '/event',
        img: 'https://images.pexels.com/photos/6647025/pexels-photo-6647025.jpeg',
      },
      {
        id: 'animal-rescue-center',
        title: 'Animal Rescue Center',
        cause: 'Community',
        desc: "Volunteer at the city's largest rescue center. Help with feeding and care.",
        dateShort: 'July 22',
        joined: '28 Joined',
        openings: '8 Openings',
        rating: 4.6,
        route: '/event',
        img: 'https://images.pexels.com/photos/7474858/pexels-photo-7474858.jpeg',
      },
      {
        id: 'community-kitchen',
        title: 'Community Kitchen',
        cause: 'Food',
        desc: 'Help prepare and distribute meals to those in need this weekend.',
        dateShort: 'April 16',
        joined: '42 Joined',
        openings: '10 Openings',
        verified: true,
        rating: 4.8,
        route: '/event',
        img: 'https://images.pexels.com/photos/6995247/pexels-photo-6995247.jpeg',
      },
      {
        id: 'senior-home-visiting',
        title: 'Senior Home Visiting',
        cause: 'Community',
        desc: 'Spend quality time reading or talking with seniors at the local home.',
        dateShort: 'July 19',
        joined: '12 Joined',
        openings: '4 Openings',
        rating: 4.3,
        route: '/event',
        img: 'https://images.pexels.com/photos/7551686/pexels-photo-7551686.jpeg',
      },
      {
        id: 'lake-shore-cleanup',
        title: 'Lake Shore Cleanup',
        cause: 'Environment',
        desc: 'Help clear plastic waste from the Kankaria lake front area.',
        dateShort: 'April 28',
        joined: '85 Joined',
        openings: '30 Openings',
        rating: 4.5,
        route: '/event',
        img: 'https://images.pexels.com/photos/36713478/pexels-photo-36713478.jpeg',
      },
      {
        id: 'book-drive-coordination',
        title: 'Book Drive Coordination',
        cause: 'Education',
        desc: 'Organize and sort book donations for rural community libraries.',
        dateShort: 'July 27',
        joined: '19 Joined',
        openings: '15 Openings',
        rating: 4.2,
        route: '/event',
        img: 'https://images.pexels.com/photos/4836622/pexels-photo-4836622.jpeg',
      },
      {
        id: 'city-park-restoration',
        title: 'City Park Restoration',
        cause: 'Environment',
        desc: 'General maintenance and beautification of public park spaces.',
        dateShort: 'April 30',
        joined: '34 Joined',
        openings: '20 Openings',
        rating: 4.1,
        route: '/event',
        img: 'https://images.pexels.com/photos/36713455/pexels-photo-36713455.jpeg',
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
        id: 'library-reading-buddies',
        title: 'Library Reading Buddies',
        cause: 'Education',
        desc: 'Read with kids and help improve confidence in 90 minutes.',
        dateShort: 'April 23',
        joined: '22+ Joined',
        openings: '6 Openings',
        rating: 4.6,
        img: 'https://images.pexels.com/photos/6647025/pexels-photo-6647025.jpeg',
        route: '/event',
      },
      {
        id: 'blood-donation-camp',
        title: 'Blood Donation Camp',
        cause: 'Health',
        desc: 'Donate blood or help manage queues and donor support.',
        dateShort: 'July 24',
        joined: '90+ Joined',
        openings: '15 Openings',
        verified: true,
        rating: 4.9,
        img: 'https://images.pexels.com/photos/12227661/pexels-photo-12227661.jpeg',
        route: '/event',
      },
      {
        id: 'street-animal-care',
        title: 'Street Animal Care',
        cause: 'Community',
        desc: 'Help feed and check on community dogs with local NGOs.',
        dateShort: 'April 25',
        joined: '40+ Joined',
        openings: '10 Openings',
        rating: 4.5,
        img: 'https://images.pexels.com/photos/7474858/pexels-photo-7474858.jpeg',
        route: '/event',
      },
      {
        id: 'recycling-dropoff-drive',
        title: 'Recycling Drop-off Drive',
        cause: 'Environment',
        desc: 'Sort and pack recyclables collected across neighborhoods.',
        dateShort: 'July 26',
        joined: '55+ Joined',
        openings: '20 Openings',
        verified: true,
        rating: 4.7,
        img: 'https://images.pexels.com/photos/36713455/pexels-photo-36713455.jpeg',
        route: '/event',
      },
      {
        id: 'senior-companion-walk',
        title: 'Senior Companion Walk',
        cause: 'Community',
        desc: 'Join a small group to accompany seniors for an evening walk.',
        dateShort: 'April 27',
        joined: '18+ Joined',
        openings: '5 Openings',
        rating: 4.3,
        img: 'https://images.pexels.com/photos/7551686/pexels-photo-7551686.jpeg',
        route: '/event',
      },
      {
        id: 'meal-kit-packing',
        title: 'Meal Kit Packing',
        cause: 'Food',
        desc: 'Pack dry ration kits for families — quick and impactful.',
        dateShort: 'July 28',
        joined: '70+ Joined',
        openings: '14 Openings',
        rating: 4.8,
        img: 'https://images.pexels.com/photos/6995247/pexels-photo-6995247.jpeg',
        route: '/event',
      },
    ]

    const filtered = activeCause === 'All' ? items : items.filter((e) => e.cause === activeCause)
    return filtered
  }, [activeCause])

  const featuredVisible = useMemo(() => {
    if (featuredExpanded) return featuredGrid
    return featuredGrid.slice(0, 4)
  }, [featuredExpanded, featuredGrid])

  const mobileFriends = useMemo(
    () => [
      {
        title: 'Animal Shelter Help',
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCMD61qWrxeBzh7U61Bk82_Ghs0vRlnSOflvGLBtlGTo6o5ATjibiydEuAKYiin050eRWPbLueejmQXv2nTo17tRWvwLAhFD36TiL6jqAQbpW0A8_6o6erO_kdZFGzXOlGEoLCDTcZECnABfaeDcGs5E0f8yT6XqR3bMCT1QOzQaEk6Anr97NjApamsNHrBmYRlxL11pBl0gYD2-ko2zSWN0Q50YzcW6Do60jraLz9jjnhchBPndZd4nLBpw33JEPtLloqednWda8s',
        avatars: [
          'https://lh3.googleusercontent.com/aida-public/AB6AXuCo71jIgykmb3Kid1rq-u6PsRxMx0nePiAqMQnv7F7IWFXtNcIwHGiKXlZRlQtEHYsJpKNEf8fgBVPTXtIKMkkyir5BBxnntgUt29EX6K6iOLicxiEcpT6z7fIxrUABTsEomWMsTDYKVa0oYa6sG-BIM91_fSrFzOihqqg5VvdZAyMcJAnAbidF7u677qfWT2sTty342TUjvwpASIG3eJpCBHdNE7C2JkBVPbdP3kSudNxLzVg9i6nrLTNqcXcuH1Qe6XcRFuUkAwk',
          'https://lh3.googleusercontent.com/aida-public/AB6AXuA1BBtJF904-uPnZ6CS_nsHVr_4d2B1ZAQtyp1Qy2uIQaZzLTLZA1jiYJoz7VYawTS8A5DliIZ75AXBia_uvEQRtwwcj7vGIiYAiho3l_q0_Il-085IVoag4WfeI3G4D5wlHhJiGb-U1pTb8rYJ2xMiXXRBrCy3jD8x8jfs3JLx1XEAOfzP-QIzyCqH_aqeBOKYM2W0It8KjZQ0_JeBeTIigtxx0f0stcO-pFJuYbdnZlZ9-L1vj3CPYktdv-OEUmrOry8n1PwNaJU',
          'https://lh3.googleusercontent.com/aida-public/AB6AXuAGsoJ4bPrnz3KB1xsgr4tvOtBkT4MKO5gM6Y_pDVvPdXgAKqccN5uiB0jnRypZkIeYE-VT7fuWzKP8Cyr2DcoKrI9h8wa6om3fIZk8SAj5aHMHE6nKukcKX_KZcFBau47Xlp3Yvz_VZb-PMYQKyEnOB4BOmhmW2LcJM4kl4SLJ3MyIMlEpIo0149YDGTGE4vl9jMurrPFY--y9gRv8PDVkLR3rvtxxzx1SoDObBjWZYjyNGQN-5TVZg4n9BEzbhuar8pjvS3Uashk',
        ],
        more: '+4 more',
      },
      {
        title: 'Teach Kids Weekend',
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAlQ6Wer9hHblywoFP1vSixJI8iLqpWkLOkV8nP6eKc1UBKgKvENolXj_COzpTryyUYuqSxE6-kQvXdjMwCGUerzqeQpSLYhGqcEzJEwXN8Rtr4AFluEyuGmq7wKziWdqSw2fDuYNgKTXP1FJ6g6-0Psmh_40x_ScLDs_a1Q6KXzn1xdPBrd2cpZRXhorn-IgjaBIyHMAFMy9R2VxT9Bqt2lCa1LaOuuyhpnyXvJAuBbebLV4CzmWTyjLANn6lfjL4q4YrYn3NSKgE',
        avatars: [
          'https://lh3.googleusercontent.com/aida-public/AB6AXuDt8i2LhA9zg5xW1LzUjSIpzUWIS0vmPja6A8Rcai8tBsxYjDbC8LY8B0xL_mt4ORTsm620H2aNUtU8JG12zDcSvmYE03H_vJVMN4tVycKAv-NlsV49dpaKpAGCnSnqh14KKe7x0PYyWe5pA6MNXa_iFpvxfjLAZbcsmoZ2E7WY-eX7yOWgb4RKVNCbAMDKrkdPzJoOly92ZcADYjOiACtcJxNIZ4W5eE03SPbM9hiW9hBnAoldxh5E-gaqYApbI0fbHHn4Lp0mpE8',
          'https://lh3.googleusercontent.com/aida-public/AB6AXuBuVxDnfrS3n75JAn7K9Dx9Mu9yTiNS9qZUibEH84iVhA8aICoj0nBBUdeaWYAKFM6J2SQ0f79JzY1O68WG0bRAeG58dXXi8R0wXVTIJu6Wa7c2X1EchZd5ztMrTlpiqtvacyEbjC8-wCXNIj-5aP5OdlV5QxvjX6Xg8ZKZ3KuhO629mDnvEqTbVS9G-8mvfeFBVbv0vBBu8pmWU6mAk2gwzt9ZGoZii6th6JKIYgosqBMWBzwCFxBmtsYy0CSobk2-X1rNxzFWpOM',
        ],
        more: '+2 more',
      },
    ],
    [],
  )

  return (
    <main className="mx-auto w-full max-w-[1600px] premium-shell bg-background-light pb-[max(104px,calc(96px+env(safe-area-inset-bottom)))] pt-0 md:pb-4 md:pt-4">
      {/* Mobile landing: orange header + search (matches reference flow) */}
      <section className="relative md:hidden">
        <div className="rounded-b-[28px] bg-gradient-to-b from-primary to-primary-dark px-4 pb-6 pt-[max(10px,env(safe-area-inset-top))] shadow-orange-glow">
          <div className="flex items-center gap-2">
            <div className="relative min-w-0 flex-1" ref={locRef}>
              <button
                className={`flex w-full max-w-full items-center gap-1 rounded-xl border px-2 py-1.5 text-left text-white transition-colors ${
                  locOpen
                    ? 'border-white/45 bg-white/15 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]'
                    : 'border-white/28 bg-white/[0.08] hover:border-white/40 hover:bg-white/12'
                } backdrop-blur-sm`}
                onClick={() => setLocOpen((v) => !v)}
                type="button"
                aria-expanded={locOpen}
                aria-haspopup="listbox"
                aria-label={`City: ${location}. Change location`}
              >
                <span className="material-symbols-outlined shrink-0 text-[18px] text-white/95">
                  location_on
                </span>
                <span className="min-w-0 flex-1 truncate text-[12px] font-semibold leading-tight">
                  {location}
                </span>
                <span
                  className={`material-symbols-outlined shrink-0 text-[18px] text-white/85 transition-transform ${
                    locOpen ? 'rotate-180' : ''
                  }`}
                >
                  expand_more
                </span>
              </button>
              {locOpen ? (
                <div
                  className="absolute left-0 top-[calc(100%+8px)] z-[100] w-[min(calc(100vw-2rem),320px)] min-w-full overflow-hidden rounded-2xl border border-slate-200/95 bg-white shadow-[0_18px_50px_-12px_rgba(15,23,42,0.28)] ring-1 ring-slate-900/[0.06]"
                  role="listbox"
                >
                  <div className="border-b border-slate-100/90 bg-gradient-to-b from-slate-50/80 to-white p-3">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                      Select city
                    </p>
                  </div>
                  <div className="max-h-64 overflow-y-auto p-1.5">
                    {LOCATIONS.map((city) => (
                      <button
                        className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors hover:bg-primary-light/70 ${
                          location === city
                            ? 'bg-primary/[0.07] text-primary ring-1 ring-primary/15'
                            : 'text-slate-700'
                        }`}
                        key={city}
                        onClick={() => {
                          onLocationChange?.(city)
                          setLocOpen(false)
                        }}
                        type="button"
                        role="option"
                        aria-selected={location === city}
                      >
                        <span className="inline-flex items-center gap-2">
                          <span className="material-symbols-outlined text-lg text-slate-400">
                            location_city
                          </span>
                          {city}
                        </span>
                        {location === city ? (
                          <span className="material-symbols-outlined text-lg text-primary">check</span>
                        ) : null}
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
            <h1 className="shrink-0 px-0.5 text-center text-[12px] font-black leading-[0.9] tracking-[-0.02em] text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.12)] sm:text-[13px]">
              <span className="block">CAUSE</span>
              <span className="block">CONNECT</span>
            </h1>
            <div className="flex min-w-0 flex-1 justify-end gap-1.5">
              <Link
                className={`flex size-10 shrink-0 items-center justify-center rounded-xl border backdrop-blur-sm transition-colors ${
                  hasWishlistItems
                    ? 'border-primary/55 bg-primary/20 text-white hover:border-primary/70 hover:bg-primary/28'
                    : 'border-white/25 bg-white/10 text-white hover:border-white/35 hover:bg-white/16'
                }`}
                to="/wishlist"
                aria-label={hasWishlistItems ? 'Wishlist — saved items' : 'Wishlist'}
              >
                <span
                  className={`material-symbols-outlined text-[20px] ${hasWishlistItems ? 'fill-1 text-amber-200' : ''}`}
                >
                  bookmark
                </span>
              </Link>
              <Link
                className="size-10 shrink-0 overflow-hidden rounded-xl border-2 border-white/40 bg-white/20"
                to="/profile"
              >
                <img
                  alt="Arjun Patel"
                  className="h-full w-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBVVEg_AagAxDk1z2vF07nGovxZSKWhHZg8fr3J_WGiKl6DRxa3JexMSJxVe0SWkIZPsMQ3goHJnODZClQ9865riV1hYX6FSrH6GOzmilItiIMBdsqIUDxIcpUikSoGzwDza9EnP1QYk0L4qWtIue4TfMN9Bu6466a99GTFSHoxxqpRKdbNTDJ-4NOl0DVJVFdu-5VcKxCLw2gsO1vh8dHfJCu00tthveB03fTZwa8d_S9fTHfOOe3FlW2h78vzd2Lj4m0urvIfaKU"
                />
              </Link>
            </div>
          </div>
          <div className="mt-5 flex items-center gap-2 rounded-2xl bg-white px-3 py-3 shadow-lg shadow-black/10">
            <span className="material-symbols-outlined text-slate-400">search</span>
            <input
              className="min-w-0 flex-1 border-none bg-transparent text-[15px] text-ink placeholder:text-slate-400 outline-none"
              placeholder="Search causes, events..."
              type="search"
            />
          </div>
        </div>
      </section>

      <div className="relative z-0 space-y-5 px-4 pb-4 md:space-y-6 md:px-5 md:pb-5">
        <section className="pt-4 md:pt-0">
          <SectionHeader
            title={
              <>
                Welcome back, <span className="text-neutral-900">Arjun!</span>
              </>
            }
            subtitle={`There are 12 new volunteering opportunities in ${location} today.`}
            titleClassName="premium-h1 text-neutral-900"
          />
        </section>

        {/* Inspiring tagline — subtle green gradient (aligned with registration success) */}
        <section className="pt-1">
          <div className="overflow-hidden rounded-2xl border border-black/[0.08] shadow-[0_8px_24px_rgba(15,15,16,0.06)]">
            <div className="relative border-b border-black/[0.06] px-5 py-8 text-center sm:px-8 sm:py-10">
              <img
                alt="Volunteers cleaning a beach"
                className="absolute inset-0 h-full w-full object-cover opacity-80"
                src={bannerIndex === 0 ? homeBannerImage : homeBannerImage2}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-black/60" />
              <div className="relative z-[1] mx-auto mb-5 flex size-14 items-center justify-center overflow-hidden rounded-full border border-white/45 shadow-sm sm:size-16">
                <img alt="CauseConnect logo" className="h-full w-full object-cover" src={appLogo} />
              </div>
              <p className="relative z-[1] text-[11px] font-bold uppercase tracking-[0.18em] text-white/90">
                Why your time matters
              </p>
              <h2 className="relative z-[1] mt-3 text-pretty text-xl font-extrabold leading-snug tracking-tight text-white sm:text-2xl md:text-[1.65rem]">
                Every hour you give helps someone breathe easier, learn brighter, or stand a little
                taller.
              </h2>
              <p className="premium-body relative z-[1] mx-auto mt-3 max-w-lg text-white/90">
                Volunteering is not about being perfect — it is about showing up. Pick a cause that
                moves you and take the first step today.
              </p>
              
            </div>
          </div>
        </section>

        {/* Quick filters — circular cause icons (mobile-first) */}
        <section className="md:hidden">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h3 className="text-lg font-bold text-neutral-900">Quick filters</h3>
            <a
              className="inline-flex shrink-0 items-center gap-1 rounded-full border border-neutral-200 bg-white px-3 py-2 text-xs font-bold text-neutral-900 shadow-sm transition-colors hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
              href={googleMapsSearchHref(`Volunteer opportunities near ${location}`)}
              rel="noopener noreferrer"
              target="_blank"
            >
              <span className="material-symbols-outlined text-[18px]">map</span>
              Map
            </a>
          </div>
          <div className="hide-scrollbar flex gap-4 overflow-x-auto pb-2 pt-1">
            {causes.map((c) => {
              const active = activeCause === c.key
              return (
                <button
                  className="flex min-w-[72px] flex-col items-center gap-2"
                  key={c.key}
                  onClick={() => setActiveCause(c.key)}
                  type="button"
                >
                  <div
                    className={`flex size-[56px] items-center justify-center rounded-full transition-transform active:scale-95 ${
                      active ? FILTER_ACTIVE_MOBILE : FILTER_INACTIVE_MOBILE
                    }`}
                  >
                    <span
                      className={`material-symbols-outlined text-[26px] ${active ? 'text-neutral-900' : 'text-neutral-500'}`}
                    >
                      {c.icon}
                    </span>
                  </div>
                  <span className="max-w-[76px] text-center text-[10px] font-semibold leading-tight text-neutral-800">
                    {c.label}
                  </span>
                </button>
              )
            })}
          </div>
        </section>

        {/* Quick filters — tablet/desktop (View map in filter row) */}
        <div className="mb-1 hidden md:block">
          <h3 className="mb-3 text-lg font-bold text-neutral-900">Quick filters</h3>
          <div className="flex flex-wrap items-end gap-2">
            <div className="hide-scrollbar flex min-w-0 flex-1 gap-2 overflow-x-auto pb-2 sm:gap-2.5">
              {causes.map((c) => {
                const active = activeCause === c.key
                return (
                  <button
                    className={`flex shrink-0 items-center gap-2 whitespace-nowrap rounded-2xl px-4 py-2.5 text-[13px] font-bold transition-all sm:px-5 sm:text-sm ${
                      active ? FILTER_ACTIVE_PILL : FILTER_INACTIVE_PILL
                    }`}
                    key={c.key}
                    onClick={() => setActiveCause(c.key)}
                    type="button"
                  >
                    <span
                      className={`material-symbols-outlined text-lg ${active ? 'text-neutral-900' : 'text-neutral-500'}`}
                    >
                      {c.icon}
                    </span>
                    {c.label}
                  </button>
                )
              })}
            </div>
            <a
              className="mb-2 inline-flex shrink-0 items-center gap-1.5 rounded-2xl border border-neutral-200 bg-white px-4 py-2.5 text-[13px] font-bold text-neutral-900 shadow-sm transition-colors hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
              href={googleMapsSearchHref(`Volunteer opportunities near ${location}`)}
              rel="noopener noreferrer"
              target="_blank"
            >
              <span className="material-symbols-outlined text-lg">map</span>
              View map
            </a>
          </div>
        </div>

        <div className="space-y-8 md:space-y-10">
            <section>
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="flex items-center gap-2 text-2xl font-extrabold text-neutral-900">
                    <span className="material-symbols-outlined text-neutral-900">near_me</span>
                    Near You
                  </h3>
                  <div className="flex items-center gap-1 rounded-2xl border border-neutral-200 bg-neutral-50/90 p-1 shadow-inner">
                    {[
                      ['week', 'This week'],
                      ['month', 'This month'],
                    ].map(([key, label]) => (
                      <button
                        className={`rounded-xl px-3 py-1.5 text-xs font-black transition-colors ${
                          nearYouScope === key
                            ? FILTER_ACTIVE_PILL
                            : 'text-neutral-600 hover:bg-white'
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
              </div>

              <div className="hide-scrollbar flex gap-4 overflow-x-auto pb-1 md:grid md:grid-cols-2 md:items-stretch md:gap-5 md:overflow-visible lg:grid-cols-4">
                {nearYou.map((item) => (
                  <EventOpportunityCard carousel item={item} key={item.id ?? item.title} navigate={navigate} />
                ))}
              </div>
            </section>

            <section>
              <div className="mb-6 flex items-center justify-between">
                <h3 className="flex items-center gap-2 text-[22px] font-semibold text-neutral-900 md:text-2xl md:font-extrabold">
                  <span className="material-symbols-outlined text-neutral-900">trending_up</span>
                  Trending This Week
                </h3>
                <button
                  className="text-sm font-semibold text-neutral-900 underline-offset-2 hover:underline md:hidden"
                  onClick={() => navigate('/events')}
                  type="button"
                >
                  See All
                </button>
              </div>
              <div className="hide-scrollbar -mx-3 flex gap-3 overflow-x-auto px-3 pb-1 sm:-mx-4 sm:px-4 md:mx-0 md:grid md:grid-cols-2 md:items-start md:gap-4 md:overflow-visible md:px-0 lg:grid-cols-4">
                {[
                  {
                    tag: 'Education',
                    tagClass: 'text-neutral-600',
                    title: 'Weekend Tutoring for Kids',
                    meta: '45 volunteers matched',
                    img: 'https://images.pexels.com/photos/6647025/pexels-photo-6647025.jpeg',
                  },
                  {
                    tag: 'Social Care',
                    tagClass: 'text-neutral-600',
                    title: 'Community Kitchen Drive',
                    meta: '82 volunteers matched',
                    img: 'https://images.pexels.com/photos/6995247/pexels-photo-6995247.jpeg',
                  },
                  {
                    tag: 'Environment',
                    tagClass: 'text-neutral-600',
                    title: 'Urban Garden Project',
                    meta: '31 volunteers matched',
                    img: 'https://images.pexels.com/photos/36713455/pexels-photo-36713455.jpeg',
                  },
                  {
                    tag: 'Health',
                    tagClass: 'text-neutral-600',
                    title: 'Wellness & blood donation drive',
                    meta: '56 volunteers matched',
                    img: 'https://images.pexels.com/photos/12227661/pexels-photo-12227661.jpeg',
                  },
                ].map((t) => (
                  <div
                    className="min-w-[85vw] rounded-2xl border border-success-green/30 bg-gradient-to-br from-success-green/20 via-success-green/10 to-white p-3 text-ink shadow-card transition-colors hover:border-success-green/45 hover:shadow-card-hover sm:min-w-[260px] md:min-w-0 md:flex md:items-center md:gap-3"
                    key={t.title}
                  >
                    <div className="relative h-[112px] overflow-hidden rounded-xl sm:h-[108px] md:h-20 md:w-20 md:shrink-0 lg:h-[88px] lg:w-[88px]">
                      <img alt={t.title} className="h-full w-full object-cover" src={t.img} />
                      <div className="absolute left-2 top-2 flex items-center gap-0.5 rounded-md bg-white/95 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-neutral-700 shadow-sm md:hidden">
                        <span className="material-symbols-outlined text-[12px]">verified</span>
                        Verified
                      </div>
                    </div>
                    <div className="mt-2 flex min-w-0 flex-1 flex-col justify-center md:mt-0">
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800">{t.tag}</span>
                        <h5 className="line-clamp-2 text-[15px] font-bold leading-snug text-neutral-900 md:line-clamp-1">{t.title}</h5>
                        <p className="mt-0.5 text-xs text-neutral-700">{t.meta}</p>
                      </div>
                      <button className="btn-success-green mt-2 px-3 py-1.5 text-[12px] md:hidden" onClick={() => navigate('/event')} type="button">
                        View Details
                      </button>
                      <button className="mt-2 hidden items-center gap-1 text-sm font-bold text-neutral-900 transition-all hover:gap-2 hover:text-emerald-900 md:flex" onClick={() => navigate('/event')} type="button">
                        Learn more <span className="material-symbols-outlined text-sm">arrow_forward</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>


            <section>
              <div className="mb-6 flex items-center justify-between gap-3">
                <h3 className="flex min-w-0 items-center gap-2 text-2xl font-extrabold text-neutral-900">
                  <span className="material-symbols-outlined shrink-0 text-neutral-900">view_module</span>
                  Featured Opportunities
                </h3>
                {featuredGrid.length > 4 ? (
                  <button
                    className="inline-flex shrink-0 items-center gap-1 text-sm font-bold text-neutral-900 transition-colors hover:text-emerald-900 hover:underline"
                    onClick={() => setFeaturedExpanded((v) => !v)}
                    type="button"
                    aria-expanded={featuredExpanded}
                  >
                    {featuredExpanded ? (
                      <>
                        Show less
                        <span className="material-symbols-outlined text-base">expand_less</span>
                      </>
                    ) : (
                      <>
                        See all
                        <span className="material-symbols-outlined text-base">expand_more</span>
                      </>
                    )}
                  </button>
                ) : null}
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:items-stretch">
                {featuredVisible.map((item) => (
                  <EventOpportunityCard item={item} key={item.id ?? item.title} navigate={navigate} />
                ))}
              </div>
            </section>

            <section className="md:hidden">
              <div className="mb-4 px-1">
                <h3 className="text-[20px] font-semibold leading-tight text-neutral-900">Friends Are Volunteering</h3>
              </div>
              <div className="space-y-3">
                {mobileFriends.map((item) => (
                  <div className="flex items-center gap-3 rounded-2xl border border-black/[0.06] bg-white p-3 shadow-card" key={item.title}>
                    <img alt={item.title} className="size-14 rounded-lg object-cover" src={item.img} />
                    <div className="min-w-0 flex-1">
                      <h4 className="truncate text-[15px] font-semibold text-ink">{item.title}</h4>
                      <div className="mt-1 flex items-center -space-x-2">
                        {item.avatars.map((a) => (
                          <img alt="Friend avatar" className="size-6 rounded-full border-2 border-white object-cover" key={a} src={a} />
                        ))}
                        <span className="pl-3 text-[10px] text-neutral-500">{item.more}</span>
                      </div>
                    </div>
                    <button className="btn-success-green px-4 py-2 text-[12px]" type="button">
                      Join
                    </button>
                  </div>
                ))}
              </div>
            </section>

            <div className="hidden grid-cols-1 gap-8 border-t border-black/[0.06] pt-8 md:grid lg:grid-cols-2">
              <section className="flex flex-col justify-between rounded-2xl border border-black/[0.06] bg-white p-6 shadow-card">
                <div>
                  <h3 className="mb-6 flex items-center gap-2 text-xl font-extrabold text-neutral-900">
                    <span className="material-symbols-outlined text-neutral-900">groups</span>
                    Friends Volunteering
                  </h3>
                  <div className="space-y-6">
                    <div className="group flex cursor-pointer gap-4">
                      <div className="relative shrink-0">
                        <img
                          alt="Rahul"
                          className="h-12 w-12 rounded-full border-2 border-primary/20 object-cover"
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBEmwbHeLtUfBQWBkjm2WsCjanWjpbuhyFGRw8z6K-FlwzXTr6ZYZOQ6jjdUetXkLi02k0DsWqW8jFQkXCJRiY6twm99t9i27SZ6fdGv3f2BpUQQzenZMaGllUwrcCpEbhrl6CV4q4btczVtoBin9TWY9r5WIfHswmKwFiGvkntBeibNeiQ7IQd91bVPPaxOUcX30gwuzRUnlO1GOx5snADkZ46T-iw8RM0a4kJ0UJIPRRElU_tfdjyXjV7Nk_pkZaCIs_WKONKaZQ"
                        />
                        <div className="absolute -bottom-1 -right-1 rounded-full border-2 border-white bg-sage p-0.5 text-white">
                          <span className="material-symbols-outlined block text-[10px]">check</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          <span className="font-bold">Rahul S.</span> and 3 others joined{' '}
                          <span className="font-bold text-emerald-900">‘Beach Cleanup’</span>
                        </p>
                        <p className="mt-1 text-xs text-slate-400">2 hours ago</p>
                      </div>
                    </div>
                    <div className="group flex cursor-pointer gap-4">
                      <img
                        alt="Siddharth"
                        className="h-12 w-12 shrink-0 rounded-full border-2 border-primary/20 object-cover"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBVE4Jxc9CcTxFekx_U9MUt8hqxxxcWdw5i_GAfLEhe_WCKha4sIqCZMKxDaXT1OEx5H1g-v_GxSpP7aO5Js0vgSDbZRsN_qy1IHJPjaQ1Et7dCdhej90xt2a4Ju8lYxvznSk2ndg5T-o_2Omtrtw9o1U_HiN8x49DyUrfG8Q8-LzCSIb1uySkQtXD1_fvUzbJc2M_TJ3CtZtdXo3zbKxG1GbTGi-e2hp6aQF54bpg3Ox3azgX_sl7Dtwn5T7u0wjSXhdMCbjt8mIc"
                      />
                      <div>
                        <p className="text-sm font-medium">
                          <span className="font-bold">Siddharth V.</span> signed up for{' '}
                          <span className="font-bold text-emerald-900">‘Teach India’</span>
                        </p>
                        <p className="mt-1 text-xs text-slate-400">Yesterday</p>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  className="btn-success-green-outline mt-8 w-full py-2.5"
                  onClick={() => navigate('/friends')}
                  type="button"
                >
                  Find More Friends
                </button>
              </section>

              <div className="space-y-6">
                <section className="flex h-full min-h-[200px] flex-col justify-between rounded-2xl bg-gradient-to-br from-primary to-primary-dark p-6 text-white shadow-lg shadow-primary/15">
                  <div>
                    <h3 className="mb-4 text-lg font-black">Your Impact</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
                        <p className="mb-1 text-xs font-bold opacity-80">Total Hours</p>
                        <p className="text-3xl font-black">24.5</p>
                      </div>
                      <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
                        <p className="mb-1 text-xs font-bold opacity-80">Events</p>
                        <p className="text-3xl font-black">08</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 flex items-center gap-2 text-sm font-bold">
                    <span className="material-symbols-outlined text-xl">workspace_premium</span>
                    Silver Badge Contributor
                  </div>
                </section>
              </div>
            </div>

            <a
              className="group relative hidden h-64 overflow-hidden rounded-2xl border border-black/[0.08] shadow-card transition-all hover:border-neutral-400 hover:shadow-xl md:block"
              href={googleMapsSearchHref(`Volunteer opportunities near ${location}`)}
              rel="noopener noreferrer"
              target="_blank"
              title={`Open Google Maps — volunteer opportunities near ${location}`}
            >
              <img
                alt={`Map preview for ${location}`}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTqDwUcp4OqgD4aH0qE4HDW1O1KRAvlnXYNcRUbZC9YfH7KIgOpM6oAbkiybYjevAm3RSBG4GKdsrWSA-ephRfLklrg1OmkI0D1DMur8Z6XryR69XXSh6KmnpTZfEIgAEiUJuRtEiYE5xJ9T16apC-EnU_ckhliD09GWQJpzeOIuZ-0iHrj6xXmhbatC--wJomC-9sqaY4NIHezNt1dAqRZvnRI17tz_Vtpfn4YN20zDL78txxjRSWLFhYTET1mBzDYAWcZrlZ04c"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-black/20" />
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between rounded-xl bg-white/95 p-3.5 shadow-2xl backdrop-blur ring-1 ring-black/[0.04] transition-transform group-hover:scale-[1.02] md:left-auto md:right-6 md:w-[min(100%,17rem)]">
                <span className="text-sm font-bold text-neutral-900">Explore via Map</span>
                <span className="material-symbols-outlined shrink-0 text-neutral-900 transition-transform group-hover:translate-x-0.5 group-hover:text-emerald-900">
                  map
                </span>
              </div>
            </a>
        </div>
      </div>
    </main>
  )
}

export default HomePage
