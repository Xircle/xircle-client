import React, { useCallback, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
}));

export default function ValidationTextFields({ history }) {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const emailRegex = /^[a-zA-Z0-9]([-_]?[a-zA-Z0-9])*@(korea.ac.kr|yonsei.ac.kr|snu.ac.kr|sogang.ac.kr|skky.edu|hanyang.ac.kr)$/;


  const textChangeHandler = useCallback((event) => {
    event.preventDefault();
    setEmail(event.target.value);
  }, []);

  const submitHandler = useCallback((event) => {
    if(email.match(emailRegex)) {
      // Go to '/pereson' 
      event.preventDefault();
      history.push('/person');
    }else {
      event.preventDefault();
      alert('올바른 메일로 입력해주세요.');
    }
    // axios 요청해야함.

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
      <button onClick={(e) => submitHandler(e)} className="font-sans w-full border-2 rounded-2xl px-5 py-3 mt-10 bg-black text-white focus:outline-none">메일로 인증하기</button>
    </form>
  );
}