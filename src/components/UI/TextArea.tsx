/** @jsxImportSource @emotion/react */
import React, { forwardRef, Ref } from 'react';
import { css } from '@emotion/react';

interface Props {
    placeholder: string;
    defaultValue?: string;
    value?: string;
    onChange?: (value: string) => void;
}

const TextArea = forwardRef(function TextArea(
    { 
        placeholder, 
        defaultValue, 
        value,
        onChange
    }: Props,
    forwardedRef: Ref<HTMLTextAreaElement>    
) {
  return (
    <textarea
        css={css`
            min-height: 120px;
            width: 100%;
            margin: 20px 0;
            background-color: #F7F7FA;
            border: none;
            border-radius: 14px;
            border: 1px solid #E7ECF3;
            padding: 20px 30px; 
            font-size: 17px;
            text-align: center;
            ::placeholder {
                color: #A7B0C0;
            }
        `}
      defaultValue={defaultValue}
      onChange={(e) => onChange?.(e.target.value)}
      placeholder={placeholder}
      ref={forwardedRef}
    />
  );
});

export default TextArea;