/** @jsxImportSource @emotion/react */
import * as React from 'react';
import { css } from '@emotion/react';
import Container from '../Container';
import type { Interest } from '../../store/modules/articles';

export interface ProfileInterestProps {
    interestClickHandler: (interest: Interest) => void;
    active: string | Interest
}

function ProfileInterest ({
    interestClickHandler,
    active
}: ProfileInterestProps) {
    return (
        <Container bgColor="#F8FAFD">
            <div css={css`min-height: 400px;`}>

            </div>
        </Container>
    );
}

export default ProfileInterest;