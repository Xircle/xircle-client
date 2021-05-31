/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
interface Props {
    step: number
}

export default function AuthProgress ({ step }: Props) {
    let ProgressPercent: string = '0%'; //인자로 들어온 Question Num을 Progress percent로 나타내기.

    if(step === 4) {
        ProgressPercent = '40%';
    } else if (step === 5) {
        ProgressPercent = '60%';
    } else if (step === 6) {
        ProgressPercent = '70%';
    } else if (step === 7) {
        ProgressPercent = '80%';
    } else if (step === 8) {
        ProgressPercent = '93%';
    }else if(step === 9) {
        ProgressPercent = '100%';
    }else {
        ProgressPercent = '100%';
    }

    return (
        <div 
            css={css`
                width: ${ProgressPercent};
                background-color: black;
                transition: all .3s ease-in;
                border: 6px solid black;
                border-top-right-radius: 10px;
                border-bottom-right-radius: 10px;
            `}
        />
    );
}
