import React, {
    useState, useEffect, useRef
} from 'react';
import {
    Grid, Container, CssBaseline, Box, Button,
    Paper, Typography, Select, MenuItem, TextField,
    InputLabel, Table, TableBody,
    TableRow, TableCell
} from '@material-ui/core';
import loginStyle from 'styles/Login.js';
import { QaService } from 'services';
import {
    Copyright, StageTable, TextInput, EditRows
} from 'components';
import Moment from 'react-moment';
import shortid from 'shortid';
import moment from 'moment';

export default function StageApproval() {


    const classes = loginStyle();
    const refMainTable = useRef();
    const refEditResume = useRef();
    // const [message, setmessage] = useState('');
    const { value: state, setValue: setState } = TextInput('state', 0);
    const { value: verification, bind: bindVerification } = TextInput('verification', '');
    const [resume, setResume] = useState({});
    const mainTable = {
        columns: [
            { title: 'Parametro a controlar', field: 'parameter', editable: 'never' },
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
        {
            title: 'Fecha de revisión', type: 'static', val:
                <Moment format={"D MMMM YYYY"}>{new Date()}</Moment>
        },
        { title: 'Total de cajas', type: 'numeric', val: '' },
        { title: 'Cantidad de cajas revisadas', type: 'numeric', val: '' },
    ]
    const qaService = new QaService();
    const user = qaService.getProfile();
    useEffect(() => {
        setResume({
            opId: {
                title: 'Orden de producción (ID)',
                value: 100,
            },
            product: {
                title: 'Producto',
                value: 'Empanada Pino',
            },
            date_check: {
                title: 'Fecha de revisión',
                value: <Moment format={"D MMMM YYYY"}>{new Date()}</Moment>
            }
        });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        let dataMainTable = refMainTable.current.getData();
        let dataRows = refEditResume.current.getData();
        // Para sacar la fecha en el formato deseado
        // console.log('format', dataRows[1].val.format('DD-MM-YYYY'));
        console.log('data', { dataRows, dataMainTable, state, verification });
    }

    return (
        <div >
            <CssBaseline />
            <Container maxWidth="lg" >
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
            <Box mt={3} mb={5}>
                <Copyright />
            </Box>
        </div>
    );
}
