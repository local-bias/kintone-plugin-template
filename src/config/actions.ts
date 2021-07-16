import { storeStorage } from '@common/plugin';

export const save = (storage: kintone.plugin.Storage) => {
  storeStorage(storage, () => true);
};
