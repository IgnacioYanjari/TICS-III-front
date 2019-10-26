import React, { useEffect, useState } from 'react';
import { Grid, Paper } from '@material-ui/core';
import loginStyle from 'styles/Login.js';
import { Template, OpTable, LinksPdf } from 'components';
import { QaService } from 'services';

export default function LoginPage() {

    const classes = loginStyle();
    // const [message, setmessage] = useState('');
    const [openList, setOpenList] = useState(false);
    const qaService = new QaService();
    const [state, setState] = useState({
        columns: [
            { title: 'ID', field: 'id' },
            { title: 'Producto', field: 'product' },
            { title: 'Fecha Inicio', field: 'start_date', type: 'date' },
            { title: 'Fecha Termino', field: 'finish_date', type: 'date' },
            { title: 'Etapa', field: 'stage' }
        ],
        data: [],
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchOrders() {
            let data = [...state.data];
            data = await qaService.availableOrders();
            setLoading(false);
            setState({ ...state, data });
        }
        fetchOrders();
    }, []);

    const listOnClick = (event, data) => {
        setOpenList(true);
    }

    return (
        <Template >
            <LinksPdf
                open={openList}
                closeModal={() => setOpenList(false)}
            />
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
                            listOnClick={listOnClick}
                            isLoading={loading}
                        />
                    </Paper>
                </Grid>
            </Grid>
        </Template >
    );
}
