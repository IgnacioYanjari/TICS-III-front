import React, {
    useState, useEffect, useRef
} from 'react';
import { Redirect } from "react-router-dom";
import {
    Grid, Container, CssBaseline, Box, Button, Typography
} from '@material-ui/core';
import loginStyle from 'styles/Login.js';
import { QaService, OpService } from 'services';
import {
    ResumeTable, Copyright, StageTable,
    ImageList
} from 'components';
import Moment from 'react-moment';
import shortid from 'shortid';
import checkValues from 'utils/checkValues';
import moment from 'moment';

export default function StageCooling(props) {

    const classes = loginStyle();
    const opService = new OpService();
    const [message, setMessage] = useState('');
    const [redirect, setRedirect] = useState('');
    const refMainTable = useRef();
    const [data, setData] = useState({});
    const qaService = new QaService();
    const mainTable = [
        { title: 'Producto', field: 'product' },
        { title: 'Lote', field: 'lote' },
        { title: 'Cantidad', field: 'quantity', type: 'numeric' },
        {
            title: 'Hora Inicio', field: 'start_time', type: 'time', render: data => (
                <Moment date={data.start_time} format="HH:mm A" />
            )
        },
        {
            title: 'Hora Termino', field: 'finish_time', type: 'time', render: data => (
                <Moment date={data.finish_time} format="HH:mm A" />
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

        async function sendForm(data) {
            await opService.finishStage(data, props.data.opId)
        }

        let dataMainTable = refMainTable.current.getData();
        if (checkValues({ dataMainTable, merma }) === false) {
            setMessage('Agregar todos los datos y/o imagenes necesarias antes de terminar etapa.');
        } else {

            dataMainTable.map(val => {
                val.start_time = moment(val.start_time).format("HH:mm A");
                val.finish_time = moment(val.finish_time).format("HH:mm A");
                return val;
            });

            let data = [{
                type: 'table',
                title: 'Tabla Principal',
                headers: mainTable.map(val => {
                    return { title: val.title, field: val.field }
                }),
                data: dataMainTable
            }], images = [], comments = [], types = [];

            merma.list.forEach(val => {
                types.push("MR");
                comments.push(val.text);
                images.push(val.image);
            });

            sendForm({ data, images, comments, types });

            setMessage('Etapa finalizada con éxito!! :) ');
            setTimeout(() => {
                setRedirect('/');
            }, 2000);
        }
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
            title: 'Congelamiento',
            opId: props.data.opId,
            client: props.data.client,
            qaUser: user.name + ' ' + user.surname
        });
    }, [props])

    return (
        <div >
            <CssBaseline />
            <Container maxWidth="lg" >
                {(redirect === '/') ? <Redirect to={redirect} /> : null}
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
            {(message !== '') ? (
                <Box mt={3} mb={5}>
                    <Typography align="center" variant="subtitle1"> {message} </Typography>
                </Box>
            ) : null}
            <Box mt={3} mb={5}>
                <Copyright />
            </Box>
        </div>
    );
}
