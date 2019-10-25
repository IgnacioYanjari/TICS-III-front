import React, { useState } from 'react';
import { Grid, Paper } from '@material-ui/core';
import loginStyle from 'styles/Login.js';
import { Template } from 'components';

export default function StageApproval() {

    const classes = loginStyle();
    const [message, setmessage] = useState('');

    return (
        <Template >
            <Grid container spacing={1}>
                {/* Lista de Activos*/}
                <Grid className={classes.paper} item xs={12}>
                    <Paper style={{ width: '100%' }}>
                        <h1> Aprobación </h1>
                    </Paper>
                </Grid>
            </Grid>
        </Template >
    );
}
