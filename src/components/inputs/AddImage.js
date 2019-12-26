import React, { useState } from 'react';
import loginStyle from 'styles/Login.js';
import {
    Button, Grid, Typography
} from '@material-ui/core';
import { CloudUpload as CloudUploadIcon } from '@material-ui/icons';

export default function AddImage(props) {
    const classes = loginStyle();
    const [image, setImage] = useState('Tomar foto');

    const handleImage = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0].name);
            props.changeImage(props.index, e.target.files[0]);
        }

    }

    return (
        <Grid container spacing={2} align="center">
            <Grid item xs={8}>
                <Typography variant="body1" > {image} </Typography>
            </Grid>
            <Grid item xs={4}>
                <Button variant="contained" color="primary"
                    component="label" className={classes.button}
                >
                    Subir
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


    );
}
