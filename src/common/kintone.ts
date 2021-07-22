import { Properties } from '@kintone/rest-api-client/lib/client/types';
import { OneOf } from '@kintone/rest-api-client/lib/KintoneFields/types/property';
import { KintoneRestAPIClient } from '@kintone/rest-api-client';

/** kintoneアプリに初期状態で存在するフィールドタイプ */
const DEFAULT_DEFINED_FIELDS: PickType<OneOf, 'type'>[] = [
  'UPDATED_TIME',
  'CREATOR',
  'CREATED_TIME',
  'CATEGORY',
  'MODIFIER',
  'STATUS',
];

/**
 * 実行されている環境がモバイル端末である場合はTrueを返却します
 * @param eventType イベントタイプ
 * @returns モバイル端末である場合はTrue
 */
export const isMobile = (eventType: string) => eventType.includes('mobile.');

export const getAppFields = async (targetApp?: string | number) => {
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
