const fs = require('fs');
const path = require('path');

(async () => {
  const root = process.cwd();

  const distPath = path.join(root, 'dist', 'private.ppk');

  fs.readdir('./dist', (err, files) => {
    const target = files.filter((file) => file.indexOf('.ppk') !== -1);

    if (!target.length) {
      console.log(
        'ppkファイルの移動に失敗しました。distディレクトリにppkファイルが残っている可能性があります。'
      );
      return;
    }
    const ppkPath = path.join(root, 'dist', target[0]);

    fs.rename(ppkPath, distPath, (err) => {
      if (err) {
        console.log(
          'ppkファイルの移動に失敗しました。distディレクトリにppkファイルが残っている可能性があります。'
        );
      } else {
        console.log('ppkファイルの作成が完了しました。プラグインをアップロードできます🍀');
      }
    });
  });
})();
