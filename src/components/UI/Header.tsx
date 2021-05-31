/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ArrowBackOutline } from 'react-ionicons';

interface Props {
  onBackClick?: () => void;
}

const Header = ({ onBackClick }: Props) => {
  return (
    <header>
      <div
        css={css`
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 2rem 0.5rem;
        `}
      >
        <button
          css={css`
            background-color: #f8fafd;
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
            title={'뒤로가기'}
            height="30px"
            width="30px"
          />
        </button>
      </div>
    </header>
  );
};

export default Header;
