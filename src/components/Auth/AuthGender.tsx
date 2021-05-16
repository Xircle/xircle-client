/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import React, { useState, ComponentProps, Fragment } from 'react';
import AuthLayout from './AuthLayout';
import AuthRowItem from './AuthRowItem';
import AuthPublicGraduate from './AuthPublicGraduate';
import AuthAge from './AuthAge';
import { useAppDispatch } from '../../hooks/useSelector';
import { addGender, addAge } from '../../store/modules/profile';

export interface Props extends ComponentProps<typeof AuthLayout> {
  onNext: () => void;
}

const rowItems = ['여성', '남성', '논바이너리'];

export default function AuthGender({ onNext, ...rest }: Props) {
  const [rowValue, setRowValue] = useState<string>('');
  const [modalStep, setModalStep] = useState<number>(0);

  const dispatch = useAppDispatch();

  const onConfirmHandler = (age: number) => {
    dispatch(addGender(rowValue));
    dispatch(addAge(age));
    onNext();
  }

  const modalComponents = [
    <AuthPublicGraduate clicked={() => setModalStep(-1)} />,
    <AuthAge prevStep={() => setModalStep(-1)} onConfirm={onConfirmHandler}/>,
  ];

  return (
    <>
      <AuthLayout {...rest}>
        <Container>
          {rowItems.map((value, index) => (
            <AuthRowItem 
                key={index} 
                value={value} 
                clicked={value === rowValue}
                onClick={value => {
                    setRowValue(value);
                    setModalStep(1);
                }}
            />
          ))}
        </Container>
      </AuthLayout>
      {modalComponents.map((component, index) => {
        if (modalStep === index)
          return <React.Fragment key={index}>{component}</React.Fragment>;

        return null;
      })}
    </>
  );
}

const Container = styled.div`
  flex: 1;
  margin: 30px;
`;
