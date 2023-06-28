/* このファイルはビルドの基点になります。 ファイル名、ディレクトリを変更すると、ビルドが正常に動作しない可能性があります */

import { detectGuestSpaceId } from '@konomi-app/kintone-utilities';
import main from './main';

export const PLUGIN_ID = kintone.$PLUGIN_ID;

export const GUEST_SPACE_ID = detectGuestSpaceId() ?? undefined;

main();
