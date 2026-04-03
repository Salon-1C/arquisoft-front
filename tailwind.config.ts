import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'sans-serif'],
      },
      colors: {
        primary: {
          50:  'var(--color-primary-50)',
          100: 'var(--color-primary-100)',
          200: 'var(--color-primary-200)',
          300: 'var(--color-primary-300)',
          400: 'var(--color-primary-400)',
          500: 'var(--color-primary-500)',
          600: 'var(--color-primary-600)',
          700: 'var(--color-primary-700)',
          800: 'var(--color-primary-800)',
          900: 'var(--color-primary-900)',
        },
        gray: {
          50:  'var(--color-gray-50)',
          100: 'var(--color-gray-100)',
          200: 'var(--color-gray-200)',
          300: 'var(--color-gray-300)',
          400: 'var(--color-gray-400)',
          500: 'var(--color-gray-500)',
          600: 'var(--color-gray-600)',
          700: 'var(--color-gray-700)',
          800: 'var(--color-gray-800)',
          900: 'var(--color-gray-900)',
        },
        background:       'var(--color-background)',
        surface:          'var(--color-surface)',
        'surface-raised': 'var(--color-surface-raised)',
        text:             'var(--color-text)',
        'text-muted':     'var(--color-text-muted)',
        'text-strong':    'var(--color-text-strong)',
        border:           'var(--color-border)',
        'border-strong':  'var(--color-border-strong)',
        accent:           'var(--color-accent)',
        'accent-hover':   'var(--color-accent-hover)',
        'accent-subtle':  'var(--color-accent-subtle)',
        live:             'var(--color-live)',
        'live-subtle':    'var(--color-live-subtle)',
        success:          'var(--color-success)',
        warning:          'var(--color-warning)',
      },
      borderRadius: {
        sm:   'var(--radius-sm)',
        md:   'var(--radius-md)',
        lg:   'var(--radius-lg)',
        xl:   'var(--radius-xl)',
        full: 'var(--radius-full)',
      },
      boxShadow: {
        sm:      'var(--shadow-sm)',
        md:      'var(--shadow-md)',
        lg:      'var(--shadow-lg)',
        primary: 'var(--shadow-primary)',
      },
      transitionDuration: {
        fast: '150ms',
        base: '200ms',
        slow: '300ms',
      },
    },
  },
  plugins: [],
}

export default config
