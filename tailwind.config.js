// tailwind.config.js
const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './composables/**/*.{js,ts}',
    './plugins/**/*.{js,ts}',
    './app.vue',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#FFFFFF',
        card: '#F9FAFB',
        accent: '#16A34A',
        mute: '#6B7280',
        text: '#333333',
      },
      textColor: { DEFAULT: '#333333' },
      fontFamily: {
        sans: ['Manrope', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol']
      },
      borderRadius: { xl2: '1.25rem' },
      boxShadow: {
        soft: '0 4px 12px rgba(0,0,0,.1)',
        ring: '0 0 0 6px rgba(22,163,74,.2)',
      },
    },
  },
  plugins: [
    plugin(({ addComponents, theme }) => {
      addComponents({
        '.container-std': {
          maxWidth: theme('maxWidth.6xl'),
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: theme('spacing.4'),
          paddingRight: theme('spacing.4'),
          '@screen md': { paddingLeft: theme('spacing.6'), paddingRight: theme('spacing.6') },
          '@screen lg': { paddingLeft: theme('spacing.8'), paddingRight: theme('spacing.8') },
        },
        '.btn': {
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: theme('borderRadius.xl2'),
          paddingLeft: theme('spacing.5'),
          paddingRight: theme('spacing.5'),
          paddingTop: theme('spacing.3'),
          paddingBottom: theme('spacing.3'),
          fontWeight: theme('fontWeight.semibold'),
          transitionProperty: 'all',
        },
        '.btn-primary': {
          backgroundColor: theme('colors.accent'),
          color: theme('colors.white'),
          '&:hover': { boxShadow: theme('boxShadow.ring') },
        },
        '.btn-dark': {
          backgroundColor: 'rgba(0,0,0,0.05)',
          color: theme('colors.text'),
          '&:hover': { backgroundColor: 'rgba(0,0,0,0.1)' },
        },
        '.card': {
          borderRadius: theme('borderRadius.xl2'),
          boxShadow: theme('boxShadow.soft'),
          border: '1px solid rgba(0,0,0,0.05)',
          backgroundColor: theme('colors.card'),
        },
        '.tag': {
          display: 'inline-flex',
          alignItems: 'center',
          borderRadius: '9999px',
          paddingLeft: theme('spacing.3'),
          paddingRight: theme('spacing.3'),
          paddingTop: theme('spacing.1'),
          paddingBottom: theme('spacing.1'),
          fontSize: theme('fontSize.sm')[0],
          fontWeight: theme('fontWeight.medium'),
          backgroundColor: theme('colors.accent'),
          color: theme('colors.white'),
        },
      })
    }),
  ],
}
