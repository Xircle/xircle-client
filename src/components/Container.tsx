/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import colors from '../constants/colors';

interface Props {
  children: React.ReactNode;
  bgColor?: string
}

export default function Container({ children, bgColor }: Props) {
  return (
    <div
      css={css`
        max-width: 100%;
        width: 100%;
        padding: 0;
        margin: 0;
        height: auto;
      `}
    >
      <div
        css={css`
          background: ${bgColor ? bgColor : colors.background};
        `}
      >
        {children}
      </div>
    </div>
  );
}

