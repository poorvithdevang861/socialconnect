import { Navigate, NavLink, Route, Routes, useLocation } from 'react-router-dom'
import { useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import EventDetailsPage from './pages/EventDetailsPage'
import EventsPage from './pages/EventsPage'
import HomePage from './pages/HomePage'
import ImpactPage from './pages/ImpactPage'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import WishlistPage from './pages/WishlistPage'
import FriendsPage from './pages/FriendsPage'
import NgoLoginPage from './pages/NgoLoginPage'
import NgoManageEventsPage from './pages/NgoManageEventsPage'
import NgoProfilePage from './pages/NgoProfilePage'
import RegistrationConfirmationPage from './pages/RegistrationConfirmationPage'
import RegistrationSuccessPage from './pages/RegistrationSuccessPage'
import SignupPage from './pages/SignupPage'
import OrganizationSignupPage from './pages/OrganizationSignupPage'
import PostOpportunitiesPage from './pages/PostOpportunitiesPage'
import SplashPage from './pages/SplashPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'
import NgoPartnershipPage from './pages/NgoPartnershipPage'

function App() {
  const location = useLocation()
  const [locationCity, setLocationCity] = useState('Ahmedabad')
  const showShell = ![
    '/',
    '/login',
    '/signup',
    '/signup/ngo',
    '/ngo/login',
  ].includes(location.pathname)
  const showMobileBottomNav = ['/home', '/events', '/impact', '/profile'].includes(location.pathname)
  const contentFullBleed = [
    '/',
    '/login',
    '/signup',
    '/signup/ngo',
    '/ngo/login',
  ].includes(location.pathname)
  /** Same top inset as shell routes (below navbar) — keeps splash/login/signup/onboarding aligned with Home/Events. */
  const contentTopPadMd =
    showShell ||
    ['/login', '/signup', '/signup/ngo', '/ngo/login'].includes(location.pathname)
  return (
    <div className="flex min-h-screen flex-col bg-background-light text-sm text-ink antialiased transition-colors duration-200">
      {showShell ? (
        <Navbar location={locationCity} onLocationChange={setLocationCity} />
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
          element={<HomePage location={locationCity} onLocationChange={setLocationCity} />}
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/signup/ngo" element={<OrganizationSignupPage />} />
        <Route path="/ngo/login" element={<NgoLoginPage />} />
        <Route path="/ngo/home" element={<PostOpportunitiesPage />} />
        <Route path="/ngo/post-opportunities" element={<Navigate replace to="/ngo/home" />} />
        <Route path="/ngo/manage-events" element={<NgoManageEventsPage />} />
        <Route path="/ngo/profile" element={<NgoProfilePage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/impact" element={<ImpactPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/friends" element={<FriendsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/ngo-partnership" element={<NgoPartnershipPage />} />
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
                <span className="material-symbols-outlined">home</span>
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
                <span className="text-[11px] font-semibold">My Events</span>
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
