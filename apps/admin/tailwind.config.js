/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#004532',
        'primary-container': '#065f46',
        'on-primary': '#ffffff',
        'primary-fixed': '#a6f2d1',
        'primary-fixed-dim': '#8bd6b6',
        'on-primary-fixed': '#002116',
        'on-primary-container': '#8bd6b7',
        secondary: '#904d00',
        'secondary-container': '#fe932c',
        'on-secondary': '#ffffff',
        'secondary-fixed': '#ffdcc3',
        'secondary-fixed-dim': '#ffb77d',
        'on-secondary-container': '#663500',
        'on-secondary-fixed': '#2f1500',
        tertiary: '#00462e',
        'tertiary-container': '#006041',
        'on-tertiary': '#ffffff',
        'tertiary-fixed': '#6ffbbe',
        'tertiary-fixed-dim': '#4edea3',
        'on-tertiary-container': '#50e0a4',
        'on-tertiary-fixed': '#002113',
        surface: '#faf8ff',
        'surface-dim': '#d2d9f4',
        'surface-bright': '#faf8ff',
        'surface-container-lowest': '#ffffff',
        'surface-container-low': '#f2f3ff',
        'surface-container': '#eaedff',
        'surface-container-high': '#e2e7ff',
        'surface-container-highest': '#dae2fd',
        'on-surface': '#131b2e',
        'on-surface-variant': '#3f4944',
        outline: '#6f7973',
        'outline-variant': '#bec9c2',
        error: '#ba1a1a',
        'error-container': '#ffdad6',
        'on-error': '#ffffff',
        'on-error-container': '#93000a'
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        'headline-xl': ['"Playfair Display"', 'serif'],
        'headline-lg': ['"Playfair Display"', 'serif'],
        'headline-md': ['"Playfair Display"', 'serif'],
        'headline-sm': ['"Plus Jakarta Sans"', 'sans-serif'],
        'title-md': ['"Plus Jakarta Sans"', 'sans-serif'],
        'title-sm': ['"Plus Jakarta Sans"', 'sans-serif'],
        'body-lg': ['"Plus Jakarta Sans"', 'sans-serif'],
        'body-md': ['"Plus Jakarta Sans"', 'sans-serif'],
        'body-sm': ['"Plus Jakarta Sans"', 'sans-serif'],
        'label-lg': ['"Plus Jakarta Sans"', 'sans-serif'],
        'label-md': ['"Plus Jakarta Sans"', 'sans-serif'],
        'label-sm': ['"Plus Jakarta Sans"', 'sans-serif']
      },
      spacing: {
        'space-xs': '0.25rem',
        'space-sm': '0.5rem',
        'space-md': '1rem',
        'space-lg': '1.5rem',
        'space-xl': '2.5rem',
        margin: '2rem',
        'margin-mobile': '1rem'
      }
    }
  },
  plugins: []
};
