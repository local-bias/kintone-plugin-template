import { detectGuestSpaceId } from '@konomi-app/kintone-utilities';

export const PLUGIN_ID = kintone.$PLUGIN_ID;
export const GUEST_SPACE_ID = detectGuestSpaceId() ?? undefined;
export const LANGUAGE = kintone.getLoginUser().language as 'ja' | 'en' | 'zh' | 'es';

process.env.NODE_ENV === 'development' &&
  console.log('[plugin] Global variables have been redefined');
