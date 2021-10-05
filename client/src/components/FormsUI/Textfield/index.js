/* Code In this file is obtained from https://github.com/simpletut/React-Formik-Material-UI-Booking-Form-Template/blob/main/src/Components/FormsUI/Textfield/index.js */

import React from 'react';
import { TextField } from '@material-ui/core';
import { useField } from 'formik';

const TextfieldWrapper = ({ name, ...otherProps }) => {
  const [field, meta] = useField(name);

  const configTextfield = {
    ...field,
    ...otherProps,
    fullWidth: true,
    variant: 'outlined',
  };
  if (meta && meta.touched && meta.error) {
    configTextfield.error = true;
    configTextfield.helperText = meta.error;
  }

  return <TextField {...configTextfield}></TextField>;
};

export default TextfieldWrapper;
