import React from 'react';
import { Template, UsersTable, CreateUser } from 'components';
import { Paper, IconButton } from '@material-ui/core';
import { PersonAdd as AddIcon } from '@material-ui/icons';
import loginStyle from 'styles/Login';

const formatRut = (text) => {
    let filtered = text.split('').filter(val => !isNaN(val)).join('');
    if (filtered.length === 0) return '';
    let suffix = filtered[filtered.length - 1];
    let preffix = filtered.substr(0, filtered.length - 1).split('').reverse()
        .map((val, i) => {
            return ((i + 1) % 3 === 0 || i === text.length) ? '.' + val : val;
        }).reverse().join('');
    let result = preffix + '-' + suffix
    if (result[0] === '.') result = result.substr(1);
    return result;
}

export default function EditUsersPage() {

    const classes = loginStyle();

    const [state, setState] = React.useState({
        columns: [
            { title: 'Nombre', field: 'name' },
            { title: 'Apellido', field: 'surname' },
            {
                title: 'RUT', field: 'rut', type: 'string',
                render: (rowData) => {
                    return formatRut(rowData.rut);
                }
            },
            { title: 'Correo', field: 'email', type: 'string' },
            {
                title: 'Cargo', field: 'role',
                lookup: { 0: 'QAS', 1: 'ADM' }
            },
        ],
        data: [
            { name: 'Ignacio', surname: 'Yanjari', rut: '192098327', email: 'ignacio.yanjari@mail.udp.cl', role: 0 },
            { name: 'Michiru', surname: 'Nakamura', rut: '203401817', email: 'michiru.nakamura@mail.udp.cl', role: 1 },
        ],
    });
    const [open, setOpenModel] = React.useState(false);

    const handleEdit = (newData, oldData) => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve();
                const data = [...state.data];
                data[data.indexOf(oldData)] = newData;
                setState({ ...state, data });
            }, 600);
        })
    }

    const handleDelete = oldData => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve();
                const data = [...state.data];
                data.splice(data.indexOf(oldData), 1);
                setState({ ...state, data });
            }, 600);
        })
    }

    const openModal = () => {
        setOpenModel(true);
    }

    const closeModal = (newUser) => {
        if ('role' in newUser) {
            const data = [...state.data];
            newUser.role = (newUser.role === 'QAS') ? 0 : 1;
            data.push(newUser);
            setState({ ...state, data });
        }
        setOpenModel(false);
    };

    return (
        <Template>
            <CreateUser
                open={open}
                closeModal={closeModal}
            />
            <div className={classes.paper}>
                <Paper style={{ width: '100%' }}>
                    <UsersTable
                        title={
                            <>
                                Usuarios
                                <IconButton className={classes.add} onClick={openModal}>
                                    <AddIcon fontSize="large" />
                                </IconButton>
                            </>

                        }
                        columns={state.columns}
                        data={state.data}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                    />
                </Paper>
            </div>
        </Template>
    );
}
