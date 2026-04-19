import StaticPageLayout from '../components/StaticPageLayout'

function PrivacyPolicyPage() {
  return (
    <StaticPageLayout
      subtitle="How we handle your information on CauseConnect (demo copy for the product UI)."
      title="Privacy policy"
    >
      <section className="space-y-4">
        <h2 className="text-lg font-extrabold text-slate-900">What we collect</h2>
        <p>
          Account details you provide (such as name and email), event registrations, wishlist and calendar preferences
          stored locally in your browser for this demo experience, and usage data needed to run the app.
        </p>
      </section>
      <section className="space-y-4">
        <h2 className="text-lg font-extrabold text-slate-900">How we use it</h2>
        <p>
          To show relevant opportunities, remember your volunteer activity, and improve the product. We do not sell
          your personal data.
        </p>
      </section>
      <section className="space-y-4">
        <h2 className="text-lg font-extrabold text-slate-900">Your choices</h2>
        <p>
          You can clear site data in your browser to remove locally stored preferences. For full production apps,
          additional rights (access, deletion) would apply per applicable law.
        </p>
      </section>
      <p className="text-xs text-slate-400">Last updated April 2026.</p>
    </StaticPageLayout>
  )
}

export default PrivacyPolicyPage
