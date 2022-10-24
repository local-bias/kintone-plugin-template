import styled from '@emotion/styled';

const Component = styled.div`
  display: grid;
  gap: 16px;

  grid-template:
    'sidebar form' minmax(600px, 1fr)
    'footer footer' auto/
    300px 1fr;

  @media (min-width: 1024px) {
    grid-template:
      'sidebar form' minmax(600px, 1fr)
      'footer footer' auto/
      300px 1fr;
  }
`;

export default Component;
