import React, { VFCX } from 'react';
import styled from '@emotion/styled';

type Props = Readonly<{ label: string }>;

const Component: VFCX<Props> = ({ className, label }) => (
  <div {...{ className }}>
    <div></div>
    <h2>{label}</h2>
  </div>
);

const StyledComponent = styled(Component)`
  min-height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 32px;

  > h2 {
    color: #0007;
  }

  > div {
    width: 60px;
    height: 60px;
    background-color: #0003;

    animation: loading 1.2s infinite ease-in-out;
  }

  @keyframes loading {
    0% {
      transform: perspective(120px) rotateX(0deg) rotateY(0deg);
    }
    50% {
      transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
    }
    100% {
      transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
    }
  }
`;

export const Loading = StyledComponent;
