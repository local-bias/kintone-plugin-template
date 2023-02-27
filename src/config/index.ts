/* このファイルはビルドの基点になります。 ファイル名、ディレクトリを変更すると、ビルドが正常に動作しない可能性があります */

import main from './main';

((pluginId): void => main(pluginId))(kintone.$PLUGIN_ID);
