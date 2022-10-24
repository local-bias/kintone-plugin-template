import React, { FCX } from 'react';
import styled from '@emotion/styled';

type ContainerProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> &
  Readonly<{ depth?: number; elevation?: number }>;

const Component: FCX<ContainerProps> = ({ className, children, ...others }) => (
  <button {...{ className, ...others }}>{children}</button>
);

const StyledComponent = styled(Component)`
  backdrop-filter: blur(8px);
  cursor: pointer;

  filter: brightness(1);
  &:hover {
    filter: brightness(0.9);
  }

  border: 0;
  border-radius: 1000px;
  background: linear-gradient(45deg, #acb6e5, #64bde4);
  color: #fff;
  padding: 10px 24px;
`;

export default StyledComponent;
