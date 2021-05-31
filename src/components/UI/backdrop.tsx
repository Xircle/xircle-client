/** @jsxImportSource @emotion/react */
import React, { MouseEvent } from 'react';
import { css } from '@emotion/react';

type BackdropProps = {
    show: boolean;
    clicked?: () => void;
}

function Backdrop({ show, clicked }: BackdropProps) {
    return (
        show ? ( 
            <div 
                css={css`
                    position: fixed;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 998;
                    background-color: rgba(0, 0, 0, .6);
                `}
                onClick={() => clicked?.()}
            /> 
        ) : null
    )
}

export default Backdrop;