import { KintoneEventManager } from '@konomi-app/kintone-utilities';
import { PLUGIN_NAME } from './static';

export const manager = new KintoneEventManager({
  errorHandler: (error, props) => {
    const { event } = props;
    event.error = `プラグイン「${PLUGIN_NAME}」の処理内でエラーが発生しました。`;
    console.error('エラー', error);
    return event;
  },
  logPrefix: `[${PLUGIN_NAME}] `,
  logDisabled: process.env.NODE_ENV === 'production',
});

process.env.NODE_ENV === 'development' &&
  console.info('[plugin] Event listener has been initialized');
