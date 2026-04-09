function Footer() {
  return (
    <footer className="mt-12 border-t border-white/10 bg-shell py-10 text-white">
      <div className="mx-auto flex w-full max-w-[1600px] flex-col items-center justify-between gap-6 page-gutter-x md:flex-row">
        <div className="flex items-center gap-2 opacity-90">
          <div className="rounded bg-primary p-1 text-white shadow-orange-glow">
            <span className="material-symbols-outlined text-sm leading-none">diversity_3</span>
          </div>
          <p className="text-lg font-black tracking-tight text-white">CauseConnect</p>
        </div>
        <div className="flex flex-wrap justify-center gap-5 text-sm font-medium text-white/70 md:gap-8">
          <a className="transition-colors hover:text-primary" href="#">
            About Us
          </a>
          <a className="transition-colors hover:text-primary" href="#">
            Privacy Policy
          </a>
          <a className="transition-colors hover:text-primary" href="#">
            NGO Partnership
          </a>
          <a className="transition-colors hover:text-primary" href="#">
            Contact
          </a>
        </div>
        <p className="text-xs text-white/50">
          © 2024 CauseConnect Social Impact Hub. Built with love in Ahmedabad.
        </p>
      </div>
    </footer>
  )
}

export default Footer
