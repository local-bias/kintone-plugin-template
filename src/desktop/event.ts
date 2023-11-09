import { restorePluginConfig } from '@/lib/plugin';
import { PLUGIN_NAME } from '@/lib/static';
import { listener } from '@/lib/listener';

listener.add(['app.record.index.show'], async (event) => {
  const config = restorePluginConfig();

  const button = document.createElement('div');
  button.innerText = `🚀 ${PLUGIN_NAME}が有効です`;
  button.classList.add(
    'shadow-md',
    'text-sm',
    'fixed',
    'py-4',
    'px-8',
    'rounded',
    'z-50',
    'border',
    'border-gray-200',
    'bg-white',
    'bg-opacity-70',
    'bottom-3',
    'right-3',
    'transition-all',
    'hover:bg-opacity-100',
    'cursor-pointer'
  );
  button.addEventListener('click', () => {
    console.log(JSON.stringify(config, null, 2));
  });
  document.body.append(button);

  return event;
});
