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
        <div className="flex flex-1 justify-center px-4 py-10 sm:px-10">
          <div className="flex w-full max-w-[960px] flex-1 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-100 px-8 py-6">
              <div>
                <h1 className="text-3xl font-black text-slate-900">Filter</h1>
                <p className="mt-1 text-sm text-slate-500">
                  Step 2 of 2 - refine opportunities to match your schedule
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="rounded-lg px-4 py-2 text-sm font-bold text-primary transition-colors hover:bg-primary/10"
                  onClick={completeOnboarding}
                >
                  Skip for now
                </button>
                <button
                  className="rounded-lg px-4 py-2 text-sm font-bold text-primary transition-colors hover:bg-primary/10"
                  onClick={clearAll}
                >
                  Reset All
                </button>
              </div>
            </div>

            <div className="space-y-10 overflow-y-auto px-8 py-8">
              <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
                <section>
                  <h2 className="mb-4 text-lg font-bold text-slate-900">Date &amp; Time</h2>
                  <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="text-sm font-semibold text-slate-700">{month}</span>
                      <div className="flex gap-2">
                        <button
                          className="rounded p-1 hover:bg-slate-200"
                          onClick={() => setMonth('September 2024')}
                        >
                          <span className="material-symbols-outlined text-lg">chevron_left</span>
                        </button>
                        <button
                          className="rounded p-1 hover:bg-slate-200"
                          onClick={() => setMonth('November 2024')}
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
                          className={`py-1 text-xs font-medium ${
                            selectedDates.includes(d)
                              ? 'rounded-full bg-primary text-white'
                              : d === '8'
                                ? 'rounded-full bg-primary/20 text-slate-700'
                                : 'text-slate-700'
                          }`}
                          key={d}
                          onClick={() => toggleDate(d)}
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
                    <div className="flex rounded-xl bg-slate-100 p-1">
                      {['< 2h', '2-4h', 'Full Day'].map((item) => (
                        <button
                          className={`flex-1 rounded-lg py-2 text-sm font-semibold ${
                            duration === item
                              ? 'bg-white text-primary shadow-sm'
                              : 'text-slate-500'
                          }`}
                          key={item}
                          onClick={() => setDuration(item)}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </section>
                  <section>
                    <h2 className="mb-4 text-lg font-bold text-slate-900">Commitment Level</h2>
                    <div className="flex rounded-xl bg-slate-100 p-1">
                      {['One-time', 'Recurring'].map((item) => (
                        <button
                          className={`flex-1 rounded-lg py-2 text-sm font-semibold ${
                            commitment === item
                              ? 'bg-white text-primary shadow-sm'
                              : 'text-slate-500'
                          }`}
                          key={item}
                          onClick={() => setCommitment(item)}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </section>
                </div>
              </div>

              <section>
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

              <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
                <section>
                  <h2 className="mb-4 text-lg font-bold text-slate-900">Group Size</h2>
                  <div className="flex flex-wrap gap-2">
                    {['Solo', 'Small Group (2-5)', 'Large Team (5+)'].map((item) => (
                      <button
                        className={`rounded-lg px-4 py-2 text-sm font-medium ${
                          groupSize === item
                            ? 'border-2 border-primary bg-primary text-white'
                            : 'border border-slate-200 hover:border-primary/50'
                        }`}
                        key={item}
                        onClick={() => setGroupSize(item)}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </section>
                <section className="space-y-4">
                  <h2 className="mb-4 text-lg font-bold text-slate-900">Preferences</h2>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-primary">verified</span>
                      <span className="text-sm font-semibold">Verified Only</span>
                    </div>
                    <button
                      className={`relative h-6 w-11 rounded-full transition-all ${
                        verifiedOnly ? 'bg-primary' : 'bg-slate-300'
                      }`}
                      onClick={() => setVerifiedOnly((prev) => !prev)}
                    >
                      <span
                        className={`absolute top-[2px] h-5 w-5 rounded-full bg-white transition-all ${
                          verifiedOnly ? 'left-[22px]' : 'left-[2px]'
                        }`}
                      />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-primary">group</span>
                      <span className="text-sm font-semibold">Friends Going</span>
                    </div>
                    <button
                      className={`relative h-6 w-11 rounded-full transition-all ${
                        friendsGoing ? 'bg-primary' : 'bg-slate-300'
                      }`}
                      onClick={() => setFriendsGoing((prev) => !prev)}
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

            <div className="mt-auto flex items-center justify-between border-t border-slate-100 bg-slate-50 px-8 py-6">
              <button
                className="px-6 py-3 font-bold text-slate-500 transition-colors hover:text-slate-700"
                onClick={() => navigate('/interests')}
              >
                Back
              </button>
              <div className="flex gap-4">
                <button className="hidden rounded-xl px-6 py-3 font-bold text-primary transition-all hover:bg-primary/10 sm:block">
                  Clear All
                </button>
                <button
                  className="flex items-center gap-2 rounded-xl bg-primary px-10 py-3 font-bold text-white shadow-lg shadow-primary/20 transition-all hover:scale-[1.02]"
                  onClick={completeOnboarding}
                >
                  <span>Show Opportunities</span>
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default InterestsFiltersPage
