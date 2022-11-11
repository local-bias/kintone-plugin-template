//@ts-check

const { exec } = require('child_process');
const { config } = require('dotenv');
config();

(() => {
  const { KINTONE_BASE_URL, KINTONE_USERNAME, KINTONE_PASSWORD } = process.env;
  if (!KINTONE_BASE_URL || !KINTONE_USERNAME || !KINTONE_PASSWORD) {
    throw `.envの設定が不十分です。以下のパラメータは必須です
    KINTONE_BASE_URL
    KINTONE_USERNAME
    KINTONE_PASSWORD
    `;
  }

  exec(
    `kintone-plugin-uploader dist/plugin-dev.zip --base-url ${KINTONE_BASE_URL} --username ${KINTONE_USERNAME} --password ${KINTONE_PASSWORD} --watch --waiting-dialog-ms 3000`,
    (error, stdout, stderr) => {
      if (error) {
        console.error(`error: ${error}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);
    }
  );
})();
