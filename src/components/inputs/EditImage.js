import React, { useState } from 'react';
import loginStyle from 'styles/Login.js';
import {
    Button, Grid, TextField, Typography
} from '@material-ui/core';
import { CloudUpload as CloudUploadIcon } from '@material-ui/icons';

export default function EditImage(props) {
    const classes = loginStyle();
    const [image, setImage] = useState('Tomar foto');
    const [text, setText] = useState('');

    const handleImage = (e) => {
        setImage(e.target.files[0].name);
        props.changeText(props.index, text, e.target.files[0]);
    }

    const onChangeText = (e) => {
        let value = e.target.value;
        setText(value);
        props.changeText(props.index, value, null);
    }

    return (
        <Grid container spacing={2} alignItems="center">
            <Grid item xs={6}>
                <TextField
                    margin="dense"
                    label="Descripción"
                    required
                    fullWidth
                    onChange={onChangeText}
                />
            </Grid>
            <Grid item xs={6}>
                <Grid container spacing={2} align="center" >
                    <Grid item xs={8} >
                        <Typography variant="body1" >{image} </Typography>
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

            </Grid>
        </Grid>


    );
}
