import React, { ChangeEvent, FormEvent } from 'react';
import TextField from '@material-ui/core/TextField';

type TextFieldProps = {
  width: string;
  label: string;
  placeholder: string;
  submitted: (e: FormEvent<HTMLFormElement>) => void
  changeHandler: (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void
}


const TextFieldUI = ({ width, label, placeholder, submitted, changeHandler }: TextFieldProps) => {
  return (
    <form 
      onSubmit={(e) => submitted(e)} 
      noValidate 
      autoComplete="off" 
      className="flex flex-row justify-center" 
      style={{width: width}}
    >
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