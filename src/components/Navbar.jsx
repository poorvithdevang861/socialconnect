import { useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const LOCATIONS = ['Ahmedabad', 'Pune', 'Bengaluru', 'Hyderabad']

const navLinkClass = ({ isActive }) =>
  `text-sm font-semibold transition-colors hover:text-primary ${
    isActive ? 'text-primary' : 'text-slate-600'
  }`

function Navbar({ location = 'Ahmedabad', onLocationChange }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [desktopOpen, setDesktopOpen] = useState(false)
  const mobileLocationRef = useRef(null)
  const desktopLocationRef = useRef(null)

  useEffect(() => {
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
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-10">
        <div className="grid h-14 grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-1.5 md:hidden">
          <div className="relative min-w-0" ref={mobileLocationRef}>
            <button
              className="inline-flex max-w-full items-center gap-1 rounded-xl border border-slate-200 bg-white px-2 py-1.5 text-[11px] font-semibold text-slate-800 sm:text-xs"
              onClick={() => setMobileOpen((v) => !v)}
              type="button"
              aria-expanded={mobileOpen}
              aria-haspopup="listbox"
            >
              <span className="material-symbols-outlined text-base text-primary">location_on</span>
              <span className="max-w-[30vw] truncate sm:max-w-[34vw]">{location}</span>
              <span className="material-symbols-outlined text-base text-slate-400">expand_more</span>
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
          <h2 className="truncate px-1 text-center text-[17px] font-semibold tracking-tight text-slate-900 sm:text-[18px]">
            CauseConnect
          </h2>
          <div className="flex justify-end">
            <Link
              className="size-8 overflow-hidden rounded-full border border-slate-200 bg-slate-200 sm:size-9"
              to="/profile"
            >
              <img
                alt="User Profile"
                className="h-full w-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDYqJkp3U0Jx0VmBKCdbduBooOcYDvcTkeRIDcrhnAFX8fFe-SkcEqvcbx7-M9QYJ4_wWoZ4q0BQ44HMrYqm0VZi2rRp4C-AnH0dc8dysW1Ilcf97kT7An4Xwip65cOZhypRBXY7-38GkUrCS_4VAr9cHidaRkuQmge2q0yQ3ESyKCilvCLE_zvFJ-9ILwuTN3oAQmF_h23lfFMB8XWfZKZ67ZfmsGi9stdLOrGrCEYYbcYABUqH5aKWJ84DFS_WtXk-zFWbb1_mPE"
              />
            </Link>
          </div>
        </div>

        <div className="hidden h-16 items-center justify-between gap-4 md:flex lg:gap-6">
          <div className="flex min-w-0 items-center gap-5 lg:gap-8">
            <Link className="flex min-w-0 shrink-0 items-center gap-2 text-primary sm:gap-3" to="/home">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-white">
                <span className="material-symbols-outlined text-2xl">eco</span>
              </div>
              <h2 className="truncate text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
                CauseConnect
              </h2>
            </Link>

            <div className="relative w-[clamp(300px,36vw,520px)] shrink-0" ref={desktopLocationRef}>
              <div className="flex min-h-[42px] min-w-0 items-center overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm focus-within:outline-none focus-within:ring-0">
                <button
                  className="inline-flex shrink-0 items-center gap-1.5 px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50 lg:gap-2 lg:px-4"
                  onClick={() => setDesktopOpen((v) => !v)}
                  type="button"
                  aria-expanded={desktopOpen}
                  aria-haspopup="listbox"
                >
                  <span className="material-symbols-outlined text-lg text-primary">location_on</span>
                  <span className="max-w-[5.5rem] truncate sm:max-w-[7rem]">{location}</span>
                  <span className="material-symbols-outlined text-lg text-slate-400">expand_more</span>
                </button>
                <div className="h-6 w-px shrink-0 bg-slate-200" />
                <div className="flex min-w-0 flex-1 items-center gap-2 px-2 py-2 focus-within:outline-none lg:px-3">
                  <span className="material-symbols-outlined shrink-0 text-lg text-slate-400">search</span>
                  <input
                    className="min-w-0 flex-1 border-none bg-transparent text-sm placeholder:text-slate-500 outline-none ring-0 focus:border-transparent focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
                    placeholder="Search events, causes..."
                    type="search"
                  />
                </div>
              </div>

              {desktopOpen ? (
                <div
                  className="absolute left-0 top-[calc(100%+8px)] z-[100] w-[min(100%,20rem)] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl"
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
          </div>

          <nav className="hidden shrink-0 items-center gap-6 lg:flex lg:gap-8">
          <NavLink className={navLinkClass} to="/home">
            Home
          </NavLink>
          <NavLink className={navLinkClass} to="/events">
            Events
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
