/** @jsxImportSource @emotion/react */
import { useEffect, useState, ComponentProps } from 'react';
import { css } from '@emotion/react';
import { useAppDispatch, useAppSelector } from '../../hooks/useSelector';
import AuthLayout from './AuthLayout';
import styled from '@emotion/styled';
import Top02 from '../Top/Top02'
import Top06 from '../Top/Top06';
import Button from '../UI/Button';
import { checkEmailThunk, sendEmailThunk } from '../../store/modules/auth';
import universitySwitcher from '../universitySwitcher';
import Spinner from 'react-spinner-material';

interface Props extends ComponentProps<typeof AuthLayout>{
    onNext: () => void;
}
export default function Verification({ title, description, onNext }: Props) {
    const { status, data } = useAppSelector(store => store.auth);
    const { univ } = useAppSelector(store => store.profile.data);
    const dispatch = useAppDispatch();

    const [value, setValue] = useState<string>('');

    useEffect(() => {
        if(univ !== '')
            onNext();
    }, [univ]);

    return (
        <Container>
            <section>
                <Top02>{title}</Top02>
                <StyledTop06>{data.email} </StyledTop06>
                <Top06>{description}</Top06>
            </section>

            <section css={css`width: 80%;`}>
                <StyledInput 
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    placeholder="인증번호를 작성해주세요"
                />
                <ForgetEmail>인증이 안되시나요?</ForgetEmail>
            </section>

            <section 
                css={css`
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    margin-top: 20px;
            `}>
                {status === 'pending' ? (
                    <Spinner 
                        color="#ccc"
                        radius={30}
                        stroke={5}
                        visible
                    />
                ) : <div css={css`height: 30px;`}></div>}
                <StyledButton
                    fullWidth={false}
                    onClick={() => {
                        const delimiter = data.email.indexOf('@');
                        const univKor = universitySwitcher(data.email.slice(delimiter + 1));
                        dispatch(checkEmailThunk({
                            email: data.email,
                            code: Number(value),
                            univKor: univKor
                        }));
                    }} 
                >
                    확인
                </StyledButton>
                <StyledButton
                    onClick={() => {
                        dispatch(sendEmailThunk(data.email));
                    }} 
                    color='#A7B0C0' 
                    fullWidth={false}
                >
                    인증메일 재전송
                </StyledButton>
            </section>
        </Container>
    )
}

const Container = styled.div`
    flex: 0.5;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
`;

const StyledInput = styled.input`
    padding: 10px 0px;
    margin: 0 30px;
    width: 260px;
    border: none;
    box-shadow: inset 0px -0.5px 0px rgba(18, 18, 29, 0.1);
    &:focus {
        outline: none;
    }
    ::placeholder {
        color: #A7B0C0;
    }
`;
const StyledTop06 = styled(Top06)`
    color: #007FFF;
    font-weight: 700;
`;

const StyledButton = styled(Button)<{ color?: string }>`
    margin: 10px 0;
    ${props => props.color && css`
        background-color: ${props.color}
    `}
`;

const ForgetEmail = styled.p`
    color: #A7B0C0;
    font-weight: 700;
    text-align: center;
    margin: 30px 0;
    cursor: pointer;
`;