import React from 'react';
import {
    Typography, Grid, TextField, Card,
    Container, Divider, Button
} from '@material-ui/core';
import {
    CloudUpload as CloudUploadIcon
} from '@material-ui/icons'
import { Template } from 'components';
import UserStyle from 'styles/User';
import ChangePassword from 'components/inputs/ChangePassword';

const UserPage = (props) => {
    const classes = UserStyle();

    const handleImage = (e) => {
        console.log(e.target.files[0]);
    }

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
                                            src="http://placehold.it/200"
                                            alt="Live from space album cover"
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
                                            defaultValue="Juan"
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
                                            defaultValue="Perez"
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
                                            defaultValue="11.166.605-9"
                                            margin="normal"
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            variant="filled"
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
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
