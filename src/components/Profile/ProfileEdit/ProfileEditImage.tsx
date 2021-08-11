/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';

interface Props {
  profileImgSrc: string;
  displayName: string;
  uploadPhoto: (e: any) => void;
}

export default function ProfileImage({ profileImgSrc, displayName, uploadPhoto }: Props) {
  return (
    <>
      <div css={css`position: relative; margin: 30px 0;`}>
        <img
          css={css`
            width: 111px;
            height: 111px;
            display: block;
            border-radius: 60px;
            background-color: #fff;
            margin: 0 auto;
            object-fit: cover;
          `}
          src={profileImgSrc}
        />
        <input
          css={css`
            position: absolute;
            display: block;
            opacity: 0;
            top: 0;
            left: 50%;
            transform: translate(-50%, 0);
            width: 111px;
            height: 111px;
            border-radius: 150px;
            cursor: pointer;
          `}
          type="file"
          accept="image/x-png,image/png,image/svg,image/jpeg,image/jpg,image/gif"
          onChange={(e) => uploadPhoto(e)}
        />
        <div
          css={css`
            position: absolute;
            bottom: 15px;
            right: 31%;
          `}
        >
          <div
            css={css`
              display: flex;
              justify-content: center;
              align-items: center;
              width: 26px;
              height: 26px;
              border-radius: 13px;
              box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.08);
              background-color: #fff;
            `}
          >
            <img src="/profile/camera_only.svg" alt="camera" />
          </div>
        </div>
      </div>
      <div css={css`text-align: center; margin: 1.5rem 0`}>
        <span
        css={css`
          font-size: 20px;
          margin: 0;
          font-weight: lighter;
          font-family: cursive;
          margin: 5px 0;
        `}
        >
          {displayName}
        </span>
      </div>
    </>
  );
}
