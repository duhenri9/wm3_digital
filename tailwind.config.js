/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: "#5687A6",
          foreground: "#F3F3F3",
        },
        secondary: {
          DEFAULT: "#F9A688",
          foreground: "#364559",
        },
        muted: {
          DEFAULT: "#7E7F7F",
          foreground: "#F3F3F3",
        },
        accent: {
          DEFAULT: "#024458",
          foreground: "#F3F3F3",
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        inter: ['var(--font-inter)', 'Inter', 'sans-serif'],
        acumin: ['var(--font-acumin)', 'sans-serif'],
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1.5' }],
        sm: ['0.875rem', { lineHeight: '1.6' }],
        base: ['1rem', { lineHeight: '1.7' }],
        lg: ['1.125rem', { lineHeight: '1.7' }],
        xl: ['1.25rem', { lineHeight: '1.7' }],
        '2xl': ['1.5rem', { lineHeight: '1.4' }],
        '3xl': ['1.875rem', { lineHeight: '1.3' }],
        '4xl': ['2.25rem', { lineHeight: '1.2' }],
        '5xl': ['3rem', { lineHeight: '1.15' }],
        '6xl': ['3.75rem', { lineHeight: '1.1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
        26: '6.5rem',
        30: '7.5rem',
        34: '8.5rem',
      },
      container: {
        center: true,
        padding: '2rem',
        screens: {
          '2xl': '1400px',
        },
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        fadeInDown: {
          '0%': {
            opacity: '0',
            transform: 'translateY(-30px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        slideInLeft: {
          '0%': {
            opacity: '0',
            transform: 'translateX(-30px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        slideInRight: {
          '0%': {
            opacity: '0',
            transform: 'translateX(30px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        scaleIn: {
          '0%': {
            opacity: '0',
            transform: 'scale(0.9)',
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1)',
          },
        },
        float: {
          '0%, 100%': {
            transform: 'translateY(0px)',
          },
          '50%': {
            transform: 'translateY(-6px)',
          },
        },
        emerge: {
          '0%': {
            transform: 'scale(0) translateY(100px)',
            opacity: '0',
          },
          '50%': {
            transform: 'scale(0.7) translateY(20px)',
            opacity: '0.5',
          },
          '100%': {
            transform: 'scale(1) translateY(0px)',
            opacity: '1',
          },
        },
        digitalprint: {
          '0%': {
            transform: 'scale(1)',
            filter: 'contrast(1) brightness(1)',
            textShadow: '0 0 0 transparent, 0 0 0 transparent',
          },
          '25%': {
            transform: 'scale(1.02)',
            filter: 'contrast(1.1) brightness(1.05)',
            textShadow: '1px 1px 2px rgba(86, 135, 166, 0.3), -1px -1px 2px rgba(249, 166, 136, 0.2)',
          },
          '50%': {
            transform: 'scale(1.01)',
            filter: 'contrast(1.15) brightness(1.1)',
            textShadow: '2px 0 4px rgba(86, 135, 166, 0.4), 0 2px 4px rgba(249, 166, 136, 0.3), -2px 0 4px rgba(2, 68, 88, 0.2)',
          },
          '75%': {
            transform: 'scale(1.015)',
            filter: 'contrast(1.08) brightness(1.03)',
            textShadow: '0 -1px 3px rgba(86, 135, 166, 0.25), 1px 1px 3px rgba(249, 166, 136, 0.25)',
          },
          '100%': {
            transform: 'scale(1)',
            filter: 'contrast(1) brightness(1)',
            textShadow: '0 0 0 transparent, 0 0 0 transparent',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'fade-in-down': 'fadeInDown 0.6s ease-out',
        'slide-in-left': 'slideInLeft 0.6s ease-out',
        'slide-in-right': 'slideInRight 0.6s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'emerge': 'emerge 4s ease-out',
        'digitalprint': 'digitalprint 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}