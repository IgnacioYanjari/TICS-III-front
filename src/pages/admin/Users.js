import React, { useEffect, useState } from 'react';
import { Template, UsersTable, CreateUser } from 'components';
import { Paper, IconButton } from '@material-ui/core';
import { PersonAdd as AddIcon } from '@material-ui/icons';
import { AdmService } from 'services';
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
    const admService = new AdmService();
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
        data: [],
    });
    const [open, setOpenModel] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            let response;
            try {
                response = await admService.getUsers();
            } catch (e) {
                console.log('error al obtener datos');
            }
            setLoading(false);
            let data = response.map(val => {
                return {
                    id: val.id,
                    rut: val.username.replace(/\./gi, '').replace(/-/gi, ''),
                    name: val.profile.name, surname: val.profile.surname,
                    email: val.email,
                    role: (val.profile.role === 'QAS') ? 0 : 1
                }
            });
            setState({ ...state, data });
        }
        fetchData();
    }, []);

    const handleEdit = (newData, oldData) => {
        return new Promise(resolve => {
            async function edit(newData) {
                let response;
                try {
                    response = await admService.editUser(newData);
                    console.log(response);
                    const data = [...state.data];
                    data[data.indexOf(oldData)] = newData;
                    setState({ ...state, data });
                } catch (e) {
                    console.log('falló el borrado de usuario');
                }
            }
            let aux = { ...oldData };
            delete aux.tableData;
            if (JSON.stringify(newData) !== JSON.stringify(aux)) edit(newData);
            resolve();
        })
    }

    const handleDelete = userDeleted => {
        return new Promise(resolve => {
            async function deleteUser(id) {
                let response = await admService.deleteUser(id);
                if (response.status === 'fail') {
                    resolve();
                    return;
                }
                const data = [...state.data];
                data.splice(data.indexOf(userDeleted), 1);
                setState({ ...state, data });
                resolve();
            }
            deleteUser(userDeleted.id);
        });
    }

    const openModal = () => setOpenModel(true);

    const closeModal = (newUser) => {
        async function addUser(newUser) {
            const data = [...state.data];
            newUser.role = (newUser.role === 'QAS') ? 0 : 1;
            newUser.rut = newUser.rut.replace(/\./gi, '').replace(/-/gi, '')
            data.push(newUser);
            setState({ ...state, data });
        }

        if ("id" in newUser) addUser(newUser);
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
                        isLoading={loading}
                    />
                </Paper>
            </div>
        </Template>
    );
}
