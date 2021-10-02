import { Layout, Properties } from '@kintone/rest-api-client/lib/client/types';
import { OneOf } from '@kintone/rest-api-client/lib/KintoneFields/types/property';
import { KintoneRestAPIClient } from '@kintone/rest-api-client';
import { getAppId } from './kintone';

/** kintoneアプリに初期状態で存在するフィールドタイプ */
const DEFAULT_DEFINED_FIELDS: PickType<OneOf, 'type'>[] = [
  'UPDATED_TIME',
  'CREATOR',
  'CREATED_TIME',
  'CATEGORY',
  'MODIFIER',
  'STATUS',
];

export const getAppFields = async (targetApp?: string | number): Promise<Properties> => {
  const app = targetApp || kintone.app.getId();

  if (!app) {
    throw new Error('アプリのフィールド情報が取得できませんでした');
  }

  const client = new KintoneRestAPIClient();

  const { properties } = await client.app.getFormFields({ app });

  return properties;
};

export const getUserDefinedFields = async (): Promise<Properties> => {
  const fields = await getAppFields();

  const filterd = Object.entries(fields).filter(
    ([_, value]) => !DEFAULT_DEFINED_FIELDS.includes(value.type)
  );

  return filterd.reduce<Properties>((acc, [key, value]) => ({ ...acc, [key]: value }), {});
};

/** サブテーブルをばらしてフィールドを返却します */
export const getAllFields = async (): Promise<OneOf[]> => {
  const properties = await getAppFields();

  const fields = Object.values(properties).reduce<OneOf[]>((acc, property) => {
    if (property.type === 'SUBTABLE') {
      return [...acc, ...Object.values(property.fields)];
    }
    return [...acc, property];
  }, []);

  return fields;
};

export const getAppLayout = async (): Promise<Layout> => {
  const app = getAppId();

  if (!app) {
    throw new Error('アプリのフィールド情報が取得できませんでした');
  }

  const client = new KintoneRestAPIClient();

  const { layout } = await client.app.getFormLayout({ app });

  return layout;
};
