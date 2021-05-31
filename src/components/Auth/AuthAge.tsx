/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { css } from '@emotion/react';
import FixedModalCTA from '../UI/FixedModalCTA';
import { Question, Description, StyledButton } from './AuthPublicGraduate';
import { ArrowBackOutline } from 'react-ionicons';
import Button from '../UI/Button';
import colors from '../../constants/colors';
import { AgeSettingOptions } from '../../model/person'; 
interface Props {
  prevStep: () => void;
  onConfirm: (age: number) => void;
}

export default function AuthAge({ prevStep, onConfirm }: Props) {
  const [age, setAge] = useState<number | undefined>(undefined);

  return (
    <FixedModalCTA show={true} mandatory>
      <nav
        css={css`
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 0 0 10px;
        `}
      >
        <StyledButton onClick={prevStep}>
          <ArrowBackOutline
            color={'#00000'}
            title={'뒤로가기'}
            height="24px"
            width="24px"
          />
        </StyledButton>
        <p
          onClick={() => {
            console.log(age);
            if(!age) return alert("나이를 선택해주세요");
            onConfirm(age)
          }}
          css={css`
            color: #18a0fb;
            font-weight: 700;
            cursor: pointer;
          `}
        >
          확인
        </p>
      </nav>
      <Question>회원님은 몇 살 이신가요?</Question>
      <Description css={css`line-height: 20px; margin: 20px 0;`}>걱정마세요. 나이는 초,중,후반으로 표시 됩니다. <br /> 나이는 변경이 어려우니 잘 선택해주세요.</Description>
     
      <Button css={css`background-color: #18A0FB; &:active { background-color: #18A0FB}`} fullWidth={false}>
        <select 
          name="age" 
          css={css`
            background-color: #18A0FB;
            border: none;
            cursor: pointer;
            color: #fff;
            &:focus {
              outline: none;
            }
            &:active { 
              background-color: ${colors.blue500}
            }
          `}
          onChange={(e) => setAge(Number(e.target.value))}
        >
          <option value={''} hidden>나이 선택</option>
          {AgeSettingOptions.map(({ label, value }) => (
            <option 
              key={value} 
              value={value}
            >{label}</option>
          ))}
        </select>
      </Button>
    </FixedModalCTA>
  );
}
