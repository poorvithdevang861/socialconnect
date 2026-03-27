import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import EventDetailsPage from './pages/EventDetailsPage'
import EventsPage from './pages/EventsPage'
import HomePage from './pages/HomePage'
import InterestsFiltersPage from './pages/InterestsFiltersPage'
import InterestsPage from './pages/InterestsPage'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import RegistrationConfirmationPage from './pages/RegistrationConfirmationPage'
import RegistrationSuccessPage from './pages/RegistrationSuccessPage'
import SignupPage from './pages/SignupPage'
import SplashPage from './pages/SplashPage'

function App() {
  const location = useLocation()
  const showShell = !['/', '/login', '/signup', '/interests', '/interests/filters'].includes(
    location.pathname,
  )

  return (
    <div className="min-h-screen bg-background-light text-slate-900 transition-colors duration-200">
      {showShell ? <Navbar /> : null}
      <Routes>
        <Route path="/" element={<SplashPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/interests" element={<InterestsPage />} />
        <Route path="/interests/filters" element={<InterestsFiltersPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/event" element={<EventDetailsPage />} />
        <Route path="/event/confirm" element={<RegistrationConfirmationPage />} />
        <Route path="/event/success" element={<RegistrationSuccessPage />} />
        <Route path="*" element={<Navigate replace to="/home" />} />
      </Routes>
      {showShell ? <Footer /> : null}
    </div>
  )
}

export default App
