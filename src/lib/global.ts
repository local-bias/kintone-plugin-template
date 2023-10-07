import { detectGuestSpaceId } from '@konomi-app/kintone-utilities';

export const PLUGIN_ID = kintone.$PLUGIN_ID;
export const GUEST_SPACE_ID = detectGuestSpaceId() ?? undefined;

process.env.NODE_ENV === 'development' &&
  console.log('[plugin] Global variables have been redefined');
