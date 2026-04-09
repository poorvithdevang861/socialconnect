import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import GoogleGIcon from '../components/GoogleGIcon'
import { setAuthenticated, setOnboardingComplete } from '../utils/onboarding'

/** Keeps Material icons optically centered next to label text in pill buttons. */
function BtnIcon({ children, className = '' }) {
  return (
    <span
      className={`inline-flex size-[22px] shrink-0 items-center justify-center leading-none [&_.material-symbols-outlined]:!text-[20px] [&_.material-symbols-outlined]:leading-none ${className}`.trim()}
    >
      {children}
    </span>
  )
}

function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const goToOnboarding = () => {
    setAuthenticated(true)
    setOnboardingComplete(false)
    navigate('/interests', { replace: true })
  }

  const handleLogin = (event) => {
    event.preventDefault()
    goToOnboarding()
  }

  const handleGuest = () => {
    goToOnboarding()
  }

  const handleGoogle = () => {
    goToOnboarding()
  }

  const inputClass =
    'h-12 w-full rounded-2xl border border-black/[0.08] bg-background-light px-4 text-[15px] leading-snug text-ink placeholder:text-slate-400 outline-none transition-shadow focus:border-primary/40 focus:ring-2 focus:ring-primary/25'

  const socialBtnClass =
    'inline-flex min-h-[48px] w-full items-center justify-center gap-2.5 rounded-full border border-black/[0.1] bg-white px-5 text-sm font-bold tracking-[0.01em] text-slate-800 shadow-[0_4px_14px_rgba(15,15,16,0.06)] transition-all hover:bg-slate-50 active:scale-[0.98]'

  return (
    <main className="page-gutter-x mx-auto flex min-h-[100dvh] w-full max-w-[1600px] flex-col bg-background-light pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-4 md:min-h-screen md:pb-8 md:pt-4">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-[10%] -top-[10%] h-[38%] w-[45%] rounded-full bg-primary/10 blur-[100px]" />
        <div className="absolute -bottom-[10%] -right-[10%] h-[38%] w-[45%] rounded-full bg-primary/5 blur-[100px]" />
      </div>

      <div className="flex w-full flex-1 flex-col">
        <div className="premium-shell w-full flex-1 bg-white px-5 py-8 shadow-[0_10px_28px_rgba(15,15,16,0.08)] md:px-8 md:py-10 lg:px-10 lg:py-12">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
            <div className="flex flex-col gap-5 lg:pr-2">
              <div className="flex items-center gap-3">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-primary text-white shadow-orange-glow">
                  <span className="material-symbols-outlined text-[26px] leading-none text-white">
                    volunteer_activism
                  </span>
                </div>
                <span className="text-xl font-black tracking-tight text-ink">CauseConnect</span>
              </div>
              <h2 className="premium-h1 text-[clamp(1.85rem,3vw,2.75rem)]">
                Volunteer local.
                <br />
                <span className="text-primary">Impact global.</span>
              </h2>
              <p className="premium-body max-w-md text-base">
                Discover verified opportunities, join meaningful events, and grow your community
                impact with people who care.
              </p>
            </div>

            <div className="mx-auto w-full max-w-md lg:mx-0">
              <div className="mb-6 flex items-center gap-2 lg:hidden">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-white shadow-orange-glow">
                  <span className="material-symbols-outlined text-2xl leading-none text-white">
                    volunteer_activism
                  </span>
                </div>
                <span className="text-lg font-black text-ink">CauseConnect</span>
              </div>

              <div className="mb-6">
                <h1 className="premium-h1 text-ink">Welcome back</h1>
                <p className="premium-body mt-1">Log in to continue your volunteering journey.</p>
              </div>

              <div className="flex flex-col gap-3">
                <button className={socialBtnClass} onClick={handleGoogle} type="button">
                  <span className="flex size-5 shrink-0 items-center justify-center [&>svg]:block">
                    <GoogleGIcon className="h-5 w-5" />
                  </span>
                  <span className="leading-snug">Continue with Google</span>
                </button>

                <Button
                  variant="secondary"
                  className="min-h-[48px] w-full gap-2.5 px-5 font-bold"
                  onClick={handleGuest}
                  type="button"
                >
                  <BtnIcon>
                    <span className="material-symbols-outlined text-primary">travel_explore</span>
                  </BtnIcon>
                  <span className="leading-snug">Continue as guest</span>
                </Button>

                <Button
                  variant="dark"
                  className="min-h-[48px] w-full gap-2.5 px-5 font-bold"
                  onClick={() => navigate('/signup/ngo')}
                  type="button"
                >
                  <BtnIcon>
                    <span className="material-symbols-outlined text-white">corporate_fare</span>
                  </BtnIcon>
                  <span className="leading-snug">Sign up as NGO / organization</span>
                </Button>
              </div>

              <div className="relative my-7">
                <div aria-hidden="true" className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-black/[0.08]" />
                </div>
                <div className="relative flex justify-center text-xs font-semibold uppercase tracking-wider text-slate-400">
                  <span className="bg-white px-3">Or email</span>
                </div>
              </div>

              <form className="space-y-4" onSubmit={handleLogin}>
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">
                    Email
                  </label>
                  <input
                    className={inputClass}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@email.com"
                    required
                    type="email"
                    value={email}
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">
                    Password
                  </label>
                  <input
                    className={inputClass}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    type="password"
                    value={password}
                  />
                </div>
                <Button className="mt-2 min-h-[48px] w-full gap-2.5 px-5 font-bold" type="submit">
                  <span className="leading-snug">Log in</span>
                  <BtnIcon>
                    <span className="material-symbols-outlined text-white">arrow_forward</span>
                  </BtnIcon>
                </Button>
              </form>

              <div className="mt-8 text-center text-sm">
                <p className="text-slate-600">
                  New volunteer?{' '}
                  <Link className="font-bold text-primary hover:underline" to="/signup">
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default LoginPage
