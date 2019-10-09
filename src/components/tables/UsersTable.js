import React from 'react';
import MaterialTable from 'material-table';

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

export default function UsersTable(props) {
    return (
        <MaterialTable
            title={props.title}
            columns={props.columns}
            data={props.data}
            editable={{
                onRowUpdate: props.handleEdit,
                onRowDelete: props.handleDelete,
            }}
            options={{
                pageSize: 5,
                pageSizeOptions: [],
                sorting: false
            }}
            localization={{
                toolbar: {
                    searchPlaceholder: "Buscar"
                },
                pagination: {
                    firstTooltip: "Primera Pagina",
                    nextTooltip: "Siguiente Pagina",
                    previousTooltip: "Pagina Anterior",
                    lastTooltip: "Ultima Pagina",
                },
                header: {
                    actions: "Acciones"
                },
                body: {
                    editRow: {
                        deleteText: 'Seguro que quieres eliminar al usuario?',
                        cancelTooltip: 'Cancelar',
                        saveTooltip: 'Guardar'
                    },
                    editTooltip: "Editar",
                    deleteTooltip: "Eliminar",
                    emptyDataSourceMessage: "No hay resultados"
                }
            }}
            actions={props.actions}
        />
    );
}
