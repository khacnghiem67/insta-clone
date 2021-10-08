import React from 'react';
import styled from 'styled-components';
function NotFound() {
  return (
    <div>
      <Title>PAGE NOT FOUND</Title>
    </div>
  );
}

export default NotFound;

const Title = styled.div`
  color: #333;
  font-size: 3rem;
  text-align: center;
`;
