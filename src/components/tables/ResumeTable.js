import React from 'react';
import loginStyle from 'styles/Login.js';
import {
    Paper, Typography, Table,
    TableBody, TableCell, TableRow
} from '@material-ui/core';
import Moment from 'react-moment';
import 'moment/locale/es';

export default function ResumeTable(props) {
    const classes = loginStyle();
    const data = props.data;
    return (
        <>
            <Typography className={classes.title} align="center" variant="h3"> {data.title} </Typography>
            <Paper className={classes.paper}>
                <Table aria-label="detalles" align="center">
                    <TableBody>
                        <TableRow >
                            <TableCell align="center"> Orden de producción (ID)</TableCell>
                            <TableCell align="center"> {data.opId} </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="center"> Cliente </TableCell>
                            <TableCell align="center"> {data.client} </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="center"> Fecha </TableCell>
                            <TableCell align="center">
                                <Moment format={"D MMMM YYYY"}>{new Date()}</Moment>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="center"> Responsable </TableCell>
                            <TableCell align="center"> {data.qaUser} </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Paper>
        </>
    );
}
