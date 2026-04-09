import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import GoogleGIcon from '../components/GoogleGIcon'
import { setAuthenticated, setOnboardingComplete } from '../utils/onboarding'

function SignupPage() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const goToOnboarding = () => {
    setAuthenticated(true)
    setOnboardingComplete(false)
    navigate('/interests', { replace: true })
  }

  const handleSignup = (event) => {
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
    'h-12 w-full rounded-2xl border border-black/[0.08] bg-background-light px-4 text-[15px] leading-tight text-ink placeholder:text-slate-400 outline-none transition-shadow focus:border-primary/40 focus:ring-2 focus:ring-primary/25'

  return (
    <main className="page-gutter-x mx-auto flex min-h-[100dvh] w-full max-w-[1600px] flex-col premium-shell bg-background-light py-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] md:min-h-screen md:py-6 md:pb-6">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-[10%] -top-[10%] h-[38%] w-[45%] rounded-full bg-primary/12 blur-[100px]" />
        <div className="absolute -bottom-[10%] -right-[10%] h-[38%] w-[45%] rounded-full bg-primary/6 blur-[100px]" />
      </div>

      <div className="grid flex-1 grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
        <div className="hidden flex-col gap-5 lg:flex lg:pr-8">
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-2xl bg-primary text-white shadow-orange-glow">
              <span className="material-symbols-outlined text-[26px]">volunteer_activism</span>
            </div>
            <span className="text-xl font-black tracking-tight text-ink">CauseConnect</span>
          </div>
          <h2 className="premium-h1 text-[clamp(1.85rem,3vw,2.75rem)]">
            Start small.
            <br />
            <span className="text-primary">Serve big.</span>
          </h2>
          <p className="premium-body max-w-md text-base">
            Join a trusted volunteering network, find causes near you, and contribute to community
            impact from day one.
          </p>
        </div>

        <div className="mx-auto flex w-full max-w-md flex-col justify-center">
          <div className="cc-card cc-card-pad-lg shadow-[0_10px_28px_rgba(15,15,16,0.08)]">
            <div className="mb-6 flex items-center gap-2 lg:hidden">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-white shadow-orange-glow">
                <span className="material-symbols-outlined text-2xl">volunteer_activism</span>
              </div>
              <span className="text-lg font-black text-ink">CauseConnect</span>
            </div>

            <div className="mb-6">
              <h1 className="premium-h1 text-ink">Create an account</h1>
              <p className="premium-body mt-1">Start your volunteering journey today.</p>
            </div>

            <div className="flex flex-col gap-3">
              <button
                className="inline-flex h-12 w-full items-center justify-center gap-3 rounded-full border border-black/[0.1] bg-white text-sm font-bold text-slate-800 shadow-[0_4px_14px_rgba(15,15,16,0.06)] transition-all hover:bg-slate-50 active:scale-[0.98]"
                onClick={handleGoogle}
                type="button"
              >
                <GoogleGIcon />
                Continue with Google
              </button>

              <Button
                variant="secondary"
                className="h-12 w-full justify-center gap-2 border-black/[0.08] font-bold"
                onClick={handleGuest}
                type="button"
              >
                <span className="material-symbols-outlined text-primary">travel_explore</span>
                Continue as guest
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

            <form className="space-y-4" onSubmit={handleSignup}>
              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">
                  Full name
                </label>
                <input
                  className={inputClass}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Arjun Patel"
                  required
                  type="text"
                  value={name}
                />
              </div>
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
              <Button className="mt-2 h-12 w-full justify-center gap-2 font-bold" type="submit">
                Get started
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </Button>
            </form>

            <div className="mt-8 text-center text-sm">
              <p className="text-slate-600">
                Already have an account?{' '}
                <Link className="font-bold text-primary hover:underline" to="/login">
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default SignupPage
