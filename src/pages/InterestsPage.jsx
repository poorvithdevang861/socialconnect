import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
  const [style, setStyle] = useState('solo')

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

  const handleContinue = () => {
    navigate('/interests/filters', { replace: true })
  }

  return (
    <main className="min-h-screen bg-background-light text-slate-900">
      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
        <div className="flex flex-1 justify-center px-4 py-8 lg:px-0">
          <div className="flex max-w-[800px] flex-1 flex-col gap-8">
            <div className="flex flex-col gap-3 px-4">
              <div className="flex items-end justify-between gap-6">
                <div>
                  <h1 className="text-4xl font-black leading-tight tracking-[-0.033em]">
                    What moves you?
                  </h1>
                  <p className="mt-1 text-lg text-slate-500">
                    Help us personalize your volunteer discovery feed.
                  </p>
                </div>
                <p className="mb-1 rounded-full bg-primary/10 px-3 py-1 text-sm font-bold text-primary">
                  Step 1 of 2
                </p>
              </div>
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-primary/10">
                <div className="h-full w-1/2 rounded-full bg-primary" />
              </div>
            </div>

            <div className="px-4">
              <div className="group relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 transition-colors group-focus-within:text-primary">
                  <span className="material-symbols-outlined">search</span>
                </div>
                <input
                  className="h-14 w-full rounded-2xl border-2 border-slate-100 bg-white pl-12 pr-4 text-base placeholder:text-slate-400 transition-all focus:border-primary focus:ring-primary"
                  placeholder="Search for specific causes (e.g. Literacy, Reforestation)..."
                  type="text"
                />
              </div>
            </div>

            <div className="flex flex-col gap-4 px-4">
              <h2 className="text-xl font-bold tracking-tight">Social Causes</h2>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                {INTERESTS.map((interest) => {
                  const active = selected.includes(interest)
                  return (
                    <button
                      className={`relative flex flex-col items-center justify-center gap-2 rounded-2xl border-2 p-4 transition-all hover:scale-[1.02] ${
                        active
                          ? 'border-primary bg-primary/5 text-primary'
                          : 'border-slate-100 bg-white text-slate-600 hover:border-primary/30'
                      }`}
                      key={interest}
                      onClick={() => toggleInterest(interest)}
                    >
                      <span className="material-symbols-outlined text-3xl">volunteer_activism</span>
                      <span className="text-sm font-bold">{interest}</span>
                      {active ? (
                        <div className="absolute right-2 top-2 flex size-5 items-center justify-center rounded-full bg-primary text-white">
                          <span className="material-symbols-outlined text-xs">check</span>
                        </div>
                      ) : null}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="flex flex-col gap-4 px-4 pb-24">
              <div className="flex flex-col">
                <h2 className="text-xl font-bold tracking-tight">
                  Do you prefer working alone or in a team?
                </h2>
                <p className="text-sm text-slate-500">
                  We&apos;ll show activities that match your style.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <button
                  className={`group relative flex flex-col rounded-2xl border-2 p-6 ${
                    style === 'solo' ? 'border-primary bg-primary/5' : 'border-slate-100 bg-white'
                  }`}
                  onClick={() => setStyle('solo')}
                >
                  <div className="mb-4 flex items-start justify-between">
                    <span className="material-symbols-outlined text-4xl text-primary">person</span>
                    <div
                      className={`flex size-6 items-center justify-center rounded-full border-2 ${
                        style === 'solo' ? 'border-primary bg-primary text-white' : 'border-slate-200'
                      }`}
                    >
                      {style === 'solo' ? (
                        <span className="material-symbols-outlined text-[16px]">check</span>
                      ) : null}
                    </div>
                  </div>
                  <h3 className="text-left text-lg font-bold text-primary">Solo Activities</h3>
                  <p className="mt-1 text-left text-sm text-slate-600">
                    Independent tasks, virtual volunteering, and self-paced projects.
                  </p>
                </button>
                <button
                  className={`group relative flex flex-col rounded-2xl border-2 p-6 ${
                    style === 'group'
                      ? 'border-primary bg-primary/5'
                      : 'border-slate-100 bg-white hover:border-primary/30'
                  }`}
                  onClick={() => setStyle('group')}
                >
                  <div className="mb-4 flex items-start justify-between">
                    <span
                      className={`material-symbols-outlined text-4xl ${
                        style === 'group' ? 'text-primary' : 'text-slate-400'
                      }`}
                    >
                      groups_3
                    </span>
                    <div
                      className={`flex size-6 items-center justify-center rounded-full border-2 ${
                        style === 'group' ? 'border-primary bg-primary text-white' : 'border-slate-200'
                      }`}
                    >
                      {style === 'group' ? (
                        <span className="material-symbols-outlined text-[16px]">check</span>
                      ) : null}
                    </div>
                  </div>
                  <h3 className="text-left text-lg font-bold">Group Projects</h3>
                  <p className="mt-1 text-left text-sm text-slate-500">
                    Community events, team workshops, and social gatherings.
                  </p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-primary/10 bg-white/80 p-4 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[800px] items-center justify-end gap-4">
          <button
            className="flex h-14 flex-1 items-center justify-center gap-2 rounded-2xl bg-primary font-black text-white shadow-lg shadow-primary/20 transition-all active:scale-[0.98] hover:bg-primary/90 sm:min-w-[240px] sm:flex-none"
            disabled={selectedCount === 0}
            onClick={handleContinue}
          >
            <span>Continue</span>
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </div>
    </main>
  )
}

export default InterestsPage
