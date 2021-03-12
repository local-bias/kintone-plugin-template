/**
 * 日付データを指定された書式の文字列に変換して返却します
 * @param date 日付データ
 * @param format 書式
 * @returns 指定された書式の文字列
 */
export const format = (date: Date, format: string) =>
  format
    .replace(/yyyy/g, String(date.getFullYear()))
    .replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2))
    .replace(/dd/g, ('0' + date.getDate()).slice(-2))
    .replace(/HH/g, ('0' + date.getHours()).slice(-2))
    .replace(/mm/g, ('0' + date.getMinutes()).slice(-2))
    .replace(/ss/g, ('0' + date.getSeconds()).slice(-2))
    .replace(/SSS/g, ('00' + date.getMilliseconds()).slice(-3));
