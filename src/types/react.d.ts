import React from 'react';

declare module 'react' {
  /** classNameを追加したファンクションコンポーネント */
  type FCX<P = Record<string, unknown>> = React.FunctionComponent<P & { className?: string }>;

  /** childrenを追加したファンクションコンポーネント */
  type FCwC<P = Record<string, unknown>> = React.FunctionComponent<
    P & { children: React.ReactNode }
  >;
}
