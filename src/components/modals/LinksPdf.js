import React, { useState, useEffect } from 'react';
import {
    Button, Dialog, DialogActions,
    DialogContent, DialogTitle, Box, Typography,
    List, ListItem, ListItemIcon, ListItemText
} from '@material-ui/core';
import {
    Link as LinkIcon
} from '@material-ui/icons'
import { Loading } from 'components';
import { OpService } from 'services';
import shortid from 'shortid';

export default function LinksPdf(props) {

    const [query, setQuery] = useState('');
    const [links, setLinks] = useState([]);
    const [message, setMessage] = useState('')
    const opService = new OpService();

    useEffect(() => {
        // Llamar ruta para cargar links
        if (!props.open) {
            setMessage('');
            setLinks([]);
            return;
        };
        setQuery('sending');
        async function getLinks() {
            let res = await opService.getLinks(props.opId);
            console.log(res);
            setLinks(res);
            setQuery('success');
            // Si no existe
            setMessage('No se ha terminado ninguna etapa');
        }
        getLinks();

    }, [props.open]);

    let closeModal = () => {
        setLinks([]);
        props.closeModal();
    }

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
                open={props.open} onClose={closeModal} aria-labelledby="form-dialog-title"
            >
                <DialogTitle >Informes de etapas realizadas</DialogTitle>
                <DialogContent>
                    <Loading state={query} message=""></Loading>
                    {renderList()}
                    <DialogActions>
                        <Button onClick={closeModal} color="primary">
                            Cerrar
                        </Button>
                    </DialogActions>
                </DialogContent>

            </Dialog>
        </ >
    );
}
