import React, { useState, useEffect } from 'react';
import loginStyle from 'styles/Login.js';
import MaterialTable from 'material-table';
import config from './configTables';
import { forwardRef, useImperativeHandle } from 'react';
import { Paper, Typography } from '@material-ui/core';

const StageTable = forwardRef((props, ref) => {
    const classes = loginStyle();
    const [table, setTable] = useState({
        columns: [],
        data: [],
    });

    useImperativeHandle(ref, () => ({
        getData() {
            return table.data;
        }
    }));

    useEffect(() => {
        let aux = { ...table };
        aux.columns = props.columns;
        setTable(aux);
        if (props.type === 'stage8') {
            aux.data = props.data
        }
        setTable(aux);
    }, [])

    const checkKeys = (data) => {
        let keys = table.columns.map(val => val.field);
        for (let i = 0; i < keys.length; i++) {
            if (!(keys[i] in data)) return false;
        }
        return true;
    }

    const onRowAdd = newData => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (!checkKeys(newData)) return reject();
                resolve();
                const data = [...table.data];
                data.push(newData);
                setTable({ ...table, data });
            }, 500);
        });
    }

    const onRowDelete = oldData => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve();
                const data = [...table.data];
                data.splice(data.indexOf(oldData), 1);
                setTable({ ...table, data });
            }, 500);
        });
    }

    const onRowUpdate = (newData, oldData) => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve();
                const data = [...table.data];
                data[data.indexOf(oldData)] = newData;
                setTable({ ...table, data });
            }, 500);
        });
    }

    let editable = {}
    if (props.edit) {
        editable['onRowUpdate'] = onRowUpdate;
    } else {
        editable['onRowAdd'] = onRowAdd;
        editable['onRowDelete'] = onRowDelete;
    }

    return (
        <>
            <Typography className={classes.subtitle} align="center" variant="h5"> {props.title} </Typography>
            <Paper className={classes.paper} style={{ width: '100%' }}>
                <MaterialTable
                    {...config}
                    style={{ width: '100%' }}
                    data={table.data}
                    title=""
                    columns={table.columns}
                    editable={editable}
                />
            </Paper>
        </>

    );
});

export default StageTable;
