
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'blackImg': "url('https://static.vecteezy.com/system/resources/thumbnails/019/591/373/original/the-effect-of-a-film-with-scratches-on-a-black-background-free-video.jpg')",
      },
      animation: {
        bounce200: 'bounce 1s infinite 200ms',
        bounce400: 'bounce 1s infinite 400ms',
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

