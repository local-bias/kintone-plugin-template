import { getFieldValueAsString, getFormFields, kintoneAPI } from '@konomi-app/kintone-utilities';
import { getAppId } from '@lb-ribbit/kintone-xapp';

/** kintoneアプリに初期状態で存在するフィールドタイプ */
const DEFAULT_DEFINED_FIELDS: kintoneAPI.FieldPropertyType[] = [
  'RECORD_NUMBER',
  'UPDATED_TIME',
  'CREATOR',
  'CREATED_TIME',
  'CATEGORY',
  'MODIFIER',
  'STATUS',
];

export const getFieldProperties = async (
  params: { app?: string | number; preview?: boolean; guestSpaceId?: string } = {}
): Promise<kintoneAPI.FieldProperties> => {
  const { app = getAppId(), preview = false, guestSpaceId } = params;
  if (!app) {
    throw new Error('アプリのフィールド情報が取得できませんでした');
  }
  const { properties } = await getFormFields({ app, preview, guestSpaceId });
  return properties;
};

export const getUserDefinedFields = async (
  params: { preview?: boolean; guestSpaceId?: string } = {}
): Promise<kintoneAPI.FieldProperties> => {
  const { preview, guestSpaceId } = params;
  const properties = await getFieldProperties({ preview, guestSpaceId });
  return omitFieldProperties(properties, DEFAULT_DEFINED_FIELDS);
};

/** サブテーブルをばらしてフィールドを返却します */
export const getAllFields = async (): Promise<kintoneAPI.FieldProperty[]> => {
  const properties = await getFieldProperties();

  const fields = Object.values(properties).reduce<kintoneAPI.FieldProperty[]>((acc, property) => {
    if (property.type === 'SUBTABLE') {
      return [...acc, ...Object.values(property.fields)];
    }
    return [...acc, property];
  }, []);

  return fields;
};

/**
 * アプリのレイアウト情報から、ラベルフィールドのみを返却します
 * @param layout アプリのレイアウト情報
 * @returns ラベルフィールド一覧
 */
export const getLabelFields = async (
  layout: kintoneAPI.Layout
): Promise<kintoneAPI.layout.Label[]> => {
  const labels: kintoneAPI.layout.Label[] = [];
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

export const getLabelFromLayoutFields = (
  layout: kintoneAPI.LayoutField[]
): kintoneAPI.layout.Label[] => {
  const labels: kintoneAPI.layout.Label[] = [];
  for (const field of layout) {
    if (field.type === 'LABEL') {
      labels.push(field);
    }
  }
  return labels;
};

/** 指定のフィールドコードのフィールドを操作します */
export const controlField = (
  record: kintoneAPI.RecordData,
  fieldCode: string,
  callback: (field: kintoneAPI.Field) => void
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
  properties: kintoneAPI.FieldProperties,
  callback: (field: kintoneAPI.FieldProperty) => boolean
): kintoneAPI.FieldProperties => {
  const filtered = Object.entries(properties).filter(([_, value]) => callback(value));

  const reduced = filtered.reduce<kintoneAPI.FieldProperties>(
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
  properties: kintoneAPI.FieldProperties,
  omittingTypes: kintoneAPI.FieldPropertyType[]
): kintoneAPI.FieldProperties => {
  return filterFieldProperties(properties, (property) => !omittingTypes.includes(property.type));
};

/** 対象レコードの各フィールドから、指定文字列に一致するフィールドが１つでもあればTrueを返します */
export const someRecord = (record: kintoneAPI.RecordData, searchValue: string): boolean => {
  return Object.values(record).some((field) => someFieldValue(field, searchValue));
};

export const someFieldValue = (field: kintoneAPI.RecordData[string], searchValue: string) => {
  return ~getFieldValueAsString(field).indexOf(searchValue);
};
