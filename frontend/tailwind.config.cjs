/**** Tailwind Configuration ****/
module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563eb',
          50: '#f0f7ff',
          100: '#e0eefc',
          200: '#b9dbfa',
          300: '#82c0f6',
          400: '#4aa3f1',
          500: '#1d87ec',
          600: '#0c6dd4',
          700: '#0a55a9',
          800: '#0d498a',
          900: '#113f70'
        }
      }
    }
  },
  plugins: []
}
