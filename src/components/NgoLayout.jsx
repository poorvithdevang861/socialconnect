function NgoLayout({ title, subtitle, maxWidthClass = 'max-w-6xl', children }) {
  return (
    <main className="mx-auto flex min-h-[100dvh] w-full max-w-[1600px] flex-col premium-shell bg-background-light py-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] md:min-h-screen md:py-6 md:pb-6">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-[10%] -top-[10%] h-[38%] w-[45%] rounded-full bg-primary/12 blur-[100px]" />
        <div className="absolute -bottom-[10%] -right-[10%] h-[38%] w-[45%] rounded-full bg-primary/6 blur-[100px]" />
      </div>

      <div className={`mx-auto w-full flex-1 ${maxWidthClass}`}>
        <span className="premium-chip border-primary/20 bg-primary/10 text-primary">NGO dashboard</span>
        <h1 className="premium-h1 mt-3 text-ink">{title}</h1>
        {subtitle ? <p className="premium-body mt-1">{subtitle}</p> : null}
        <div className="mt-6 w-full min-w-0">{children}</div>
      </div>
    </main>
  )
}

export default NgoLayout
