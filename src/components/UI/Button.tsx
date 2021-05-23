/** @jsxImportSource @emotion/react */
import React, { forwardRef, Ref, ButtonHTMLAttributes } from 'react';
import colors from '../../constants/colors';
import { css } from '@emotion/react';
import { useId } from '../../hooks/useId';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  fullWidth?: boolean;
}

const Button = forwardRef(function Button(
  props: Props, 
  forwardedRef: Ref<HTMLButtonElement>
) {
  const { fullWidth = true, children, ...rest } = props;
  const buttonId = useId();

  return (
    <button
      ref={forwardedRef}
      id={buttonId}
      css={css`
        width: ${fullWidth ? '85%' : '160px'};
        height: 56px;
        margin: 20px auto;
        border: 0 solid transparent;
        border-radius: 60px;
        background-color: ${colors.mainBlack};
        color: ${colors.white};
        font-size: 17px;
        font-weight: 600;
        white-space: nowrap;
        user-select: none;
        box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
        cursor: pointer;
        & + & {
          margin: 0px;
        }
        &:focus {
          outline: none;
        }
        &:disabled {
          opacity: 0.26;
          cursor: not-allowed;
        }
        &:active {
          background-color: ${colors.grey600};
        }
      `}
      {...rest}
    >
      <span>{children}</span>
    </button>
  );
});

export default Button;
