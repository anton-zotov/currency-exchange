import styled from 'styled-components';

export const Shadow = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-end;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(10, 10, 10, 0.5);
`;

export const Panel = styled.div`
    padding: 50px 0;
    background-color: #1c1c1e;
    color: #fff;
    border-radius: 20px;
    font-size: 20px;
    font-weight: 500;
    text-align: center;
    cursor: pointer;
`;

export const IconWrapper = styled.div`
    margin-bottom: 10px;
    color: #0567ee;
    font-size: 80px;
    text-align: center;
`;

export const Summary = styled.div`
    margin-top: 8px;
    color: #0567ee;
`;
