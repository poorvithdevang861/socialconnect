import { Navigate, NavLink, Route, Routes, useLocation } from 'react-router-dom'
import { useCallback, useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import EventDetailsPage from './pages/EventDetailsPage'
import EventsPage from './pages/EventsPage'
import HomePage from './pages/HomePage'
import ImpactPage from './pages/ImpactPage'
import InterestsFiltersPage from './pages/InterestsFiltersPage'
import InterestsPage from './pages/InterestsPage'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import RegistrationConfirmationPage from './pages/RegistrationConfirmationPage'
import RegistrationSuccessPage from './pages/RegistrationSuccessPage'
import SignupPage from './pages/SignupPage'
import OrganizationSignupPage from './pages/OrganizationSignupPage'
import SplashPage from './pages/SplashPage'
import InterestsModal from './components/InterestsModal'

function App() {
  const location = useLocation()
  const [interestsOpen, setInterestsOpen] = useState(false)
  const [locationCity, setLocationCity] = useState('Ahmedabad')
  const showShell = ![
    '/',
    '/login',
    '/signup',
    '/signup/ngo',
    '/interests',
    '/interests/filters',
  ].includes(location.pathname)
  const showMobileBottomNav = ['/home', '/events', '/impact', '/profile'].includes(location.pathname)
  const contentFullBleed = ['/', '/login', '/signup', '/signup/ngo'].includes(location.pathname)
  /** Same top inset as shell routes (below navbar) — keeps splash/login/signup/onboarding aligned with Home/Events. */
  const contentTopPadMd =
    showShell ||
    ['/login', '/signup', '/signup/ngo', '/interests', '/interests/filters'].includes(location.pathname)

  const openInterests = useCallback(() => setInterestsOpen(true), [])
  const closeInterests = useCallback(() => setInterestsOpen(false), [])

  return (
    <div className="flex min-h-screen flex-col bg-background-light text-sm text-ink antialiased transition-colors duration-200">
      {showShell ? (
        <Navbar location={locationCity} onLocationChange={setLocationCity} />
      ) : null}
      {showShell ? (
        <InterestsModal key={interestsOpen ? 'open' : 'closed'} open={interestsOpen} onClose={closeInterests} />
      ) : null}
      <div
        className={`mx-auto w-full flex-1 ${contentFullBleed ? 'max-w-none px-0' : 'max-w-[1600px] page-gutter-x'} ${
          showMobileBottomNav ? 'pb-[max(76px,calc(64px+env(safe-area-inset-bottom)))] md:pb-0' : ''
        } ${contentTopPadMd ? 'md:pt-4' : ''}`}
      >
        <Routes>
        <Route path="/" element={<SplashPage />} />
        <Route
          path="/home"
          element={
            <HomePage
              location={locationCity}
              onLocationChange={setLocationCity}
              onOpenFilters={openInterests}
            />
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/signup/ngo" element={<OrganizationSignupPage />} />
        <Route path="/interests" element={<InterestsPage />} />
        <Route path="/interests/filters" element={<InterestsFiltersPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/impact" element={<ImpactPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/event" element={<EventDetailsPage />} />
        <Route path="/event/confirm" element={<RegistrationConfirmationPage />} />
        <Route path="/event/success" element={<RegistrationSuccessPage />} />
        <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </div>
      {showMobileBottomNav ? (
        <nav className="pointer-events-none fixed inset-x-0 bottom-0 z-40 px-4 pb-[max(10px,env(safe-area-inset-bottom))] pt-2 md:hidden">
          <div className="pointer-events-auto mx-auto grid h-[60px] max-w-lg grid-cols-3 items-center rounded-2xl border border-black/[0.06] bg-white/95 shadow-[0_8px_32px_rgba(234,88,12,0.12)] backdrop-blur-md">
          <NavLink
            className={({ isActive }) =>
              `relative flex flex-col items-center gap-0.5 pt-1 ${isActive ? 'text-primary' : 'text-slate-400'}`
            }
            to="/home"
          >
            {({ isActive }) => (
              <>
                {isActive ? (
                  <span className="absolute top-0 h-0.5 w-8 rounded-full bg-primary" aria-hidden />
                ) : null}
                <span className="material-symbols-outlined fill-1">home</span>
                <span className="text-[11px] font-semibold">Home</span>
              </>
            )}
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `relative flex flex-col items-center gap-0.5 pt-1 ${isActive ? 'text-primary' : 'text-slate-400'}`
            }
            to="/events"
          >
            {({ isActive }) => (
              <>
                {isActive ? (
                  <span className="absolute top-0 h-0.5 w-8 rounded-full bg-primary" aria-hidden />
                ) : null}
                <span className="material-symbols-outlined">event</span>
                <span className="text-[11px] font-semibold">Events</span>
              </>
            )}
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `relative flex flex-col items-center gap-0.5 pt-1 ${isActive ? 'text-primary' : 'text-slate-400'}`
            }
            to="/impact"
          >
            {({ isActive }) => (
              <>
                {isActive ? (
                  <span className="absolute top-0 h-0.5 w-8 rounded-full bg-primary" aria-hidden />
                ) : null}
                <span className="material-symbols-outlined">analytics</span>
                <span className="text-[11px] font-semibold">Impact</span>
              </>
            )}
          </NavLink>
          </div>
        </nav>
      ) : null}
      {showShell ? <Footer /> : null}
    </div>
  )
}

export default App
