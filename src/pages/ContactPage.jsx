import { Link } from 'react-router-dom'
import StaticPageLayout from '../components/StaticPageLayout'

function ContactPage() {
  return (
    <StaticPageLayout
      subtitle="Questions, partnerships, or feedback — we read every message."
      title="Contact us"
    >
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        <div className="rounded-2xl border border-black/[0.06] bg-slate-50/90 p-5 sm:p-6 lg:col-span-2">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">Email</h2>
          <a className="mt-2 block text-lg font-bold text-primary hover:underline" href="mailto:hello@causeconnect.org">
            hello@causeconnect.org
          </a>
          <p className="mt-2 text-sm text-slate-500">We usually reply within 2 business days.</p>
        </div>
        <div className="rounded-2xl border border-black/[0.06] bg-slate-50/90 p-5 sm:p-6 lg:col-span-2">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">Office</h2>
          <p className="mt-2 font-semibold text-slate-900">Ahmedabad, Gujarat</p>
          <p className="mt-1 text-sm text-slate-600">India · Remote-friendly team</p>
        </div>
      </div>
      <p className="text-sm text-slate-500">
        For NGO partnerships, see our{' '}
        <Link className="font-bold text-primary hover:underline" to="/ngo-partnership">
          NGO partnership
        </Link>{' '}
        page.
      </p>
    </StaticPageLayout>
  )
}

export default ContactPage
