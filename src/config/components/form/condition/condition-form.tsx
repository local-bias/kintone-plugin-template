import React, { VFC, VFCX } from 'react';
import styled from '@emotion/styled';

type ContainerProps = { condition: kintone.plugin.Condition; index: number };
type Props = ContainerProps & {};

const Component: VFCX<Props> = ({ className, index, condition }) => (
  <div {...{ className }}>
    <div>{index + 1}番目の設定です</div>
    <div>
      {Object.entries(condition).map(([key, value], i) => (
        <div key={i}>
          {key}: {value}({typeof value})
        </div>
      ))}
    </div>
  </div>
);

const StyledComponent = styled(Component)`
  padding: 0 16px;
`;

const Container: VFC<ContainerProps> = ({ condition, index }) => {
  return <StyledComponent {...{ condition, index }} />;
};

export default Container;
