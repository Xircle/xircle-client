/** @jsxImportSource @emotion/react */
import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { useAppDispatch, useAppSelector } from '../../hooks/useSelector';
import FixedModalCTA from '../UI/FixedModalCTA';
import AuthCheckboxRow from './AuthCheckboxRow';
import { ArrowBackOutline } from 'react-ionicons';
import { addIsPublic, addIsGraduate } from '../../store/modules/profile';

interface Props {
  clicked: () => void;
}

const options = [
  [
    {
      title: '재학중',
      value: 'isAttending',
    },
    {
      title: '졸업',
      value: 'isGraduate',
    },
  ],
  [
    {
      title: '공개',
      value: 'isPublic',
    },
    {
      title: '비공개',
      value: 'isPrivate',
    },
  ],
];

export default function AuthPublicGraduate({ clicked }: Props) {
  const { univ } = useAppSelector((store) => store.profile.data);
  const [step, setStep] = React.useState<number>(0);
  const [checkedValueArr, setCheckedValueArr] = React.useState(['', '']);

  const dispatch = useAppDispatch();
  const finalClickHandler = () => {
    const isGraduate = checkedValueArr[0] === '재학중' ? false : true;
    const isPublic = checkedValueArr[1] === '공개' ? true : false;
    dispatch(addIsGraduate(isGraduate));
    dispatch(addIsPublic(isPublic));
    clicked();
  };

  const components = [
    <div
      css={css`
        margin: 30px 0;
      `}
    >
      <Question>
        회원님은 {univ} <br /> 학생이시군요!
      </Question>
      <Description>재학 중이신가요? 졸업을 하셨나요?</Description>
      <CheckBoxList>
        {options[0].map(({ title, value }) => (
          <AuthCheckboxRow
            key={value}
            label={title}
            checked={checkedValueArr[0] === title}
            onClick={(label) => {
              setCheckedValueArr([label, checkedValueArr[1]]);
              setStep((step) => step + 1);
            }}
          />
        ))}
      </CheckBoxList>
    </div>,
    <>
      <nav
        css={css`
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 0 0 10px;
        `}
      >
        <StyledButton onClick={() => setStep((step) => step - 1)}>
          <ArrowBackOutline
            color={'#00000'}
            title={'뒤로가기'}
            height="24px"
            width="24px"
          />
        </StyledButton>
        <p
          onClick={finalClickHandler}
          css={css`
            color: #18a0fb;
            font-weight: 700;
            cursor: pointer;
          `}
        >
          확인
        </p>
      </nav>
      <Question>학교를 공개하시겠어요?</Question>
      <Description>공개여부는 언제든지 변경 가능해요!</Description>

      {/* Checkbox */}
      <CheckBoxList>
        {options[1].map(({ title, value }) => (
          <AuthCheckboxRow
            key={value}
            label={title}
            checked={checkedValueArr[1] === title}
            onClick={(label) => {
              setCheckedValueArr([checkedValueArr[0], label]);
            }}
          />
        ))}
      </CheckBoxList>

      <Description
        css={css`
          color: #a7b0c0;
          font-size: 12px;
          line-height: 20px;
        `}
      >
        공개하면 더 많은 네트워킹이 가능!
      </Description>
    </>,
  ];

  return (
    <FixedModalCTA show={true} mandatory>
      {components.map((component, index) => {
        if (step === index)
          return <React.Fragment key={index}>{component}</React.Fragment>;

        return null;
      })}
    </FixedModalCTA>
  );
}

export const Question = styled.h3`
  font-size: 18px;
  font-weight: 700;
  line-height: 28px;
`;

export const Description = styled.p`
  font-size: 12px;
  line-height: 28px;
  color: #a7b0c0;
`;

const CheckBoxList = styled.div`
  display: flex;
  margin: 15px 0;
`;

export const StyledButton = styled.button`
  background-color: #fff;
  border: none;
  cursor: pointer;
`;
