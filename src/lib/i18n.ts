import { createTheme } from '@mui/material';
import { LANGUAGE } from './global';
import { enUS, esES, jaJP, zhCN } from '@mui/material/locale';

export const ui = {
  ja: {
    'config.condition.memo.title': 'メモ',
    'config.condition.memo.description':
      'この設定はサンプルです。プラグインにテキスト情報を保存することができます。',
    'config.condition.memo.label': '📝 メモ',
    'config.condition.memo.placeholder': 'テキストを入力',
    'config.condition.field.title': '対象フィールド',
    'config.condition.field.description':
      'この設定はサンプルです。このアプリの設定情報から、フィールド一覧を取得して表示しています。',
    'config.condition.isSampleUIShown.title': 'スイッチのサンプル',
    'config.condition.isSampleUIShown.description':
      '有効・無効などを切り替えるスイッチのサンプルです。ここでは、レコード一覧にサンプルのUIを表示するかどうかを切り替えています。',
    'config.condition.isSampleUIShown.label': 'サンプルUIを表示',

    'config.sidebar.tab.label': '設定',
    'config.button.save': '設定を保存',
    'config.button.return': 'プラグイン一覧へ戻る',
    'config.toast.save': '設定を保存しました',
    'config.toast.reset': '設定をリセットしました',
    'config.toast.import': '設定情報をインポートしました',
    'config.toast.export': 'プラグインの設定情報をエクスポートしました',
    'config.error.root':
      'プラグインのHTMLに、ルート要素が存在しません。プラグイン設定をレンダリングするためには、id="settings"の要素が必要です。',
    'config.error.import':
      '設定情報のインポートに失敗しました、ファイルに誤りがないか確認してください',
    'config.error.export':
      'プラグインの設定情報のエクスポートに失敗しました。プラグイン開発者にお問い合わせください。',
    'desktop.dialogtrigger.title': 'プラグインが有効です',
    'desktop.dialogtrigger.content': 'クリックするとイベントの詳細を確認できます',
    'desktop.dialog.title': 'プラグインの設定情報',
  },
  en: {
    'config.condition.memo.title': 'Memo',
    'config.condition.memo.description':
      'This is a sample setting. You can save text information in the plugin.',
    'config.condition.memo.label': '📝 Memo',
    'config.condition.memo.placeholder': 'Enter text',
    'config.condition.field.title': 'Target Field',
    'config.condition.field.description':
      'This is a sample setting. It retrieves and displays a list of fields from the app settings.',
    'config.condition.isSampleUIShown.title': 'Switch Sample',
    'config.condition.isSampleUIShown.description':
      'This is a sample switch that toggles between enabled and disabled. Here, it toggles whether to display a sample UI in the record list.',
    'config.condition.isSampleUIShown.label': 'Show Sample UI',
    'config.button.save': 'Save Settings',
    'config.button.return': 'Return to Plugin List',
    'config.toast.save': 'Settings saved',
    'config.toast.reset': 'Settings reset',
    'config.toast.import': 'Settings imported',
    'config.toast.export': 'Plugin settings exported',
    'config.error.root':
      'The root element does not exist in the plugin HTML. To render the plugin settings, an element with id="settings" is required.',
    'config.error.import': 'Failed to import settings. Please check the file for errors.',
    'config.error.export':
      'Failed to export the plugin settings. Please contact the plugin developer.',
    'desktop.dialogtrigger.title': 'Plugin is enabled',
    'desktop.dialogtrigger.content': 'Click to view event details',
    'desktop.dialog.title': 'Plugin Settings',
  },
  es: {
    'config.condition.memo.title': 'Memo',
    'config.condition.memo.description':
      'Esta es una configuración de ejemplo. Puede guardar información de texto en el complemento.',
    'config.condition.memo.label': '📝 Memo',
    'config.condition.memo.placeholder': 'Ingrese texto',
    'config.condition.field.title': 'Campo objetivo',
    'config.condition.field.description':
      'Esta es una configuración de ejemplo. Recupera y muestra una lista de campos de la configuración de la aplicación.',
    'config.condition.isSampleUIShown.title': 'Interruptor de muestra',
    'config.condition.isSampleUIShown.description':
      'Este es un interruptor de muestra que alterna entre habilitado y deshabilitado. Aquí, alterna si se muestra una interfaz de usuario de muestra en la lista de registros.',
    'config.condition.isSampleUIShown.label': 'Mostrar interfaz de usuario de muestra',
    'config.button.save': 'Guardar configuración',
    'config.button.return': 'Volver a la lista de complementos',
    'config.toast.save': 'Configuración guardada',
    'config.toast.reset': 'Configuración restablecida',
    'config.toast.import': 'Configuración importada',
    'config.toast.export': 'Configuración del complemento exportada',
    'config.error.root':
      'El elemento raíz no existe en el HTML del complemento. Para renderizar la configuración del complemento, se requiere un elemento con id="settings".',
    'config.error.import':
      'Error al importar la configuración. Por favor, verifique el archivo en busca de errores.',
    'config.error.export':
      'Error al exportar la configuración del complemento. Por favor, contacte al desarrollador del complemento.',
    'desktop.dialogtrigger.title': 'El complemento está habilitado',
    'desktop.dialogtrigger.content': 'Haz clic para ver los detalles del evento',
    'desktop.dialog.title': 'Configuración del complemento',
  },
  zh: {
    'config.condition.memo.title': '备忘录',
    'config.condition.memo.description': '这是一个示例设置。您可以在插件中保存文本信息。',
    'config.condition.memo.label': '📝 备忘录',
    'config.condition.memo.placeholder': '输入文本',
    'config.condition.field.title': '目标字段',
    'config.condition.field.description':
      '这是一个示例设置。它从应用程序设置中检索并显示字段列表。',
    'config.condition.isSampleUIShown.title': '开关示例',
    'config.condition.isSampleUIShown.description':
      '这是一个示例开关，可在启用和禁用之间切换。在这里，它切换是否在记录列表中显示示例UI。',
    'config.condition.isSampleUIShown.label': '显示示例UI',
    'config.button.save': '保存设置',
    'config.button.return': '返回插件列表',
    'config.toast.save': '设置已保存',
    'config.toast.reset': '设置已重置',
    'config.toast.import': '已导入设置',
    'config.toast.export': '已导出插件设置',
    'config.error.root': '插件HTML中不存在根元素。要渲染插件设置，需要一个id="settings"的元素。',
    'config.error.import': '导入设置失败。请检查文件是否有错误。',
    'config.error.export': '导出插件设置失败。请联系插件开发者。',
    'desktop.dialogtrigger.title': '插件已启用',
    'desktop.dialogtrigger.content': '点击查看事件详情',
    'desktop.dialog.title': '插件设置',
  },
} as const;

export type Language = keyof typeof ui;

export const defaultLang = 'ja' satisfies Language;

/**
 * 指定された言語に対応する翻訳関数を返します。
 * @param lang - 言語のキー
 * @returns 指定された言語に対応する翻訳関数
 */
export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]): string {
    //@ts-ignore
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}

export const t = useTranslations(LANGUAGE as Language);

export const getMUITheme = () => {
  return createTheme(
    {},
    LANGUAGE === 'en' ? enUS : LANGUAGE === 'zh' ? zhCN : LANGUAGE === 'es' ? esES : jaJP
  );
};
