import React from 'react';
import { BiLoaderCircle } from 'react-icons/bi';
import { IconWrapper, Wrapper } from './style';

function LoadingPage() {
    return (
        <Wrapper>
            <IconWrapper>
                <BiLoaderCircle data-testid="loading-icon" />
            </IconWrapper>
        </Wrapper>
    );
}

export default LoadingPage;
