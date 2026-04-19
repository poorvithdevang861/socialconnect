import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import { GREEN_EARTH_EVENT } from '../utils/registrations'
import { isAddedToCalendar, openGoogleCalendarAndSave, subscribeCalendarAdded } from '../utils/calendarAdded'

const SHARE_PATH = 'causeconnect.org/e/tree-plantation-24'
const SHARE_URL = `https://${SHARE_PATH}`

function IconWhatsApp({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  )
}

function IconInstagram({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  )
}

function IconX({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function RegistrationSuccessPage() {
  const navigate = useNavigate()
  const [copied, setCopied] = useState(false)
  const [, setCalTick] = useState(0)

  useEffect(() => {
    return subscribeCalendarAdded(() => setCalTick((t) => t + 1))
  }, [])

  const calendarAdded = isAddedToCalendar(GREEN_EARTH_EVENT.id)

  async function handleCopyLink() {
    try {
      await navigator.clipboard.writeText(SHARE_URL)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <main className="mx-auto min-h-[min(100vh,880px)] w-full max-w-[1600px] bg-background-light pb-[max(104px,calc(96px+env(safe-area-inset-bottom)))] pt-4 md:pb-10 md:pt-5">
      <div className="page-gutter-x">
        <div className="premium-shell overflow-hidden">
          {/* Header — success */}
          <div className="border-b border-black/[0.06] bg-gradient-to-b from-success-green/10 to-white px-4 py-8 text-center sm:px-6 md:py-10">
            <div className="mx-auto mb-5 flex size-16 items-center justify-center rounded-full border border-success-green/35 bg-success-green/15 text-emerald-800 shadow-sm sm:size-20">
              <span className="material-symbols-outlined text-4xl sm:text-[2.75rem]">check_circle</span>
            </div>
            <h1 className="premium-h1 text-neutral-900">You&apos;re in!</h1>
            <p className="premium-body mx-auto mt-2 max-w-md text-neutral-600">
              Registration confirmed. You&apos;re making a real difference in the community.
            </p>
          </div>

          {/* Body — 1 col mobile, 2 cols lg (event | share + actions) */}
          <div className="grid grid-cols-1 items-stretch gap-6 p-4 sm:p-6 lg:grid-cols-2 lg:gap-8 lg:p-8">
            <article className="flex min-h-0 min-w-0 flex-col overflow-hidden rounded-2xl border border-black/[0.08] bg-white shadow-[0_8px_24px_rgba(15,15,16,0.06)] lg:h-full">
              <div className="relative aspect-[16/10] w-full min-h-0 sm:aspect-video">
                <img
                  className="h-full w-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBHFg7Lb1J2UB23UIzivsG38PCbA_c-m8AsYnHhVdYIZWBEUgF2f1-PUAqHttRpyBndUM6WegLt-VYdkLI-4hrm7wQVnvQwfOkIzNNivEPrljPFkFhBzi0IiI05YdrOD8IBx7EvE4sBCl6YMaGdtQRWeFVwNpz27x5tMwVZSQwq7Z_lzeiV2kOIIaiXILdzZmoOGGlRyLZavPc-7qCzajqGxct-FQvYIYCiOqYfvl7BPc1W4YWCqERRPGKTsCC1NLwOxfQQb0ieeak"
                  alt="Volunteers at Green Earth Tree Plantation"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4">
                  <span className="inline-block rounded-full bg-white/95 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-neutral-900 shadow-sm backdrop-blur-sm sm:text-xs">
                    Upcoming event
                  </span>
                </div>
              </div>
              <div className="min-w-0 p-5 sm:p-6">
                <h2 className="text-xl font-extrabold leading-snug text-neutral-900 sm:text-2xl">
                  Green Earth Tree Plantation
                </h2>
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
                  <div className="flex min-w-0 gap-3">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <span className="material-symbols-outlined text-[22px]">calendar_today</span>
                    </span>
                    <div className="min-w-0">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">When</p>
                      <p className="mt-0.5 font-semibold text-neutral-900">Saturday, 24 Oct</p>
                      <p className="text-sm text-neutral-600">09:00 AM</p>
                    </div>
                  </div>
                  <div className="flex min-w-0 gap-3">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <span className="material-symbols-outlined text-[22px]">location_on</span>
                    </span>
                    <div className="min-w-0">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Where</p>
                      <p className="mt-0.5 font-semibold leading-snug text-neutral-900">
                        Central Park North, Meeting Point B
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </article>

            <aside className="flex min-h-0 min-w-0 flex-col gap-6 rounded-2xl border border-black/[0.08] bg-neutral-50/90 p-6 sm:p-7 lg:h-full">
              <div className="space-y-3">
                <h3 className="flex items-center gap-2 text-lg font-extrabold text-neutral-900">
                  <span className="material-symbols-outlined text-emerald-800">group</span>
                  Invite your friends
                </h3>
                <p className="text-sm leading-relaxed text-neutral-600">
                  Share the link so others can find this opportunity.
                </p>
                <div className="min-w-0 pt-0.5">
                  <label className="sr-only" htmlFor="success-share-url">
                    Event link
                  </label>
                  <div className="flex min-w-0 flex-col gap-2.5 sm:flex-row sm:items-stretch">
                    <input
                      className="min-w-0 flex-1 truncate rounded-xl border border-neutral-200 bg-white px-3 py-3 font-mono text-xs text-neutral-700 shadow-sm sm:text-sm"
                      id="success-share-url"
                      readOnly
                      type="text"
                      value={SHARE_PATH}
                    />
                    <button
                      className="inline-flex h-[46px] shrink-0 items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-white px-4 text-sm font-semibold text-neutral-900 transition-colors hover:bg-neutral-100 sm:h-auto sm:min-w-[100px]"
                      onClick={handleCopyLink}
                      type="button"
                      title="Copy link"
                    >
                      <span className="material-symbols-outlined text-xl">
                        {copied ? 'check' : 'content_copy'}
                      </span>
                      {copied ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-neutral-500">Share on</p>
                <div className="grid grid-cols-3 gap-3.5 sm:max-w-none">
                  <button
                    className="flex h-12 w-full max-h-14 items-center justify-center rounded-full bg-[#25D366] text-white transition-opacity hover:opacity-90"
                    title="Share on WhatsApp"
                    type="button"
                    aria-label="WhatsApp"
                  >
                    <IconWhatsApp className="size-7" />
                  </button>
                  <button
                    className="flex h-12 w-full max-h-14 items-center justify-center rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white transition-opacity hover:opacity-90"
                    title="Share on Instagram"
                    type="button"
                    aria-label="Instagram"
                  >
                    <IconInstagram className="size-7" />
                  </button>
                  <button
                    className="flex h-12 w-full max-h-14 items-center justify-center rounded-full bg-[#0f1419] text-white transition-opacity hover:opacity-90"
                    title="Share on X"
                    type="button"
                    aria-label="X"
                  >
                    <IconX className="size-6" />
                  </button>
                </div>
              </div>

              <div className="min-w-0">
                <Button
                  className="w-full justify-center gap-2 py-3.5 text-[15px] font-bold"
                  disabled={calendarAdded}
                  onClick={() => openGoogleCalendarAndSave(GREEN_EARTH_EVENT.id)}
                  type="button"
                  variant="secondary"
                >
                  <span className="material-symbols-outlined text-[22px]">
                    {calendarAdded ? 'event_available' : 'calendar_add_on'}
                  </span>
                  {calendarAdded ? 'Added to your calendar' : 'Add to my calendar'}
                </Button>
              </div>

              <div className="mt-auto flex min-w-0 flex-col gap-3.5 border-t border-black/[0.08] pt-6">
                <Button
                  className="w-full justify-center gap-2 py-3.5 text-[15px] font-bold"
                  onClick={() => navigate('/events')}
                  type="button"
                >
                  <span className="material-symbols-outlined text-[22px]">event_available</span>
                  View my events
                </Button>
                <Button
                  variant="secondary"
                  className="w-full justify-center gap-2 border-neutral-300 py-3.5 text-[15px] font-bold text-neutral-900"
                  onClick={() => navigate('/home')}
                  type="button"
                >
                  <span className="material-symbols-outlined text-[22px]">home</span>
                  Back to home
                </Button>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </main>
  )
}

export default RegistrationSuccessPage
