import React, { useState, useEffect } from 'react';
import { Grid, Container, CssBaseline } from '@material-ui/core';
// import loginStyle from 'styles/Login.js';
import { ResumeTable } from 'components';
import { QaService } from 'services';

export default function StageApproval() {


    // const classes = loginStyle();
    // const [message, setmessage] = useState('');
    const [data, setData] = useState({});
    const qaService = new QaService();

    useEffect(() => {
        const user = qaService.getProfile();
        setData({
            title: 'Aprobación',
            opId: 100,
            client: 'Mac Donalds',
            qaUser: user.name + ' ' + user.surname
        });
    }, [])

    return (
        <div >
            <CssBaseline />
            <Container maxWidth="lg" >
                <Grid container spacing={1}>
                    {/* Lista de Activos*/}
                    <Grid item xs={12}>
                        <ResumeTable data={data} />
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}
