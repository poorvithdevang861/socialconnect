import { useEffect, useMemo, useState } from 'react'

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

function InterestsModal({ open, onClose }) {
  const [step, setStep] = useState(1)

  // Step 1 state
  const [selected, setSelected] = useState([])
  const [styles, setStyles] = useState([])

  // Step 2 state
  const [month, setMonth] = useState('October 2024')
  const [selectedDates, setSelectedDates] = useState(['3', '9'])
  const [duration, setDuration] = useState('2-4h')
  const [commitment, setCommitment] = useState('One-time')
  const [distance, setDistance] = useState(25)
  const [groupSize, setGroupSize] = useState('Small Group (2-5)')
  const [verifiedOnly, setVerifiedOnly] = useState(true)
  const [friendsGoing, setFriendsGoing] = useState(false)

  const dateItems = useMemo(
    () => ['28', '29', '30', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'],
    [],
  )

  useEffect(() => {
    if (!open) return
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose?.()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  const toggleInterest = (interest) => {
    setSelected((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest],
    )
  }

  const toggleStyle = (value) => {
    setStyles((prev) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]))
  }

  const toggleDate = (date) => {
    setSelectedDates((prev) =>
      prev.includes(date) ? prev.filter((d) => d !== date) : [...prev, date],
    )
  }

  const resetAll = () => {
    setSelected([])
    setStyles([])
    setMonth('October 2024')
    setSelectedDates([])
    setDuration('2-4h')
    setCommitment('One-time')
    setDistance(25)
    setGroupSize('Small Group (2-5)')
    setVerifiedOnly(true)
    setFriendsGoing(false)
    setStep(1)
  }

  const canContinue = selected.length > 0

  const applyAndClose = () => {
    // For now we keep this purely UI; can be persisted later if you want.
    onClose?.()
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[100]">
      <button
        aria-label="Close filters"
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        type="button"
      />

      <div className="absolute inset-x-0 bottom-0 top-0 mx-auto flex w-full items-center justify-center p-3 sm:p-6">
        <div className="relative w-full max-w-[920px] overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6">
            <div className="min-w-0">
              <h2 className="truncate text-lg font-black text-slate-900 sm:text-xl">
                Filters
              </h2>
              <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">
                Step {step} of 2
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="rounded-xl bg-white px-3 py-2 text-xs font-bold text-primary shadow-sm ring-1 ring-slate-200 transition-colors hover:bg-primary/5 sm:text-sm"
                onClick={resetAll}
                type="button"
              >
                Reset
              </button>
              <button
                aria-label="Close"
                className="rounded-xl p-2 text-slate-600 transition-colors hover:bg-slate-100"
                onClick={onClose}
                type="button"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
          </div>

          <div className="h-1.5 w-full bg-primary/10">
            <div className={`h-full bg-primary transition-all ${step === 1 ? 'w-1/2' : 'w-full'}`} />
          </div>

          <div className="max-h-[calc(100vh-180px)] overflow-y-auto px-5 py-6 sm:px-6">
            {step === 1 ? (
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-black text-slate-900 sm:text-2xl">What moves you?</h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Pick one or more causes and styles.
                  </p>
                </div>

                <section>
                  <h4 className="mb-3 text-sm font-bold text-slate-900 sm:text-base">Causes</h4>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                    {INTERESTS.map((interest) => {
                      const active = selected.includes(interest)
                      return (
                        <button
                          className={`relative flex flex-col items-center justify-center gap-2 rounded-2xl border-2 p-4 transition-all hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary/40 ${
                            active
                              ? 'border-primary bg-primary/5 text-primary'
                              : 'border-slate-100 bg-white text-slate-600 hover:border-primary/30'
                          }`}
                          key={interest}
                          onClick={() => toggleInterest(interest)}
                          type="button"
                        >
                          <span className="material-symbols-outlined text-3xl">volunteer_activism</span>
                          <span className="text-xs font-extrabold sm:text-sm">{interest}</span>
                          <div
                            className={`absolute right-2 top-2 flex size-5 items-center justify-center rounded-full border-2 transition-colors ${
                              active ? 'border-primary bg-primary text-white' : 'border-slate-200 bg-white'
                            }`}
                            aria-hidden="true"
                          >
                            {active ? (
                              <span className="material-symbols-outlined text-xs">check</span>
                            ) : null}
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </section>

                <section>
                  <h4 className="mb-3 text-sm font-bold text-slate-900 sm:text-base">
                    Volunteering style
                  </h4>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <button
                      className={`group relative flex flex-col rounded-2xl border-2 p-6 focus:outline-none focus:ring-2 focus:ring-primary/40 ${
                        styles.includes('solo')
                          ? 'border-primary bg-primary/5'
                          : 'border-slate-100 bg-white hover:border-primary/30'
                      }`}
                      onClick={() => toggleStyle('solo')}
                      type="button"
                    >
                      <div className="mb-4 flex items-start justify-between">
                        <span className="material-symbols-outlined text-4xl text-primary">person</span>
                        <div
                          className={`flex size-6 items-center justify-center rounded-full border-2 ${
                            styles.includes('solo')
                              ? 'border-primary bg-primary text-white'
                              : 'border-slate-200 bg-white'
                          }`}
                        >
                          {styles.includes('solo') ? (
                            <span className="material-symbols-outlined text-[16px]">check</span>
                          ) : null}
                        </div>
                      </div>
                      <h5 className="text-left text-base font-extrabold text-primary">Solo</h5>
                      <p className="mt-1 text-left text-sm text-slate-600">
                        Independent tasks and self-paced projects.
                      </p>
                    </button>

                    <button
                      className={`group relative flex flex-col rounded-2xl border-2 p-6 focus:outline-none focus:ring-2 focus:ring-primary/40 ${
                        styles.includes('group')
                          ? 'border-primary bg-primary/5'
                          : 'border-slate-100 bg-white hover:border-primary/30'
                      }`}
                      onClick={() => toggleStyle('group')}
                      type="button"
                    >
                      <div className="mb-4 flex items-start justify-between">
                        <span
                          className={`material-symbols-outlined text-4xl ${
                            styles.includes('group') ? 'text-primary' : 'text-slate-400'
                          }`}
                        >
                          groups_3
                        </span>
                        <div
                          className={`flex size-6 items-center justify-center rounded-full border-2 ${
                            styles.includes('group')
                              ? 'border-primary bg-primary text-white'
                              : 'border-slate-200 bg-white'
                          }`}
                        >
                          {styles.includes('group') ? (
                            <span className="material-symbols-outlined text-[16px]">check</span>
                          ) : null}
                        </div>
                      </div>
                      <h5 className="text-left text-base font-extrabold text-slate-900">Group</h5>
                      <p className="mt-1 text-left text-sm text-slate-500">
                        Community events and team projects.
                      </p>
                    </button>
                  </div>
                </section>
              </div>
            ) : (
              <div className="space-y-10">
                <div>
                  <h3 className="text-xl font-black text-slate-900 sm:text-2xl">Refine matches</h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Tune time, commitment, distance, and preferences.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
                  <section>
                    <h4 className="mb-4 text-sm font-bold text-slate-900 sm:text-base">Date &amp; Time</h4>
                    <div className="rounded-2xl border-2 border-slate-100 bg-white p-4">
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
                      <h4 className="mb-4 text-sm font-bold text-slate-900 sm:text-base">Duration</h4>
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
                      <h4 className="mb-4 text-sm font-bold text-slate-900 sm:text-base">Commitment</h4>
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

                <section>
                  <div className="mb-4 flex items-center justify-between">
                    <h4 className="text-sm font-bold text-slate-900 sm:text-base">Distance</h4>
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
                    <h4 className="mb-4 text-sm font-bold text-slate-900 sm:text-base">Group size</h4>
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

                  <section className="space-y-3">
                    <h4 className="text-sm font-bold text-slate-900 sm:text-base">Preferences</h4>
                    <div className="flex items-center justify-between rounded-2xl border-2 border-slate-100 bg-white px-4 py-3">
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
                    <div className="flex items-center justify-between rounded-2xl border-2 border-slate-100 bg-white px-4 py-3">
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
            )}
          </div>

          <div className="flex items-center justify-between border-t border-slate-100 bg-white px-5 py-4 sm:px-6">
            <button
              className="rounded-xl px-4 py-2 text-sm font-bold text-slate-600 transition-colors hover:bg-slate-100 disabled:opacity-50"
              disabled={step === 1}
              onClick={() => setStep(1)}
              type="button"
            >
              Back
            </button>

            <div className="flex items-center gap-2">
              {step === 1 ? (
                <button
                  className="flex items-center gap-2 rounded-2xl bg-primary px-5 py-3 text-sm font-black text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 disabled:opacity-50"
                  disabled={!canContinue}
                  onClick={() => setStep(2)}
                  type="button"
                >
                  Continue
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </button>
              ) : (
                <button
                  className="flex items-center gap-2 rounded-2xl bg-primary px-5 py-3 text-sm font-black text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary/90"
                  onClick={applyAndClose}
                  type="button"
                >
                  Apply
                  <span className="material-symbols-outlined text-base">check</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InterestsModal

