import SectionHeader from './SectionHeader'

/**
 * Shared shell for About, Contact, Privacy, NGO Partnership.
 * Responsive: mobile-first, page-gutter-x, max-w 1600 — see .cursor/responsive.md (sm/md/lg).
 */
function StaticPageLayout({ title, subtitle, children, titleClassName = 'premium-h1 text-neutral-900' }) {
  return (
    <main className="mx-auto w-full max-w-[1600px] pb-12 md:pb-16 lg:pb-20">
      <div className="page-gutter-x pt-4 sm:pt-5 md:pt-6 lg:pt-8">
        <div className="premium-shell bg-white p-5 sm:p-6 md:p-8 lg:p-10">
          <SectionHeader title={title} subtitle={subtitle} titleClassName={titleClassName} />
          <div className="mt-6 space-y-6 text-[15px] leading-relaxed text-slate-600 md:mt-8 md:text-base">
            {children}
          </div>
        </div>
      </div>
    </main>
  )
}

export default StaticPageLayout
