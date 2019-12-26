import React, { useEffect, useState } from 'react';
import { Grid, Paper } from '@material-ui/core';
import { Redirect } from "react-router-dom";
import loginStyle from 'styles/Login.js';
import { Template, OpTable, LinksPdf } from 'components';
import { QaService } from 'services';
import { Info } from 'components';
export default function LoginPage() {

    const classes = loginStyle();
    // const [message, setmessage] = useState('');
    const [openList, setOpenList] = useState(false);
    const [info, setInfo] = useState({
        open: false,
        message: ''
    });
    const [linkOp, setLinkOp] = useState('');
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
    const [opId, setOpId] = useState(1);

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
        setOpId(data.id)
        setOpenList(true);
    }

    const InscribeOp = (event, data) => {
        async function inscribe() {
            let res = await qaService.inscribeOp(data.id);
            if (res.status === 'fail') {
                setInfo({ open: true, message: res.message });
            } else {
                setLinkOp(`etapas/${res.report.stage.code}/operacion/${res.order.id}`);
            }
        }
        inscribe();
    }

    return (
        <Template>
            <Info
                open={info.open}
                message={info.message}
                closeModal={() => setInfo({ open: false, message: '' })}
            />
            <LinksPdf
                open={openList}
                opId={opId}
                closeModal={() => setOpenList(false)}
            />
            {(linkOp !== '') ? <Redirect to={linkOp} /> : null}
            <Grid container spacing={1}>
                {/* Lista de Activos*/}
                <Grid className={classes.paper} item xs={12} md={12} xl={12} lg={12}>
                    <Paper style={{ width: '100%' }}>
                        <OpTable
                            title="Ordenes"
                            columns={state.columns}
                            data={state.data}
                            detailOnClick={InscribeOp}
                            listOnClick={listOnClick}
                            isLoading={loading}
                        />
                    </Paper>
                </Grid>
            </Grid>
        </Template>
    );
}
