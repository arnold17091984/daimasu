/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ['./src/**/*.{tsx,css}'],
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
      mono: [
        'Monaco',
        'ui-monospace',
        'SFMono-Regular',
        'Menlo',
        'Consolas',
        'Liberation Mono',
        'Courier New',
        'monospace'
      ]
      //   shippori: ['var(--font-shippori)', ...fontFamily.serif],
      //   mplus: ['var(--font-mplus)', ...fontFamily.sans],
      //   poppins: ['var(--font-poppins)', ...fontFamily.sans],
      //   // (optional: if you're using geist too)
      //   geist: ['var(--font-geist-sans)', ...fontFamily.sans],
      //   mono: ['var(--font-geist-mono)', ...fontFamily.mono]
    },
    container: {
      center: true,
      screens: {
        sm: '50rem'
      }
    },
    extend: {
      colors: {
        slate: {
          850: 'hsl(222deg 47% 16%)'
        },
        // Phase 1 luxury palette — sumi-ink, washi paper, dull gold.
        // Legacy daimasu.* tokens still resolve via styles.css aliases.
        ink: {
          900: 'hsl(var(--ink-900))',
          700: 'hsl(var(--ink-700))'
        },
        washi: {
          50: 'hsl(var(--washi-50))',
          100: 'hsl(var(--washi-100))'
        },
        vermillion: 'hsl(var(--vermillion))',
        daimasu: {
          main: 'hsl(var(--daimasu-main))',
          sub1: 'hsl(var(--daimasu-sub1))',
          sub2: 'hsl(var(--daimasu-sub2))',
          accent1: 'hsl(var(--daimasu-accent1))',
          accent2: 'hsl(var(--daimasu-accent2))',
          accent3: 'hsl(var(--daimasu-accent3))',
          red: 'hsl(var(--daimasu-red))',
          black: 'hsl(var(--daimasu-black))'
        },
        gold: {
          DEFAULT: 'hsl(var(--gold-500))',
          300: 'hsl(var(--gold-300))',
          500: 'hsl(var(--gold-500))',
          // Backwards-compat aliases used in existing components
          dark: 'hsl(var(--gold-500))',
          muted: 'hsl(var(--gold-500))'
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
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
        chart: {
          1: 'hsl(var(--chart-1))',
          2: 'hsl(var(--chart-2))',
          3: 'hsl(var(--chart-3))',
          4: 'hsl(var(--chart-4))',
          5: 'hsl(var(--chart-5))'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      }
    }
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')]
};
