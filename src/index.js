import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import RouterApp from 'router';
import * as serviceWorker from './serviceWorker';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import CSSBaseline from '@material-ui/core/CssBaseline';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#3f51b5' },
    secondary: { main: '#f50057' },
    inherit: { main: "#FFFF" },
    background: { default: grey[200] }
  }
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <CSSBaseline />
    <RouterApp></RouterApp>
  </MuiThemeProvider>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
