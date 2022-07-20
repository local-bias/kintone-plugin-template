import { KintoneRestAPIClient } from '@kintone/rest-api-client';
import { getAppId } from './kintone';
import { kx } from '@type/kintone.api';

/** kintoneアプリに初期状態で存在するフィールドタイプ */
const DEFAULT_DEFINED_FIELDS: kx.FieldPropertyType[] = [
  'RECORD_NUMBER',
  'UPDATED_TIME',
  'CREATOR',
  'CREATED_TIME',
  'CATEGORY',
  'MODIFIER',
  'STATUS',
];

/** REST APIクライアント(シングルトン) */
export const kintoneClient = new KintoneRestAPIClient();

export const getFieldProperties = async (
  targetApp?: string | number
): Promise<kx.FieldProperties> => {
  const app = targetApp || kintone.app.getId();

  if (!app) {
    throw new Error('アプリのフィールド情報が取得できませんでした');
  }

  const { properties } = await kintoneClient.app.getFormFields({ app });

  return properties;
};

export const getUserDefinedFields = async (): Promise<kx.FieldProperties> => {
  const properties = await getFieldProperties();
  return omitFieldProperties(properties, DEFAULT_DEFINED_FIELDS);
};

/** サブテーブルをばらしてフィールドを返却します */
export const getAllFields = async (): Promise<kx.FieldProperty[]> => {
  const properties = await getFieldProperties();

  const fields = Object.values(properties).reduce<kx.FieldProperty[]>((acc, property) => {
    if (property.type === 'SUBTABLE') {
      return [...acc, ...Object.values(property.fields)];
    }
    return [...acc, property];
  }, []);

  return fields;
};

export const getAppLayout = async (_app?: number): Promise<kx.Layout> => {
  const app = _app || getAppId();

  if (!app) {
    throw new Error('アプリのフィールド情報が取得できませんでした');
  }

  const { layout } = await kintoneClient.app.getFormLayout({ app });

  return layout;
};

/**
 * アプリのレイアウト情報から、ラベルフィールドのみを返却します
 * @param layout アプリのレイアウト情報
 * @returns ラベルフィールド一覧
 */
export const getLabelFields = async (layout: kx.Layout): Promise<kx.layout.Label[]> => {
  const labels: kx.layout.Label[] = [];
  for (const section of layout) {
    if (section.type === 'GROUP') {
      for (const row of section.layout) {
        labels.push(...getLabelFromLayoutFields(row.fields));
      }
    } else if (section.type === 'ROW') {
      labels.push(...getLabelFromLayoutFields(section.fields));
    }
  }
  return labels;
};

export const getLabelFromLayoutFields = (layout: kx.LayoutField[]): kx.layout.Label[] => {
  const labels: kx.layout.Label[] = [];
  for (const field of layout) {
    if (field.type === 'LABEL') {
      labels.push(field);
    }
  }
  return labels;
};

/** 指定のフィールドコードのフィールドを操作します */
export const controlField = (
  record: kx.RecordData,
  fieldCode: string,
  callback: (field: kx.Field) => void
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

/**
 * APIから取得したフィールド情報から、指定した関数の条件に当てはまるフィールドのみを返却します
 *
 * @param properties APIから取得したフィールド情報
 * @param callback 絞り込み条件
 * @returns 条件に当てはまるフィールド
 */
export const filterFieldProperties = (
  properties: kx.FieldProperties,
  callback: (field: kx.FieldProperty) => boolean
): kx.FieldProperties => {
  const filtered = Object.entries(properties).filter(([_, value]) => callback(value));

  const reduced = filtered.reduce<kx.FieldProperties>(
    (acc, [key, value]) => ({ ...acc, [key]: value }),
    {}
  );

  return reduced;
};

/**
 * APIから取得したフィールド情報から、指定したフィールドタイプを除いたフィールド一覧を返却します
 *
 * @param properties APIから取得したフィールド情報
 * @param omittingTypes 除外するフィールドタイプ
 * @returns 指定したフィールドタイプを除いた一覧
 */
export const omitFieldProperties = (
  properties: kx.FieldProperties,
  omittingTypes: kx.FieldPropertyType[]
): kx.FieldProperties => {
  return filterFieldProperties(properties, (property) => !omittingTypes.includes(property.type));
};

/** 対象レコードの各フィールドから、指定文字列に一致するフィールドが１つでもあればTrueを返します */
export const someRecord = (record: kx.RecordData, searchValue: string): boolean => {
  return Object.values(record).some((field) => someFieldValue(field, searchValue));
};

export const someFieldValue = (field: kx.RecordData[string], searchValue: string) => {
  switch (field.type) {
    case 'CREATOR':
    case 'MODIFIER':
      return ~field.value.name.indexOf(searchValue);

    case 'CHECK_BOX':
    case 'MULTI_SELECT':
    case 'CATEGORY':
      return field.value.some((value) => ~value.indexOf(searchValue));

    case 'USER_SELECT':
    case 'ORGANIZATION_SELECT':
    case 'GROUP_SELECT':
    case 'STATUS_ASSIGNEE':
      return field.value.some(({ name }) => ~name.indexOf(searchValue));

    case 'FILE':
      return field.value.some(({ name }) => ~name.indexOf(searchValue));

    case 'SUBTABLE':
      return field.value.some(({ value }) => someRecord(value, searchValue));

    default:
      return field.value && ~field.value.indexOf(searchValue);
  }
};
