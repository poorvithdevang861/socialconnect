import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { isAuthenticated, isOnboardingComplete, setOnboardingComplete } from '../utils/onboarding'

function InterestsFiltersPage() {
  const navigate = useNavigate()
  const [month, setMonth] = useState('October 2024')
  const [selectedDates, setSelectedDates] = useState(['3', '9'])
  const [duration, setDuration] = useState('2-4h')
  const [commitment, setCommitment] = useState('One-time')
  const [distance, setDistance] = useState(25)
  const [groupSize, setGroupSize] = useState('Small Group (2-5)')
  const [verifiedOnly, setVerifiedOnly] = useState(true)
  const [friendsGoing, setFriendsGoing] = useState(false)

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
    setDistance(25)
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
    <main className="min-h-screen bg-background-light text-slate-900">
      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
        <div className="flex flex-1 justify-center px-4 py-8 lg:px-0">
          <div className="flex max-w-[800px] flex-1 flex-col gap-8">
            <div className="flex flex-col gap-3 px-4">
              <div className="flex items-end justify-between gap-6">
                <div>
                  <h1 className="text-4xl font-black leading-tight tracking-[-0.033em]">Filters</h1>
                  <p className="mt-1 text-lg text-slate-500">
                    Refine opportunities to match your schedule.
                  </p>
                </div>
                <p className="mb-1 rounded-full bg-primary/10 px-3 py-1 text-sm font-bold text-primary">
                  Step 2 of 2
                </p>
              </div>
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-primary/10">
                <div className="h-full w-full rounded-full bg-primary" />
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <button
                  className="rounded-xl bg-white px-4 py-2 text-sm font-bold text-slate-600 shadow-sm ring-1 ring-slate-200 transition-colors hover:bg-slate-50"
                  onClick={() => navigate('/interests')}
                  type="button"
                >
                  <span className="inline-flex items-center gap-2">
                    <span className="material-symbols-outlined text-base">arrow_back</span>
                    Back
                  </span>
                </button>
                <button
                  className="rounded-xl bg-white px-4 py-2 text-sm font-bold text-primary shadow-sm ring-1 ring-slate-200 transition-colors hover:bg-primary/5"
                  onClick={clearAll}
                  type="button"
                >
                  Reset all
                </button>
                <button
                  className="rounded-xl bg-white px-4 py-2 text-sm font-bold text-primary shadow-sm ring-1 ring-slate-200 transition-colors hover:bg-primary/5"
                  onClick={completeOnboarding}
                  type="button"
                >
                  Skip for now
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-10 px-4 md:grid-cols-2">
              <section>
                <h2 className="mb-4 text-lg font-bold text-slate-900">Date &amp; Time</h2>
                <div className="cc-card-soft p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-700">{month}</span>
                    <div className="flex gap-2">
                      <button
                        className="rounded-lg p-1 transition-colors hover:bg-slate-100"
                        onClick={() => setMonth('September 2024')}
                        type="button"
                      >
                        <span className="material-symbols-outlined text-lg">chevron_left</span>
                      </button>
                      <button
                        className="rounded-lg p-1 transition-colors hover:bg-slate-100"
                        onClick={() => setMonth('November 2024')}
                        type="button"
                      >
                        <span className="material-symbols-outlined text-lg">chevron_right</span>
                      </button>
                    </div>
                  </div>
                  <div className="mb-2 grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-slate-400">
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
                        className={`py-1 text-xs font-medium transition-colors ${
                          selectedDates.includes(d)
                            ? 'rounded-full bg-primary text-white'
                            : d === '8'
                              ? 'rounded-full bg-primary/20 text-slate-700'
                              : 'rounded-full text-slate-700 hover:bg-slate-100'
                        }`}
                        key={d}
                        onClick={() => toggleDate(d)}
                        type="button"
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>
              </section>

              <div className="space-y-8">
                <section>
                  <h2 className="mb-4 text-lg font-bold text-slate-900">Duration</h2>
                  <div className="flex rounded-2xl bg-slate-100 p-1">
                    {['< 2h', '2-4h', 'Full Day'].map((item) => (
                      <button
                        className={`flex-1 rounded-xl py-2 text-sm font-semibold transition-colors ${
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
                <section>
                  <h2 className="mb-4 text-lg font-bold text-slate-900">Commitment Level</h2>
                  <div className="flex rounded-2xl bg-slate-100 p-1">
                    {['One-time', 'Recurring'].map((item) => (
                      <button
                        className={`flex-1 rounded-xl py-2 text-sm font-semibold transition-colors ${
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

            <section className="px-4">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-900">Location / Distance</h2>
                <span className="font-bold text-primary">{distance} miles</span>
              </div>
              <input
                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-primary"
                max={100}
                min={5}
                onChange={(e) => setDistance(Number(e.target.value))}
                type="range"
                value={distance}
              />
            </section>

            <div className="grid grid-cols-1 gap-10 px-4 pb-24 md:grid-cols-2">
              <section>
                <h2 className="mb-4 text-lg font-bold text-slate-900">Group Size</h2>
                <div className="flex flex-wrap gap-2">
                  {['Solo', 'Small Group (2-5)', 'Large Team (5+)'].map((item) => (
                    <button
                      className={`rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
                        groupSize === item
                          ? 'border-2 border-primary bg-primary text-white'
                          : 'border-2 border-slate-100 bg-white hover:border-primary/30'
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
              <section className="space-y-4">
                <h2 className="mb-4 text-lg font-bold text-slate-900">Preferences</h2>
                <div className="flex items-center justify-between cc-card-soft px-4 py-3">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary">verified</span>
                    <span className="text-sm font-semibold">Verified Only</span>
                  </div>
                  <button
                    className={`relative h-6 w-11 rounded-full transition-all ${
                      verifiedOnly ? 'bg-primary' : 'bg-slate-300'
                    }`}
                    onClick={() => setVerifiedOnly((prev) => !prev)}
                    type="button"
                  >
                    <span
                      className={`absolute top-[2px] h-5 w-5 rounded-full bg-white transition-all ${
                        verifiedOnly ? 'left-[22px]' : 'left-[2px]'
                      }`}
                    />
                  </button>
                </div>
                <div className="flex items-center justify-between cc-card-soft px-4 py-3">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary">group</span>
                    <span className="text-sm font-semibold">Friends Going</span>
                  </div>
                  <button
                    className={`relative h-6 w-11 rounded-full transition-all ${
                      friendsGoing ? 'bg-primary' : 'bg-slate-300'
                    }`}
                    onClick={() => setFriendsGoing((prev) => !prev)}
                    type="button"
                  >
                    <span
                      className={`absolute top-[2px] h-5 w-5 rounded-full bg-white transition-all ${
                        friendsGoing ? 'left-[22px]' : 'left-[2px]'
                      }`}
                    />
                  </button>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-primary/10 bg-white/80 p-4 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[800px] items-center justify-end gap-4">
          <button
            className="flex h-14 flex-1 items-center justify-center gap-2 rounded-2xl bg-primary font-black text-white shadow-lg shadow-primary/20 transition-all active:scale-[0.98] hover:bg-primary/90 sm:min-w-[240px] sm:flex-none"
            onClick={completeOnboarding}
            type="button"
          >
            <span>Show Opportunities</span>
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </div>
    </main>
  )
}

export default InterestsFiltersPage
