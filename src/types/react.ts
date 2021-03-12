import React from 'react';

declare module 'react' {
  /**
   * CSS in JSを利用しやすくするため、classNameを追加したファンクションコンポーネント型
   */
  type FCX<P = {}> = React.FunctionComponent<P & { className?: string }>;
}
