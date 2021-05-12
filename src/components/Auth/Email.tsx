/** @jsxImportSource @emotion/react */
import { useState, useEffect, useCallback, ComponentProps } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { useAppSelector, useAppDispatch } from '../../hooks/useSelector';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { MailOutline } from 'react-ionicons'
import colors from '../../constants/colors';
import Button from '../UI/Button';
import { sendEmailThunk } from '../../store/modules/auth';
import Spinner from 'react-spinner-material';
import AuthLayout from './AuthLayout';

interface Props extends ComponentProps<typeof AuthLayout>{
    title: string;
    description: string;
    onNext: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    style: {
        margin: '50px auto 10px',
        fontSize: "17px",
        width: '85%',
    }
  }),
);

export default function Email({ onNext, ...props }: Props) {
    const { status, data, error } = useAppSelector(store => store.auth);
    const dispatch = useAppDispatch();

    const classes = useStyles();
    const [errorMsg, setErrorMsg] = useState<string | undefined>(undefined);
    const [value, setValue] = useState<string>('');

    const onChangeHandler = (value: string) => {
        setValue(value);
        const emailRegex = /^[a-zA-Z0-9-_.`]+@(korea.ac.kr|yonsei.ac.kr|snu.ac.kr|sogang.ac.kr|g.skku.edu|skku.edu|hanyang.ac.kr)$/;
        if(!value.match(emailRegex)) 
            setErrorMsg('올바른 이메일을 입력해주세요.');
        else 
            setErrorMsg(undefined);
    }

    const submitEmail = (e: any) => {
        e.preventDefault();
        dispatch(sendEmailThunk(value!));
    };

    useEffect(() => {
        if(data.email !== '' && value !== '' && error === false) 
            onNext();
    }, [data.email]);

    return (
        <AuthLayout {...props}>
            <Container>
                <Form onSubmit={submitEmail}>
                    <TextField
                        label="학교 이메일"
                        type="email"
                        className={classes.style}
                        onChange={(e) => onChangeHandler(e.target.value)}
                        value={value}
                        error={errorMsg !== undefined}
                        InputProps={{
                            style: {
                                padding: 10,

                            },
                            startAdornment: (
                            <InputAdornment position="start">
                                <MailOutline
                                    color={'#00000'} 
                                    title={"mail"}
                                    height="25px"
                                    width="25px"
                                />
                            </InputAdornment>
                            ),
                        }}
                    />
                    <ErrorMessage>{errorMsg}</ErrorMessage>
                    <ForgetEmail>학교이메일을 잊어버렸어요.</ForgetEmail>
                    {status === 'pending' ? (
                        <Spinner 
                            color="#ccc"
                            radius={30}
                            stroke={5}
                            visible
                        />
                    ) : <div css={css`height: 30px;`}></div>}
                    <Button 
                        css={css`margin: 10px 0;`}
                        type="submit"
                        onClick={submitEmail}
                        fullWidth={false}
                        disabled={errorMsg !== undefined || value === ''} 
                    >인증 전송</Button>
                </Form>
            </Container>
        </AuthLayout>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 10px;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const ErrorMessage = styled.p`
    color: ${colors.red500};
    width: 80%;
    margin: 0 auto 20px;
    font-size: 11px;

`;
const ForgetEmail = styled.p`
    color: #A7B0C0;
    font-weight: 700;
    text-align: center;
    margin: 0 0 4rem;
    cursor: pointer;
`;