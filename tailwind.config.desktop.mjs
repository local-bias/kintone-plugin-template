//@ts-check
import common from './tailwind.config.common.mjs';

/** @type { import('tailwindcss').Config } */
export default {
  ...common,
  important: '.🐸',
  corePlugins: {
    preflight: false,
  },
  content: [
    './src/components/**/*.{ts,tsx}',
    './src/lib/**/*.{ts,tsx}',
    './src/desktop/**/*.{ts,tsx}',
  ],
};
