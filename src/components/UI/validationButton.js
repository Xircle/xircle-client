import React, { useCallback, useState, useEffect, useRef } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions/index';
import Modal from './modal';
import Spinner from 'react-spinner-material';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
}));

export default function ValidationTextFields({ confirmAuth, history, type }) {
    const classes = useStyles();
    
    const [isBtnDisabled, setIsBtnDisabled] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [email, setEmail] = useState('');
    

    const dispatch = useDispatch();

    const isLoading = useSelector(store => store.auth.loading);
    const errCode = useSelector(store => store.auth.errCode);
    const emailRegex = /^[a-zA-Z0-9]([-_]?[a-zA-Z0-9])*@(korea.ac.kr|yonsei.ac.kr|snu.ac.kr|sogang.ac.kr|g.skku.edu|skku.edu|hanyang.ac.kr)$/;

    useEffect(() => {
      if(errCode === 0) {
        setShowModal(true);
      }
    }, [errCode]);

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
      if(!email.match(emailRegex)) { // 먼저 필터링
        event.preventDefault();
        return alert('올바른 메일로 입력해주세요.');
      }
      
      dispatch(actions.auth(email));
    }, [email]);

    const findSubmitHandler = useCallback((event) => {
      event.preventDefault();
      if(!email.match(emailRegex)) { // 먼저 필터링
        event.preventDefault();
        return alert('올바른 메일로 입력해주세요.');
      }
      
      // redux 스토어에 dispatch
      dispatch(actions.findAuth(email));
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
        <div style={{height: '40px', margin: '20px 0'}}>
          <div className="flex flex-col items-center">
              <Spinner 
                  size={10}
                  color={"#aaa"}
              />
              <p style={{marginTop: 10, fontSize: 12, whiteSpace: 'pre', color: "#8D8D8D"}}>인증메일을 보내고있습니다</p>
          </div>
        </div>
        ) : <div style={{height: '40px'}}></div>}

        {/* 전송 버튼 */}
        {type === 'auth' ? (
        <button onClick={(e) => submitHandler(e)} style={{padding: "15px 0", margin: '20px 0 0'}} className="font-sans w-full rounded-lg bg-gray-400 text-white hover:bg-gray-400 focus:outline-none">
          인증확인 전송
        </button>
        ) : ( // type === 'find'
        <button disabled={isBtnDisabled} onClick={(e) => findSubmitHandler(e)} style={{padding: "15px 0", margin: '80px 0 0'}} className="font-sans w-full rounded-lg mt-10 bg-gray-400 text-white hover:bg-gray-400 focus:outline-none">
          닉네임/비밀번호 찾기
        </button>
        )}

        {/* 모달 */}
        <Modal show={showModal} clicked={() => setShowModal(false)}>
          <div className="py-5">
            <h1 className="text-xl mb-5">이메일을 확인해주세요!</h1>
            <p style={{color: '#aaa'}} className="text-base my-10">이메일로 기존 닉네임과 비밀번호를 <br/> 전송해드렸습니다.</p>
            <p onClick={() => history.push('/login')} style={{cursor: 'pointer'}} >로그인하러가기</p>
          </div>
        </Modal>

        <div> {type === 'find' ? null : (
          <p onClick={() => window.location.href = 'http://pf.kakao.com/_kDxhtK'} style={{color: "#949393", margin: '20px 0', textAlign: 'center', cursor: 'pointer'}}>학교이메일을 잊어버렸어요</p>)}
        </div>
      </form>
    )
}
