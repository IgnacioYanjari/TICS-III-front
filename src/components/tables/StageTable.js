import React, { useState, useEffect } from 'react';
import { QaService } from 'services';
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
    const qaService = new QaService();

    useImperativeHandle(ref, () => ({

        getData() {
            return table.data;
        }

    }));

    useEffect(() => {
        let aux = { ...table };
        aux.columns = props.columns;
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
            }, 1000);
        });
    }

    const onRowDelete = oldData => {
        new Promise(resolve => {
            setTimeout(() => {
                resolve();
                const data = [...table.data];
                data.splice(data.indexOf(oldData), 1);
                setTable({ ...table, data });
            }, 600);
        });
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
                    editable={{
                        onRowAdd: onRowAdd,
                        onRowDelete: onRowDelete
                    }}
                />
            </Paper>
        </>

    );
});

export default StageTable;
