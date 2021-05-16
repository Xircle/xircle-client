/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { MdDone } from 'react-icons/md';

interface Props {
  label: string;
  checked: boolean | null;
  onClick: (label: string) => void;
}

export default function AuthCheckboxRow({ label, checked, onClick }: Props) {
  return (
    <Label onClick={() => onClick(label)} htmlFor={label}>
      <RowBody>
        <CheckCircle checked={checked}>
            <MdDone/>
        </CheckCircle>
        <LabelText>{label}</LabelText>
      </RowBody>
    </Label>
  );
}

const Label = styled.label`
  width: 100%;
  margin: 0;
  padding: 0;
  cursor: pointer;
`;

const RowBody = styled.span`
    display: flex;
`;

const CheckCircle = styled.div<{ checked: boolean | null }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  margin: 0 10px 0 30px;
  font-size: 18px;
  border-radius: 12px;
  border: 1px solid #18a0fb;
  color: #18a0fb;
  ${props => props.checked && css`
    background-color: #18a0fb;
    color: #fff;
  `}
`;

const LabelText = styled.span`
  line-height: 24px;
  margin: 0 5px;
  word-break: keep-all;
  overflow-wrap: break-word;
`;
