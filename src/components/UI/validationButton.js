import React, { useCallback, useState, useRef } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import LoadingIndicator from 'react-loading-indicator';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions/index';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
}));

export default function ValidationTextFields({ isSent }) {
  const classes = useStyles();
  const [email, setEmail] = useState('');

  const dispatch = useDispatch();
  const isLoading = useSelector(store => store.auth.loading);

  const emailRegex = /^[a-zA-Z0-9]([-_]?[a-zA-Z0-9])*@(korea.ac.kr|yonsei.ac.kr|snu.ac.kr|sogang.ac.kr|skky.edu|hanyang.ac.kr)$/;

  const textChangeHandler = useCallback((event) => {
    event.preventDefault();
    setEmail(event.target.value);
  }, []);

  const submitHandler = useCallback((event) => {
    event.preventDefault();
    if(!email.match(emailRegex)) { //먼저 필터링
      event.preventDefault();
      return alert('올바른 메일로 입력해주세요.');
    }

    // redux 스토어에 dispatch
    dispatch(actions.auth(email));
  }, [email]);

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div className="w-full text-center mt-5">
        <TextField
          error={!email.match(emailRegex)}
          id="outlined-error-helper-text"
          label="학교 이메일 인증하기"
          helperText={!email.match(emailRegex) ? "이메일을 올바르게 입력해주세요." : ""}
          autoFocus
          required
          fullWidth={true}
          variant="outlined"
          onChange={(e) => textChangeHandler(e)}
        />
      </div>
      {isLoading ? (
      <div style={{height: '30px', left: 'calc(50% - 10px)'}} className="absolute ">
        <LoadingIndicator 
            color={{red: 0, green: 0, blue: 0, alpha: 1}}
            segmentWidth={2}
        />
      </div>
      ) : null}
      <button onClick={(e) => submitHandler(e)} className="font-sans w-full border-2 rounded-2xl px-5 py-3 mt-10 bg-black text-white hover:bg-gray-400 focus:outline-none">
        인증메일 전송
      </button>
    </form>
  )
}
