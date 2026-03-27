import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { setAuthenticated, setOnboardingComplete } from '../utils/onboarding'
function SplashPage() {
  const navigate = useNavigate()
  const [progress, setProgress] = useState(35)

  useEffect(() => {
    // Start onboarding from a clean state on app launch.
    setAuthenticated(false)
    setOnboardingComplete(false)

    const interval = setInterval(() => {
      setProgress((prev) => Math.min(prev + 3, 100))
    }, 80)

    const timeout = setTimeout(() => {
      navigate('/login', { replace: true })
    }, 2500)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [navigate])

  return (
    <main className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-background-dark text-white">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-background-dark/80 via-background-dark/70 to-background-dark" />
        <div
          className="h-full w-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCvqpPC9TevLnH9-F8KJK95h9PJVs7WeOlL1MQzkpJbyRmP_hP2drHG6cnUblEHEywJHSyqBh9TdFMRXnWiq9nscjbn0k73XLRAN15xVL7Yxk71yWLnnB1hoF-M2-73FepfXOubq2xx3Kcj53yH21WS49msbkr1hBq7y_ZFhjGkbQNZKnvX4-I3MFHX49_J2vnpz6DWwXgEI-ZJiF4shMwYPkZ7KKNpnt3-YskmEzNL-QlebRf82LC3XGOoSep6rESnZYANL-d_N0A')",
          }}
        />
      </div>

      <div className="relative z-20 flex max-w-lg flex-col items-center px-6 text-center">
        <div className="mb-8 flex items-center justify-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-primary shadow-2xl shadow-primary/20">
            <span
              className="material-symbols-outlined text-6xl text-white"
              style={{ fontVariationSettings: "'FILL' 1,'wght' 400,'GRAD' 0,'opsz' 48" }}
            >
              handshake
            </span>
          </div>
        </div>

        <h1 className="mb-3 text-5xl font-bold tracking-tight">CauseConnect</h1>
        <p className="mb-12 text-lg font-medium leading-relaxed text-white/90">
          Find verified volunteering near you.
        </p>

        <div className="w-full max-w-xs">
          <div className="mb-1 flex items-end justify-between">
            <span className="text-sm font-medium uppercase tracking-wide text-primary">
              Initializing
            </span>
            <span className="text-xs text-white/60">{progress}%</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-primary transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-2 text-xs italic text-white/50">Connecting you to your community...</p>
        </div>
      </div>

      <div className="absolute bottom-10 z-20 flex flex-col items-center gap-2">
        <span className="text-[10px] uppercase tracking-[0.2em] text-white/30">
          Verified Opportunities Only
        </span>
        <div className="flex gap-4 opacity-40">
          <span className="material-symbols-outlined text-sm">verified_user</span>
          <span className="material-symbols-outlined text-sm">group</span>
          <span className="material-symbols-outlined text-sm">location_on</span>
        </div>
      </div>
    </main>
  )
}

export default SplashPage
