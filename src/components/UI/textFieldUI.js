import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';


const TextFieldUI = ({ label, placeholder, submitted, changeHandler }) => {
  return (
    <form onSubmit={(e) => submitted(e)} noValidate autoComplete="off" style={{width: '50%'}}>
      <TextField 
        id="filled-basic" 
        variant="filled"
        placeholder={placeholder} 
        label={label}
        onChange={(e) => changeHandler(e)}
        autoFocus 
      />
    </form>
  );
}
export default TextFieldUI;