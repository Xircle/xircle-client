import React, { FormEvent } from 'react'
import { Checkbox } from 'semantic-ui-react'

type CheckboxProps = {
  checked: boolean;
  checkboxChanged: (e: FormEvent<HTMLInputElement>) => void;
  label: String;
}
const CheckboxUI = ({ checked, checkboxChanged, label }: CheckboxProps) => (
  <Checkbox 
    checked={checked} 
    onChange={(e) => checkboxChanged(e)} 
    label={label} 
  />
)

export default CheckboxUI