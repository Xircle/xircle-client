import React from 'react';
import TextField from '@material-ui/core/TextField';


const TextFieldUI = ({ width, label, placeholder, submitted, changeHandler }) => {
  return (
    <form onSubmit={(e) => submitted(e)} noValidate autoComplete="off" className="flex flex-row justify-center" style={{width: width}}>
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