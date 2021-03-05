import React, { useCallback, useState, useRef } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import LoadingIndicator from 'react-loading-indicator';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions/index';
import universitySwitcher from '../universitySwitcher';
import Modal from './modal';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
}));

export default function ValidationTextFields({ history, type }) {
  const classes = useStyles();
  
  
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);
  const [findBtnClicked, setFindBtnClicked] = useState(false);
  const [email, setEmail] = useState('');

  const dispatch = useDispatch();
  const isLoading = useSelector(store => store.auth.loading);

  const emailRegex = /^[a-zA-Z0-9]([-_]?[a-zA-Z0-9])*@(korea.ac.kr|yonsei.ac.kr|snu.ac.kr|sogang.ac.kr|g.skku.edu|hanyang.ac.kr)$/;

  const textChangeHandler = useCallback((event) => {
    event.preventDefault();
    const emailText = event.target.value;
    setEmail(emailText);

    if(emailText.match(emailRegex)) {
      setIsBtnDisabled(false);
    }else {
      setIsBtnDisabled(true);
    }
  }, []);

  const submitHandler = useCallback((event) => {
    event.preventDefault();
    history.push('start');
    if(!email.match(emailRegex)) { // 먼저 필터링
      event.preventDefault();
      return alert('올바른 메일로 입력해주세요.');
    }
    const index = email.indexOf('@');
    const univ = email.slice(index+1); // 영어
    const univKor = universitySwitcher(univ); //한국말

    // redux 스토어에 dispatch
    dispatch(actions.auth(email, univKor));
  }, [email]);

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div className="w-full text-center mt-5">
        <TextField
          error={!email.match(emailRegex)}
          id="outlined-error-helper-text"
          label="학교 이메일"
          helperText={!email.match(emailRegex) ? "이메일을 올바르게 입력해주세요." : ""}
          autoFocus
          required
          fullWidth={true}
          variant="outlined"
          onChange={(e) => textChangeHandler(e)}
        />
      </div>

      {/* 로딩 인디케이터 */}
      {isLoading ? (
      <div style={{height: '30px', left: 'calc(50% - 10px)'}} className="absolute ">
        <LoadingIndicator 
            color={{red: 0, green: 0, blue: 0, alpha: 1}}
            segmentWidth={2}
        />
      </div>
      ) : null}

      {/* 전송 버튼 */}
      {type === 'auth' ? (
      <button onClick={(e) => submitHandler(e)} style={{padding: "15px 0", margin: '80px 0 0'}} className="font-sans w-full rounded-lg mt-10 bg-gray-400 text-white hover:bg-gray-400 focus:outline-none">
        인증확인 전송
      </button>
      ) : (
      <button disabled={isBtnDisabled} onClick={(e) => {e.preventDefault(); setFindBtnClicked(true)}} style={{padding: "15px 0", margin: '80px 0 0'}} className="font-sans w-full rounded-lg mt-10 bg-gray-400 text-white hover:bg-gray-400 focus:outline-none">
        닉네임/비밀번호 찾기
      </button>
      )}

      {/* 모달 */}
      <Modal show={findBtnClicked} clicked={() => setFindBtnClicked(false)}>
        <div className="mb-5 py-5">
          <h1 className="text-xl mb-5">이메일을 확인해주세요!</h1>
          <p style={{color: '#aaa'}} className="text-base my-10">이메일로 기존 닉네임과 비밀번호를 <br/> 전송해드렸습니다.</p>
        </div>
      </Modal>
      <div> {type === 'find' ? null : (
        <p onClick={() => history.push('/login')} style={{color: "#949393", margin: '20px 0', textAlign: 'center', cursor: 'pointer'}}>로그인하러가기</p>)}
      </div>
    </form>
  )
}
