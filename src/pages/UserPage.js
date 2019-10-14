import React, { useState } from 'react';
import {
    Typography, Grid, TextField, Card,
    Container, Divider, Button, Box
} from '@material-ui/core';
import {
    CloudUpload as CloudUploadIcon
} from '@material-ui/icons'
import { Template, TextInput, Loading } from 'components';
import UserStyle from 'styles/User';
import ChangePassword from 'components/inputs/ChangePassword';
import AuthService from 'services/AuthService';

const UserPage = (props) => {
    const classes = UserStyle();
    const authService = new AuthService();
    const { username: rut, nombre, apellido } = authService.getProfile();
    const { value: email, bind: bindEmail, setValue: setEmail } = TextInput('email', '');
    const [message, setMessage] = useState('');
    const [query, setQuery] = useState('');

    const handleImage = (e) => {
        console.log(e.target.files[0]);
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setMessage('');
        setQuery('sending');
        setInterval(() => {
            setQuery('success');
            setEmail('');
        }, 3000);
        console.log(email);
    }
    // Revisar si tener email en el token o en una api

    return (
        <Template userName="Juan Perez" userType="quality">
            <Grid container spacing={1} direction="row" justify="center" alignItems="center" >
                <Grid item md={6}>
                    <Container component="main" maxWidth="sm">
                        <Card className={classes.paper} >
                            <Typography component="h1" variant="h5" className={classes.title}>
                                Datos Usuario
                            <Divider />
                            </Typography>
                            <Grid container style={{ marginTop: 20 }} spacing={2} >
                                <Grid item md={6} xs={12} sm={6}>
                                    <Grid item xs={12} className={classes.item}>
                                        <img
                                            className={classes.image}
                                            src={require('images/default-user.jpeg')}
                                            alt="User Image"
                                        />
                                    </Grid>
                                    <Grid item xs={12} className={classes.item}>
                                        <Button variant="contained" color="default"
                                            component="label" className={classes.button}
                                        >
                                            Cambiar imagen
                                            <input
                                                type="file"
                                                accept="image/*"
                                                hidden
                                                capture="camera"
                                                onChange={handleImage}
                                            />
                                            <CloudUploadIcon className={classes.rightIcon} />
                                        </Button>

                                    </Grid>
                                </Grid>
                                <Grid item md={6} xs={12} sm={6}>
                                    <Grid item xs={12} className={classes.item}>
                                        <TextField
                                            label="Nombre"
                                            defaultValue={nombre}
                                            margin="normal"
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            variant="filled"
                                        />
                                    </Grid>
                                    <Grid item xs={12} className={classes.item}>
                                        <TextField
                                            label="Apellido"
                                            defaultValue={apellido}
                                            margin="normal"
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            variant="filled"
                                        />
                                    </Grid>
                                    <Grid item xs={12} className={classes.item}>
                                        <TextField
                                            label="RUT"
                                            defaultValue={rut}
                                            margin="normal"
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            variant="filled"
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Typography component="h1" variant="h5" className={classes.title}>
                                Editar
                                <Divider />
                            </Typography>
                            <form style={{ width: '100%' }} onSubmit={e => handleFormSubmit(e)} validate="true" >
                                <Grid container style={{ marginTop: 5 }} spacing={2} >
                                    <Grid item xs={12}>
                                        <Grid item xs={12} className={classes.item}>
                                            <TextField
                                                type="email"
                                                label="Email"
                                                value={email}
                                                margin="normal"
                                                variant="filled"
                                                fullWidth
                                                required
                                                {...bindEmail}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} className={classes.item}>
                                    <Button type="submit" variant="contained" color="primary" style={{ width: '50%' }} >
                                        Confirmar
                                    </Button>
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
                </Grid>
                <Grid item md={6}>
                    <ChangePassword></ChangePassword>
                </Grid>
            </Grid>
        </Template>
    );
}

export default UserPage;
