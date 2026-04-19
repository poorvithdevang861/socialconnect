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
      : variant === 'success'
        ? 'btn-success-green'
        : variant === 'successOutline'
          ? 'btn-success-green-outline'
          : variant === 'action'
            ? 'btn-action'
            : variant === 'dark'
              ? 'btn-dark'
              : variant === 'none'
                ? ''
                : 'btn-primary'

  return (
    <button className={`${variantClass} sys-motion ${className}`.trim()} type={type} {...props}>
      {children}
    </button>
  )
}

export default Button

