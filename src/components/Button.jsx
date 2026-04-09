function Button({
  variant = 'primary',
  className = '',
  type = 'button',
  children,
  ...props
}) {
  const variantClass =
    variant === 'secondary'
      ? 'btn-secondary'
      : variant === 'dark'
        ? 'btn-dark'
        : variant === 'none'
          ? ''
          : 'btn-primary'

  return (
    <button className={`${variantClass} ${className}`.trim()} type={type} {...props}>
      {children}
    </button>
  )
}

export default Button

