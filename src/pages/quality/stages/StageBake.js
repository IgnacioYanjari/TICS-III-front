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


export default function StageBake() {

    const classes = loginStyle();
    // const [message, setmessage] = useState('');
    const refMainTable = useRef();
    const [data, setData] = useState({});
    const qaService = new QaService();
    const mainTable = [
        { title: 'Lote', field: 'lote' },
        { title: 'Linea', field: 'line' },
        { title: 'Carro', field: 'car' },
        { title: 'Producto', field: 'product' },
        { title: 'Cantidad', field: 'quantity', type: 'numeric' },
        {
            title: 'Hora Entrada', field: 'start_time', type: 'time', render: data => (
                <Moment date={data.start_time} format="HH:mm A" />
            )
        },
        {
            title: 'Hora Salida', field: 'finish_time', type: 'time', render: data => (
                <Moment date={data.finish_time} format="HH:mm A" />
            )
        },
        { title: 'Tº Termino', field: 'temperature', type: 'numeric' },
        { title: 'Acciones Correctivas', field: 'corrective' }
    ]
    const sugestions = [
        {
            title: 'Acciones correctivas',
            data: [
                'Aumentar tiempo de horneo.',
                'Evaluar características organolépticas del producto.',
                'Revisión del correcto funcionamiento de los hornos.'
            ],
            key: shortid.generate()
        },
        {
            title: 'Opcionales',
            data: [
                'Peligro: Contaminación por proliferación de microorganismos por sobre los límites establecidos.',
                'Límite Crítico: La temperatura en centro térmico debe ser ≥ 70º C. Tiempo de horneo 3-5 minutos.',
                'Monitoreo: Se realiza la medición de temperatura de cada carro de empanadas a la salida del horno.'
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

    useEffect(() => {
        const user = qaService.getProfile();
        setData({
            title: 'Horneo',
            opId: 100,
            client: 'Mac Donalds',
            qaUser: user.name + ' ' + user.surname
        });
    }, []);

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

    const handleSubmit = (e) => {
        e.preventDefault();
        let dataMainTable = refMainTable.current.getData();
        console.log('data', { dataMainTable, merma });

    }

    return (
        <div >
            <CssBaseline />
            <Container maxWidth="lg" >
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
            <Box mt={3} mb={5}>
                <Copyright />
            </Box>
        </div>
    );
}
