import styled from 'styled-components';

export const Wrapper = styled.div<{ hasError: boolean }>`
    padding: 20px;
    background-color: ${(props) => (props.hasError ? '#42120e' : '#2b2b2d')};
    border-radius: 16px;
`;

export const TopLine = styled.div`
    display: flex;
    margin-bottom: 6px;
    color: #c0c0c0;
`;

export const CurrencyCode = styled.span`
    display: flex;
    margin-right: 10px;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
`;

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

export const IconWrapper = styled.span`
    display: flex;
    align-items: center;
    height: 20px;
    padding-left: 6px;
`;

export const BottomLine = styled.div`
    display: flex;
    justify-content: space-between;
    color: #676769;
`;

export const Error = styled.span`
    padding-right: 8px;
    color: #ca534d;
`;
