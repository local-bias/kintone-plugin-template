//@ts-check
import common from './tailwind.config.common.mjs';

/** @type { import('tailwindcss').Config } */
export default {
  ...common,
  content: ['./src/lib/**/*.{ts,js,jsx,tsx}', './src/config/**/*.{ts,js,jsx,tsx}'],
};
