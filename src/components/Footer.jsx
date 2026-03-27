function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200 py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 md:flex-row md:px-10">
        <div className="flex items-center gap-2 opacity-50">
          <div className="rounded bg-primary p-1 text-white">
            <span className="material-symbols-outlined text-sm leading-none">diversity_3</span>
          </div>
          <p className="text-lg font-black tracking-tight text-slate-900">CauseConnect</p>
        </div>
        <div className="flex gap-8 text-sm font-medium text-slate-500">
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
        <p className="text-xs text-slate-400">
          © 2024 CauseConnect Social Impact Hub. Built with love in Ahmedabad.
        </p>
      </div>
    </footer>
  )
}

export default Footer
