import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

const LOCATIONS = ['Ahmedabad', 'Pune', 'Bengaluru', 'Hyderabad']

const navLinkClass = ({ isActive }) =>
  `text-sm font-semibold tracking-[0.01em] transition-colors hover:text-primary ${
    isActive ? 'text-primary' : 'text-white/80'
  }`

const barSurface =
  'border-b border-emerald-400/20 bg-[linear-gradient(180deg,rgba(52,211,153,0.11)_0%,rgba(16,185,129,0.05)_32%,transparent_58%),linear-gradient(180deg,rgba(31,29,27,0.86)_0%,rgba(26,23,21,0.9)_48%,rgba(18,16,14,0.92)_100%)] text-white shadow-[0_8px_24px_rgba(0,0,0,0.1),inset_0_1px_0_0_rgba(255,255,255,0.06)] backdrop-blur-sm backdrop-saturate-150'

function Navbar({ location = 'Ahmedabad', onLocationChange }) {
  const { pathname } = useLocation()
  const isNgoDashboard =
    pathname === '/ngo/home' || pathname === '/ngo/manage-events' || pathname === '/ngo/profile'

  const hideMobileChrome = pathname === '/home'
  const [mobileOpen, setMobileOpen] = useState(false)
  const [desktopOpen, setDesktopOpen] = useState(false)
  const mobileLocationRef = useRef(null)
  const desktopLocationRef = useRef(null)

  useEffect(() => {
    if (isNgoDashboard) return undefined
    function handlePointerDown(event) {
      const t = event.target
      const inMobile = mobileLocationRef.current?.contains(t)
      const inDesktop = desktopLocationRef.current?.contains(t)
      if (!inMobile && !inDesktop) {
        setMobileOpen(false)
        setDesktopOpen(false)
      }
    }
    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('touchstart', handlePointerDown)
    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('touchstart', handlePointerDown)
    }
  }, [isNgoDashboard])

  if (isNgoDashboard) {
    return (
      <header className={`sticky top-0 z-50 w-full ${barSurface}`}>
        <div className="mx-auto flex h-14 max-w-[1600px] items-center justify-between gap-3 px-4 xs:px-5 sm:px-6 md:px-6 lg:px-8 xl:px-10">
          <Link className="flex min-w-0 shrink items-center gap-2 sm:gap-3" to="/ngo/home">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-white shadow-orange-glow">
              <span className="material-symbols-outlined text-2xl">eco</span>
            </span>
            <span className="truncate text-[17px] font-bold tracking-tight text-white sm:text-xl">CauseConnect</span>
          </Link>
          <nav className="flex min-w-0 items-center justify-end gap-2 sm:gap-4 md:gap-6 lg:gap-8">
            <NavLink className={navLinkClass} end to="/ngo/home">
              Home
            </NavLink>
            <NavLink className={navLinkClass} to="/ngo/manage-events">
              <span className="hidden sm:inline">Manage Events</span>
              <span className="sm:hidden">Manage</span>
            </NavLink>
            <NavLink className={navLinkClass} to="/ngo/profile">
              Profile
            </NavLink>
          </nav>
        </div>
      </header>
    )
  }

  return (
    <header className={`sticky top-0 z-50 w-full ${barSurface}`}>
      <div className="mx-auto w-full max-w-[1600px] page-gutter-x py-2.5 sm:py-3 md:py-3">
        <div
          className={`grid h-14 grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-1.5 md:hidden ${hideMobileChrome ? 'hidden' : ''}`}
        >
          <div className="relative min-w-0" ref={mobileLocationRef}>
            <button
              className="inline-flex max-w-full items-center gap-1 rounded-2xl border border-white/15 bg-white/10 px-2 py-1.5 text-[11px] font-semibold text-white sm:text-xs"
              onClick={() => setMobileOpen((v) => !v)}
              type="button"
              aria-expanded={mobileOpen}
              aria-haspopup="listbox"
            >
              <span className="material-symbols-outlined text-base text-primary">location_on</span>
              <span className="max-w-[30vw] truncate sm:max-w-[34vw]">{location}</span>
              <span className="material-symbols-outlined text-base text-white/70">expand_more</span>
            </button>
            {mobileOpen ? (
              <div
                className="absolute left-0 top-[calc(100%+8px)] z-[100] w-[min(86vw,280px)] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl"
                role="listbox"
              >
                <div className="border-b border-slate-100 p-3">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Select city
                  </p>
                </div>
                <div className="p-1.5">
                  {LOCATIONS.map((city) => (
                    <button
                      className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm font-semibold transition-colors hover:bg-slate-50 ${
                        location === city ? 'text-primary' : 'text-slate-700'
                      }`}
                      key={city}
                      onClick={() => {
                        onLocationChange?.(city)
                        setMobileOpen(false)
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
          <h2 className="truncate px-1 text-center text-[17px] font-bold tracking-tight text-white sm:text-[18px]">
            CauseConnect
          </h2>
          <div className="flex justify-end">
            <Link
              className="size-8 overflow-hidden rounded-full border border-white/20 bg-slate-200 sm:size-9"
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

        <div className="relative hidden h-14 md:flex md:items-center">
          <div className="flex min-w-0 shrink-0 items-center gap-3 lg:gap-4">
            <Link className="flex min-w-0 items-center gap-2 text-primary sm:gap-3" to="/home">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-white shadow-orange-glow">
                <span className="material-symbols-outlined text-2xl">eco</span>
              </div>
              <h2 className="hidden truncate text-lg font-bold tracking-tight text-white sm:block sm:text-xl">
                CauseConnect
              </h2>
            </Link>
          </div>

          <div
            className="absolute left-1/2 top-1/2 w-[min(520px,calc(100vw-18rem))] max-w-[92vw] -translate-x-1/2 -translate-y-1/2 sm:w-[min(520px,calc(100vw-22rem))] lg:w-[min(560px,calc(100vw-28rem))]"
            ref={desktopLocationRef}
          >
            <div className="flex min-h-[44px] min-w-0 items-center overflow-hidden rounded-2xl border border-white/15 bg-white/10 shadow-card focus-within:ring-2 focus-within:ring-primary/25">
              <button
                className="inline-flex shrink-0 items-center gap-1.5 px-3 py-2 text-sm font-semibold text-white hover:bg-white/10 lg:gap-2 lg:px-4"
                onClick={() => setDesktopOpen((v) => !v)}
                type="button"
                aria-expanded={desktopOpen}
                aria-haspopup="listbox"
              >
                <span className="material-symbols-outlined text-lg text-primary">location_on</span>
                <span className="max-w-[4.5rem] truncate sm:max-w-[7rem]">{location}</span>
                <span className="material-symbols-outlined text-lg text-white/65">expand_more</span>
              </button>
              <div className="h-6 w-px shrink-0 bg-white/20" />
              <div className="flex min-w-0 flex-1 items-center gap-2 px-2 py-2 focus-within:outline-none lg:px-3">
                <span className="material-symbols-outlined shrink-0 text-lg text-white/70">search</span>
                <input
                  className="min-w-0 flex-1 border-none bg-transparent text-sm text-white placeholder:text-white/60 outline-none ring-0 focus:border-transparent focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
                  placeholder="Search events, causes..."
                  type="search"
                />
              </div>
            </div>

            {desktopOpen ? (
              <div
                className="absolute left-0 top-[calc(100%+8px)] z-[100] w-[min(100%,20rem)] overflow-hidden rounded-2xl border border-black/[0.06] bg-white shadow-xl"
                role="listbox"
              >
                <div className="border-b border-slate-100 p-4">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Select city
                  </p>
                  <p className="mt-1 text-xs text-slate-500">Used for recommendations and “Near you”.</p>
                </div>
                <div className="p-2">
                  {LOCATIONS.map((city) => (
                    <button
                      className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm font-semibold transition-colors hover:bg-slate-50 ${
                        location === city ? 'text-primary' : 'text-slate-700'
                      }`}
                      key={city}
                      onClick={() => {
                        onLocationChange?.(city)
                        setDesktopOpen(false)
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

          <nav className="ml-auto hidden shrink-0 items-center gap-5 lg:flex lg:gap-8">
            <NavLink className={navLinkClass} to="/home">
              Home
            </NavLink>
            <NavLink className={navLinkClass} to="/events">
              My Events
            </NavLink>
            <NavLink className={navLinkClass} to="/impact">
              Impact
            </NavLink>
            <NavLink className={navLinkClass} to="/profile">
              Profile
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Navbar
