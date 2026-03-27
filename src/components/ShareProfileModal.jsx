import { useEffect } from 'react'

function buildXUrl({ url, text }) {
  const u = new URL('https://twitter.com/intent/tweet')
  u.searchParams.set('text', `${text} — ${url}`)
  return u.toString()
}

function buildWhatsAppUrl({ url, text }) {
  const u = new URL('https://wa.me/')
  u.searchParams.set('text', `${text}: ${url}`)
  return u.toString()
}

function ShareProfileModal({
  open,
  onClose,
  onCopy,
  label = 'Share',
  title = 'Share with friends',
  url = 'https://causeconnect.org/u/arjun-patel',
  shareText = 'Check out my volunteering impact on CauseConnect',
}) {
  useEffect(() => {
    if (!open) return
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose?.()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[120]">
      <button
        aria-label="Close share modal"
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        type="button"
      />

      <div className="absolute inset-0 mx-auto flex w-full items-center justify-center p-4">
        <div className="cc-card w-full max-w-md overflow-hidden shadow-2xl">
          <div className="flex items-start justify-between border-b border-slate-100 px-5 py-4">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                {label}
              </p>
              <h3 className="mt-1 text-lg font-black text-slate-900">{title}</h3>
            </div>
            <button
              aria-label="Close"
              className="rounded-xl p-2 text-slate-600 transition-colors hover:bg-slate-100"
              onClick={onClose}
              type="button"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          <div className="px-5 py-5">
            <div className="cc-card-soft flex items-center gap-2 px-3 py-2">
              <span className="material-symbols-outlined text-base text-slate-400">link</span>
              <input
                className="w-full border-none bg-transparent text-xs font-semibold text-slate-600 focus:ring-0"
                readOnly
                type="text"
                value={url}
              />
              <button
                className="rounded-lg bg-slate-100 p-2 text-primary transition-colors hover:bg-slate-200"
                onClick={onCopy}
                type="button"
              >
                <span className="material-symbols-outlined text-lg">content_copy</span>
              </button>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-3">
              <a
                className="cc-card-soft flex flex-col items-center gap-2 px-3 py-4 text-center transition-colors hover:border-primary/30"
                href={buildWhatsAppUrl({ url, text: shareText })}
                rel="noreferrer"
                target="_blank"
              >
                <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600">
                  <span className="material-symbols-outlined">chat</span>
                </div>
                <span className="text-xs font-black text-slate-900">WhatsApp</span>
              </a>

              <a
                className="cc-card-soft flex flex-col items-center gap-2 px-3 py-4 text-center transition-colors hover:border-primary/30"
                href="https://www.instagram.com/"
                onClick={onCopy}
                rel="noreferrer"
                target="_blank"
              >
                <div className="flex size-10 items-center justify-center rounded-xl bg-pink-500/10 text-pink-600">
                  <span className="material-symbols-outlined">photo_camera</span>
                </div>
                <span className="text-xs font-black text-slate-900">Instagram</span>
              </a>

              <a
                className="cc-card-soft flex flex-col items-center gap-2 px-3 py-4 text-center transition-colors hover:border-primary/30"
                href={buildXUrl({ url, text: shareText })}
                rel="noreferrer"
                target="_blank"
              >
                <div className="flex size-10 items-center justify-center rounded-xl bg-slate-900/10 text-slate-900">
                  <span className="material-symbols-outlined">alternate_email</span>
                </div>
                <span className="text-xs font-black text-slate-900">X</span>
              </a>
            </div>

            <p className="mt-4 text-xs text-slate-400">
              Instagram doesn’t support direct link sharing on web — we’ll copy your link so you can
              paste it in a story or DM.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShareProfileModal

