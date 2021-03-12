import { format } from '@common/date';
/**
 * 実行されている環境がモバイル端末である場合はTrueを返却します
 * @param eventType イベントタイプ
 * @returns モバイル端末である場合はTrue
 */
export const isMobile = (eventType: string) => eventType.includes('mobile.');

/**
 * Dateオブジェクトを、kintoneで使用されている文字列形式で返却します
 * @return kintoneで使用されている日付文字列
 */
export const getDateString = (date: Date) => format(date, 'yyyy-MM-dd');
