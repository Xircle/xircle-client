import React from 'react'
import { Checkbox } from 'semantic-ui-react'

const CheckboxUI = ({ checked, checkboxChanged, label }) => (
  <Checkbox checked={checked} onChange={(e) => checkboxChanged(e)} label={label} />
)

export default CheckboxUI