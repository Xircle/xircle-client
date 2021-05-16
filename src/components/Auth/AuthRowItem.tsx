/** @jsxImportSource @emotion/react */
import colors from '../../constants/colors';
import { css } from '@emotion/react';

interface Props {
    value: string;
    clicked: boolean;
    onClick: (value: string) => void;
}

export default function AuthRowItem({ clicked, onClick, value }: Props) {
    return (
        <div
            css={css`
                display: flex;
                align-items: center;
                background-color: ${clicked ? colors.blue100 : '#fff'};
                border: 1px solid ${colors.blue500};
                font-weight: ${clicked && 700};
                box-sizing: border-box;
                color: ${colors.blue500};
                padding: 1.25rem 1.5rem;
                border-radius: 30px;
                margin: 15px 0;
                cursor: pointer;
            `}
            onClick={() => onClick(value)}
        >
            {value}
        </div>
    );
}
