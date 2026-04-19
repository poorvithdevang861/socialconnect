import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import { getNgoProfile, saveNgoProfile } from '../utils/ngoProfile'
import { setAuthenticated, setOnboardingComplete, setUserRole } from '../utils/onboarding'

function NgoLoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const inputClass =
    'h-12 w-full rounded-2xl border border-black/[0.08] bg-background-light px-4 text-[15px] leading-tight text-ink placeholder:text-slate-400 outline-none transition-shadow focus:border-primary/40 focus:ring-2 focus:ring-primary/25'

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
    <main className="page-gutter-x mx-auto flex min-h-[100dvh] w-full max-w-[1600px] flex-col premium-shell bg-background-light py-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] md:min-h-screen md:py-6 md:pb-6">
      <div className="grid flex-1 grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
        <div className="hidden flex-col gap-5 lg:flex lg:pr-8">
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-2xl bg-shell text-white shadow-premium">
              <span className="material-symbols-outlined text-[26px]">corporate_fare</span>
            </div>
            <span className="text-xl font-black tracking-tight text-ink">CauseConnect</span>
          </div>
          <span className="premium-chip w-fit border-primary/20 bg-primary/10 text-primary">For organizations</span>
          <h2 className="premium-h1 text-[clamp(1.85rem,3vw,2.75rem)]">
            Manage your events.
            <br />
            <span className="text-primary">Reach more volunteers.</span>
          </h2>
        </div>

        <div className="mx-auto flex w-full max-w-md flex-col justify-center">
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
              <p className="premium-body mt-1">Sign in to post opportunities, manage events, and update your profile.</p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">
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
                Log in as NGO
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
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
    </main>
  )
}

export default NgoLoginPage
