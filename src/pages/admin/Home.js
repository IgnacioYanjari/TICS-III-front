import React, { useEffect, useState } from 'react';
import { Grid, Paper } from '@material-ui/core'
import loginStyle from 'styles/Login.js';
import { Template, LinksPdf, OpTable } from 'components';
import Moment from 'react-moment';
import { AdmService } from 'services';

export default function LoginPage() {
    const classes = loginStyle();
    const [openList, setOpenList] = useState(false);
    const admService = new AdmService();
    const [closedOps, setClosedOps] = useState({
        columns: [
            { title: 'ID', field: 'id' },
            { title: 'Producto', field: 'product' },
            { title: 'Fecha Inicio', field: 'start_date', type: 'date' },
            { title: 'Fecha Termino', field: 'finish_date', type: 'date' },
            { title: 'Etapa', field: 'stage' }
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
                }
            },
            { title: 'Etapa', field: 'stage', editable: 'never' }
        ],
        data: [],
    });
    const [loadingClosed, setLoadingClosed] = useState(true);
    const [loadingOpen, setLoadingOpen] = useState(true);

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
        setOpenList(true);
    }

    const handleEdit = (newData, oldData) => {
        console.log({ newData, oldData })
        return new Promise(resolve => {
            setTimeout(() => {
                resolve();
                const data = [...openOps.data];
                data[data.indexOf(oldData)] = newData;
                setOpenOps({ ...openOps, data });
            }, 600);
        })
    }

    const handleDelete = oldData => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve();
                const data = [...openOps.data];
                data.splice(data.indexOf(oldData), 1);
                setOpenOps({ ...openOps, data });
            }, 600);
        })
    }

    return (
        <Template>
            <LinksPdf
                open={openList}
                closeModal={() => setOpenList(false)}
            />

            <Grid container spacing={1}>
                {/* Lista de Activos*/}
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
