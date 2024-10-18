import { detectGuestSpaceId } from '@konomi-app/kintone-utilities';

export const PLUGIN_ID = kintone.$PLUGIN_ID;
export const GUEST_SPACE_ID = detectGuestSpaceId() ?? undefined;
export const LANGUAGE = kintone.getLoginUser().language as 'ja' | 'en' | 'zh' | 'es';

export const ENV = (process?.env?.NODE_ENV ?? 'production') as 'production' | 'development';

ENV === 'development' &&
  console.log('[plugin] Global variables have been redefined', {
    PLUGIN_ID,
    GUEST_SPACE_ID,
    LANGUAGE,
  });
