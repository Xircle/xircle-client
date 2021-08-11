/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

interface Props {
  location: string;
  isLocationPublic: boolean;
  onClicked: () => void;
}

export default function ProfileEditDataRow({
  location,
  isLocationPublic,
  onClicked
}: Props) {
  return (
    <ul
      css={css`
        margin-top: 20px;
        padding: 0 10px 0 0;
      `}
    >
      <li
        onClick={onClicked}
        css={css`
          display: flex;
          justify-content: space-between;
          margin: 30px 0;
          cursor: pointer;
        `}
      >
        <p
          css={css`
            color: #595959;
            margin: 0px;
          `}
        >
          위치
        </p>
        <div
          css={css`
            display: flex;
            align-items: center;
          `}
        >
          <span
            css={css`
              color: #b5b5b5;
            `}
          >
            {location}
            {isLocationPublic ? null : '(비공개)'}
          </span>
          <img
            css={css`
              width: 8px;
              height: 10px;
              margin: 0 0 0 10px;
            `}
            src="/UI/arrow_right_gray.svg"
            alt="arrow"
          />
        </div>
      </li>
    </ul>
  );
}
