import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import SectionHeader from '../components/SectionHeader'
import { isAuthenticated, isOnboardingComplete } from '../utils/onboarding'

const INTERESTS = [
  'Environment',
  'Education',
  'Health',
  'Animal Welfare',
  'Community Care',
  'Food Drives',
  'Youth Mentoring',
  'Disaster Relief',
]

function InterestsPage() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState([])
  const [styles, setStyles] = useState(['solo'])

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login', { replace: true })
      return
    }
    if (isOnboardingComplete()) {
      navigate('/home', { replace: true })
    }
  }, [navigate])

  const selectedCount = useMemo(() => selected.length, [selected])

  const toggleInterest = (interest) => {
    setSelected((prev) =>
      prev.includes(interest) ? prev.filter((item) => item !== interest) : [...prev, interest],
    )
  }

  const toggleStyle = (value) => {
    setStyles((prev) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]))
  }

  const handleContinue = () => {
    navigate('/interests/filters', { replace: true })
  }

  return (
    <main className="mx-auto w-full max-w-[1600px] premium-shell bg-background-light pb-[max(104px,calc(96px+env(safe-area-inset-bottom))] pt-4 md:pb-6 md:pt-4">
      <div className="section-gap-lg px-4 pb-4 md:px-5 md:pb-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <span className="premium-chip w-fit border-primary/15 bg-primary/10 text-primary">Step 1 of 2</span>
          <div className="h-2 w-full overflow-hidden rounded-full bg-primary/10 sm:max-w-md sm:flex-1">
            <div className="h-full w-1/2 rounded-full bg-primary shadow-orange-glow" />
          </div>
        </div>

        <SectionHeader
          title="What moves you?"
          subtitle="Pick causes you care about — we’ll shape your feed around them."
          titleClassName="premium-h1"
        />

        <section className="section-gap">
          <h2 className="premium-h2 section-title-row">Social causes</h2>
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4 md:gap-3">
            {INTERESTS.map((interest) => {
              const active = selected.includes(interest)
              return (
                <button
                  className={`relative flex min-h-[88px] flex-col items-center justify-center gap-1.5 rounded-2xl border px-3 py-3 text-center transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${
                    active
                      ? 'border-primary/40 bg-primary/8 text-primary shadow-[0_6px_20px_rgba(234,88,12,0.12)]'
                      : 'border-black/[0.06] bg-white text-slate-600 hover:border-primary/25 hover:bg-primary/[0.03]'
                  }`}
                  key={interest}
                  onClick={() => toggleInterest(interest)}
                  type="button"
                >
                  <span
                    className={`material-symbols-outlined text-2xl ${active ? 'text-primary' : 'text-slate-400'}`}
                  >
                    volunteer_activism
                  </span>
                  <span className="text-[13px] font-bold leading-tight">{interest}</span>
                  <span
                    className={`absolute right-2 top-2 flex size-5 items-center justify-center rounded-full border text-[10px] ${
                      active ? 'border-primary bg-primary text-white' : 'border-black/[0.08] bg-white text-transparent'
                    }`}
                    aria-hidden
                  >
                    {active ? <span className="material-symbols-outlined text-[14px]">check</span> : '·'}
                  </span>
                </button>
              )
            })}
          </div>
        </section>

        <section className="section-gap border-t border-black/[0.06] pt-6 md:pt-8">
          <SectionHeader
            title="How do you like to volunteer?"
            subtitle="Choose one or both — we’ll match solo tasks and group events."
            className="section-title-row"
          />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
            <button
              className={`flex flex-col rounded-2xl border p-5 text-left transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 md:p-6 ${
                styles.includes('solo')
                  ? 'border-primary/40 bg-primary/8 shadow-[0_8px_24px_rgba(234,88,12,0.1)]'
                  : 'border-black/[0.06] bg-white hover:border-primary/20'
              }`}
              onClick={() => toggleStyle('solo')}
              type="button"
            >
              <div className="mb-3 flex items-start justify-between">
                <span className="material-symbols-outlined text-3xl text-primary">person</span>
                <span
                  className={`flex size-6 items-center justify-center rounded-full border text-[12px] ${
                    styles.includes('solo')
                      ? 'border-primary bg-primary text-white'
                      : 'border-black/[0.1] bg-white text-transparent'
                  }`}
                >
                  {styles.includes('solo') ? <span className="material-symbols-outlined text-[16px]">check</span> : '·'}
                </span>
              </div>
              <h3 className="text-base font-extrabold text-ink">Solo</h3>
              <p className="premium-body mt-1 text-sm">Independent tasks, virtual help, self-paced projects.</p>
            </button>
            <button
              className={`flex flex-col rounded-2xl border p-5 text-left transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 md:p-6 ${
                styles.includes('group')
                  ? 'border-primary/40 bg-primary/8 shadow-[0_8px_24px_rgba(234,88,12,0.1)]'
                  : 'border-black/[0.06] bg-white hover:border-primary/20'
              }`}
              onClick={() => toggleStyle('group')}
              type="button"
            >
              <div className="mb-3 flex items-start justify-between">
                <span
                  className={`material-symbols-outlined text-3xl ${styles.includes('group') ? 'text-primary' : 'text-slate-400'}`}
                >
                  groups_3
                </span>
                <span
                  className={`flex size-6 items-center justify-center rounded-full border text-[12px] ${
                    styles.includes('group')
                      ? 'border-primary bg-primary text-white'
                      : 'border-black/[0.1] bg-white text-transparent'
                  }`}
                >
                  {styles.includes('group') ? <span className="material-symbols-outlined text-[16px]">check</span> : '·'}
                </span>
              </div>
              <h3 className="text-base font-extrabold text-ink">Group</h3>
              <p className="premium-body mt-1 text-sm">Community events, workshops, and team gatherings.</p>
            </button>
          </div>
        </section>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-black/[0.06] bg-white/95 p-4 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1600px] justify-end px-4 md:px-5">
          <Button
            className="h-12 w-full max-w-md justify-center gap-2 font-black"
            disabled={selectedCount === 0}
            onClick={handleContinue}
          >
            <span>Continue</span>
            <span className="material-symbols-outlined">arrow_forward</span>
          </Button>
        </div>
      </div>
    </main>
  )
}

export default InterestsPage
