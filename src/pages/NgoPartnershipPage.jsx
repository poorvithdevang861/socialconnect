import { Link } from 'react-router-dom'
import StaticPageLayout from '../components/StaticPageLayout'

function NgoPartnershipPage() {
  return (
    <StaticPageLayout
      subtitle="List drives, manage volunteers, and grow your impact with CauseConnect."
      title="NGO partnership"
    >
      <p>
        We partner with verified nonprofits and community hosts to surface real volunteering opportunities. Share
        your mission, post shifts, and reach people who are ready to show up.
      </p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ['campaign', 'Post opportunities', 'Publish events with dates, locations, and capacity.'],
          ['groups', 'Reach volunteers', 'Appear in local discovery and cause-based filters.'],
          ['shield', 'Trust & safety', 'Verification flows to help volunteers feel confident.'],
        ].map(([icon, h, body]) => (
          <div className="rounded-2xl border border-primary/15 bg-primary/[0.04] p-5" key={h}>
            <span className="material-symbols-outlined text-2xl text-primary">{icon}</span>
            <h2 className="mt-2 text-base font-extrabold text-slate-900">{h}</h2>
            <p className="mt-1 text-sm text-slate-600">{body}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <Link className="btn-primary sys-motion inline-flex justify-center sm:min-w-[200px]" to="/signup/ngo">
          Register your organization
        </Link>
        <Link
          className="btn-secondary sys-motion inline-flex justify-center sm:min-w-[200px]"
          to="/contact"
        >
          Talk to us
        </Link>
      </div>
      <p className="text-sm text-slate-500">
        Already onboarded?{' '}
        <Link className="font-bold text-primary hover:underline" to="/ngo/login">
          NGO sign in
        </Link>
      </p>
    </StaticPageLayout>
  )
}

export default NgoPartnershipPage
