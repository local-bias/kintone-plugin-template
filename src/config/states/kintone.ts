import { selector } from 'recoil';
import { getUserDefinedFields } from '@common/kintone-api';
import { kintoneAPI } from '@lb-ribbit/kintone-utilities';

const PREFIX = 'kintone';

export const appFieldsState = selector<kintoneAPI.FieldProperty[]>({
  key: `${PREFIX}appFieldsState`,
  get: async () => {
    const properties = await getUserDefinedFields({ preview: true });

    const values = Object.values(properties);

    return values.sort((a, b) => a.label.localeCompare(b.label, 'ja'));
  },
});
