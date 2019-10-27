import React, {
    useState, useEffect, useRef
} from 'react';
import {
    Grid, Container, CssBaseline, Box, Button,
    Paper, Typography, List, ListItem, ListItemText,
    ListItemIcon
} from '@material-ui/core';
import {
    Info as InfoIcon, Help as HelpIcon
} from '@material-ui/icons';
import loginStyle from 'styles/Login.js';
import { QaService } from 'services';
import {
    ResumeTable, Copyright, StageTable,
    ImageList
} from 'components';
import Moment from 'react-moment';
import shortid from 'shortid';

export default function StageCooking() {

    const classes = loginStyle();
    // Usar referencia para llamar a tablas
    const refMainTable = useRef();
    const refCaracTable = useRef();
    const [message, setmessage] = useState('');
    const [resume, setResume] = useState({});
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
    const caracTable = [
        { title: 'Producto', field: 'product' },
        { title: 'Lote', field: 'lote' },
        { title: 'Responsable preparación', field: 'responsable' },
        { title: 'Color', field: 'color' },
        { title: 'Sabor', field: 'taste' },
        { title: 'Aspecto', field: 'aspect' },
        { title: 'Observaciones', field: 'obs' },
        { title: 'VºB Calidad / Chef', field: 'calidad' }
    ]
    const sugestions = [
        {
            title: 'Acciones correctivas',
            data: [
                'Aumentar el tiempo de cocción hasta alcanzar los 75º C.',
                'Revisar el correcto funcionamiento del equipo'
            ]
        },
        {
            title: 'Opcionales',
            data: [
                'Peligro: Contaminación por proliferación de microorganismos al no alcanzar la temperatura establecida.',
                'Límite Crítico: La temperatura de cocción debe ser ≥ 75º.',
                'Monitoreo: Se revisa la temperatura final de cada preparación.'
            ]
        }
    ]
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
            title: 'Cocción',
            opId: 100,
            client: 'Mac Donalds',
            qaUser: user.name + ' ' + user.surname
        });
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        let dataMainTable = refMainTable.current.getData();
        let dataCaracTable = refCaracTable.current.getData();
        console.log({ dataCaracTable, dataMainTable });
    }

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
                <>
                    <Grid item xs={12} md={6}>
                        <Paper className={classes.paper} style={{ width: '100%' }}>
                            <Typography className={classes.subtitle} align="center" variant="h6"> {val.title}
                                <HelpIcon className={classes.rightIcon} />
                            </Typography>
                            <List component="nav" aria-label="opcional-list">
                                {val.data.map(aux => (
                                    <ListItem button>
                                        <ListItemIcon >
                                            <InfoIcon color="primary" />
                                        </ListItemIcon>
                                        <ListItemText primary={aux} />
                                    </ListItem>
                                ))}
                            </List>
                        </Paper>
                    </Grid>
                </>
            )
        })
    );

    return (
        <div >
            <CssBaseline />
            <Container maxWidth="lg" >
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <ResumeTable data={resume} />
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
                    <Grid item xs={12} className={classes.paper} >
                        <StageTable title="Características organolépticas" columns={caracTable} ref={refCaracTable} />
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
