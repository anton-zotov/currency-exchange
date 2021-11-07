import styled, { keyframes } from 'styled-components';
import { Colors } from '../../common-styles/colors';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const IconWrapper = styled.div`
    width: 60px;
    height: 60px;
    color: ${Colors.DominantText};
    font-size: 60px;
    animation: ${rotate} 4s linear infinite;
`;
