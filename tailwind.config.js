
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      animation: {
        bounce200: 'bounce 1s infinite 200ms',
        bounce400: 'bounce 1s infinite 400ms',
      },
      colors: {
        'black': "#070017"
      },
      fontFamily: {
        'Open-sans': ["Open Sans"]
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

