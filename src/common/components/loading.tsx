import React, { FCX } from 'react';
import styled from '@emotion/styled';

type Props = Readonly<{ label: string }>;

const Component: FCX<Props> = ({ className, label }) => (
  <div {...{ className }}>
    <div>
      {['#fc0', '#fd5', '#fff'].map((color, i) => (
        <svg key={i} viewBox='0 -87 463.83425 463' xmlns='http://www.w3.org/2000/svg'>
          <path
            d='m375.835938 112.957031c-5.851563 0-11.691407.582031-17.425782 1.742188-4.324218-21.582031-18.304687-39.992188-37.933594-49.957031-19.625-9.964844-42.738281-10.382813-62.714843-1.136719-18.078125-49.796875-73.101563-75.507813-122.898438-57.429688s-75.507812 73.105469-57.429687 122.898438c-43.621094 1.378906-78.078125 37.484375-77.4257815 81.121093.6562495 43.640626 36.1835935 78.691407 79.8281255 78.761719h296c48.597656 0 88-39.398437 88-88 0-48.601562-39.402344-88-88-88zm0 0'
            fill={color}
          />
        </svg>
      ))}
    </div>
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

  > div {
    width: 120px;
    height: 120px;
    position: relative;

    svg {
      filter: drop-shadow(2px 2px 3px #0002);
      position: absolute;
      top: 50%;
      left: 50%;
      transition: all;
      animation-name: fluffy;
      animation-duration: 2s;
      animation-timing-function: ease-in-out;
      animation-iteration-count: infinite;

      &:nth-of-type(1) {
        width: 100%;
        height: 100%;
        transform: translate(-60%, -50%);
      }
      &:nth-of-type(2) {
        width: 75%;
        height: 75%;
        animation-delay: -0.2s;
        transform: translate(-30%, -30%);
      }
      &:nth-of-type(3) {
        width: 60%;
        height: 60%;
        animation-delay: -0.4s;
        transform: translate(-100%, -20%);
      }
    }

    &:before {
      content: '';
      position: absolute;
      bottom: -20px;
      width: 100%;
      height: 20px;
      background-image: radial-gradient(#0003 20%, #0001 40%, transparent 60%);
    }
  }

  @keyframes fluffy {
    50% {
      top: 44%;
    }
  }
`;

export const Loading = StyledComponent;
