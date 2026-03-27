import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
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
import SplashPage from './pages/SplashPage'
import InterestsModal from './components/InterestsModal'

function App() {
  const location = useLocation()
  const [interestsOpen, setInterestsOpen] = useState(false)
  const [locationCity, setLocationCity] = useState('Ahmedabad')
  const showShell = !['/', '/login', '/signup', '/interests', '/interests/filters'].includes(
    location.pathname,
  )

  const openInterests = useCallback(() => setInterestsOpen(true), [])
  const closeInterests = useCallback(() => setInterestsOpen(false), [])

  return (
    <div className="flex min-h-screen flex-col bg-background-light text-sm text-slate-900 transition-colors duration-200">
      {showShell ? (
        <Navbar location={locationCity} onLocationChange={setLocationCity} />
      ) : null}
      {showShell ? <InterestsModal open={interestsOpen} onClose={closeInterests} /> : null}
      <div className="flex-1">
        <Routes>
        <Route path="/" element={<SplashPage />} />
        <Route path="/home" element={<HomePage location={locationCity} onOpenFilters={openInterests} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
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
      {showShell ? <Footer /> : null}
    </div>
  )
}

export default App
