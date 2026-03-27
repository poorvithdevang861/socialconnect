import { useNavigate } from 'react-router-dom'

function RegistrationSuccessPage() {
  const navigate = useNavigate()

  return (
    <main className="flex flex-grow items-center justify-center px-6 py-12">
      <div className="w-full max-w-xl">
        <div className="animate-fade-up text-center">
          <div className="relative mb-6 inline-flex h-24 w-24 items-center justify-center rounded-full bg-green-100 text-green-600">
            <span className="material-symbols-outlined text-6xl">check_circle</span>
            <div className="absolute -right-2 -top-2 h-4 w-4 animate-pulse rounded-full bg-primary" />
            <div className="absolute -left-6 top-10 h-3 w-3 rounded-full bg-blue-400" />
            <div className="absolute -bottom-2 left-10 h-4 w-4 rounded-full bg-yellow-400" />
          </div>
          <h2 className="mb-3 text-4xl font-bold text-slate-900">You&apos;re In!</h2>
          <p className="text-lg text-slate-600">
            Registration confirmed. You&apos;re making a real difference in the community!
          </p>
        </div>

        <div className="animate-fade-up-delay mt-8 overflow-hidden cc-card border-slate-100 shadow-xl shadow-primary/5">
          <div className="relative aspect-video w-full">
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 to-transparent" />
            <img
              className="h-full w-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBHFg7Lb1J2UB23UIzivsG38PCbA_c-m8AsYnHhVdYIZWBEUgF2f1-PUAqHttRpyBndUM6WegLt-VYdkLI-4hrm7wQVnvQwfOkIzNNivEPrljPFkFhBzi0IiI05YdrOD8IBx7EvE4sBCl6YMaGdtQRWeFVwNpz27x5tMwVZSQwq7Z_lzeiV2kOIIaiXILdzZmoOGGlRyLZavPc-7qCzajqGxct-FQvYIYCiOqYfvl7BPc1W4YWCqERRPGKTsCC1NLwOxfQQb0ieeak"
              alt="Volunteers planting trees"
            />
            <div className="absolute bottom-4 left-6 z-20">
              <span className="rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                Upcoming Event
              </span>
            </div>
          </div>
          <div className="p-6">
            <h3 className="mb-2 text-2xl font-bold text-slate-900">Green Earth Tree Plantation</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-slate-600">
                <span className="material-symbols-outlined text-primary">calendar_today</span>
                <span className="text-base font-medium">Saturday, 24 Oct • 09:00 AM</span>
              </div>
              <div className="flex items-center gap-3 text-slate-600">
                <span className="material-symbols-outlined text-primary">location_on</span>
                <span className="text-base font-medium">Central Park North, Meeting Point B</span>
              </div>
            </div>
          </div>
        </div>

        <div className="animate-fade-up-delay-2 mb-10 mt-8 w-full space-y-4">
          <button className="w-full rounded-xl bg-primary py-4 text-lg font-bold text-white transition-all active:scale-[0.98] hover:bg-primary/90">
            <span className="inline-flex items-center gap-3">
              <span className="material-symbols-outlined">calendar_add_on</span>
              Add to Calendar
            </span>
          </button>
        </div>

        <div className="animate-fade-up-delay-2 w-full rounded-2xl border border-primary/10 bg-primary/5 p-6">
          <h4 className="mb-4 flex items-center justify-center gap-2 text-center font-semibold text-slate-800">
            <span className="material-symbols-outlined text-primary">group</span>
            Invite your friends
          </h4>
          <div className="mb-6 flex items-center gap-2 rounded-lg border border-slate-200 bg-white p-2">
            <input
              className="flex-grow border-none bg-transparent px-2 font-mono text-sm text-slate-500 focus:ring-0"
              type="text"
              value="causeconnect.org/e/tree-plantation-24"
              readOnly
            />
            <button className="rounded-md bg-slate-100 p-2 text-primary transition-colors hover:bg-slate-200">
              <span className="material-symbols-outlined text-xl">content_copy</span>
            </button>
          </div>
          <div className="flex justify-center gap-6">
            <button
              className="h-12 w-12 rounded-full bg-[#25D366] text-white transition-opacity hover:opacity-90"
              title="Share on WhatsApp"
            />
            <button
              className="h-12 w-12 rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white transition-opacity hover:opacity-90"
              title="Share on Instagram"
            />
            <button
              className="h-12 w-12 rounded-full bg-[#1DA1F2] text-white transition-opacity hover:opacity-90"
              title="Share on Twitter"
            />
          </div>
        </div>

        <div className="mt-8 flex w-full flex-col gap-4 sm:flex-row">
          <button
            className="flex-1 rounded-xl border border-primary/20 py-3 text-center font-semibold text-primary transition-all hover:bg-primary/5"
            onClick={() => navigate('/events')}
          >
            View My Events
          </button>
          <button
            className="flex-1 rounded-xl bg-slate-100 py-3 text-center font-semibold text-slate-700 transition-all hover:bg-slate-200"
            onClick={() => navigate('/home')}
          >
            Back to Home
          </button>
        </div>
      </div>
    </main>
  )
}

export default RegistrationSuccessPage
