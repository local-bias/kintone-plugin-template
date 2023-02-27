/* このファイルはビルドの基点になります。 ファイル名、ディレクトリを変更すると、ビルドが正常に動作しない可能性があります */

import Launcher from '@/common/launcher';

import event from './event';

((pluginId) => new Launcher(pluginId).launch([event]))(kintone.$PLUGIN_ID);
