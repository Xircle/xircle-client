/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { ComponentProps, useState, useEffect, useCallback } from 'react';
import AuthLayout from './AuthLayout';
import { checkNameThunk } from '../../store/modules/auth';
import { useAppDispatch, useAppSelector } from '../../hooks/useSelector';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { PersonOutline, LockClosedOutline } from 'react-ionicons'
import Button from '../UI/Button';
import Spinner from 'react-spinner-material';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    style: {
        margin: '15px auto',
        fontSize: "17px",
        width: '85%',
    }
  }),
);

interface Props extends ComponentProps<typeof AuthLayout>{
    onNext: () => void;
}

export default function AuthJoinStart ({ onNext, ...props}: Props) {
    const classes = useStyles();
    const dispatch = useAppDispatch();
    const { data, status, error_message } = useAppSelector(store => store.auth);

    const [displayName, setDisplayName] = useState(data.displayName);
    const [pwd, setPwd] = useState(data.password);
    const [phoneNum, setPhoneNum] = useState('');

    const [displayNameDescription, setDisplayNameDescription] = useState<string | undefined>(undefined);
    const [passwordDescription, setPasswordNameDescription] = useState<string | undefined>(undefined);
    const [phoneNumberDescription, setPhoneNumberNameDescription] = useState<string | undefined>(undefined);
    const [isBtnDisabled, setIsBtnDisabled] = useState<boolean>(true);

    
    useEffect(() => {
        if(error_message)
            return setDisplayNameDescription(error_message);
        else {
            if(data.phoneNumber && phoneNum !== '')
                onNext();
        }
    }, [error_message, data]);

    const displayNameChangeHandler = useCallback((value) => {
        setDisplayName(value);
        const displayNameRegex = /^@[a-zA-Z0-9._]+$/;

        if(!value.includes('@')) {
            setDisplayNameDescription('닉네임 맨앞에 @를 포함해주세요');
            setIsBtnDisabled(true);
        }else {
            if(!value.match(displayNameRegex)) {
                setDisplayNameDescription('영어 대소문자, 숫자, 밑줄 및 마침표만 가능합니다!');
                setIsBtnDisabled(true);
            }else {
                if(value.length < 4 || value.length > 14) {
                    setDisplayNameDescription('닉네임은 3자리 이상 14자리 이하로 해주세요.');
                    setIsBtnDisabled(true);
                }else {
                    setDisplayNameDescription(undefined);
                    if(!phoneNumberDescription && !passwordDescription && pwd.length > 0 && phoneNum.length > 0) 
                        setIsBtnDisabled(false);
                }
            }
        }
    }, [displayName, displayNameDescription, pwd, passwordDescription, phoneNum, phoneNumberDescription]);

    const passwordChangeHandler = useCallback((passwordText) => {
        const passwordRegex = /^[a-zA-Z0-9]+$/;
        setPwd(passwordText);
        if(passwordText.length < 6 || passwordText.length > 20) {
            setPasswordNameDescription('비밀번호는 6자리 이상 20자리 이하입니다.');
            setIsBtnDisabled(true);
        }else {
            if(!passwordText.match(passwordRegex)) {
                setPasswordNameDescription('영어 대소문자 숫자만 가능합니다!');
                setIsBtnDisabled(true);
            }else {
                setPasswordNameDescription(undefined);
                if(!phoneNumberDescription && !displayNameDescription && displayName.length > 0 && phoneNum.length > 0) 
                    setIsBtnDisabled(false);
            }
        }
    }, [displayName, displayNameDescription, pwd, passwordDescription, phoneNum, phoneNumberDescription]);

    const phoneNumberChangeHandler = useCallback(phoneText => {
        const phoneRegex = /^[0-9]+$/;
        setPhoneNum(phoneText);
        if(phoneText.length !== 11) {
            setPhoneNumberNameDescription('전화번호를 올바르게 입력해주세요.');
            setIsBtnDisabled(true);
        }else {
            if(!phoneText.match(phoneRegex)) {
                setPhoneNumberNameDescription('숫자만 입력해주세요.')
                setIsBtnDisabled(true);
            }else {
                setPhoneNumberNameDescription(undefined);
                if(!displayNameDescription && !passwordDescription && displayName.length > 0 && pwd.length > 0) 
                        setIsBtnDisabled(false);
            }
        }
    }, [displayName, displayNameDescription, pwd, passwordDescription, phoneNum, phoneNumberDescription]);

    const joinSubmitHandler = useCallback((e: any) => {
        e.preventDefault();
        
        dispatch(checkNameThunk({ displayName, pwd, phoneNumber: phoneNum }));
    }, [displayName, pwd, phoneNum]);

    return (
        <>
            <AuthLayout {...props}>
                <Container>
                    <form 
                        css={css`
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                        `}
                        onSubmit={joinSubmitHandler}
                    >
                        <TextField
                            type="text"
                            className={classes.style}
                            placeholder="@사용자 아이디 (이름으로 사용)"
                            defaultValue="@"
                            value={displayName}
                            onChange={(e) => displayNameChangeHandler(e.target.value)}
                            error={displayNameDescription !== undefined}
                            InputProps={{
                                style: {
                                    padding: 10
                                },
                                startAdornment: (
                                <InputAdornment position="start">
                                    <PersonOutline
                                        color={'#00000'} 
                                        title={"ID"}
                                        height="25px"
                                        width="25px"
                                    />

                                </InputAdornment>
                                ),
                            }}
                        />
                        {displayNameDescription ? (
                            <ErrorMsg>{displayNameDescription}</ErrorMsg>
                        ) : (
                            <AlertMsg>@사용자이름에는 영어 대소문자, 숫자,밑줄 및 마침표만 사용해주세요.</AlertMsg>
                        )}

                        <TextField
                            type="password"
                            className={classes.style}
                            onChange={(e) => passwordChangeHandler(e.target.value)}
                            value={pwd}
                            placeholder="비밀번호"
                            error={passwordDescription !== undefined}
                            InputProps={{
                                style: {
                                    padding: 10
                                },
                                startAdornment: (
                                <InputAdornment position="start">
                                    <LockClosedOutline
                                        color={'#00000'} 
                                        title={"password"}
                                        height="25px"
                                        width="25px"
                                    />
                                </InputAdornment>
                                ),
                            }}
                        />
                        {passwordDescription ? (
                            <ErrorMsg>{passwordDescription}</ErrorMsg>
                        ) : (
                            <AlertMsg>띄어쓰기 없는 6-20자리 영어 대소문자와 숫자 조합으로 입력해주세요.</AlertMsg>
                        )}

                        <TextField
                            type="text"
                            className={classes.style}
                            onChange={(e) => phoneNumberChangeHandler(e.target.value)}
                            value={phoneNum}
                            placeholder="전화번호"
                            error={phoneNumberDescription !== undefined}
                            InputProps={{
                                style: {
                                    padding: 10,
                                    marginTop: 10,
                                }
                            }}
                        />
                        {phoneNumberDescription ? (
                            <ErrorMsg>{phoneNumberDescription}</ErrorMsg>
                        ) : (
                            <AlertMsg>-없이 입력해주세요.</AlertMsg>
                        )}

                        {status === 'pending' ? (
                            <Spinner 
                                color="#ccc"
                                radius={30}
                                stroke={5}
                                visible
                            />
                        ) : <div css={css`height: 30px;`}></div>}
                        <StyledButton 
                            type="submit"
                            onSubmit={joinSubmitHandler}
                            disabled={isBtnDisabled}
                            fullWidth={false}
                        >확인</StyledButton>
                    </form>

                </Container>
            </AuthLayout>
        </>
    );
}


const Container = styled.div`
    flex: 1;
    padding: 30px 10px;
`;

const ErrorMsg = styled.p`
    color: red;
    width: 85%;
    margin: 0 auto;
    font-size: 12px; 
    word-break: keep-all;
`;

const AlertMsg = styled.p`
    color: #A7B0C0;
    width: 85%;
    margin: 0 auto;
    font-size: 12px; 
    word-break: keep-all;
`;

const StyledButton = styled(Button)`
    margin: 10px auto;
`;