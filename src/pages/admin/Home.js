import React, { useEffect, useState } from 'react';
import { Grid, Paper, Fab } from '@material-ui/core'
import loginStyle from 'styles/Login.js';
import { Template, LinksPdf, OpTable, CreateOp } from 'components';
import moment from 'moment';
import Moment from 'react-moment';
import { AdmService } from 'services';
import { Add as AddIcon } from '@material-ui/icons';

export default function LoginPage() {
    const classes = loginStyle();
    const [openList, setOpenList] = useState(false);
    const [openCreate, setOpenCreate] = useState(false);
    const admService = new AdmService();
    const [closedOps, setClosedOps] = useState({
        columns: [
            { title: 'ID', field: 'id' },
            { title: 'Producto', field: 'product' },
            { title: 'Fecha Inicio', field: 'start_date', type: 'date' },
            { title: 'Fecha Termino', field: 'finish_date', type: 'date' },
            { title: 'Etapa', field: 'stage' },
            { title: 'Cliente', field: 'client', editable: 'never' }
        ],
        data: []
    });
    const [openOps, setOpenOps] = useState({
        columns: [
            { title: 'ID', field: 'id', editable: 'never' },
            { title: 'Producto', field: 'product', editable: 'never' },
            {
                title: 'Fecha Inicio', field: 'start_date', type: 'date',
                render: (rowData) => {

                    return <Moment format={"DD-MM-YYYY"}>{rowData.start_date}</Moment>;
                }
            },
            {
                title: 'Fecha Termino', field: 'finish_date', type: 'date',
                render: (rowData) => {
                    return <Moment format={"DD-MM-YYYY"}>{rowData.finish_date}</Moment>;
                },
                defaultSort: 'asc'
            },
            { title: 'Etapa', field: 'stage', editable: 'never' },
            { title: 'Cliente', field: 'client', editable: 'never' }
        ],
        data: [],
    });
    const [loadingClosed, setLoadingClosed] = useState(true);
    const [loadingOpen, setLoadingOpen] = useState(true);
    const [opId, setOpId] = useState(null);

    useEffect(() => {
        async function fetchCloseOps() {
            let data = [...closedOps.data];
            data = await admService.endedOrders();
            setLoadingClosed(false);
            setClosedOps({ ...closedOps, data });
        }
        async function fetchOpenOps() {
            let data = [...openOps.data];
            data = await admService.availableOrders();
            setLoadingOpen(false);
            setOpenOps({ ...openOps, data });
        }
        fetchCloseOps();
        fetchOpenOps();
    }, []);

    const listOnClick = (event, data) => {
        setOpId(data.id);
        setOpenList(true);
    }

    const handleEdit = async (newData, oldData) => {
        async function editOp() {
            let res = await admService.updateOrder(
                newData.id,
                moment(newData.start_date).format('YYYY-MM-DD'),
                moment(newData.finish_date).format('YYYY-MM-DD')
            );

            if (res.status !== 'fail') {
                let data = [...openOps.data];
                data[data.indexOf(oldData)] = newData;
                setOpenOps({ ...openOps, data });
            }
        }
        editOp();
    }

    const handleDelete = async oldData => {
        async function cancelOp() {
            setLoadingOpen(true);
            let res = await admService.cancelOrder(oldData.id);
            if (res.status !== 'fail') {
                const data = [...openOps.data];
                data.splice(data.indexOf(oldData), 1);
                setOpenOps({ ...openOps, data });
            }
            setLoadingOpen(false);
        }
        cancelOp();
    }

    const closeCreateOrder = (newOp) => {
        async function addUser(newOp) {
            const data = [...openOps.data];
            newOp.client = newOp.customer;
            newOp.start_date = moment(newOp.start_date);
            newOp.finish_date = moment(newOp.finish_date);
            newOp.stage = 'Porcionamiento';
            data.push(newOp);
            setOpenOps({ ...openOps, data });
        }

        if ("id" in newOp) addUser(newOp);
        setOpenCreate(false);
    };

    return (
        <Template>
            <LinksPdf
                open={openList}
                opId={opId}
                closeModal={() => setOpenList(false)}
            />

            <CreateOp
                open={openCreate}
                closeModal={closeCreateOrder}
            />

            <Grid container spacing={1}>
                {/* Lista de Activos*/}
                <Fab color="primary" variant="extended" className={classes.create}
                    onClick={() => setOpenCreate(true)}
                >
                    <AddIcon className={classes.add} /> Crear Orden de producción
                </Fab>
                <Grid className={classes.paper} item xs={12} md={12} xl={12} lg={12}>
                    <Paper style={{ width: '100%' }}>
                        <OpTable
                            title="Ordenes En Curso"
                            columns={openOps.columns}
                            data={openOps.data}
                            listOnClick={listOnClick}
                            isLoading={loadingOpen}
                            handleDelete={handleDelete}
                            handleEdit={handleEdit}
                        />
                    </Paper>
                </Grid>
                <Grid className={classes.paper} item xs={12} md={12} xl={12} lg={12}>
                    <Paper style={{ width: '100%' }}>
                        <OpTable
                            title="Ordenes Completas"
                            columns={closedOps.columns}
                            data={closedOps.data}
                            listOnClick={listOnClick}
                            isLoading={loadingClosed}
                        />
                    </Paper>
                </Grid>
            </Grid>
        </Template>
    );
}
