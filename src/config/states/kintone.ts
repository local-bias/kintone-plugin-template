import { selector } from 'recoil';
import { getUserDefinedFields } from '@common/kintone-api';
import { kx } from '../../types/kintone.api';

const PREFIX = 'kintone';

export const appFieldsState = selector<kx.FieldProperty[]>({
  key: `${PREFIX}appFieldsState`,
  get: async () => {
    const properties = await getUserDefinedFields();

    const values = Object.values(properties);

    return values.sort((a, b) => a.label.localeCompare(b.label, 'ja'));
  },
});
