/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        rutuja: {
          blue: '#295EAA',
          bluedark: '#204985',
          pink: '#C82B62',
          pinkdark: '#A3234F',
          ink: '#1A1A1A',
          slate: '#4A4A52',
          muted: '#8A8A93',
          line: '#E5E5EB',
          soft: '#FBECF2',
        },
        editorial: {
          cream: '#FAF6F0',
          creamlite: '#FCF9F5',
          creamsubtle: '#F3ECE3',
          burgundy: '#6A1B29',
          burgundydark: '#4D111D',
          burgundylight: '#8E2438',
          gold: '#C5A059',
          goldlite: '#E8D8B0',
          golddark: '#9E7A32',
          ink: '#1E1B18',
          slate: '#47423C',
          stone: '#7C746B',
          border: '#E4DAD0',
          bordergold: '#D8C7A5',
        },
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 0px 0px rgba(200,43,98,0.0)' },
          '50%': { boxShadow: '0 0 45px 8px rgba(200,43,98,0.45)' }
        },
        'glow-pulse-sm': {
          '0%, 100%': { boxShadow: '0 0 0px 0px rgba(200,43,98,0.0)' },
          '50%': { boxShadow: '0 0 22px 3px rgba(200,43,98,0.5)' }
        },
        'text-glow': {
          '0%, 100%': { textShadow: '0 0 0px rgba(200,43,98,0)' },
          '50%': { textShadow: '0 0 18px rgba(200,43,98,0.65)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-16px)' }
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.25s ease-out',
        'accordion-up': 'accordion-up 0.25s ease-out',
        'marquee': 'marquee 40s linear infinite',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        'glow-pulse-sm': 'glow-pulse-sm 2.4s ease-in-out infinite',
        'text-glow': 'text-glow 3.2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'spin-slow': 'spin-slow 14s linear infinite'
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
};
