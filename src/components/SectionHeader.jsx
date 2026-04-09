function SectionHeader({ title, subtitle, action = null, titleClassName = '', className = '' }) {
  return (
    <div className={`flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between ${className}`.trim()}>
      <div className="min-w-0">
        <h2 className={`premium-h2 ${titleClassName}`.trim()}>{title}</h2>
        {subtitle ? <p className="premium-body mt-1">{subtitle}</p> : null}
      </div>
      {action}
    </div>
  )
}

export default SectionHeader

