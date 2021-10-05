/* Code In this file is obtained from https://github.com/simpletut/React-Formik-Material-UI-Booking-Form-Template/blob/main/src/Components/FormsUI/Button/index.js*/

import React from 'react';
import { Button } from '@material-ui/core';
import { useFormikContext } from 'formik';

const ButtonWrapper = ({ children, ...otherProps }) => {
  const { submitForm } = useFormikContext();
  const handleSubmit = () => {
    submitForm();
  };

  const configButton = {
    variant: 'contained',
    color: 'primary',
    fullwidth: true,
    onClick: handleSubmit,
  };
  return <Button {...configButton}>{children}</Button>;
};

export default ButtonWrapper;
