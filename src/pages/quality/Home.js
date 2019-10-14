import React, { useEffect, useState } from 'react';
import { Grid, Paper, Box } from '@material-ui/core';
import loginStyle from 'styles/Login.js';
import { Template, OpTable } from 'components';

export default function LoginPage() {
    const classes = loginStyle();

    const [message, setmessage] = useState('');
    const [state, setState] = useState({
        columns: [
            { title: 'ID', field: 'id' },
            { title: 'Producto', field: 'product' },
            { title: 'Fecha Inicio', field: 'date_ini', type: 'date' },
            { title: 'Fecha Termino', field: 'date_fin', type: 'date' },
            { title: 'Etapa', field: 'state' }
        ],
        data: [
            { id: 1, product: 'Empanada Queso', date_ini: '26/08/2019', date_fin: '26/09/2019', state: 2 },
            { id: 2, product: 'Empanada Queso', date_ini: '26/08/2019', date_fin: '26/09/2019', state: 2 },
            { id: 3, product: 'Empanada Queso', date_ini: '26/08/2019', date_fin: '26/09/2019', state: 2 },
            { id: 4, product: 'Empanada Queso', date_ini: '26/08/2019', date_fin: '26/09/2019', state: 2 },
            { id: 5, product: 'Empanada Queso', date_ini: '26/08/2019', date_fin: '26/09/2019', state: 2 },
            { id: 6, product: 'Empanada Queso', date_ini: '26/08/2019', date_fin: '26/09/2019', state: 2 },
            { id: 7, product: 'Empanada Carne', date_ini: '26/08/2019', date_fin: '26/09/2019', state: 2 },
            { id: 8, product: 'Empanada Carne', date_ini: '26/08/2019', date_fin: '26/09/2019', state: 3 },
            { id: 9, product: 'Empanada Carne', date_ini: '26/08/2019', date_fin: '26/09/2019', state: 4 },
            { id: 10, product: 'Empanada Carne', date_ini: '26/08/2019', date_fin: '26/09/2019', state: 5 },
            { id: 11, product: 'Empanada Carne', date_ini: '26/08/2019', date_fin: '26/09/2019', state: 6 },
            { id: 12, product: 'Empanada Carne', date_ini: '26/08/2019', date_fin: '26/09/2019', state: 7 },
            { id: 13, product: 'Empanada Queso', date_ini: '26/08/2019', date_fin: '26/09/2019', state: 8 },
            { id: 14, product: 'Empanada Queso', date_ini: '26/08/2019', date_fin: '26/09/2019', state: 9 },
            { id: 15, product: 'Empanada Queso', date_ini: '26/08/2019', date_fin: '26/09/2019', state: 2 },
            { id: 16, product: 'Empanada Queso', date_ini: '26/08/2019', date_fin: '26/09/2019', state: 2 },
            { id: 17, product: 'Empanada Queso', date_ini: '26/08/2019', date_fin: '26/09/2019', state: 2 },
            { id: 18, product: 'Empanada Queso', date_ini: '26/08/2019', date_fin: '26/09/2019', state: 2 }
        ],
    });

    useEffect(() => {
        // Hacer el fetch
        // Si tiene [] como segundo parámetro implica que solo se llama al montarse
        // pero no cuando se updatea.
    }, []);

    return (
        <Template >
            <Grid container spacing={1}>
                {/* Lista de Activos*/}
                <Grid className={classes.paper} item xs={12} md={12} xl={12} lg={12}>
                    <Paper style={{ width: '100%' }}>
                        <OpTable
                            title="Ordenes"
                            columns={state.columns}
                            data={state.data}
                            detailOnClick={(event, data) => {
                                console.log(data);
                            }}
                            viewOnClick={(event, data) => {
                                console.log(data);
                            }}
                        />
                    </Paper>
                </Grid>
                <Box>

                </Box>
            </Grid>
        </Template >
    );
}
