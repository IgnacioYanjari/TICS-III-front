import React, { useState, useEffect } from 'react';
import {
    Button, TextField, Dialog, DialogActions,
    DialogContent, DialogContentText, DialogTitle,
    Select, MenuItem, Box, Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { TextInput, Loading } from 'components';


const useStyles = makeStyles(theme => ({
    select: {
        marginTop: theme.spacing(2)
    }
}));

export default function CreateUser(props) {
    const classes = useStyles();
    const { value: name, bind: bindName, setValue: setName } = TextInput('name', '');
    const { value: surname, bind: bindSurname, setValue: setSurName } = TextInput('surname', '');
    const { value: email, bind: bindEmail, setValue: setEmail } = TextInput('email', '');
    const { value: rut, bind: bindRut, setValue: setRut } = TextInput('rut', '');
    const { value: password, bind: bindPassword, setValue: setPassword } = TextInput('password', '');
    const [role, setRole] = useState('QAS');
    const [message, setMessage] = useState('');
    const [query, setQuery] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage('');
        setQuery('sending');
        setInterval(() => {
            setQuery('success');
            setInterval(() => {
                props.closeModal({ name, surname, email, rut, role });
            }, 3000);
        }, 3000);
        console.log({ name, surname, email, rut, password, role })
    };

    useEffect(() => {
        setEmail('');
        setRut('');
        setPassword('');
        setName('');
        setSurName('');
        setRole('QAS');
        setMessage('')
        setQuery('');
    }, [props.closeModal])

    const changeRole = (event) => {
        setRole(event.target.value);
    }

    return (
        <div>
            <Dialog
                open={props.open} onClose={props.closeModal}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle >Crear Usuario</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Ingrese campos necesarios para crear usuario
                    </DialogContentText>
                    <form onSubmit={handleSubmit} validate="true">
                        <TextField
                            margin="dense"
                            label="Nombre"
                            fullWidth
                            required
                            {...bindName}
                        />
                        <TextField
                            margin="dense"
                            label="Apellido"
                            fullWidth
                            required
                            {...bindSurname}
                        />
                        <TextField
                            margin="dense"
                            label="Rut"
                            type="rut"
                            fullWidth
                            required
                            {...bindRut}
                        />
                        <TextField
                            margin="dense"
                            label="Correo"
                            type="email"
                            fullWidth
                            required
                            {...bindEmail}
                        />
                        <TextField
                            margin="dense"
                            label="Contraseña"
                            type="password"
                            fullWidth
                            required
                            {...bindPassword}
                        />
                        <Select
                            className={classes.select}
                            value={role}
                            onChange={changeRole}
                            inputProps={{
                                name: 'rol',
                            }}
                            fullWidth
                        >
                            <MenuItem value={'QAS'}>Control de calidad</MenuItem>
                            <MenuItem value={'ADM'}>Administrador</MenuItem>
                        </Select>
                        {(message === '') ?
                            <>
                                <Box mt={1}>
                                    <Loading state={query} message="Usuario creado con éxito"></Loading>
                                </Box>
                            </> : (
                                <Box mt={1}>
                                    <Typography variant="body2" align="center" color="inherit">
                                        {message}
                                    </Typography>
                                </Box>
                            )}
                        <DialogActions>
                            <Button onClick={props.closeModal} color="primary">
                                Cancel
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
