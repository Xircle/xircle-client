/** @jsxImportSource @emotion/react */
import colors from '../../constants/colors';
import { css } from '@emotion/react';

interface Props {
    value: string
}

export default function AuthRowItem({ value }: Props) {
    return (
        <div
            css={css`
                display: flex;
                align-items: center;
                background-color: #fff;
                border: 1px solid ${colors.blue500};
                box-sizing: border-box;
                color: ${colors.blue500};
                padding: 1.25rem 1.5rem;
                border-radius: 30px;
                margin: 15px 0;
                &:active {
                    background-color: ${colors.blue100};
                }   
            `}
        >
            {value}
        </div>
    );
}
