import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const navLinkClass = ({ isActive }) =>
  `text-sm font-semibold transition-colors hover:text-primary ${
    isActive ? 'text-primary' : 'text-slate-600'
  }`

function Navbar({ location = 'Ahmedabad', onLocationChange }) {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-10">
        <div className="flex items-center gap-8">
          <Link className="flex items-center gap-3 text-primary" to="/home">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-white">
              <span className="material-symbols-outlined text-2xl">eco</span>
            </div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900">CauseConnect</h2>
          </Link>
          <div className="relative hidden items-center overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm md:flex">
            <button
              className="group inline-flex items-center gap-2 px-4 py-2 font-semibold text-slate-800 hover:bg-slate-50"
              onClick={() => setOpen((v) => !v)}
              onMouseEnter={() => setOpen(true)}
              onMouseLeave={() => setOpen(false)}
              type="button"
            >
              <span className="material-symbols-outlined text-lg text-primary">location_on</span>
              <span className="max-w-[150px] truncate">{location}</span>
              <span className="material-symbols-outlined text-lg text-slate-400">expand_more</span>
            </button>
            <div className="h-6 w-px bg-slate-200" />
            <div className="flex w-[380px] items-center gap-2 px-3 py-2">
              <span className="material-symbols-outlined text-lg text-slate-400">search</span>
              <input
                className="w-full border-none bg-transparent text-sm placeholder:text-slate-500 focus:ring-0"
                placeholder="Search events, causes..."
                type="text"
              />
            </div>

            {open ? (
              <div
                className="absolute left-0 top-[calc(100%+10px)] z-50 w-[360px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl"
                onMouseEnter={() => setOpen(true)}
                onMouseLeave={() => setOpen(false)}
                role="dialog"
              >
                <div className="border-b border-slate-100 p-4">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Select location
                  </p>
                  <p className="mt-1 text-xs text-slate-500">Used for recommendations and “Near you”.</p>
                </div>
                <div className="p-2">
                  {['Ahmedabad', 'Gandhinagar', 'Surat', 'Vadodara', 'Use my location'].map((city) => (
                    <button
                      className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm font-semibold transition-colors hover:bg-slate-50 ${
                        location === city ? 'text-primary' : 'text-slate-700'
                      }`}
                      key={city}
                      onClick={() => {
                        onLocationChange?.(city)
                        setOpen(false)
                      }}
                      type="button"
                    >
                      <span className="inline-flex items-center gap-2">
                        <span className="material-symbols-outlined text-lg text-slate-400">
                          {city === 'Use my location' ? 'my_location' : 'location_city'}
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

        <nav className="hidden items-center gap-8 lg:flex">
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

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-4 lg:hidden">
          <button
            className="relative rounded-full p-2 text-slate-600 transition-colors hover:bg-slate-100"
            type="button"
          >
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute right-2 top-2 size-2 rounded-full bg-primary" />
          </button>
          <button
            className="rounded-full p-2 text-slate-600 transition-colors hover:bg-slate-100"
            type="button"
          >
            <span className="material-symbols-outlined">chat_bubble</span>
          </button>
          <Link
            className="size-9 overflow-hidden rounded-full border border-slate-200 bg-slate-200"
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
      </div>
    </header>
  )
}

export default Navbar
