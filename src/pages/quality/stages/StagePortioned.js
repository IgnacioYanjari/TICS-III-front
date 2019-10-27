import React, { useState, useEffect } from 'react';
import {
    Grid, Container, CssBaseline, Box, Button
} from '@material-ui/core';
// import loginStyle from 'styles/Login.js';
import { QaService } from 'services';
import { ResumeTable, ImageList, Copyright } from 'components';
import shortid from 'shortid';

export default function StagePortioned() {

    // const classes = loginStyle();
    // const [message, setmessage] = useState('');
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
            title: 'Porcionamiento',
            opId: 100,
            client: 'Mac Donalds',
            qaUser: user.name + ' ' + user.surname
        });
    }, [])

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
        console.log('data', { merma, lote });
    }

    return (
        <div >
            <CssBaseline />
            <Container maxWidth="lg" >
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

            </Container>
            <Box mt={3} mb={5}>
                <Copyright />
            </Box>
        </div>

    );
}
