const fs = require('fs');
const path = require('path');

(async () => {
  const root = __dirname.replace('\\scripts', '');

  const distPath = `${root}\\private.ppk`;

  fs.readdir('./dist', (err, files) => {
    const target = files.filter((file) => file.indexOf('.ppk') !== -1);

    if (!target.length) {
      console.log('ppkファイルの移動に失敗しました。distディレクトリにppkファイルが残っている可能性があります。');
      return;
    }
    const ppk = target[0];

    const ppkPath = `${root}\\dist\\${ppk}`;

    fs.rename(ppkPath, distPath, (err) => {
      if (err) {
        console.log('ppkファイルの移動に失敗しました。distディレクトリにppkファイルが残っている可能性があります。');
      } else {
        console.log('ppkファイルの作成が完了しました。プラグインをアップロードできます🍀');
      }
    });
  });
})();
