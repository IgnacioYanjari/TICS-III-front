import React, { useState } from 'react';
import {
    Typography, Grid, TextField, Card,
    Container, Divider, Button, Box
} from '@material-ui/core';
import UserStyle from 'styles/User';
import { TextInput, Loading } from 'components';

const ChangePassword = (props) => {
    const classes = UserStyle();
    const { value: oldPasswod, bind: bindOldPassword } = TextInput('oldPasswod', '');
    const { value: newPassword, bind: bindNewPassword } = TextInput('newPassword', '');
    const { value: repeatPassword, bind: bindrepeatPassword } = TextInput('repeatPassword', '');
    const [message, setmessage] = useState('');
    const [query, setQuery] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newPassword !== repeatPassword) {
            setmessage('Contraseña nueva debe coincidir');
        } else {
            setmessage('');
            setQuery('sending');
            setInterval(() => {
                setQuery('success');
            }, 3000);
        }
        console.log({ oldPasswod, newPassword, repeatPassword });
    }

    return (
        <Container component="main" maxWidth="sm">
            <Card className={classes.paper} >
                <Typography component="h1" variant="h5" className={classes.title}>
                    Cambiar Contraseña
                    <Divider />
                </Typography>
                <form onSubmit={handleSubmit} validate="true">
                    <Grid container style={{ marginTop: 20 }} spacing={2} >
                        <Grid item xs={12} sm={6} className={classes.item}>
                            <TextField
                                label="Antigua Contraseña"
                                margin="normal"
                                variant="filled"
                                style={{ width: '90%' }}
                                type="password"
                                required
                                {...bindOldPassword}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} className={classes.item}>
                            <TextField
                                label="Contraseña Nueva"
                                margin="normal"
                                variant="filled"
                                type="password"
                                required
                                {...bindNewPassword}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} className={classes.item}>
                            <TextField
                                label="Repetir Contraseña"
                                margin="normal"
                                variant="filled"
                                type="password"
                                required
                                fullWidth
                                {...bindrepeatPassword}
                            />
                        </Grid>
                        <Grid item xs={12} className={classes.item}>
                            <Button type="submit" variant="contained" color="primary" style={{ width: '50%' }} >
                                Confirmar
                            </Button>
                        </Grid>
                    </Grid>
                </form>
                {(message === '') ?
                    <>
                        <Box mt={1}>
                            <Loading state={query} message="Cambio realizado"></Loading>
                        </Box>
                    </> : (
                        <Box mt={1}>
                            <Typography variant="body2" align="center" color="inherit">
                                {message}
                            </Typography>
                        </Box>
                    )}

            </Card>
        </Container>
    );
}

export default ChangePassword;
