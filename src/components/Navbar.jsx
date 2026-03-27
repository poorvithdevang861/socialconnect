import { Link, NavLink } from 'react-router-dom'

const navLinkClass = ({ isActive }) =>
  `text-sm font-semibold transition-colors hover:text-primary ${
    isActive ? 'text-primary' : 'text-slate-600'
  }`

function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-6">
        <div className="flex items-center gap-8">
          <Link className="flex items-center gap-3 text-primary" to="/home">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-white">
              <span className="material-symbols-outlined text-2xl">eco</span>
            </div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900">SocialConnect</h2>
          </Link>
          <div className="hidden w-80 items-center gap-1 rounded-xl bg-slate-100 px-3 py-1.5 md:flex">
            <span className="material-symbols-outlined text-lg text-slate-400">search</span>
            <input
              className="w-full border-none bg-transparent text-sm placeholder:text-slate-500 focus:ring-0"
              placeholder="Search events, causes..."
              type="text"
            />
          </div>
        </div>

        <nav className="hidden items-center gap-8 lg:flex">
          <NavLink className={navLinkClass} to="/home">
            Home
          </NavLink>
          <NavLink className={navLinkClass} to="/events">
            Events
          </NavLink>
          <NavLink className={navLinkClass} to="/profile">
            Profile
          </NavLink>
        </nav>

        <div className="flex items-center gap-4">
          <button className="relative rounded-full p-2 text-slate-600 transition-colors hover:bg-slate-100">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute right-2 top-2 size-2 rounded-full bg-primary" />
          </button>
          <button className="rounded-full p-2 text-slate-600 transition-colors hover:bg-slate-100">
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
    </header>
  )
}

export default Navbar
