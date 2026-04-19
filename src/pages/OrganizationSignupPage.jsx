import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import { saveNgoProfile } from '../utils/ngoProfile'
import { setAuthenticated, setOnboardingComplete, setUserRole } from '../utils/onboarding'

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

function OrganizationSignupPage() {
  const navigate = useNavigate()
  const [orgName, setOrgName] = useState('')
  const [contactName, setContactName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [city, setCity] = useState('')
  const [mission, setMission] = useState('')

  const inputClass =
    'h-12 w-full rounded-2xl border border-black/[0.12] bg-beige px-4 text-[15px] leading-snug text-ink placeholder:text-slate-500 outline-none transition-shadow focus:border-primary/50 focus:ring-2 focus:ring-primary/25'

  const textareaClass =
    'min-h-[120px] w-full rounded-2xl border border-black/[0.12] bg-beige px-4 py-3 text-[15px] leading-relaxed text-ink placeholder:text-slate-500 outline-none transition-shadow focus:border-primary/50 focus:ring-2 focus:ring-primary/25'

  const handleSubmit = (event) => {
    event.preventDefault()
    saveNgoProfile({
      orgName: orgName.trim(),
      contactName: contactName.trim(),
      email: email.trim(),
      city: city.trim(),
      mission: mission.trim(),
    })
    setAuthenticated(true)
    setOnboardingComplete(true)
    setUserRole('ngo')
    navigate('/ngo/home', { replace: true })
  }

  return (
    <main
      className="mx-auto w-full max-w-[1600px] overflow-x-hidden premium-shell bg-background-light pb-4 pt-4 md:min-h-screen md:pb-5 md:pt-4"
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
          <div className="grid w-full min-h-0 grid-cols-1 place-items-center gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
            <div className="flex w-full max-w-md flex-col items-center gap-5 text-center lg:max-w-none">
              <div className="flex items-center justify-center gap-3">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-shell text-brand-yellow shadow-premium">
                  <span className="material-symbols-outlined text-[26px] leading-none text-brand-yellow">
                    corporate_fare
                  </span>
                </div>
                <span className="text-xl font-black tracking-tight text-shell">CauseConnect</span>
              </div>
              <span className="premium-chip border-primary/20 bg-primary/10 text-primary">For organizations</span>
              <h2 className="premium-h1 text-[clamp(1.85rem,3vw,2.75rem)]">
                List verified roles.
                <br />
                <span className="text-primary">Grow your volunteer base.</span>
              </h2>
              <p className="premium-body max-w-md text-base">
                Create an organization account, then post opportunities volunteers can discover and join in your city.
              </p>
            </div>

            <div className="mx-auto flex w-full max-w-2xl flex-col items-center text-center lg:max-w-none">
              <div className="mb-6 flex items-center justify-center gap-2 lg:hidden">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-shell text-brand-yellow shadow-premium">
                  <span className="material-symbols-outlined text-2xl leading-none text-brand-yellow">corporate_fare</span>
                </div>
                <span className="text-lg font-black text-shell">CauseConnect</span>
              </div>

              <div className="max-h-[min(100%,calc(100dvh-4.5rem))] min-h-0 w-full overflow-y-auto overscroll-y-contain md:max-h-none md:overflow-visible">
                <div className="cc-card cc-card-pad-lg shadow-[0_10px_28px_rgba(15,15,16,0.08)]">
                  <Link
                    className="mb-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 transition-colors hover:text-primary"
                    to="/login"
                  >
                    <span className="material-symbols-outlined text-base text-inherit">arrow_back</span>
                    Back to log in
                  </Link>

                  <div className="mb-6 text-left sm:text-center">
                    <h1 className="premium-h1 text-ink">NGO &amp; organization signup</h1>
                    <p className="premium-body mt-1">
                      Tell us about your organization. Next, you&apos;ll post your first opportunity.
                    </p>
                  </div>

                  <form className="w-full text-left" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-x-4 md:gap-y-4">
                      <div className="md:min-w-0">
                        <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-600">
                          Organization name
                        </label>
                        <input
                          className={inputClass}
                          onChange={(e) => setOrgName(e.target.value)}
                          placeholder="Hope Foundation"
                          required
                          type="text"
                          value={orgName}
                        />
                      </div>
                      <div className="md:min-w-0">
                        <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-600">
                          Contact name
                        </label>
                        <input
                          className={inputClass}
                          onChange={(e) => setContactName(e.target.value)}
                          placeholder="Your full name"
                          required
                          type="text"
                          value={contactName}
                        />
                      </div>
                      <div className="md:min-w-0">
                        <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-600">
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
                      <div className="md:min-w-0">
                        <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-600">
                          Password
                        </label>
                        <input
                          className={inputClass}
                          autoComplete="new-password"
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••"
                          required
                          minLength={8}
                          type="password"
                          value={password}
                        />
                      </div>
                      <div className="md:col-span-2 md:min-w-0">
                        <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-600">
                          City or region
                        </label>
                        <input
                          className={inputClass}
                          onChange={(e) => setCity(e.target.value)}
                          placeholder="Ahmedabad"
                          required
                          type="text"
                          value={city}
                        />
                      </div>
                      <div className="md:col-span-2 md:min-w-0">
                        <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-600">
                          Mission &amp; focus
                        </label>
                        <textarea
                          className={`${textareaClass} min-h-[100px] md:min-h-[120px]`}
                          onChange={(e) => setMission(e.target.value)}
                          placeholder="What does your organization do? Which causes do you support?"
                          required
                          rows={4}
                          value={mission}
                        />
                      </div>
                    </div>
                    <div className="pt-4">
                      <Button variant="action" className="min-h-[48px] w-full gap-2.5 px-5 font-bold" type="submit">
                        <span className="leading-snug">Create account &amp; continue</span>
                        <BtnIcon>
                          <span className="material-symbols-outlined text-white">arrow_forward</span>
                        </BtnIcon>
                      </Button>
                    </div>
                  </form>

                  <div className="mt-8 text-center text-sm">
                    <p className="text-slate-600">
                      Volunteering as an individual?{' '}
                      <Link className="font-bold text-primary hover:underline" to="/signup">
                        Volunteer signup
                      </Link>
                    </p>
                    <p className="mt-2 text-slate-600">
                      Already have an NGO account?{' '}
                      <Link className="font-bold text-primary hover:underline" to="/ngo/login">
                        Log in as NGO
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

export default OrganizationSignupPage
