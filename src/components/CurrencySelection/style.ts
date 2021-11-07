import styled from 'styled-components';
import { Colors } from '../../common-styles/colors';

export const CurrencyItem = styled.li`
    display: flex;
    padding: 10px 0;
    cursor: pointer;
`;

export const LogoWrapper = styled.div`
    flex: 34px 0 0;
    padding-right: 20px;
`;

export const Logo = styled.img`
    width: 100%;
    border-radius: 100%;
`;

export const Wrapper = styled.dialog`
    display: flex;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 100;
    background-color: black;
    color: ${Colors.PrimaryText};
`;

export const Header = styled.h2`
    display: flex;
    height: 28px;
    margin-bottom: 20px;
`;

export const IconWrapper = styled.span`
    display: flex;
    align-items: center;
    height: 27px;
    padding-right: 16px;
    cursor: pointer;
`;

export const Seach = styled.input`
    width: 100vw;
    padding-left: 6px;
    background-color: transparent;
    border: none;
    color: ${Colors.PrimaryText};
    font-size: 16px;
`;

export const SeachLabel = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`;

export const CurrencyLabel = styled.div`
    font-size: 12px;
`;
