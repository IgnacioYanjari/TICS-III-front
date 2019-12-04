import React, { useState, useEffect } from 'react';
import {
    Button, TextField, Dialog, DialogActions,
    DialogContent, DialogContentText, DialogTitle,
    Select, MenuItem, Box, Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { TextInput, Loading } from 'components';
import { AdmService } from 'services';
import moment from "moment";
import MomentUtils from "@date-io/moment";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from '@material-ui/pickers';
import shortid from 'shortid';

const useStyles = makeStyles(theme => ({
    select: {
        marginTop: theme.spacing(2)
    },
    datePicker: {
        marginTop: theme.spacing(2),
        width: '100% !important',
    }
}));

export default function CreateOp(props) {
    const classes = useStyles();
    const [product, setProduct] = useState(1);
    const [client, setClient] = useState(1);
    const [message, setMessage] = useState('');
    const [query, setQuery] = useState('')
    const admService = new AdmService();
    const [clients, setClients] = useState([]);
    const [products, setProducts] = useState([]);
    const [start_date, setStartDate] = useState(new Date());
    const [finish_date, setFinishDate] = useState(new Date());
    const [quantity, setQuantity] = useState(0);

    useEffect(() => {
        async function getData() {
            let clients = await admService.getClients(),
                products = await admService.getProducts();
            setClients(clients);
            setProducts(products);
            setClient(clients[0].id);
            setClient(products[0].id);
        }
        getData();
    }, []);


    const handleSubmit = (e) => {
        e.preventDefault();
        async function addOp(newOp) {
            setQuery('sending');
            let response = await admService.createOrder(newOp);
            console.log('response', response);
            setQuery('success');
            if (response.status === 'fail') {
                delete response.status;
                setMessage(response[Object.keys(response)[0]][0]);
                return;
            }
            setMessage('Operación creada con éxito');
            props.closeModal(response);
        }
        addOp({
            customer: client, product, quantity,
            start_date: moment(start_date).format('YYYY-MM-DD'),
            finish_date: moment(finish_date).format('YYYY-MM-DD'),
        });
    };

    return (
        <div>
            <Dialog
                open={props.open} aria-labelledby="form-dialog-title"
            >
                <DialogTitle > Crear Orden de producción</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Rellene el formulario para lograr crear la orden.
                    </DialogContentText>
                    <form onSubmit={handleSubmit} validate="true">
                        <div>
                            <Typography className={classes.select}> Producto </Typography>
                            <Select
                                value={product}
                                onChange={(e) => setProduct(e.target.value)}
                                inputProps={{ name: 'product' }}
                                fullWidth
                                required
                            >
                                {products.map(val => <MenuItem key={val.shortid} value={val.id}>{val.name}</MenuItem>)}
                            </Select>
                        </div>
                        <div >
                            <Typography className={classes.select} > Cliente </Typography>
                            <Select
                                value={client}
                                onChange={(e) => setClient(e.target.value)}
                                inputProps={{ name: 'client' }}
                                fullWidth
                                required
                            >
                                {clients.map(val => <MenuItem key={val.shortid} value={val.id}>{val.name}</MenuItem>)}
                            </Select>
                        </div>
                        <div>
                            <Typography className={classes.select}> Fecha Inicio </Typography>
                            <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils} locale="es">
                                <KeyboardDatePicker
                                    id={"date-" + shortid.generate()}
                                    format="D MMMM YYYY"
                                    locale="es"
                                    value={start_date}
                                    disablePast={true}
                                    onChange={date => setStartDate(date)}
                                    required
                                />
                            </MuiPickersUtilsProvider >
                        </div>
                        <div>
                            <Typography className={classes.select}> Fecha Termino </Typography>
                            <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils} locale="es">
                                <KeyboardDatePicker
                                    id={"date-" + shortid.generate()}
                                    format="D MMMM YYYY"
                                    locale="es"
                                    value={finish_date}
                                    disablePast={true}
                                    allowKeyboardControl={false}
                                    onChange={date => setFinishDate(date)}
                                    required
                                />
                            </MuiPickersUtilsProvider >
                        </div>
                        <div >
                            <Typography className={classes.select}> Cantidad (Kg) </Typography>
                            <TextField
                                className={classes.datePicker}
                                type="number"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                required
                            />
                        </div>


                        <Box mt={1}>
                            <Loading state={query} message={message}></Loading>
                        </Box>

                        <DialogActions>
                            <Button onClick={props.closeModal} color="primary">
                                Cancelar
                        </Button>
                            <Button type="submit" color="primary">
                                Crear
                            </Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
        </div >
    );
}
