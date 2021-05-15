/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { useState, ComponentProps, Fragment } from 'react';
import AuthLayout from './AuthLayout';
import AuthRowItem from './AuthRowItem';
import FixedModalCTA from '../UI/FixedModalCTA';
import { ArrowBackOutline } from 'react-ionicons'
import Checkbox from '../Checkbox';

export interface Props extends ComponentProps<typeof AuthLayout> {
    onNext: () => void
}

const rowItems = ['여성', '남성', '논바이너리'];

export default function AuthGender ({ onNext, ...rest }: Props) {
    const [step, setStep] = useState(0);

    const components = [
        (
            <>
                <Question>회원님은 고려대학교 학생이시군요!</Question>
                <Description>재학 중이신가요? 졸업을 하셨나요?</Description>

                {/* Checkbox */}

            </>
        ),
        (
            <>
                <nav css={css`
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                `}>
                    <ArrowBackOutline
                        color={'#00000'} 
                        title={"뒤로가기"}
                        height="24px"
                        width="24px"
                    />
                    <p 
                        onClick={onNext}
                        css={css`color: #18A0FB; font-weight: 700; cursor: pointer;`}
                    >
                        확인
                    </p>
                </nav>
                <Question>학교를 공개하시겠어요?</Question>
                <Description>공개여부는 언제든지 변경 가능해요!</Description>

                {/* Checkbox */}

                <Description css={css`color: #A7B0C0; font-size: 12px; line-height: 20px;`}>
                    공개하면 더 많은 네트워킹이 가능!
                </Description>
            </>
        )
    ];

    return (
        <>
            <AuthLayout {...rest}>
                <Container>
                    {rowItems.map((el, index) => (
                        <AuthRowItem 
                            key={index}
                            value={el}
                        />
                    ))}
                </Container>
            </AuthLayout>
            <FixedModalCTA>
                <Checkbox />
                {/* {components.map((component, index) => {
                    if(index === step)
                        return <Fragment key={index}>{component}</Fragment>
                    
                    return null;
                })} */}
            </FixedModalCTA>
        </>
    );  
}

const Container = styled.div`
    flex: 1;
    margin: 30px;
`;

const Question = styled.h3`
    font-size: 16px;
    font-weight: 700;
    line-height: 28px;
`;

const Description = styled.p`
    font-size: 10px;
    line-height: 32px;
    color: #A7B0C0;
`;