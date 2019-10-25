import React, { useState, useEffect } from 'react';
import {
    Button, Dialog, DialogActions,
    DialogContent, DialogTitle, Box, Typography,
    Divider, List, ListItem, ListItemIcon, ListItemText
} from '@material-ui/core';
import {
    Link as LinkIcon
} from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles';
import { Loading } from 'components';
import shortid from 'shortid';


const useStyles = makeStyles(theme => ({

}));

export default function LinksPdf(props) {
    const classes = useStyles();
    const [query, setQuery] = useState('');
    const [links, setLinks] = useState([]);
    const [message, setMessage] = useState('')

    useEffect(() => {
        // Llamar ruta para cargar links
        if (!props.open) {
            setMessage('');
            setLinks([]);
            return;
        };
        setQuery('sending')
        setTimeout(() => {
            setQuery('success');
            // Si existe
            setLinks([
                { link: 'https://google.com', name: 'google', shortid: shortid.generate() },
                { link: 'https://facebook.com', name: 'facebook', shortid: shortid.generate() }
            ]);
            // Si no existe
            setMessage('No se ha terminado ninguna etapa');
        }, 3000);

    }, [props.open]);

    let renderList = () => {
        if (links.length === 0) {
            return (
                <Box mt={1}>
                    <Typography variant="body2" align="center" color="inherit">
                        {message}
                    </Typography>
                </Box>
            );
        }
        return (
            <List>
                {
                    links.map(val =>
                        <ListItem button component="a" href={val.link} key={val.shortid}
                            target="_blank" rel="noopener noreferrer"
                        >
                            <ListItemIcon>
                                <LinkIcon />
                            </ListItemIcon>
                            <ListItemText primary={val.name} />
                        </ListItem>
                    )
                }
            </List>
        );
    };

    return (
        <>
            <Dialog
                open={props.open} onClose={props.closeModal} aria-labelledby="form-dialog-title"
            >
                <DialogTitle >Informes de etapas realizadas</DialogTitle>
                <DialogContent>
                    <Loading state={query} message=""></Loading>
                    {renderList()}
                    <DialogActions>
                        <Button onClick={props.closeModal} color="primary">
                            Cerrar
                        </Button>
                    </DialogActions>
                </DialogContent>

            </Dialog>
        </ >
    );
}
