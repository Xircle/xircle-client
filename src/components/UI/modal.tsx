/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';

type ModalProps = {
    children: React.ReactNode;
    show: boolean;
    type?: string;
}
const Modal = ({ children, show, type = '' }: ModalProps) => {
    let top;
    if(type === 'directInput') {
        top = '10%';
    }else {
        top = '30%';
    }
    return (
        <div 
            css={css`
                display: ${show ? 'null' : 'none'};
                border-radius: 24px;
                position: fixed;
                z-index: 999;
                width: 320px;
                min-height: 250px;
                text-align: center;
                box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.25);
                background-color: #fff;
                padding: 30px 36px 36px;
                left: calc(50% - 160px);
                top: ${top};
                box-sizing: border-box;
                transition: all .3s ease-out;
                transform: ${show ? 'scale(1)' : 'scale(0.5)'};
                opacity: ${show ? 1 : 0};
            `}
        >
            {children}
        </div>
    )
}

export default React.memo(Modal);
