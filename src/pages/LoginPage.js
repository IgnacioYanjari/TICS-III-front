import React, { useState } from "react";
import {
  Avatar, Button, CssBaseline, TextField, Link, Grid, Box,
  Typography, Container
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Redirect } from "react-router";
import LoginStyle from 'styles/Login.js';

import { TextInput, Copyright, Loading } from 'components';
import AuthService from 'services/AuthService';


function LoginPage() {

  const classes = LoginStyle();
  const { value: rut, bind: bindRut } = TextInput('rut', '');
  const { value: password, bind: bindPassword } = TextInput('text', '');
  const [redirect, setRedirect] = useState(false);
  const [query, setQuery] = useState('');
  const authService = new AuthService();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setQuery('sending');
    authService.login(rut, password)
      .then(res => {
        console.log(res);
        setQuery('success');
      })
      .catch(err => {
        alert(err);
      });

  }

  return (
    <div>
      {(redirect) ? <Redirect to="/admin" /> : null}
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
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Recordar contraseña
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
        <Box className={classes.load} mt={3}>
          <Loading state={query} message="Ingreso Correcto"></Loading>
        </Box>
      </Container>
    </div>
  );
}

export default LoginPage;
