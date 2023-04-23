import React, { FCX } from 'react';
import styled from '@emotion/styled';
import { Loader } from '@konomi-app/ui-react';

type Props = Readonly<{ label: string }>;

const Component: FCX<Props> = ({ className, label }) => (
  <div {...{ className }}>
    <Loader />
    <p>{label}</p>
  </div>
);

const StyledComponent = styled(Component)`
  min-height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 32px;

  > p {
    color: #0007;
    margin: 0;
  }
`;

export const Loading = StyledComponent;
