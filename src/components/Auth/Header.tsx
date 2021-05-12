/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import { ArrowBackOutline } from 'react-ionicons'

interface Props {
  onBackClick?: () => void;
  step: number;
}

const Header = ({ step, onBackClick }: Props) => {
  return (
    <header
      css={css`
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.5rem 2rem;
        margin: 0 0 10px;
      `}
    >
      <button
        css={css`
          background-color: #F8FAFD;
          width: 44px;
          height: 44px;
          border-radius: 22px;
          border: none;
          cursor: pointer;
          &:focus {
            outline: none;
          }
        `}
        onClick={onBackClick}
      >
        <ArrowBackOutline
          
          color={'#00000'} 
          title={"뒤로가기"}
          height="30px"
          width="30px"
        />
      </button>
      {step === 0 && (
      <p
        css={css`
          color: #007FFF;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
        `}
      >로그인하기</p>
      )}
    </header>
  );
};



export default Header;
