import styled from 'styled-components';

export const Input = styled.input`
    flex-grow: 1;
    width: 100%;
    padding: 0 8px;
    text-align: right;
    background-color: transparent;
    border: none;
    font-size: 18px;
    color: #c0c0c0;
`;

export const Wrapper = styled.div`
    padding: 20px;
    background-color: #2b2b2d;
    border-radius: 16px;
`;

export const TopLine = styled.div`
    display: flex;
    margin-bottom: 6px;
    color: #c0c0c0;
`;

export const BottomLine = styled.div`
    color: #676769;
`;

export const CurrencyCode = styled.span`
    display: flex;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
`;

export const IconWrapper = styled.span`
    display: flex;
    align-items: center;
    height: 20px;
    padding-left: 6px;
`;
