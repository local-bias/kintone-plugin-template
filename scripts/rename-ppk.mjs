//@ts-check
import fs from 'fs';
import path from 'path';

try {
  const root = process.cwd();
  const distPath = path.join(root, 'dist', 'private.ppk');

  const files = fs.readdirSync('dist');

  const target = files.filter((file) => file.indexOf('.ppk') !== -1);

  if (!target.length) {
    console.log(
      'ppkファイルの移動に失敗しました。distディレクトリにppkファイルが残っている可能性があります。'
    );
  }
  const ppkPath = path.join(root, 'dist', target[0]);

  fs.renameSync(ppkPath, distPath);

  console.log('ppkファイルの作成が完了しました。プラグインをアップロードできます🍀');
} catch (error) {
  console.error(
    'ppkファイルの移動に失敗しました。distディレクトリにppkファイルが残っている可能性があります。',
    error
  );
}
