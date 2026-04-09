import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import SectionHeader from '../components/SectionHeader'
import { isAuthenticated, isOnboardingComplete, setOnboardingComplete } from '../utils/onboarding'

const MI_TO_KM = 1.60934

function milesToKm(miles) {
  return Math.round(miles * MI_TO_KM)
}

function InterestsFiltersPage() {
  const navigate = useNavigate()
  const [month, setMonth] = useState('October 2024')
  const [selectedDates, setSelectedDates] = useState(['3', '9'])
  const [duration, setDuration] = useState('2-4h')
  const [commitment, setCommitment] = useState('One-time')
  const [distanceMiles, setDistanceMiles] = useState(25)
  const [groupSize, setGroupSize] = useState('Small Group (2-5)')
  const [verifiedOnly, setVerifiedOnly] = useState(true)
  const [friendsGoing, setFriendsGoing] = useState(false)

  const kmEquivalent = useMemo(() => milesToKm(distanceMiles), [distanceMiles])

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login', { replace: true })
      return
    }
    if (isOnboardingComplete()) {
      navigate('/home', { replace: true })
    }
  }, [navigate])

  const completeOnboarding = () => {
    setOnboardingComplete(true)
    navigate('/home', { replace: true })
  }

  const clearAll = () => {
    setSelectedDates([])
    setDuration('2-4h')
    setCommitment('One-time')
    setDistanceMiles(25)
    setGroupSize('Small Group (2-5)')
    setVerifiedOnly(true)
    setFriendsGoing(false)
  }

  const toggleDate = (date) => {
    setSelectedDates((prev) =>
      prev.includes(date) ? prev.filter((item) => item !== date) : [...prev, date],
    )
  }

  const dateItems = useMemo(
    () => ['28', '29', '30', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'],
    [],
  )

  return (
    <main className="mx-auto w-full max-w-[1600px] premium-shell bg-background-light pb-[max(104px,calc(96px+env(safe-area-inset-bottom)))] pt-4 md:pb-6 md:pt-4">
      <div className="section-gap-lg px-4 pb-4 md:px-5 md:pb-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <span className="premium-chip w-fit border-primary/15 bg-primary/10 text-primary">Step 2 of 2</span>
          <div className="h-2 w-full overflow-hidden rounded-full bg-primary/10 sm:max-w-md sm:flex-1">
            <div className="h-full w-full rounded-full bg-primary shadow-orange-glow" />
          </div>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <SectionHeader
            title="Filters"
            subtitle="Keep it simple — set your schedule and how far you’ll travel."
            titleClassName="premium-h1"
            className="min-w-0 flex-1"
          />
          <div className="flex flex-wrap gap-2 sm:shrink-0 sm:pt-1">
            <Button
              className="h-10 px-4 py-2 text-xs font-bold"
              onClick={() => navigate('/interests')}
              type="button"
              variant="secondary"
            >
              <span className="material-symbols-outlined text-primary">arrow_back</span>
              Back
            </Button>
            <button
              className="premium-chip h-10 border-primary/20 py-0 text-xs font-bold text-primary hover:bg-primary/5"
              onClick={clearAll}
              type="button"
            >
              Reset all
            </button>
            <button
              className="premium-chip h-10 border-transparent py-0 text-xs font-bold text-slate-500 hover:text-primary"
              onClick={completeOnboarding}
              type="button"
            >
              Skip for now
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
          <section className="premium-section !shadow-[0_8px_24px_rgba(15,15,16,0.06)]">
            <h2 className="premium-h2 mb-4">Date &amp; time</h2>
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm font-bold text-slate-800">{month}</span>
              <div className="flex gap-1">
                <button
                  className="rounded-full p-2 text-slate-500 transition-colors hover:bg-primary/10 hover:text-primary"
                  onClick={() => setMonth('September 2024')}
                  type="button"
                  aria-label="Previous month"
                >
                  <span className="material-symbols-outlined text-lg">chevron_left</span>
                </button>
                <button
                  className="rounded-full p-2 text-slate-500 transition-colors hover:bg-primary/10 hover:text-primary"
                  onClick={() => setMonth('November 2024')}
                  type="button"
                  aria-label="Next month"
                >
                  <span className="material-symbols-outlined text-lg">chevron_right</span>
                </button>
              </div>
            </div>
            <div className="mb-2 grid grid-cols-7 gap-1 text-center text-[10px] font-bold uppercase tracking-wider text-slate-400">
              <span>M</span>
              <span>T</span>
              <span>W</span>
              <span>T</span>
              <span>F</span>
              <span>S</span>
              <span>S</span>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center">
              {dateItems.map((d) => (
                <button
                  className={`relative min-h-[36px] rounded-full text-xs font-semibold transition-colors ${
                    selectedDates.includes(d)
                      ? 'bg-primary text-white shadow-orange-glow'
                      : d === '8'
                        ? 'bg-primary/15 text-slate-800'
                        : 'text-slate-700 hover:bg-slate-100'
                  }`}
                  key={d}
                  onClick={() => toggleDate(d)}
                  type="button"
                >
                  {d}
                </button>
              ))}
            </div>
            <p className="premium-body mt-3 text-xs">Tap days you’re free. Today is highlighted lightly.</p>
          </section>

          <div className="space-y-6">
            <section className="premium-section !shadow-[0_8px_24px_rgba(15,15,16,0.06)]">
              <h2 className="premium-h2 mb-3">Duration</h2>
              <div className="flex rounded-full bg-slate-100 p-1">
                {['< 2h', '2-4h', 'Full Day'].map((item) => (
                  <button
                    className={`flex-1 rounded-full py-2.5 text-xs font-bold transition-colors sm:text-sm ${
                      duration === item ? 'bg-white text-primary shadow-sm' : 'text-slate-500'
                    }`}
                    key={item}
                    onClick={() => setDuration(item)}
                    type="button"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </section>
            <section className="premium-section !shadow-[0_8px_24px_rgba(15,15,16,0.06)]">
              <h2 className="premium-h2 mb-3">Commitment</h2>
              <div className="flex rounded-full bg-slate-100 p-1">
                {['One-time', 'Recurring'].map((item) => (
                  <button
                    className={`flex-1 rounded-full py-2.5 text-xs font-bold transition-colors sm:text-sm ${
                      commitment === item ? 'bg-white text-primary shadow-sm' : 'text-slate-500'
                    }`}
                    key={item}
                    onClick={() => setCommitment(item)}
                    type="button"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </section>
          </div>
        </div>

        <section className="premium-section !shadow-[0_8px_24px_rgba(15,15,16,0.06)]">
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="premium-h2">Search radius</h2>
              <p className="premium-body mt-1 text-sm">One slider — miles and kilometers stay in sync.</p>
            </div>
            <div className="flex flex-wrap items-baseline gap-2 sm:justify-end">
              <span className="text-2xl font-black tabular-nums text-ink">{distanceMiles} mi</span>
              <span className="text-sm font-bold text-slate-400">≈</span>
              <span className="text-xl font-bold tabular-nums text-slate-600">{kmEquivalent} km</span>
            </div>
          </div>
          <input
            aria-label="Search radius in miles"
            className="h-2.5 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-primary"
            max={100}
            min={5}
            onChange={(e) => setDistanceMiles(Number(e.target.value))}
            step={1}
            type="range"
            value={distanceMiles}
          />
          <div className="mt-2 flex justify-between text-[11px] font-semibold text-slate-400">
            <span>5 mi</span>
            <span className="text-slate-300">·</span>
            <span>100 mi</span>
          </div>
        </section>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
          <section>
            <h2 className="premium-h2 mb-3">Group size</h2>
            <div className="flex flex-wrap gap-2">
              {['Solo', 'Small Group (2-5)', 'Large Team (5+)'].map((item) => (
                <button
                  className={`rounded-full px-4 py-2.5 text-xs font-bold transition-all sm:text-sm ${
                    groupSize === item
                      ? 'bg-primary text-white shadow-orange-glow'
                      : 'border border-black/[0.08] bg-white text-slate-600 hover:border-primary/30'
                  }`}
                  key={item}
                  onClick={() => setGroupSize(item)}
                  type="button"
                >
                  {item}
                </button>
              ))}
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="premium-h2 mb-1">Preferences</h2>
            <div className="flex items-center justify-between rounded-2xl border border-black/[0.06] bg-white px-4 py-3 shadow-[0_6px_18px_rgba(15,15,16,0.05)]">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">verified</span>
                <span className="text-sm font-bold text-slate-800">Verified only</span>
              </div>
              <button
                aria-pressed={verifiedOnly}
                className={`relative h-7 w-12 rounded-full transition-all ${
                  verifiedOnly ? 'bg-primary' : 'bg-slate-300'
                }`}
                onClick={() => setVerifiedOnly((prev) => !prev)}
                type="button"
              >
                <span
                  className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-all ${
                    verifiedOnly ? 'left-[26px]' : 'left-0.5'
                  }`}
                />
              </button>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-black/[0.06] bg-white px-4 py-3 shadow-[0_6px_18px_rgba(15,15,16,0.05)]">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">group</span>
                <span className="text-sm font-bold text-slate-800">Friends going</span>
              </div>
              <button
                aria-pressed={friendsGoing}
                className={`relative h-7 w-12 rounded-full transition-all ${
                  friendsGoing ? 'bg-primary' : 'bg-slate-300'
                }`}
                onClick={() => setFriendsGoing((prev) => !prev)}
                type="button"
              >
                <span
                  className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-all ${
                    friendsGoing ? 'left-[26px]' : 'left-0.5'
                  }`}
                />
              </button>
            </div>
          </section>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-black/[0.06] bg-white/95 p-4 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1600px] justify-end px-4 md:px-5">
          <Button className="h-12 w-full max-w-md justify-center gap-2 font-black" onClick={completeOnboarding}>
            <span>Show opportunities</span>
            <span className="material-symbols-outlined">arrow_forward</span>
          </Button>
        </div>
      </div>
    </main>
  )
}

export default InterestsFiltersPage
