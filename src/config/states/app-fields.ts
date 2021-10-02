import { selector } from 'recoil';
import { Properties } from '@kintone/rest-api-client/lib/client/types';
import { getUserDefinedFields } from '@common/kintone-api';

const state = selector<Properties>({
  key: 'AppFields',
  get: async () => {
    const properties = await getUserDefinedFields();
    return properties;
  },
});

export default state;
