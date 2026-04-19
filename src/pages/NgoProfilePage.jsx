import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import NgoLayout from '../components/NgoLayout'
import { getNgoProfile, saveNgoProfile } from '../utils/ngoProfile'
import appLogo from '../../logo.png'

function NgoProfilePage() {
  const navigate = useNavigate()
  const profile = getNgoProfile()
  const [orgName, setOrgName] = useState(() => profile?.orgName ?? '')
  const [contactName, setContactName] = useState(() => profile?.contactName ?? '')
  const [email, setEmail] = useState(() => profile?.email ?? '')
  const [city, setCity] = useState(() => profile?.city ?? '')
  const [mission, setMission] = useState(() => profile?.mission ?? '')
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (!profile) {
      navigate('/signup/ngo', { replace: true })
    }
  }, [profile, navigate])

  const inputClass =
    'h-12 w-full rounded-2xl border border-black/[0.08] bg-background-light px-4 text-[15px] leading-tight text-ink placeholder:text-slate-400 outline-none transition-shadow focus:border-primary/40 focus:ring-2 focus:ring-primary/25'
  const textareaClass =
    'min-h-[120px] w-full rounded-2xl border border-black/[0.08] bg-background-light px-4 py-3 text-[15px] leading-relaxed text-ink placeholder:text-slate-400 outline-none transition-shadow focus:border-primary/40 focus:ring-2 focus:ring-primary/25'

  const handleSubmit = (event) => {
    event.preventDefault()
    saveNgoProfile({
      orgName: orgName.trim(),
      contactName: contactName.trim(),
      email: email.trim(),
      city: city.trim(),
      mission: mission.trim(),
    })
    setSaved(true)
  }

  if (!profile) {
    return null
  }

  return (
    <NgoLayout title="Organization profile" subtitle="Same details you entered at signup — keep them accurate for volunteers.">
      <div className="mx-auto w-full max-w-3xl space-y-8">
        <section className="cc-card cc-card-pad-lg">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <img alt="CauseConnect logo" className="size-16 shrink-0 rounded-2xl object-contain shadow-premium" src={appLogo} />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl font-black tracking-tight text-ink">{orgName || 'Organization'}</h2>
                <span className="premium-chip border-primary/20 bg-primary/10 text-primary">Verified organization</span>
              </div>
              <p className="premium-body mt-2 text-slate-600">
                <span className="font-semibold text-ink">{city}</span>
                <span className="text-slate-400"> · </span>
                Primary contact: <span className="font-medium text-ink">{contactName}</span>
              </p>
              <p className="mt-1 text-sm text-slate-500">
                <span className="material-symbols-outlined align-middle text-base text-primary">mail</span> {email}
              </p>
              <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-600">{mission}</p>
            </div>
          </div>
        </section>

        <section className="cc-card cc-card-pad-lg">
          <h3 className="text-lg font-extrabold text-ink">Edit organization details</h3>
          <p className="premium-body mt-1 text-sm">
            These fields match{' '}
            <span className="font-semibold text-ink">NGO signup</span> — updates apply across your dashboard.
          </p>

          {saved ? (
            <div className="mt-4 rounded-xl border border-success-green/30 bg-success-green/10 px-4 py-3 text-sm font-semibold text-success-green">
              Profile updated successfully.
            </div>
          ) : null}

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">
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
            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">
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
            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">
                Work email
              </label>
              <input className={inputClass} onChange={(e) => setEmail(e.target.value)} required type="email" value={email} />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">
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
            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">
                Mission &amp; focus
              </label>
              <textarea
                className={textareaClass}
                onChange={(e) => setMission(e.target.value)}
                placeholder="What does your organization do? Which causes do you support?"
                required
                rows={4}
                value={mission}
              />
            </div>
            <Button className="mt-2 h-12 w-full justify-center gap-2 font-bold" type="submit">
              Save profile
              <span className="material-symbols-outlined text-lg">save</span>
            </Button>
          </form>
        </section>
      </div>
    </NgoLayout>
  )
}

export default NgoProfilePage
