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
          '0%, 100%': { boxShadow: '0 0 10px 1px rgba(200,43,98,0.14)' },
          '50%': { boxShadow: '0 0 30px 5px rgba(200,43,98,0.38)' }
        },
        'glow-pulse-sm': {
          '0%, 100%': { boxShadow: '0 0 5px 0px rgba(200,43,98,0.1)' },
          '50%': { boxShadow: '0 0 14px 2px rgba(200,43,98,0.38)' }
        },
        'text-glow': {
          '0%, 100%': { textShadow: '0 0 3px rgba(200,43,98,0.08)' },
          '50%': { textShadow: '0 0 11px rgba(200,43,98,0.45)' }
        },
        'text-glow-blue': {
          '0%, 100%': { textShadow: '0 0 3px rgba(41,94,170,0.08)' },
          '50%': { textShadow: '0 0 11px rgba(41,94,170,0.4)' }
        },
        'icon-glow': {
          '0%, 100%': { filter: 'drop-shadow(0 0 1px rgba(200,43,98,0.12))' },
          '50%': { filter: 'drop-shadow(0 0 6px rgba(200,43,98,0.5))' }
        },
        'icon-glow-blue': {
          '0%, 100%': { filter: 'drop-shadow(0 0 1px rgba(41,94,170,0.12))' },
          '50%': { filter: 'drop-shadow(0 0 6px rgba(41,94,170,0.45))' }
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
        'glow-pulse': 'glow-pulse 4.5s ease-in-out infinite',
        'glow-pulse-sm': 'glow-pulse-sm 4s ease-in-out infinite',
        'text-glow': 'text-glow 4.6s ease-in-out infinite',
        'text-glow-blue': 'text-glow-blue 4.6s ease-in-out infinite',
        'icon-glow': 'icon-glow 4s ease-in-out infinite',
        'icon-glow-blue': 'icon-glow-blue 4s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'spin-slow': 'spin-slow 14s linear infinite'
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
};
