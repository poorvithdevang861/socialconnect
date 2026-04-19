import StaticPageLayout from '../components/StaticPageLayout'

function AboutPage() {
  return (
    <StaticPageLayout
      subtitle="CauseConnect helps volunteers find trusted opportunities and NGOs reach people who care."
      title="About CauseConnect"
    >
      <p>
        We believe small acts of service add up. CauseConnect is a social impact hub where you can discover events
        near you, track your volunteering, and invite friends to join you.
      </p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ['volunteer_activism', 'Volunteer-first', 'Built around real-world shifts you can actually join.'],
          ['verified_user', 'Verified partners', 'We highlight NGOs and hosts you can trust.'],
          ['analytics', 'Track impact', 'See your contributions and calendar in one place.'],
          ['diversity_3', 'Community', 'Bring friends and grow causes together.'],
        ].map(([icon, h, body]) => (
          <div className="rounded-2xl border border-black/[0.06] bg-slate-50/80 p-4 sm:p-5" key={h}>
            <span className="material-symbols-outlined text-2xl text-primary">{icon}</span>
            <h2 className="mt-2 text-base font-extrabold text-slate-900">{h}</h2>
            <p className="mt-1 text-sm text-slate-600">{body}</p>
          </div>
        ))}
      </div>
      <p className="text-sm text-slate-500">
        Headquartered in Ahmedabad with volunteers and partners across India.
      </p>
    </StaticPageLayout>
  )
}

export default AboutPage
