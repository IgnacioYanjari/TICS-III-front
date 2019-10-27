import React, {
    useState, useEffect, useRef
} from 'react';
import {
    Grid, Container, CssBaseline, Box, Button
} from '@material-ui/core';
import loginStyle from 'styles/Login.js';
import { QaService } from 'services';
import {
    ResumeTable, Copyright, StageTable,
    ImageList
} from 'components';
import Moment from 'react-moment';
import shortid from 'shortid';

export default function StageCooling() {

    const classes = loginStyle();
    // const [message, setmessage] = useState('');
    const refMainTable = useRef();
    const [data, setData] = useState({});
    const qaService = new QaService();
    const mainTable = [
        { title: 'Producto', field: 'product' },
        { title: 'Lote', field: 'lote' },
        { title: 'Cantidad', field: 'quantity', type: 'numeric' },
        {
            title: 'Hora Inicio', field: 'start_time', type: 'time', render: data => (
                <Moment date={data.start_time} format="HH:mm" />
            )
        },
        {
            title: 'Hora Termino', field: 'finish_time', type: 'time', render: data => (
                <Moment date={data.finish_time} format="HH:mm" />
            )
        },
        { title: 'Tº Final', field: 'temperature', type: 'numeric' },
        { title: 'Acciones Correctivas', field: 'corrective' }
    ]
    const [merma, setMerma] = useState({
        title: 'Merma',
        list: [
            { text: '', image: null, key: shortid.generate() },
            { text: '', image: null, key: shortid.generate() }
        ]
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        let dataMainTable = refMainTable.current.getData();
        console.log({ dataMainTable });
    }

    const handleText = (pos, text, image) => {
        let data = { ...merma }
        const index = merma.list.findIndex(val => val.key === pos);
        data.list[index].text = text;
        if (image !== null) data.list[index].image = image;
        setMerma(data);
    }

    useEffect(() => {
        const user = qaService.getProfile();
        setData({
            title: 'Enfriamiento',
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
                    <Grid item xs={12} className={classes.paper} >
                        <StageTable title="Tabla Principal" columns={mainTable} ref={refMainTable} />
                    </Grid>
                    <Grid item xs={12} >
                        <ImageList type="edit" data={merma} changeText={handleText} />
                    </Grid>
                </Grid>
            </Container>
            <Box mt={5} mb={5} align="center">
                <form onSubmit={handleSubmit} >
                    <Button type="submit" variant="contained" color="primary" size="large">
                        Terminar Etapa
                    </Button>
                </form>
            </Box>
            <Box mt={3} mb={5}>
                <Copyright />
            </Box>
        </div>
    );
}
