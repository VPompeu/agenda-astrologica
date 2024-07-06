import React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const MyButton = styled(Button)(({ theme }) => ({
  
}));

const StyledButton = (props) => {
  return <MyButton size='sm' variant='outlined' onClick={props.onClick}>{props.text}</MyButton>;
}

export default StyledButton;
