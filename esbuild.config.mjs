//@ts-check
import esbuild from 'esbuild';
import { join } from 'path';

const entryPoints = ['desktop', 'config'].map((dir) => join('src', dir, 'index.ts'));

const context = await esbuild.context({
  entryPoints,
  bundle: true,
  minify: true,
  outdir: 'dist',
  platform: 'browser',
  plugins: [
    {
      name: 'on-end',
      setup: ({ onEnd }) => onEnd(() => console.log('🐇 変更を反映しました')),
    },
  ],
});

context.watch();
