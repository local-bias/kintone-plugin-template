import {
  Layout,
  Properties as FieldProperties,
  Record as KintoneRecord,
} from '@kintone/rest-api-client/lib/client/types';
import { KintoneRestAPIClient } from '@kintone/rest-api-client';
import { getAppId } from './kintone';
import { OneOf as FieldProperty } from '@kintone/rest-api-client/lib/KintoneFields/types/property';
import { OneOf as Field } from '@kintone/rest-api-client/lib/KintoneFields/types/field';

/** kintoneアプリに初期状態で存在するフィールドタイプ */
const DEFAULT_DEFINED_FIELDS: PickType<FieldProperty, 'type'>[] = [
  'UPDATED_TIME',
  'CREATOR',
  'CREATED_TIME',
  'CATEGORY',
  'MODIFIER',
  'STATUS',
];

export const getFieldProperties = async (targetApp?: string | number): Promise<FieldProperties> => {
  const app = targetApp || kintone.app.getId();

  if (!app) {
    throw new Error('アプリのフィールド情報が取得できませんでした');
  }

  const client = new KintoneRestAPIClient();

  const { properties } = await client.app.getFormFields({ app });

  return properties;
};

export const getUserDefinedFields = async (): Promise<FieldProperties> => {
  const properties = await getFieldProperties();

  const filterd = Object.entries(properties).filter(
    ([_, value]) => !DEFAULT_DEFINED_FIELDS.includes(value.type)
  );

  return filterd.reduce<FieldProperties>((acc, [key, value]) => ({ ...acc, [key]: value }), {});
};

/** サブテーブルをばらしてフィールドを返却します */
export const getAllFields = async (): Promise<FieldProperty[]> => {
  const properties = await getFieldProperties();

  const fields = Object.values(properties).reduce<FieldProperty[]>((acc, property) => {
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

/** 指定のフィールドコードのフィールドを操作します */
export const controlField = (
  record: KintoneRecord,
  fieldCode: string,
  callback: (field: Field) => void
): void => {
  if (record[fieldCode]) {
    callback(record[fieldCode]);
    return;
  }

  for (const field of Object.values(record)) {
    if (field.type === 'SUBTABLE') {
      for (const { value } of field.value) {
        if (value[fieldCode]) {
          callback(value[fieldCode]);
        }
      }
    }
  }
};
