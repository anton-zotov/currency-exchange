import styled from 'styled-components';
import { Colors } from '../../common-styles/colors';

export const InputPair = styled.div`
    display: flex;
    flex-direction: column;
`;

export const OperationSwitchWrapper = styled.div`
    margin: -8px 0;
    text-align: center;
    z-index: 10;
`;

export const OperationSwitch = styled.button`
    width: 24px;
    height: 24px;
    padding: 4px;
    border: none;
    border-radius: 100%;
    background-color: ${Colors.ButtonBackground};
    color: ${Colors.DominantText};
    cursor: pointer;
`;
