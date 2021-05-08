import React from 'react'
import styled from '@emotion/styled';

export default function Error() {
    return (
        <ErrorContainer>
            <img width={100} height={100} src="/Logo/xircleLogo.png" alt="logo" />
            <p>Error occured.</p>
            <span>Please refresh this page.</span>
        </ErrorContainer>
    )
}

const ErrorContainer = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 80vh;
    p {
        font-size: 24px;
        font-weight: 500;
        margin: 5px 0;
    }
`;