import React, {
    useState, useEffect, useRef
} from 'react';
import {
    Grid, Container, CssBaseline, Box, Button,
    Paper, Typography, Select, MenuItem, TextField,
    InputLabel, Table, TableBody,
    TableRow, TableCell
} from '@material-ui/core';
import { Redirect } from "react-router-dom";
import loginStyle from 'styles/Login.js';
import { QaService, OpService } from 'services';
import {
    Copyright, StageTable, TextInput, EditRows
} from 'components';
import Moment from 'react-moment';
import shortid from 'shortid';
import moment from 'moment';
import checkValues from 'utils/checkValues';

export default function StageApproval(props) {


    const classes = loginStyle();
    const refMainTable = useRef();
    const refEditResume = useRef();
    const [message, setMessage] = useState('');
    const [redirect, setRedirect] = useState('');
    const opService = new OpService();
    const { value: state, setValue: setState } = TextInput('state', 0);
    const { value: verification, bind: bindVerification } = TextInput('verification', '');
    const [resume, setResume] = useState({});
    const mainTable = {
        columns: [
            { title: 'Parámetro a controlar', field: 'parameter', editable: 'never' },
            { title: 'Cumple', field: 'success', lookup: { 1: 'SI', 0: 'No' } },
            { title: 'Nº de muestras defectuosas', field: 'sample', type: 'numeric' },
        ],
        data: [
            { parameter: 'Lote y vence corresponde', success: '0', sample: '0' },
            { parameter: 'Etiqueta corresponde', success: '0', sample: '0' },
            { parameter: 'Bolsas bien selladas', success: '0', sample: '0' },
            { parameter: 'Libre de cuerpos extraños', success: '0', sample: '0' },
            { parameter: 'Empanadas sin descascarar', success: '0', sample: '0' },
            { parameter: 'Empanadas bien cerradas', success: '0', sample: '0' },
            { parameter: 'Cantidad por estuche corresponde', success: '0', sample: '0' },
            { parameter: 'Cantidad embalada corresponde', success: '0', sample: '0' },
            { parameter: 'Caja embalaje corresponde', success: '0', sample: '0' },
            { parameter: 'Lote/vence visible', success: '0', sample: '0' },
        ]
    }
    const editRows = [
        { title: 'Lote', type: 'text', val: '' },
        { title: 'Fecha vencimiento', type: 'date', val: moment() },
        { title: 'Total de cajas', type: 'numeric', val: '' },
        { title: 'Cantidad de cajas revisadas', type: 'numeric', val: '' },
    ]
    const qaService = new QaService();
    const user = qaService.getProfile();
    useEffect(() => {
        setResume({
            opId: {
                title: 'Orden de producción (ID)',
                value: props.data.opId,
            },
            product: {
                title: 'Producto',
                value: props.data.product,
            },
            date_check: {
                title: 'Fecha de revisión',
                value: <Moment format={"D MMMM YYYY"}>{new Date()}</Moment>
            }
        });
    }, [props]);

    const checkInputs = (data) => {
        // Revisar dataRows, state, verification
        for (let i = 0; i < data.length; i++) {
            if (data[i].type !== 'table') {
                if (data[i].value.length === 0) return false;
            }
        }
        return true;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let dataMainTable = refMainTable.current.getData();
        let dataRows = refEditResume.current.getData();
        async function sendForm(data) {
            await opService.finishStage(data, props.data.opId)
        }
        let data = [
            { type: 'single', title: 'Estado', value: (state) ? 'Si' : 'No' },
            { type: 'single', title: 'Encargado de Verificación', value: verification },
            { type: 'single', title: 'Encargado de Monitoreo', value: user.name + ' ' + user.surname },
            { type: 'single', title: 'ID Orden de producción', value: props.data.opId.toString() },
            { type: 'single', title: 'Producto', value: props.data.product },
            { type: 'single', title: 'Fecha Revisión', value: moment().format("YYYY-MM-DD") },
            { type: 'single', title: 'Fecha Vencimiento', value: dataRows[1].val.format("YYYY-MM-DD") },
            { type: 'single', title: 'Lote', value: dataRows[0].val },
            { type: 'single', title: 'Total de cajas', value: dataRows[2].val },
            { type: 'single', title: 'Cantidad de cajas revisadas', value: dataRows[3].val },
            {
                type: 'table',
                title: 'Tabla Principal',
                headers: mainTable.columns.map(val => {
                    return { title: val.title, field: val.field }
                }),
                data: dataMainTable
            }
        ];
        console.log('checks', { 1: checkInputs(data), 2: checkValues({ dataMainTable }) });
        // Para sacar la fecha en el formato deseado
        if (checkValues({ dataMainTable }) === false || checkInputs(data) === false) {
            setMessage('Agregar todos los datos y/o imagenes necesarias antes de terminar etapa.');
        } else if (checkValues({ dataMainTable }) === true && checkInputs(data) === true) {
            let comments = [], images = [], types = [];
            sendForm({ images, comments, types, data });

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
                        <Typography className={classes.subtitle} align="center" variant="h4">
                            Certificado de aprobación de producto terminado
                        </Typography>
                        <Paper className={classes.paper}>
                            <Table aria-label="detalles" align="center">
                                <TableBody>
                                    {Object.keys(resume).map(key => (
                                        <TableRow key={shortid.generate()}>
                                            <TableCell align="center"> {resume[key].title}</TableCell>
                                            <TableCell align="center"> {resume[key].value} </TableCell>
                                        </TableRow>
                                    ))}
                                    <EditRows data={editRows} ref={refEditResume} />
                                </TableBody>
                            </Table>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} className={classes.paper} >
                        <StageTable title="Tabla Principal" columns={mainTable.columns}
                            data={mainTable.data} ref={refMainTable} type="stage8" edit={true} />
                    </Grid>

                    <Grid item xs={12}>
                        <Typography className={classes.subtitle} align="center" variant="h5"> Pasos finales </Typography>
                        <Paper className={classes.paper}>
                            <Grid container spacing={2} className={classes.item} alignItems="center">
                                <Grid item xs={6} >
                                    <InputLabel htmlFor="state">Aprobado</InputLabel>
                                    <Select
                                        variant="filled"
                                        value={state}
                                        onChange={(e) => { setState(e.target.value) }}
                                        inputProps={{
                                            name: 'estado',
                                            id: 'state',
                                        }}
                                        fullWidth
                                    >
                                        <MenuItem value={1}>Si</MenuItem>
                                        <MenuItem value={0}>No</MenuItem>
                                    </Select>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        className={classes.input}
                                        label="Monitoreo"
                                        defaultValue={user.name + ' ' + user.surname}
                                        margin="normal"
                                        fullWidth
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        variant="filled"
                                    />
                                    <TextField
                                        className={classes.input}
                                        label="Verificación"
                                        margin="normal"
                                        value={verification}
                                        fullWidth
                                        variant="filled"
                                        {...bindVerification}
                                    />
                                </Grid>
                            </Grid>
                        </Paper>

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
