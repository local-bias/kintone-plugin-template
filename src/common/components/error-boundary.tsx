import React, { FC, FCwC, FCX } from 'react';
import styled from '@emotion/styled';
import { ErrorBoundary as ErrBoundary, FallbackProps } from 'react-error-boundary';
import { Button } from '@mui/material';
import { URL_HOMEPAGE } from '@common/static';

const Component: FCX<FallbackProps> = ({ className, error, resetErrorBoundary }) => (
  <div {...{ className }}>
    <svg height='512' viewBox='0 0 510 510' width='512' xmlns='http://www.w3.org/2000/svg'>
      <g>
        <path
          d='m420.96 425h-165.96l-24.388-150 24.388-155h43.69c15.73 0 31.15 5.43 43.4 15.3s20.85 23.77 24.2 39.14z'
          fill='#ff4a4a'
        />
        <path
          d='m255 120v305h-165.96l49.87-249.38c6.45-32.23 34.99-55.62 67.85-55.62z'
          fill='#ff936a'
        />
        <path
          d='m255 250 5.341-13.989-5.341-16.011c-38.6 0-70 31.4-70 70 0 33.45 23.59 61.48 55 68.36v56.64h15l5.341-50.418-5.341-34.582c-22.06 0-40-17.94-40-40s17.94-40 40-40z'
          fill='#c40048'
        />
        <path
          d='m325 290c0 33.45-23.59 61.48-55 68.36v56.64h-15v-85c22.06 0 40-17.94 40-40s-17.94-40-40-40v-14.385-15.615c38.6 0 70 31.4 70 70z'
          fill='#910035'
        />
        <path d='m270 0v90h-15l-7.5-45 7.5-45z' fill='#910035' />
        <path d='m240 0h15v90h-15z' fill='#c40048' />
        <path
          d='m415.874 180h90v30h-90z'
          fill='#910035'
          transform='matrix(.981 -.196 .196 .981 -29.29 94.159)'
        />
        <path
          d='m361.82 63.18h90v30h-90z'
          fill='#910035'
          transform='matrix(.707 -.707 .707 .707 63.873 310.564)'
        />
        <g fill='#c40048'>
          <path
            d='m34.126 150h30.001v90h-30.001z'
            transform='matrix(.196 -.981 .981 .196 -151.721 204.93)'
          />
          <path
            d='m88.181 33.18h30v90h-30z'
            transform='matrix(.707 -.707 .707 .707 -25.061 95.858)'
          />
          <path d='m450 446.33v63.67h-195l-19.187-52.055 19.187-62.945h143.67c28.3 0 51.33 23.03 51.33 51.33z' />
        </g>
        <path d='m255 395v115h-195v-63.67c0-28.3 23.03-51.33 51.33-51.33z' fill='#ff4a4a' />
      </g>
    </svg>
    <div className='container'>
      <h1>エラーが発生しました</h1>

      <div>
        <p>予期しないエラーが発生しました</p>
        <p>リトライしても解決しない場合は、開発者までお問い合わせください。</p>
        <a href={URL_HOMEPAGE}>開発者HP</a>
        <p className='error'>{error.message}</p>
      </div>
      <Button variant='contained' color='primary' size='large' onClick={resetErrorBoundary}>
        リトライ
      </Button>
    </div>
  </div>
);

const StyledComponent = styled(Component)`
  width: 100%;
  height: 100%;
  min-height: 60vh;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 24px 16px;
  background-color: #fff;

  h1 {
    font-size: 20px;
    font-weight: 600;
    color: #777;
  }

  svg {
    width: 200px;
    max-width: 95vw;
  }

  & > .container {
    min-width: 500px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;

    & > h1 {
      margin: 16px 0;
    }
    & > div > .error {
      font-size: 60%;
    }
  }
`;

const Container: FCwC = ({ children }) => (
  <ErrBoundary fallbackRender={(props) => <StyledComponent {...props} />}>{children}</ErrBoundary>
);

export const ErrorBoundary = Container;
