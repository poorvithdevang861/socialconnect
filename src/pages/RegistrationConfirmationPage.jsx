import { useNavigate } from 'react-router-dom'
import { registerGreenEarthEvent } from '../utils/registrations'

function RegistrationConfirmationPage() {
  const navigate = useNavigate()

  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <button
        className="group mb-8 flex items-center gap-2 text-slate-500 transition-colors hover:text-primary"
        onClick={() => navigate('/event')}
      >
        <span className="material-symbols-outlined text-sm transition-transform group-hover:-translate-x-1">
          arrow_back
        </span>
        <span className="text-sm font-bold uppercase tracking-wider">Back to Event Details</span>
      </button>

      <div className="mb-10 text-center md:text-left">
        <span className="mb-4 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary">
          Environment &amp; Sustainability
        </span>
        <h1 className="mb-4 text-4xl font-black tracking-tight text-slate-900 md:text-5xl">
          Green Earth Tree Plantation
        </h1>
        <p className="text-lg text-slate-600">
          Join our community in reforesting the local valley and creating a greener future for
          everyone.
        </p>
      </div>

      <div className="overflow-hidden cc-card border-primary/5 shadow-2xl shadow-primary/5">
        <div className="h-2 w-full bg-primary" />
        <div className="p-8 md:p-12">
          <div className="grid gap-8 border-b border-slate-100 pb-10 md:grid-cols-2">
            <div className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <span className="material-symbols-outlined">calendar_month</span>
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
                <span className="material-symbols-outlined">schedule</span>
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

          <div className="border-b border-slate-100 py-10">
            <h3 className="mb-6 flex items-center gap-2 text-xl font-bold text-slate-900">
              <span className="material-symbols-outlined text-primary">inventory_2</span>
              What to Bring
            </h3>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              <div className="flex items-center gap-4 rounded-lg bg-background-light p-4">
                <span className="material-symbols-outlined text-primary">water_drop</span>
                <span className="font-medium">Water bottle</span>
              </div>
              <div className="flex items-center gap-4 rounded-lg bg-background-light p-4">
                <span className="material-symbols-outlined text-primary">footprint</span>
                <span className="font-medium">Sturdy shoes</span>
              </div>
              <div className="flex items-center gap-4 rounded-lg bg-background-light p-4">
                <span className="material-symbols-outlined text-primary">light_mode</span>
                <span className="font-medium">Sun hat</span>
              </div>
            </div>
          </div>

          <div className="py-10">
            <h3 className="mb-6 flex items-center gap-2 text-xl font-bold text-slate-900">
              <span className="material-symbols-outlined text-primary">health_and_safety</span>
              Safety &amp; Guidelines
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-slate-600">
                <span className="material-symbols-outlined mt-1 text-sm text-primary">check_circle</span>
                <span>
                  Stay hydrated and take breaks as needed. Professional supervisors will be present.
                </span>
              </li>
              <li className="flex items-start gap-3 text-slate-600">
                <span className="material-symbols-outlined mt-1 text-sm text-primary">check_circle</span>
                <span>Please follow the instructions of your zone coordinator at all times.</span>
              </li>
              <li className="flex items-start gap-3 text-slate-600">
                <span className="material-symbols-outlined mt-1 text-sm text-primary">check_circle</span>
                <span>All heavy tools and gloves will be provided on-site.</span>
              </li>
            </ul>
          </div>

          <div className="mt-6 flex flex-col items-center gap-4">
            <button
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3.5 text-base font-black uppercase tracking-normal text-white shadow-xl shadow-primary/20 transition-all hover:bg-primary/90 sm:gap-3 sm:py-5 sm:text-lg sm:tracking-wider"
              onClick={() => {
                registerGreenEarthEvent()
                navigate('/event/success')
              }}
            >
              <span>Confirm Participation</span>
              <span className="material-symbols-outlined">volunteer_activism</span>
            </button>
            <p className="px-4 text-center text-xs text-slate-400">
              By confirming, you agree to our volunteer code of conduct and safety waiver. You can
              cancel your participation up to 24 hours before the event.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12 overflow-hidden cc-card shadow-lg">
        <div className="flex flex-col gap-3 border-b border-slate-100 p-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex gap-3">
            <span className="material-symbols-outlined shrink-0 text-primary">location_on</span>
            <div>
              <p className="font-bold leading-snug text-slate-900">Ahmedabad City Park, North Entrance</p>
              <p className="mt-1 text-sm text-slate-600">
                Sabarmati Riverfront Road, Ahmedabad, Gujarat 380001
              </p>
            </div>
          </div>
          <a
            className="shrink-0 text-xs font-bold uppercase tracking-wider text-primary hover:underline"
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
              <span className="material-symbols-outlined">location_on</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default RegistrationConfirmationPage
