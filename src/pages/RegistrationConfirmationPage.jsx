import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import FriendsAttendingBlock from '../components/FriendsAttendingBlock'
import { registerGreenEarthEvent } from '../utils/registrations'
import { GREEN_EARTH_VENUE_QUERY, googleMapsSearchHref } from '../utils/maps'

function IconWrap({ children }) {
  return (
    <span className="inline-flex size-[22px] shrink-0 items-center justify-center leading-none [&_.material-symbols-outlined]:!text-[20px] [&_.material-symbols-outlined]:leading-none">
      {children}
    </span>
  )
}

function SectionHeading({ icon, children }) {
  return (
    <h2 className="mb-4 flex items-center gap-2.5 text-lg font-extrabold tracking-tight text-slate-900 md:text-xl">
      <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/12 text-primary">
        <span className="material-symbols-outlined text-[22px] leading-none">{icon}</span>
      </span>
      <span className="min-w-0">{children}</span>
    </h2>
  )
}

function RegistrationConfirmationPage() {
  const navigate = useNavigate()

  return (
    <main className="min-w-0 overflow-x-hidden bg-background-light pb-12 md:pb-16">
      <div className="mx-auto w-full max-w-[1600px] px-4 pt-4 md:px-5 md:pt-5 lg:px-6 lg:pt-6">
        <div className="premium-shell min-w-0 bg-white px-4 py-5 shadow-[0_10px_28px_rgba(15,15,16,0.08)] md:px-6 md:py-6 lg:px-8 lg:py-8">
          <div className="section-gap-lg">
            <button
              className="group flex w-fit max-w-full items-center gap-2 text-slate-500 transition-colors hover:text-primary"
              onClick={() => navigate('/event')}
              type="button"
            >
              <span className="material-symbols-outlined shrink-0 text-sm leading-none transition-transform group-hover:-translate-x-1">
                arrow_back
              </span>
              <span className="text-left text-xs font-bold uppercase tracking-wider">
                Back to Event Details
              </span>
            </button>

            <div className="section-title-row space-y-3 text-center md:text-left">
              <span className="premium-chip border-primary/25 bg-primary/12 text-primary">
                Environment &amp; Sustainability
              </span>
              <h1 className="premium-h1 text-balance text-ink">Green Earth Tree Plantation</h1>
              <p className="premium-body mx-auto max-w-2xl text-balance text-slate-700 md:mx-0">
                Join our community in reforesting the local valley and creating a greener future for
                everyone.
              </p>
            </div>

            {/* Main card: grid 1 = meta row; grid 2 = two columns (bring+friends | safety); CTA full width */}
            <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-[0_8px_24px_rgba(15,15,16,0.06)]">
              <div className="h-1.5 w-full bg-gradient-to-r from-primary to-orange-400" />
              <div className="p-5 md:p-7 lg:p-8">
                {/* Grid 1 — date & commitment */}
                <div className="grid grid-cols-1 gap-5 border-b border-slate-100 pb-6 sm:grid-cols-2 sm:gap-6 md:gap-8">
                  <div className="flex min-w-0 gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/12 text-primary ring-1 ring-primary/15">
                      <span className="material-symbols-outlined leading-none">calendar_month</span>
                    </div>
                    <div className="min-w-0">
                      <p className="mb-1 text-[11px] font-bold uppercase tracking-widest text-slate-500">
                        Date &amp; Time
                      </p>
                      <p className="text-lg font-extrabold leading-snug text-slate-900">Sat, 24 Oct, 2026</p>
                      <p className="mt-0.5 text-sm text-slate-700">08:00 AM – 12:00 PM</p>
                    </div>
                  </div>
                  <div className="flex min-w-0 gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/12 text-primary ring-1 ring-primary/15">
                      <span className="material-symbols-outlined leading-none">schedule</span>
                    </div>
                    <div className="min-w-0">
                      <p className="mb-1 text-[11px] font-bold uppercase tracking-widest text-slate-500">
                        Time Commitment
                      </p>
                      <p className="text-lg font-extrabold leading-snug text-slate-900">4 Hours</p>
                      <p className="mt-0.5 text-sm text-slate-700">One-time volunteer session</p>
                    </div>
                  </div>
                </div>

                {/* Grid 2 — left: what to bring + friends · right: safety */}
                <div className="grid grid-cols-1 gap-6 border-b border-slate-100 py-6 md:py-7 lg:grid-cols-2 lg:gap-8">
                  <div className="min-w-0 space-y-6 lg:space-y-7">
                    <div>
                      <SectionHeading icon="inventory_2">What to bring</SectionHeading>
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-3">
                        {[
                          ['water_drop', 'Water bottle'],
                          ['footprint', 'Sturdy shoes'],
                          ['light_mode', 'Sun hat'],
                        ].map(([ic, label]) => (
                          <div
                            className="flex min-w-0 items-center gap-3 rounded-xl border border-slate-200/90 bg-slate-50/90 px-3.5 py-3 text-slate-900 shadow-sm"
                            key={label}
                          >
                            <span className="material-symbols-outlined shrink-0 text-primary">{ic}</span>
                            <span className="min-w-0 break-words text-sm font-semibold">{label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <SectionHeading icon="group">Friends</SectionHeading>
                      <div className="rounded-xl border border-slate-100 bg-slate-50/80 px-4 py-4">
                        <FriendsAttendingBlock variant="compact" />
                      </div>
                    </div>
                  </div>
                  <div className="min-w-0 lg:border-l lg:border-slate-100 lg:pl-8">
                    <SectionHeading icon="health_and_safety">Safety &amp; guidelines</SectionHeading>
                    <ul className="grid gap-3">
                      {[
                        'Stay hydrated and take breaks as needed. Professional supervisors will be present.',
                        'Please follow the instructions of your zone coordinator at all times.',
                        'All heavy tools and gloves will be provided on-site.',
                      ].map((text) => (
                        <li
                          className="flex gap-3 rounded-xl border border-slate-100 bg-white px-3.5 py-3 text-sm leading-relaxed text-slate-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]"
                          key={text}
                        >
                          <span className="material-symbols-outlined mt-0.5 shrink-0 text-[20px] leading-none text-primary">
                            check_circle
                          </span>
                          <span className="min-w-0 break-words">{text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 md:pt-7">
                  <div className="grid gap-4 rounded-2xl border-2 border-primary/20 bg-gradient-to-b from-primary/[0.07] to-primary/[0.02] p-5 sm:p-6">
                    <Button
                      className="mx-auto w-full max-w-sm justify-center gap-2.5 py-3.5 text-sm font-black uppercase tracking-wide sm:text-base"
                      onClick={() => {
                        registerGreenEarthEvent()
                        navigate('/event/success')
                      }}
                    >
                      <span className="leading-snug">Confirm participation</span>
                      <IconWrap>
                        <span className="material-symbols-outlined text-white">volunteer_activism</span>
                      </IconWrap>
                    </Button>
                    <p className="mx-auto max-w-md text-center text-xs leading-relaxed text-slate-600">
                      By confirming, you agree to our volunteer code of conduct and safety waiver. You can
                      cancel your participation up to 24 hours before the event.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map — bottom, full width (original order) */}
            <div className="overflow-hidden rounded-2xl border border-black/[0.06] bg-white shadow-[0_8px_24px_rgba(15,15,16,0.06)]">
              <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-start sm:justify-between md:p-6">
                <div className="flex min-w-0 gap-3">
                  <span className="material-symbols-outlined shrink-0 text-primary leading-none">location_on</span>
                  <div className="min-w-0">
                    <p className="font-bold leading-snug text-slate-900">Ahmedabad City Park, North Entrance</p>
                    <p className="mt-1 break-words text-sm text-slate-600">
                      Sabarmati Riverfront Road, Ahmedabad, Gujarat 380001
                    </p>
                  </div>
                </div>
                <a
                  className="btn-secondary inline-flex shrink-0 items-center justify-center px-5 py-2.5 text-xs font-black uppercase tracking-wider transition-transform hover:scale-[1.02] active:scale-[0.98]"
                  href={googleMapsSearchHref(GREEN_EARTH_VENUE_QUERY)}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Get Directions
                </a>
              </div>
              <a
                className="group relative flex h-48 w-full cursor-pointer items-center justify-center bg-slate-200 outline-none transition-all hover:brightness-[1.03] focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                href={googleMapsSearchHref(GREEN_EARTH_VENUE_QUERY)}
                rel="noopener noreferrer"
                target="_blank"
                title="Open in Google Maps"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-60 grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:opacity-80"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC0acDosxWOIbhWKPJcrznUTqBOjfP4GnsEZa98kAg5hbiTw8MKK9jKZajKHxoOPh9gXWwNSwItcrQPTyHPlDCAtgm-5hSxiXVoXXqojacya29ykLeTFGd57FVqMQDEAAn1Jqe2T1lnguHojkK8l9kvTERHasP9ESyIFTldQdoGvEZBWKtEaUEGHhFuSSx1RgqZd9SNsa8eb10bObpk1mV1HvSn5em0g157CKBw-YeH08SAuLpyoZ26f74YB4utKTRXo8lD-EScN9A')",
                  }}
                />
                <div className="relative z-10 flex flex-col items-center gap-2">
                  <div className="flex h-10 w-10 animate-bounce items-center justify-center rounded-full bg-primary text-white shadow-lg ring-4 ring-white/40 transition-transform group-hover:scale-110">
                    <span className="material-symbols-outlined leading-none text-white">location_on</span>
                  </div>
                  <span className="rounded-full bg-white/95 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-slate-700 shadow-md">
                    Tap to open Maps
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default RegistrationConfirmationPage
