import containerQueries from '@tailwindcss/container-queries'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      xxs: '360px',
      xs: '420px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
      '3xl': '1728px',
      touch: { raw: '(hover: none) and (pointer: coarse)' },
      short: { raw: '(max-height: 780px)' },
      'max-md': { max: '767px' },
      'max-lg': { max: '1023px' },
      'max-xl': { max: '1279px' },
    },
    extend: {
      colors: {
        /** System palette */
        primary: '#FF9233',
        'primary-dark': '#e57d21',
        'primary-light': '#fff1e5',
        cta: '#FF9233',
        'brand-yellow': '#FFFFFF',
        /** Surfaces */
        beige: '#FFFFFF',
        ink: '#000000',
        'background-light': '#FFFFFF',
        'background-dark': '#1c1917',
        shell: '#0a0a0a',
        'shell-soft': '#1a1a1a',
        'shell-muted': '#2a2a2a',
        /** Navbar — warm charcoal (not flat black) for premium contrast with orange */
        'premium-nav-from': '#1f1d1b',
        'premium-nav-via': '#1a1715',
        'premium-nav-to': '#12100e',
        sage: '#B4D857',
        'success-green': '#B4D857',
      },
      fontFamily: {
        display: ['Public Sans', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0.25rem',
        lg: '0.5rem',
        xl: '0.75rem',
        '2xl': '1rem',
        '3xl': '1.25rem',
        full: '9999px',
      },
      boxShadow: {
        card: '0 2px 12px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 8px 24px rgba(0, 0, 0, 0.08)',
        premium: '0 14px 35px rgba(0, 0, 0, 0.2)',
        'orange-glow': '0 18px 45px rgba(234, 88, 12, 0.22)',
      },
    },
  },
  plugins: [containerQueries],
}

