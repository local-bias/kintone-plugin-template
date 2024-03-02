//@ts-check
import common from './tailwind.config.common.mjs';

/** @type { import('tailwindcss').Config } */
export default {
  ...common,
  content: [
    './src/components/**/*.{ts,tsx}',
    './src/lib/**/*.{ts,tsx}',
    './src/config/**/*.{ts,tsx}',
  ],
};
