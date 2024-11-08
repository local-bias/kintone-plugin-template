import { FC } from 'react';
import Modal from './modal';

const Component: FC = () => <Modal />;

const Container: FC = () => {
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }
  return <Component />;
};

export default Container;
