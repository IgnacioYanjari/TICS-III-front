import React, {
    useState, useEffect, useRef
} from 'react';
import {
    Grid, Container, CssBaseline, Box, Button,
    Paper, Typography, List, ListItem, ListItemText,
    ListItemIcon
} from '@material-ui/core';
import { Redirect } from "react-router-dom";
import {
    Info as InfoIcon, Help as HelpIcon
} from '@material-ui/icons';
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

export default function StageMetalDetector(props) {

    const classes = loginStyle();
    const [message, setMessage] = useState('');
    const [redirect, setRedirect] = useState('');
    const opService = new OpService();
    const refMainTable = useRef();
    const [data, setData] = useState({});
    const qaService = new QaService();
    const mainTable = [
        {
            title: 'Hora', field: 'time', type: 'time', render: data => (
                <Moment date={data.start_time} format="HH:mm A" />
            )
        },
        { title: 'Producto', field: 'product' },
        { title: 'Lote', field: 'lote' },
        { title: 'Patrón ferroso', field: 'patternFerroso', lookup: { 1: 'SI', 0: 'No' } },
        { title: 'Patrón no ferroso', field: 'patternNoFerroso', lookup: { 1: 'SI', 0: 'No' } },
        { title: 'Patrón ac.inox', field: 'patternInox', lookup: { 1: 'SI', 0: 'No' } },
        { title: 'Acciones Correctivas', field: 'corrective' }
    ]
    const sugestions = [
        {
            title: 'Acciones correctivas',
            data: [
                'Detener el proceso.',
                'Aislar el último producto pasado por el detector de metales.',
                'Revisar equipo y pasar nuevamente todo el producto.'
            ],
            key: shortid.generate()
        },
        {
            title: 'Opcionales',
            data: [
                'Criterio de revisión: SI ó NO',
                'Peligro: Contaminación de producto terminado con particulas metalicas con tamaño mayor a 3.5 mm,' +
                'Límite Crítico: Se active la alarma y se detenga la cinta al detector de patrón.',
                'Monitoreo: Una vez al inicio se pasa al patrón solo y final de cada lote se pasan los patrones de' +
                ' diferentes tamaños dentro del estuche y en el detector debe sonar la alarma y detenerse la cinta.'
            ],
            key: shortid.generate()
        }
    ]
    const [merma, setMerma] = useState({
        title: 'Merma',
        list: [
            { text: '', image: null, key: shortid.generate() },
            { text: '', image: null, key: shortid.generate() }
        ]
    });

    const handleText = (pos, text, image) => {
        let data = { ...merma }
        const index = merma.list.findIndex(val => val.key === pos);
        data.list[index].text = text;
        if (image !== null) data.list[index].image = image;
        setMerma(data);
    }

    const listSugestions = () => (
        sugestions.map(val => {
            return (
                <Grid item xs={12} md={6} key={val.key}>
                    <Paper className={classes.paper} style={{ width: '100%' }}>
                        <Typography className={classes.subtitle} align="center" variant="h6"> {val.title}
                            <HelpIcon className={classes.rightIcon} />
                        </Typography>
                        <List component="nav" aria-label="opcional-list">
                            {val.data.map(aux => (
                                <ListItem button key={shortid.generate()}>
                                    <ListItemIcon >
                                        <InfoIcon color="primary" />
                                    </ListItemIcon>
                                    <ListItemText primary={aux} />
                                </ListItem>
                            ))}
                        </List>
                    </Paper>
                </Grid>
            )
        })
    );

    useEffect(() => {
        const user = qaService.getProfile();
        setData({
            title: 'Detección de metales',
            opId: props.data.opId,
            client: props.data.client,
            qaUser: user.name + ' ' + user.surname
        });
    }, [props]);

    const handleSubmit = (e) => {
        e.preventDefault();
        let dataMainTable = refMainTable.current.getData();
        async function sendForm(data) {
            await opService.finishStage(data, props.data.opId)
        }

        if (checkValues({ dataMainTable, merma }) === false) {
            setMessage('Agregar todos los datos y/o imagenes necesarias antes de terminar etapa.');
        } else {
            // Parsear fechas
            dataMainTable.map(val => {
                val.start_time = moment(val.start_time).format("HH:mm A");
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

    return (
        <div >
            <CssBaseline />
            <Container maxWidth="lg" >
                {(redirect === '/') ? <Redirect to={redirect} /> : null}
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <ResumeTable data={data} />
                    </Grid>
                    <Grid item xs={12} className={classes.paper} >
                        <StageTable title="Tabla Principal" columns={mainTable} ref={refMainTable} />
                    </Grid>
                    <Grid item xs={12} className={classes.paper} >
                        <Typography className={classes.subtitle} align="center" variant="h5"> Sugerencias </Typography>
                        <Grid container spacing={2} alignItems="center">
                            {listSugestions()}
                        </Grid>
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
