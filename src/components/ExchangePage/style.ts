import styled from 'styled-components';

export const Layout = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
`;

export const TopSection = styled.div``;

export const ExchangeRate = styled.div`
    display: flex;
    color: #2d5fa8;
    margin: 8px 0 16px 0;
`;

export const Title = styled.h1`
    color: #c0c0c0;
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
    color: #fff;
    background-color: #0a84ff;
    cursor: pointer;

    &:disabled {
        color: #c0c0c0;
        background-color: #021a34;
        cursor: default;
    }
`;
