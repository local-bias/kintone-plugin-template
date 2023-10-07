import { getFieldValueAsString, kintoneAPI } from '@konomi-app/kintone-utilities';

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

/** 対象レコードの各フィールドから、指定文字列に一致するフィールドが１つでもあればTrueを返します */
export const someRecord = (record: kintoneAPI.RecordData, searchValue: string): boolean => {
  return Object.values(record).some((field) => someFieldValue(field, searchValue));
};

export const someFieldValue = (field: kintoneAPI.RecordData[string], searchValue: string) => {
  return ~getFieldValueAsString(field).indexOf(searchValue);
};
