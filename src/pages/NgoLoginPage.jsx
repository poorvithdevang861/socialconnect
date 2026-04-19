import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import { getNgoProfile, saveNgoProfile } from '../utils/ngoProfile'
import { setAuthenticated, setOnboardingComplete, setUserRole } from '../utils/onboarding'
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

function NgoLoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const inputClass =
    'h-12 w-full rounded-2xl border border-black/[0.12] bg-beige px-4 text-[15px] leading-snug text-ink placeholder:text-slate-500 outline-none transition-shadow focus:border-primary/50 focus:ring-2 focus:ring-primary/25'

  const handleSubmit = (event) => {
    event.preventDefault()
    const existing = getNgoProfile()
    if (!existing) {
      saveNgoProfile({
        orgName: 'My Organization',
        contactName: 'Organization Admin',
        email: email.trim(),
        city: 'Ahmedabad',
        mission: 'Community service and local impact initiatives.',
      })
    }
    setAuthenticated(true)
    setOnboardingComplete(true)
    setUserRole('ngo')
    navigate('/ngo/home', { replace: true })
  }

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
                <span className="text-2xl font-black tracking-tight text-shell">CauseConnect</span>
              </div>
              <span className="premium-chip border-primary/20 bg-primary/10 text-primary">For organizations</span>
              <h2 className="premium-h1 text-[clamp(1.85rem,3vw,2.75rem)]">
                Manage your events.
                <br />
                <span className="text-primary">Reach more volunteers.</span>
              </h2>
              <p className="premium-body max-w-md text-base">
                Sign in to post opportunities, manage your listings, and keep your organization profile current.
              </p>
            </div>

            <div className="mx-auto flex w-full max-w-md flex-col items-center text-center">
              <div className="mb-6 flex items-center justify-center gap-2 lg:hidden">
                <img alt="CauseConnect logo" className="size-10 shrink-0 rounded-xl object-contain shadow-premium" src={appLogo} />
                <span className="text-xl font-black text-shell">CauseConnect</span>
              </div>

              <div className="w-full max-w-sm">
                <div className="cc-card cc-card-pad-lg shadow-[0_10px_28px_rgba(15,15,16,0.08)]">
                  <Link
                    className="mb-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 transition-colors hover:text-primary"
                    to="/login"
                  >
                    <span className="material-symbols-outlined text-base text-inherit">arrow_back</span>
                    Back to log in
                  </Link>

                  <div className="mb-6">
                    <h1 className="premium-h1 text-ink">NGO login</h1>
                    <p className="premium-body mt-1">
                      Sign in to post opportunities, manage events, and update your profile.
                    </p>
                  </div>

                  <form className="mx-auto w-full space-y-4 text-center" onSubmit={handleSubmit}>
                    <div className="text-center">
                      <label className="mb-1.5 block text-center text-xs font-bold uppercase tracking-wider text-slate-600">
                        Work email
                      </label>
                      <input
                        className={inputClass}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@organization.org"
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
                    <Button variant="action" className="mt-2 min-h-[48px] w-full gap-2.5 px-5 font-bold" type="submit">
                      <span className="leading-snug">Log in as NGO</span>
                      <BtnIcon>
                        <span className="material-symbols-outlined text-white">arrow_forward</span>
                      </BtnIcon>
                    </Button>
                  </form>

                  <div className="mt-8 text-center text-sm">
                    <p className="text-slate-600">
                      Need a new organization account?{' '}
                      <Link className="font-bold text-primary hover:underline" to="/signup/ngo">
                        Sign up as NGO
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

export default NgoLoginPage
