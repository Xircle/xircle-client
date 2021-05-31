/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

export const visuallyHidden = css`
  position: absolute;
  padding: 0;
  margin: -1px;
  width: 1px;
  height: 1px;
  border: 0;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
  -webkit-appearance: none;
`;
