import { selector } from 'recoil';
import { getUserDefinedFields } from '@common/kintone-api';
import { kx } from '../../types/kintone.api';

const PREFIX = 'kintone';

export const appFieldsState = selector<kx.Field[]>({
  key: `${PREFIX}appFieldsState`,
  get: async () => {
    const properties = await getUserDefinedFields();
    return Object.values(properties);
  },
});
