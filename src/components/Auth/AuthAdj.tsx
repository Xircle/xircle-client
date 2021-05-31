/** @jsxImportSource @emotion/react */
import React, { ComponentProps } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import AuthLayout from './AuthLayout';
import { adjectives } from '../../model/person';
import AuthRowItem from './AuthRowItem';
import FixedModalCTA from '../UI/FixedModalCTA';
import { ArrowBackOutline } from 'react-ionicons';
import { AiOutlinePlus } from 'react-icons/ai';
import { Question, StyledButton } from './AuthPublicGraduate';
import { useAppDispatch } from '../../hooks/useSelector';
import { addAdj } from '../../store/modules/profile';
import TextArea from '../UI/TextArea';

interface Props extends ComponentProps<typeof AuthLayout> {
  onNext: () => void;
}

export default function AuthAdj({ onNext, ...props }: Props) {
  const [rowValue, setRowValue] = React.useState<string>('');
  const [show, setShow] = React.useState<boolean>(false);

  const dispatch = useAppDispatch();

  const finalClickHandler = (value: string) => {
    if (!value) return alert('선택지 중에 하나 선택해주세요!');
    dispatch(addAdj(value));
    onNext();
  };

  return (
    <div
      css={css`
        position: relative;
      `}
    >
      <AuthLayout {...props}>
        <Container>
          {adjectives.map(({ value }) => (
            <AuthRowItem
              key={value}
              value={value}
              clicked={value === rowValue}
              onClick={(value) => {
                console.log(value);
                finalClickHandler(value);
              }}
            />
          ))}
        </Container>
        <PlusButton onClick={() => setShow(true)}>
          <AiOutlinePlus />
        </PlusButton>
      </AuthLayout>

      <FixedModalCTA
        show={show}
        clicked={() => setShow(!show)}
        mandatory={false}
      >
        <>
          <nav
            css={css`
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin: 0 0 10px;
            `}
          >
            <StyledButton onClick={() => setShow(false)}>
              <ArrowBackOutline
                color={'#00000'}
                title={'뒤로가기'}
                height="24px"
                width="24px"
              />
            </StyledButton>
            <p
              onClick={() => finalClickHandler(rowValue)}
              css={css`
                color: #18a0fb;
                font-weight: 700;
                cursor: pointer;
              `}
            >
              확인
            </p>
          </nav>
          <Question>사용자이름 (뒷부분)</Question>
          <TextArea
            placeholder={
              '이름, 별명, 직업 등 회원님의\n계정을 자유롭게 나타내보세요.'
            }
            value={rowValue}
            onChange={(value) => setRowValue(value)}
          />
        </>
      </FixedModalCTA>
    </div>
  );
}

const Container = styled.div`
  flex: 1;
  margin: 50px 30px;
`;

const PlusButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 5rem;
  right: 3rem;
  font-size: 45px;
  width: 65px;
  height: 65px;
  border-radius: 35px;
  background-color: #f9f9f9;
  box-shadow: -10px -10px 30px #ffffff, 10px 10px 20px rgba(174, 174, 192, 0.3);
  cursor: pointer;
`;
