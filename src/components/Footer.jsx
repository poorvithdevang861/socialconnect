import { Link, useLocation } from 'react-router-dom'
import appLogo from '../../logo.png'

function Footer() {
  const { pathname } = useLocation()
  const isNgoRoute = pathname.startsWith('/ngo/')

  return (
    <footer className="mt-12 border-t border-white/10 bg-shell py-10 text-white">
      <div className="mx-auto flex w-full max-w-[1600px] flex-col items-center justify-between gap-6 page-gutter-x md:flex-row">
        <div className="flex items-center gap-2 opacity-90">
          <img alt="CauseConnect logo" className="size-7 rounded object-contain shadow-orange-glow" src={appLogo} />
          <p className="text-left text-[12px] font-black leading-[0.9] tracking-tight text-white">
            <span className="block">CAUSE</span>
            <span className="block">CONNECT</span>
          </p>
        </div>
        {isNgoRoute ? (
          <div className="flex max-w-xl flex-wrap justify-center gap-x-6 gap-y-2 text-center text-sm font-medium text-white/70 md:gap-x-8">
            <span>Organization dashboard</span>
            <span>Volunteer registrations</span>
            <span>Partner resources</span>
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-5 text-sm font-medium text-white/70 md:gap-8">
            <Link className="transition-colors hover:text-primary" to="/about">
              About us
            </Link>
            <Link className="transition-colors hover:text-primary" to="/privacy">
              Privacy policy
            </Link>
            <Link className="transition-colors hover:text-primary" to="/ngo-partnership">
              NGO partnership
            </Link>
            <Link className="transition-colors hover:text-primary" to="/contact">
              Contact
            </Link>
          </div>
        )}
        <p className="max-w-sm text-center text-xs text-white/50 md:max-w-none md:text-left">
          {isNgoRoute
            ? '© 2026 CauseConnect for organizations. Post opportunities, track sign-ups, and grow your volunteer community.'
            : '© 2026 CauseConnect Social Impact Hub. Built with love in Ahmedabad.'}
        </p>
      </div>
    </footer>
  )
}

export default Footer
