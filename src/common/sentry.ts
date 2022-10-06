import { isMobile } from '@lb-ribbit/kintone-xapp';
import * as Sentry from '@sentry/react';
import { PLUGIN_NAME } from './static';

const getPrimitiveProps = (
  prefix: string,
  props: Object
): Record<string, string | number | boolean> => {
  const leveled = Object.entries(props ?? {}).reduce((acc, [key, value]) => {
    const valueType = typeof value;

    if (valueType === 'object') {
      return { ...acc, ...getPrimitiveProps(prefix, value) };
    }

    if (['string', 'number', 'boolean'].includes(valueType)) {
      return acc;
    }

    return {
      ...acc,
      [`${prefix}${key}`]: value,
    };
  }, {});

  return leveled;
};

try {
  Sentry.init({
    dsn: 'https://947849a62ea4438b9b3fc3a04e41d2ae@o1300660.ingest.sentry.io/6535495',
    integrations: [],
    tracesSampleRate: 0.1,
    initialScope: {
      tags: {
        'plugin-name': PLUGIN_NAME,
        isMobile: isMobile(),
        ...getPrimitiveProps('location-', window?.location),
        ...getPrimitiveProps('user-', cybozu?.data?.LOGIN_USER),
      },
    },
  });
} catch (error) {
  console.error(`[${PLUGIN_NAME}] Sentryの初期設定でエラーが発生しました`);
}
