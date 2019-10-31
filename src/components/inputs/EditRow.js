import React, { useState, useEffect } from 'react';
import {
    TableRow, TableCell, TextField
} from '@material-ui/core';
import { TextInput } from 'components';
import DateFnsUtils from '@date-io/date-fns';
import moment from "moment";
import MomentUtils from "@date-io/moment";
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker
} from '@material-ui/pickers';
import shortid from 'shortid';
moment.locale('es');

export default function EditRow(props) {
    const [value, setValue] = useState(props.val);
    const [selectedDate, setSelectedDate] = useState(props.val);
    const [selectedTime, setSelectedTime] = useState(props.val);
    const components = {
        'numeric': <TextField type="number" value={value} onChange={e => {
            props.handleChange(e.target.value, props.pos);
            setValue(e.target.value);
        }} autoFocus={props.focus} />,
        'text': <TextField value={value} onChange={e => {
            props.handleChange(e.target.value, props.pos);
            setValue(e.target.value);
        }} autoFocus={props.focus} />,
        'time': (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardTimePicker
                    margin="normal"
                    id={"time-" + shortid.generate()}
                    value={selectedTime}
                    onChange={time => {
                        props.handleChange(time, props.pos)
                        setSelectedTime(time)
                    }}
                />
            </MuiPickersUtilsProvider>
        ),
        'date': (
            <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils} locale="es">
                <KeyboardDatePicker
                    margin="normal"
                    id={"date-" + shortid.generate()}
                    format="D MMMM YYYY"
                    locale="es"
                    value={selectedDate}
                    onChange={date => {
                        props.handleChange(date, props.pos)
                        setSelectedDate(date)
                    }}
                />
            </MuiPickersUtilsProvider >
        )
    }

    const renderStatic = () => {
        if (props.type === 'static') {
            return <TableCell align="center"> {props.val} </TableCell>
        }
        return <TableCell align="center"> {components[props.type]} </TableCell>
    }

    return (
        <TableRow>
            <TableCell align="center"> {props.title}</TableCell>
            {renderStatic()}
        </TableRow>
    );
}
