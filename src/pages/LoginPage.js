import React, { useState, useEffect } from "react";
import {
  Avatar, Button, CssBaseline, TextField, Box,
  Typography, Container
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Redirect } from "react-router-dom";
import LoginStyle from 'styles/Login.js';

import { TextInput, Copyright, Loading } from 'components';
import AuthService from 'services/AuthService';


function LoginPage(props) {
  const classes = LoginStyle();
  const { value: rut, bind: bindRut } = TextInput('rut', '');
  const { value: password, bind: bindPassword } = TextInput('text', '');
  const [redirect, setRedirect] = useState('');
  const [query, setQuery] = useState('');
  const [message, setMessage] = useState('');
  const authService = new AuthService();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setQuery('sending');

    await authService.login(rut, password)
      .then(res => {
        setQuery('success');
        if (res.status === 'fail') {
          setMessage('Credenciales invalidas');
          return;
        }
        setMessage('Ingreso Correcto');
        console.log(res);
        if (authService.isAdmin()) {
          setRedirect('/admin');
        } else {
          setRedirect('/calidad');
        }

      })
      .catch(err => {
        alert(err);
      });
  }

  useEffect(() => {
    if (authService.loggedIn()) {
      authService.isAdmin() ? setRedirect('/admin') : setRedirect('/calidad');
    }
  });

  return (
    <div>
      {(redirect !== '') ? <Redirect to={redirect} /> : null}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Portal Web
          </Typography>
          <form onSubmit={e => handleFormSubmit(e)} className={classes.form} validate="true">
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="rut"
              label="Rut"
              name="rut"
              autoFocus
              {...bindRut}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="contraseña"
              label="Contraseña"
              type="password"
              id="password"
              {...bindPassword}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Ingresar
            </Button>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
        <Box className={classes.load} mt={3}>
          <Loading state={query} message={message}></Loading>
        </Box>
      </Container>
    </div>
  );
}

export default LoginPage;
