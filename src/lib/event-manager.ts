import { KintoneEventManager } from '@konomi-app/kintone-utilities';
import { PLUGIN_NAME } from './constants';
import { isProd } from './global';

export const manager = new KintoneEventManager({
  errorHandler: (error, props) => {
    const { event } = props;
    event.error = `プラグイン「${PLUGIN_NAME}」の処理内でエラーが発生しました。`;
    console.error('エラー', error);
    return event;
  },
  logPrefix: `[${PLUGIN_NAME}] `,
  logDisabled: isProd,
});

!isProd && console.info('[plugin] Event listener has been initialized');
