import React from 'react';

declare module 'react' {
  /**
   * classNameを追加したファンクションコンポーネント型
   */
  type FCX<P = {}> = React.FunctionComponent<P & { className?: string }>;

  /**
   * classNameを追加した子コンポーネントを含まないファンクションコンポーネント型
   */
  type VFCX<P = {}> = React.VFC<P & { className?: string }>;
}
