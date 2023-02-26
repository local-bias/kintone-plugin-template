//@ts-check
import esbuild from 'esbuild';
import { join } from 'path';

const context = await esbuild.context({
  entryPoints: [join('src', 'desktop', 'index.ts'), join('src', 'config', 'index.ts')],
  bundle: true,
  minify: true,
  outdir: 'dist',
  platform: 'browser',
  plugins: [
    {
      name: 'on-end',
      setup({ onEnd }) {
        onEnd(() => console.log('🐇 変更を反映しました'));
      },
    },
  ],
});

context.watch();
