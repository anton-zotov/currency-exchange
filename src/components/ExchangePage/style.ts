import styled from 'styled-components';
import { Colors } from '../../common-styles/colors';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`;

export const ErrorNotification = styled.div`
    padding: 10px;
    margin-bottom: 20px;
    background-color: ${Colors.ErrorNotificationBackground};
    border-radius: 10px;
    color: ${Colors.DominantBackgroundText};
    text-align: center;
`;

export const Layout = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
`;

export const TopSection = styled.div``;

export const ExchangeRate = styled.div`
    display: flex;
    color: ${Colors.DominantText};
    margin: 8px 0 16px 0;
`;

export const Title = styled.h1`
    color: ${Colors.PrimaryText};
`;

export const IconWrapper = styled.span`
    display: flex;
    align-items: center;
    height: 19px;
`;

export const BottomSection = styled.div``;

export const ExchangeButton = styled.button`
    width: 100%;
    padding: 16px;
    border: none;
    border-radius: 20px;
    color: ${Colors.DominantBackgroundText};
    background-color: ${Colors.DominantBackground};
    cursor: pointer;

    &:disabled {
        color: ${Colors.PrimaryText};
        background-color: ${Colors.DominantBackgroundDisabled};
        cursor: default;
    }
`;
