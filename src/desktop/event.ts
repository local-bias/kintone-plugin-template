import { createConfig } from '@/lib/plugin';
import { KintoneEventListener, restoreStorage } from '@konomi-app/kintone-utilities';
import { PLUGIN_NAME } from '@/lib/static';
import { PLUGIN_ID } from '@/lib/global';

export default (listener: KintoneEventListener) => {
  listener.add(['app.record.index.show'], async (event) => {
    const config = restoreStorage<kintone.plugin.Storage>(PLUGIN_ID) ?? createConfig();

    const button = document.createElement('button');
    button.innerText = `${PLUGIN_NAME}が有効です`;
    button.style.fontSize = '14px';
    button.style.position = 'fixed';
    button.style.padding = '1em 2em';
    button.style.borderRadius = '4px';
    button.style.backgroundColor = '#fffa';
    button.style.boxShadow = '0 2px 4px -1px #0002';
    button.style.border = '1px solid #ccc';
    button.style.bottom = '10px';
    button.style.right = '10px';
    button.style.zIndex = '9999';
    button.addEventListener('click', () => {
      console.log(JSON.stringify(config, null, 2));
    });
    document.body.append(button);

    return event;
  });
};
