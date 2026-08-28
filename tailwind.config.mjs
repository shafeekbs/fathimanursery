/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        navy: '#020D3A',
        green: '#00AB4F',
        lime: '#8DC73F',
        ink: '#231F20',
        bone: '#F7F6F2',
        mist: '#E4E7E0',
      },
      fontFamily: {
        display: ['"Newsreader Variable"', 'serif'],
        sans: ['"Instrument Sans Variable"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      backgroundImage: {
        'leaf-gradient': 'linear-gradient(135deg, #8DC73F, #00AB4F)',
      },
    },
  },
  plugins: [],
};
