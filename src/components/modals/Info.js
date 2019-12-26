import React from 'react';
import {
    Button, Dialog, DialogActions,
    DialogContent, DialogContentText, DialogTitle
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    select: {
        marginTop: theme.spacing(2)
    }
}));

export default function Info(props) {
    return (
        <div>
            <Dialog
                open={props.open} aria-labelledby="form-dialog-title"
            >
                <DialogTitle > {props.message} </DialogTitle>
                <DialogContent>
                    <DialogActions>
                        <Button onClick={props.closeModal} color="primary">
                            Cerrar
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </div >
    );
}
