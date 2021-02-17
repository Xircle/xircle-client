import React, { useCallback, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
}));

export default function ValidationTextFields() {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const emailRegex = /^[a-zA-Z0-9]([-_]?[a-zA-Z0-9])*@(korea.ac.kr|yonsei.ac.kr|snu.ac.kr|sogang.ac.kr|skky.edu|hanyang.ac.kr)$/;


  const textChangeHandler = useCallback((event) => {
    event.preventDefault();
    // console.log(event.target.value);
    setEmail(event.target.value);
    const val = event.target.value;
  }, []);

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
    </form>
  );
}