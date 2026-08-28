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
      fontSize: {
        // Fluid display sizes. Never used below 20px — see CLAUDE.md section 3.
        'display-sm': ['clamp(1.75rem, 1.2rem + 2.2vw, 2.5rem)', { lineHeight: '1.15' }],
        'display-md': ['clamp(2.125rem, 1.4rem + 3vw, 3.25rem)', { lineHeight: '1.1' }],
        'display-lg': ['clamp(2.5rem, 1.4rem + 5vw, 4.5rem)', { lineHeight: '1.04' }],
      },
      letterSpacing: {
        display: '-0.02em',
      },
      backgroundImage: {
        'leaf-gradient': 'linear-gradient(135deg, #8DC73F 0%, #00AB4F 100%)',
      },
      maxWidth: {
        prose: '62ch',
      },
    },
  },
  plugins: [],
};
