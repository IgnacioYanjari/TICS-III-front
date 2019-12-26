import React, { useState, useEffect } from 'react';
import { Redirect } from "react-router-dom";
import {
    Grid, Container, CssBaseline, Box, Button, Typography
} from '@material-ui/core';
// import loginStyle from 'styles/Login.js';
import { QaService, OpService } from 'services';
import { ResumeTable, ImageList, Copyright } from 'components';
import shortid from 'shortid';
import checkValues from 'utils/checkValues';

export default function StagePortioned(props) {

    // const classes = loginStyle();
    const opService = new OpService();
    const [redirect, setRedirect] = useState('');
    const [message, setMessage] = useState('');
    const [resume, setResume] = useState({});
    const [lote, setLote] = useState({
        title: 'Fotografía de Lote / Fecha de ingredientes',
        list: [
            { title: 'Camarón', image: null, key: shortid.generate() },
            { title: 'Sabor queso', image: null, key: shortid.generate() },
            { title: 'Extender', image: null, key: shortid.generate() },
            { title: 'Almidón', image: null, key: shortid.generate() },
            { title: 'Queso granulado', image: null, key: shortid.generate() },
            { title: 'Agua', image: null, key: shortid.generate() },
            { title: 'Harina', image: null, key: shortid.generate() },
            { title: 'Sal', image: null, key: shortid.generate() },
            { title: 'Azúcar', image: null, key: shortid.generate() },
            { title: 'Suero de leche', image: null, key: shortid.generate() },
            { title: 'Manteca', image: null, key: shortid.generate() },
            { title: 'Agua', image: null, key: shortid.generate() },
            { title: 'Propionato de calcio', image: null, key: shortid.generate() }
        ]
    });
    const [merma, setMerma] = useState({
        title: 'Merma',
        list: [
            { text: '', image: null, key: shortid.generate() },
            { text: '', image: null, key: shortid.generate() }
        ]
    });

    const qaService = new QaService();

    useEffect(() => {
        const user = qaService.getProfile();
        setResume({
            title: 'Porcionado',
            opId: props.data.opId,
            client: props.data.client,
            qaUser: user.name + ' ' + user.surname
        });

    }, [props]);

    const handleImage = (pos, image) => {
        let data = { ...lote }
        const index = lote.list.findIndex(val => val.key === pos);
        data.list[index].image = image;
        setLote(data);
    }

    const handleText = (pos, text, image) => {
        let data = { ...merma }
        const index = merma.list.findIndex(val => val.key === pos);
        data.list[index].text = text;
        if (image !== null) data.list[index].image = image;
        setMerma(data);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        async function sendForm(data) {
            await opService.finishStage(data, props.data.opId)
        }

        if (checkValues({ merma, lote }) === false) {
            setMessage('Agregar todos los datos y/o imagenes necesarias antes de terminar etapa.');
        } else {
            let comments = [], images = [], types = [];
            merma.list.forEach(val => {
                types.push("MR");
                comments.push(val.text);
                images.push(val.image);
            });
            lote.list.forEach(val => {
                types.push("PR");
                comments.push(val.title);
                images.push(val.image);
            })
            sendForm({
                images, comments, types, data: []
            });

            setMessage('Etapa finalizada con éxito!! :) ');
            setTimeout(() => {
                setRedirect('/');
            }, 2000);
        }
    }

    return (
        <div >
            <CssBaseline />
            <Container maxWidth="lg" >
                {(redirect === '/') ? <Redirect to={redirect} /> : null}
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <ResumeTable data={resume} />
                    </Grid>
                    <Grid item xs={12}>
                        <ImageList data={lote} changeImage={handleImage} />
                    </Grid>
                    <Grid item xs={12}>
                        <ImageList type="edit" data={merma} changeImage={handleImage} changeText={handleText} />
                    </Grid>
                </Grid>
                <Box mt={5} mb={5} align="center">
                    <form onSubmit={handleSubmit} >
                        <Button type="submit" variant="contained" color="primary" size="large">
                            Terminar Etapa
                        </Button>
                    </form>
                </Box>
                {(message !== '') ? (
                    <Box mt={3} mb={5}>
                        <Typography align="center" variant="subtitle1"> {message} </Typography>
                    </Box>
                ) : null}


            </Container>
            <Box mt={3} mb={5}>
                <Copyright />
            </Box>
        </div>

    );
}
