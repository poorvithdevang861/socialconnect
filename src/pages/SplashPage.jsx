import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { setAuthenticated, setOnboardingComplete } from '../utils/onboarding'
import appLogo from '../../logo.png'
import splashImage from '../../splash.jpg'

function SplashPage() {
  const navigate = useNavigate()
  const [progress, setProgress] = useState(35)

  useEffect(() => {
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
    <main className="relative flex min-h-[100dvh] w-full flex-col overflow-hidden bg-background-dark text-white md:min-h-screen">
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-background-dark/68 via-background-dark/52 to-background-dark/72" />
        <div
          className="h-full w-full bg-cover bg-center bg-no-repeat opacity-85"
          style={{
            backgroundImage: `url(${splashImage})`,
          }}
        />
      </div>

      <div className="relative z-20 flex w-full flex-1 flex-col items-stretch justify-between px-5 pb-[max(2rem,env(safe-area-inset-bottom))] pt-[max(1.5rem,env(safe-area-inset-top))] sm:px-8 md:items-center md:justify-center md:px-10 md:pt-[max(2.5rem,env(safe-area-inset-top))]">
        <div className="flex w-full flex-1 flex-col items-center justify-center text-center md:max-w-xl md:flex-none">
          <div className="mb-8 flex w-full items-center justify-center md:mb-10">
            <img
              alt="CauseConnect logo"
              className="h-24 w-24 rounded-[1.35rem] object-contain shadow-orange-glow sm:h-28 sm:w-28"
              src={appLogo}
            />
          </div>

          <h1 className="premium-h1 mb-3 w-full !text-white md:text-[clamp(2rem,5vw,2.75rem)]">
            CauseConnect
          </h1>
          <p className="mx-auto mb-10 max-w-md text-base leading-relaxed text-white/90 md:mb-12">
            Find verified volunteering near you.
          </p>

          <div className="w-full max-w-none sm:max-w-md md:mx-auto">
            <div className="mb-1 flex items-end justify-between px-0.5">
              <span className="text-xs font-bold uppercase tracking-wider text-primary sm:text-sm">
                Initializing
              </span>
              <span className="text-xs tabular-nums text-white/60">{progress}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-primary shadow-orange-glow transition-all duration-200"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="mt-3 text-xs text-white/50">Connecting you to your community…</p>
          </div>
        </div>

        <div className="mt-8 flex w-full flex-col items-center gap-2 pb-2 md:mt-10 md:max-w-xl">
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/35">
            Verified opportunities only
          </span>
          <div className="flex gap-5 opacity-50">
            <span className="material-symbols-outlined text-base">verified_user</span>
            <span className="material-symbols-outlined text-base">group</span>
            <span className="material-symbols-outlined text-base">location_on</span>
          </div>
        </div>
      </div>
    </main>
  )
}

export default SplashPage
