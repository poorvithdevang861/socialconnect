import { Link } from 'react-router-dom'
import SectionHeader from '../components/SectionHeader'

function OrganizationSignupPage() {
  return (
    <main className="page-gutter-x mx-auto flex min-h-[100dvh] w-full max-w-[1600px] flex-col premium-shell bg-background-light py-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] md:min-h-screen md:py-6 md:pb-6">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-[10%] -top-[10%] h-[38%] w-[45%] rounded-full bg-primary/12 blur-[100px]" />
        <div className="absolute -bottom-[10%] -right-[10%] h-[38%] w-[45%] rounded-full bg-primary/6 blur-[100px]" />
      </div>

      <div className="flex flex-1 flex-col justify-center">
        <div className="mx-auto w-full max-w-lg">
          <Link
            className="mb-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 transition-colors hover:text-primary"
            to="/login"
          >
            <span className="material-symbols-outlined text-base text-inherit">arrow_back</span>
            Back to log in
          </Link>

          <div className="cc-card cc-card-pad-lg shadow-[0_10px_28px_rgba(15,15,16,0.08)]">
            <span className="premium-chip mb-4 border-primary/20 bg-primary/10 text-primary">
              For organizations
            </span>
            <SectionHeader
              title="NGO & nonprofit onboarding"
              subtitle="CauseConnect verifies hosts before listing volunteer opportunities. Complete a short request and our team will help you get set up."
              titleClassName="premium-h1 text-ink"
              className="mb-6"
            />

            <ul className="mb-8 space-y-3 text-sm text-slate-600">
              <li className="flex gap-2">
                <span className="material-symbols-outlined shrink-0 text-primary text-[20px]">check_circle</span>
                <span>Post verified events and manage volunteer sign-ups from one place.</span>
              </li>
              <li className="flex gap-2">
                <span className="material-symbols-outlined shrink-0 text-primary text-[20px]">check_circle</span>
                <span>Reach volunteers who already care about causes in your city.</span>
              </li>
              <li className="flex gap-2">
                <span className="material-symbols-outlined shrink-0 text-primary text-[20px]">check_circle</span>
                <span>We&apos;ll review your details and follow up within a few business days.</span>
              </li>
            </ul>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                className="btn-primary inline-flex h-12 flex-1 items-center justify-center gap-2 font-bold"
                href="mailto:partners@causeconnect.org?subject=CauseConnect%20organization%20signup"
              >
                <span className="material-symbols-outlined text-lg">outgoing_mail</span>
                Request organization access
              </a>
              <Link
                className="btn-secondary inline-flex h-12 flex-1 items-center justify-center font-bold"
                to="/signup"
              >
                Individual volunteer signup
              </Link>
            </div>

            <p className="premium-body mt-6 text-center text-xs text-slate-500">
              Looking to volunteer only?{' '}
              <Link className="font-bold text-primary hover:underline" to="/signup">
                Create a volunteer account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}

export default OrganizationSignupPage
