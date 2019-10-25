import React from 'react';
import MaterialTable from 'material-table';

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
            isLoading={props.isLoading}
        />
    );
}
