/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lavender: '#E6E6FA',
        beige: '#F5F5DC',
        peach: '#FFDAB9',
        sky: '#F0F8FF',
        sage: '#9CAF88',
        muted: {
          lavender: '#C9C9EB',
          beige: '#E8E8D0',
          peach: '#F0C9A0',
          sky: '#D0E4F0',
          sage: '#8A9D76',
        },
        premium: {
          bg: '#F8F7F2',
          text: '#2D2D2A',
          accent: '#7D7D7D',
        }
      },
      fontFamily: {
        display: ['Outfit', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      animation: {
        'soft-float': 'soft-float 6s ease-in-out infinite',
      },
      keyframes: {
        'soft-float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [],
  safelist: [
    'bg-lavender/10', 'bg-lavender/20', 'bg-lavender/30',
    'bg-sky/10', 'bg-sky/20', 'bg-sky/30',
    'bg-peach/10', 'bg-peach/20', 'bg-peach/30',
    'bg-beige/10', 'bg-beige/20', 'bg-beige/30',
    'border-lavender/30', 'border-sky/30', 'border-peach/30', 'border-beige/30',
    'text-lavender', 'text-sky', 'text-peach', 'text-sage', 'text-beige',
  ],
}
