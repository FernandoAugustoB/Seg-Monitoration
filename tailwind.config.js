/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        // Cor primária: Amarelo/Laranja levemente alaranjado
        primary: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        // Tema escuro
        dark: {
          900: '#000000',
          800: '#1a1a2e',
          700: '#2d2d44',
          600: '#40405a',
          500: '#535370',
          400: '#666686',
          300: '#79799c',
          200: '#8c8cb2',
          100: '#9f9fc8',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      backgroundColor: {
        'dark-bg': '#000000',
        'dark-card': '#1a1a2e',
        'dark-input': '#2d2d44',
      },
      borderColor: {
        'dark-border': '#40405a',
      },
      textColor: {
        'dark-primary': '#e2e8f0',
        'dark-secondary': '#94a3b8',
      }
    },
  },
  plugins: [],
}
