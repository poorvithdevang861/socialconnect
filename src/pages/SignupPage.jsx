import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import GoogleGIcon from '../components/GoogleGIcon'
import { setAuthenticated, setOnboardingComplete } from '../utils/onboarding'
import appLogo from '../../logo.png'

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

function SignupPage() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const goToOnboarding = () => {
    setAuthenticated(true)
    setOnboardingComplete(true)
    navigate('/home', { replace: true })
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
    'h-12 w-full rounded-2xl border border-black/[0.12] bg-beige px-4 text-[15px] leading-snug text-ink placeholder:text-slate-500 outline-none transition-shadow focus:border-primary/50 focus:ring-2 focus:ring-primary/25'

  const socialBtnClass =
    'inline-flex min-h-[48px] w-full items-center justify-center gap-2.5 rounded-full border border-black bg-black px-5 text-sm font-bold tracking-[0.01em] text-white shadow-[0_4px_14px_rgba(15,15,16,0.06)] transition-all hover:bg-black/90 active:scale-[0.98]'

  return (
    <main
      className="mx-auto w-full max-w-[1600px] premium-shell bg-background-light pb-4 pt-4 md:min-h-screen md:pb-5 md:pt-4"
      style={{
        boxShadow:
          '0px 0px 0px 0px rgba(0, 0, 0, 0), 0px 0px 0px 0px rgba(0, 0, 0, 0), 0px 10px 28px 0px rgba(15, 15, 16, 0.08)',
      }}
    >
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-[10%] -top-[10%] h-[38%] w-[45%] rounded-full bg-primary/10 blur-[100px]" />
        <div className="absolute -bottom-[10%] -right-[10%] h-[38%] w-[45%] rounded-full bg-primary/5 blur-[100px]" />
      </div>

      <div className="section-gap-lg px-4 pb-4 md:px-5 md:pb-5">
        <div className="mx-auto flex min-h-[calc(100dvh-8.5rem)] w-full max-w-6xl items-center justify-center py-4 md:min-h-[calc(100vh-9.25rem)] md:py-6">
          <div className="grid grid-cols-1 place-items-center gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
            <div className="flex flex-col items-center gap-5 text-center">
              <div className="flex items-center justify-center gap-3">
                <img alt="CauseConnect logo" className="size-11 shrink-0 rounded-2xl object-contain shadow-premium" src={appLogo} />
                <span className="text-left text-[17px] font-black leading-[0.9] tracking-tight text-shell sm:text-lg">
                  <span className="block">CAUSE</span>
                  <span className="block">CONNECT</span>
                </span>
              </div>
              <h2 className="premium-h1 text-[clamp(1.85rem,3vw,2.75rem)]">
                Start small.
                <br />
                <span className="text-primary">Serve big.</span>
              </h2>
              <p className="premium-body max-w-md text-base">
                Join a trusted volunteering network, find causes near you, and contribute to community impact from day
                one.
              </p>
            </div>

            <div className="mx-auto flex w-full max-w-md flex-col items-center text-center">
              <div className="w-full max-w-sm">
                <div className="cc-card cc-card-pad-lg shadow-[0_10px_28px_rgba(15,15,16,0.08)]">
                  <div className="mb-6">
                    <h1 className="premium-h1 text-ink">Create an account</h1>
                    <p className="premium-body mt-1">Start your volunteering journey today.</p>
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
                  </div>

                  <div className="relative my-7">
                    <div aria-hidden="true" className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-black/[0.08]" />
                    </div>
                    <div className="relative flex justify-center text-xs font-semibold uppercase tracking-wider text-slate-500">
                      <span className="bg-white px-3">Or email</span>
                    </div>
                  </div>

                  <form className="mx-auto w-full space-y-4 text-center" onSubmit={handleSignup}>
                    <div className="text-center">
                      <label className="mb-1.5 block text-center text-xs font-bold uppercase tracking-wider text-slate-600">
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
                    <div className="text-center">
                      <label className="mb-1.5 block text-center text-xs font-bold uppercase tracking-wider text-slate-600">
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
                    <div className="text-center">
                      <label className="mb-1.5 block text-center text-xs font-bold uppercase tracking-wider text-slate-600">
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
                    <Button
                      variant="action"
                      className="mt-2 min-h-[48px] w-full gap-2.5 px-5 font-bold"
                      type="submit"
                    >
                      <span className="leading-snug">Get started</span>
                      <BtnIcon>
                        <span className="material-symbols-outlined text-white">arrow_forward</span>
                      </BtnIcon>
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
          </div>
        </div>
      </div>
    </main>
  )
}

export default SignupPage
