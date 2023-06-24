import React from 'react';

declare module 'react' {
  /** classNameを追加したファンクションコンポーネント */
  type FCX<P = Record<string, unknown>> = React.FunctionComponent<P & { className?: string }>;
}
