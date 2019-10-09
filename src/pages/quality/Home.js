import React, { useEffect } from 'react';
import { Grid, Paper } from '@material-ui/core';
import loginStyle from 'styles/Login.js';
import { Template, OpTable } from 'components';

export default function LoginPage() {
    const classes = loginStyle();

    const [state, setState] = React.useState({
        columns: [
            { title: 'Producto', field: 'product' },
            { title: 'Fecha Inicio', field: 'date_ini', type: 'date' },
            { title: 'Fecha Termino', field: 'date_fin', type: 'date' },
            { title: 'Etapa', field: 'state' }
        ],
        data: [
            { product: 'Empanada Queso', date_ini: '26/08/2019', date_fin: '26/09/2019', state: 2 },
            { product: 'Empanada Queso', date_ini: '26/08/2019', date_fin: '26/09/2019', state: 2 },
            { product: 'Empanada Queso', date_ini: '26/08/2019', date_fin: '26/09/2019', state: 2 },
            { product: 'Empanada Queso', date_ini: '26/08/2019', date_fin: '26/09/2019', state: 2 },
            { product: 'Empanada Queso', date_ini: '26/08/2019', date_fin: '26/09/2019', state: 2 },
            { product: 'Empanada Queso', date_ini: '26/08/2019', date_fin: '26/09/2019', state: 2 },
            { product: 'Empanada Carne', date_ini: '26/08/2019', date_fin: '26/09/2019', state: 2 },
            { product: 'Empanada Carne', date_ini: '26/08/2019', date_fin: '26/09/2019', state: 3 },
            { product: 'Empanada Carne', date_ini: '26/08/2019', date_fin: '26/09/2019', state: 4 },
            { product: 'Empanada Carne', date_ini: '26/08/2019', date_fin: '26/09/2019', state: 5 },
            { product: 'Empanada Carne', date_ini: '26/08/2019', date_fin: '26/09/2019', state: 6 },
            { product: 'Empanada Carne', date_ini: '26/08/2019', date_fin: '26/09/2019', state: 7 },
            { product: 'Empanada Queso', date_ini: '26/08/2019', date_fin: '26/09/2019', state: 8 },
            { product: 'Empanada Queso', date_ini: '26/08/2019', date_fin: '26/09/2019', state: 9 },
            { product: 'Empanada Queso', date_ini: '26/08/2019', date_fin: '26/09/2019', state: 2 },
            { product: 'Empanada Queso', date_ini: '26/08/2019', date_fin: '26/09/2019', state: 2 },
            { product: 'Empanada Queso', date_ini: '26/08/2019', date_fin: '26/09/2019', state: 2 },
            { product: 'Empanada Queso', date_ini: '26/08/2019', date_fin: '26/09/2019', state: 2 }
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
                            title="Ordenes asignadas"
                            columns={state.columns}
                            data={state.data}
                            detailOnClick={(event, data) => {
                                console.log(data);
                            }}
                            deleteOnClick={(event, data) => {
                                console.log(data);
                            }}
                        />
                    </Paper>
                </Grid>
                {/* Lista de Inactivos */}
                <Grid className={classes.paper} item xs={12} md={12} xl={12} lg={12}>
                    <Paper style={{ width: '100%' }}>
                        <OpTable
                            title="Ordenes inactivas"
                            columns={state.columns}
                            data={state.data}
                            detailOnClick={(event, data) => {
                                console.log(data);
                            }}
                            assignOnClick={(event, data) => {
                                console.log(data);
                            }}
                        />
                    </Paper>
                </Grid>
            </Grid>
        </Template >
    );
}
