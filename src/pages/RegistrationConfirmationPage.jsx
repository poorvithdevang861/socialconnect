import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import FriendsAttendingBlock from '../components/FriendsAttendingBlock'
import { registerGreenEarthEvent } from '../utils/registrations'

function IconWrap({ children }) {
  return (
    <span className="inline-flex size-[22px] shrink-0 items-center justify-center leading-none [&_.material-symbols-outlined]:!text-[20px] [&_.material-symbols-outlined]:leading-none">
      {children}
    </span>
  )
}

function RegistrationConfirmationPage() {
  const navigate = useNavigate()

  return (
    <main className="mx-auto w-full max-w-[1600px] bg-background-light pb-12 md:pb-16">
      <div className="px-4 pt-4 md:px-5 md:pt-5 lg:px-6 lg:pt-6">
        <div className="premium-shell bg-white px-4 py-5 shadow-[0_10px_28px_rgba(15,15,16,0.08)] md:px-6 md:py-6 lg:px-8 lg:py-8">
          <div className="section-gap-lg">
            <button
              className="group flex items-center gap-2 text-slate-500 transition-colors hover:text-primary"
              onClick={() => navigate('/event')}
              type="button"
            >
              <span className="material-symbols-outlined text-sm leading-none transition-transform group-hover:-translate-x-1">
                arrow_back
              </span>
              <span className="text-xs font-bold uppercase tracking-wider">Back to Event Details</span>
            </button>

            <div className="section-title-row space-y-3 text-center md:text-left">
              <span className="premium-chip border-primary/20 bg-primary/10 text-primary">
                Environment &amp; Sustainability
              </span>
              <h1 className="premium-h1 text-ink">Green Earth Tree Plantation</h1>
              <p className="premium-body mx-auto max-w-2xl text-slate-600 md:mx-0">
                Join our community in reforesting the local valley and creating a greener future for
                everyone.
              </p>
            </div>

            <div className="overflow-hidden rounded-2xl border border-black/[0.06] bg-white shadow-[0_8px_24px_rgba(15,15,16,0.06)]">
              <div className="h-1.5 w-full bg-primary" />
              <div className="p-5 md:p-7 lg:p-8">
                <div className="grid gap-6 border-b border-slate-100 pb-8 md:grid-cols-2">
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <span className="material-symbols-outlined leading-none">calendar_month</span>
                    </div>
                    <div>
                      <p className="mb-1 text-xs font-bold uppercase tracking-widest text-slate-400">
                        Date &amp; Time
                      </p>
                      <p className="text-lg font-bold leading-snug text-slate-900">Sat, 24 Oct, 2024</p>
                      <p className="text-slate-600">08:00 AM - 12:00 PM</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <span className="material-symbols-outlined leading-none">schedule</span>
                    </div>
                    <div>
                      <p className="mb-1 text-xs font-bold uppercase tracking-widest text-slate-400">
                        Time Commitment
                      </p>
                      <p className="text-lg font-bold leading-snug text-slate-900">4 Hours</p>
                      <p className="text-sm text-slate-600">One-time volunteer session</p>
                    </div>
                  </div>
                </div>

                <div className="border-b border-slate-100 py-8">
                  <h3 className="mb-6 text-[1.32rem] font-extrabold tracking-[-0.01em] text-slate-900">
                    <span className="inline-flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-[26px] leading-none">
                        inventory_2
                      </span>
                      What to Bring
                    </span>
                  </h3>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
                    <div className="flex items-center gap-3 rounded-2xl border border-black/[0.06] bg-background-light px-4 py-3.5">
                      <span className="material-symbols-outlined text-primary leading-none">water_drop</span>
                      <span className="font-semibold text-slate-800">Water bottle</span>
                    </div>
                    <div className="flex items-center gap-3 rounded-2xl border border-black/[0.06] bg-background-light px-4 py-3.5">
                      <span className="material-symbols-outlined text-primary leading-none">footprint</span>
                      <span className="font-semibold text-slate-800">Sturdy shoes</span>
                    </div>
                    <div className="flex items-center gap-3 rounded-2xl border border-black/[0.06] bg-background-light px-4 py-3.5">
                      <span className="material-symbols-outlined text-primary leading-none">light_mode</span>
                      <span className="font-semibold text-slate-800">Sun hat</span>
                    </div>
                  </div>
                </div>

                <div className="py-8">
                  <h3 className="mb-6 text-[1.32rem] font-extrabold tracking-[-0.01em] text-slate-900">
                    <span className="inline-flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-[26px] leading-none">
                        health_and_safety
                      </span>
                      Safety &amp; Guidelines
                    </span>
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3 text-slate-600">
                      <span className="material-symbols-outlined mt-0.5 shrink-0 text-lg leading-none text-primary">
                        check_circle
                      </span>
                      <span className="leading-relaxed">
                        Stay hydrated and take breaks as needed. Professional supervisors will be
                        present.
                      </span>
                    </li>
                    <li className="flex items-start gap-3 text-slate-600">
                      <span className="material-symbols-outlined mt-0.5 shrink-0 text-lg leading-none text-primary">
                        check_circle
                      </span>
                      <span className="leading-relaxed">
                        Please follow the instructions of your zone coordinator at all times.
                      </span>
                    </li>
                    <li className="flex items-start gap-3 text-slate-600">
                      <span className="material-symbols-outlined mt-0.5 shrink-0 text-lg leading-none text-primary">
                        check_circle
                      </span>
                      <span className="leading-relaxed">
                        All heavy tools and gloves will be provided on-site.
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="border-b border-slate-100 py-8">
                  <h3 className="mb-4 text-[1.32rem] font-extrabold tracking-[-0.01em] text-slate-900">
                    <span className="inline-flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-[26px] leading-none">
                        group
                      </span>
                      Friends
                    </span>
                  </h3>
                  <FriendsAttendingBlock variant="compact" />
                </div>

                <div className="mt-2 flex flex-col items-center gap-4 border-t border-slate-100 pt-8">
                  <Button
                    className="mx-auto min-h-[52px] w-auto min-w-[240px] gap-2.5 px-8 py-3.5 text-sm font-black uppercase tracking-wide sm:min-w-[280px] sm:px-10 sm:text-base"
                    onClick={() => {
                      registerGreenEarthEvent()
                      navigate('/event/success')
                    }}
                  >
                    <span className="leading-snug">Confirm Participation</span>
                    <IconWrap>
                      <span className="material-symbols-outlined text-white">volunteer_activism</span>
                    </IconWrap>
                  </Button>
                  <p className="max-w-md px-2 text-center text-xs leading-relaxed text-slate-400">
                    By confirming, you agree to our volunteer code of conduct and safety waiver. You
                    can cancel your participation up to 24 hours before the event.
                  </p>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-black/[0.06] bg-white shadow-[0_8px_24px_rgba(15,15,16,0.06)]">
              <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-start sm:justify-between md:p-6">
                <div className="flex gap-3">
                  <span className="material-symbols-outlined shrink-0 text-primary leading-none">
                    location_on
                  </span>
                  <div>
                    <p className="font-bold leading-snug text-slate-900">
                      Ahmedabad City Park, North Entrance
                    </p>
                    <p className="mt-1 text-sm text-slate-600">
                      Sabarmati Riverfront Road, Ahmedabad, Gujarat 380001
                    </p>
                  </div>
                </div>
                <a
                  className="btn-secondary inline-flex shrink-0 items-center justify-center px-5 py-2.5 text-xs font-black uppercase tracking-wider"
                  href="https://maps.google.com/?q=Ahmedabad+City+Park"
                  rel="noreferrer"
                  target="_blank"
                >
                  Get Directions
                </a>
              </div>
              <div className="group relative flex h-48 w-full items-center justify-center bg-slate-200">
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-60 grayscale transition-all duration-500 group-hover:grayscale-0"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC0acDosxWOIbhWKPJcrznUTqBOjfP4GnsEZa98kAg5hbiTw8MKK9jKZajKHxoOPh9gXWwNSwItcrQPTyHPlDCAtgm-5hSxiXVoXXqojacya29ykLeTFGd57FVqMQDEAAn1Jqe2T1lnguHojkK8l9kvTERHasP9ESyIFTldQdoGvEZBWKtEaUEGHhFuSSx1RgqZd9SNsa8eb10bObpk1mV1HvSn5em0g157CKBw-YeH08SAuLpyoZ26f74YB4utKTRXo8lD-EScN9A')",
                  }}
                />
                <div className="relative z-10 flex flex-col items-center gap-2">
                  <div className="flex h-10 w-10 animate-bounce items-center justify-center rounded-full bg-primary text-white shadow-lg">
                    <span className="material-symbols-outlined leading-none text-white">location_on</span>
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

export default RegistrationConfirmationPage
