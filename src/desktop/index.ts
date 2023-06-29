/* このファイルはビルドの基点になります。 ファイル名、ディレクトリを変更すると、ビルドが正常に動作しない可能性があります */

import '@/lib/global';
import { pushPluginName } from '@/lib/local-storage';
import { PLUGIN_NAME } from '@/lib/static';
import { KintoneEventListener } from '@konomi-app/kintone-utilities';
import event from './event';

try {
  pushPluginName();
} catch (error) {}

const listener = new KintoneEventListener({
  errorHandler: (error, props) => {
    const { event } = props;
    event.error = `プラグイン「${PLUGIN_NAME}」の処理内でエラーが発生しました。`;
    console.error('エラー', error);
  },
  logDisabled: process.env.NODE_ENV === 'production',
});

event(listener);
