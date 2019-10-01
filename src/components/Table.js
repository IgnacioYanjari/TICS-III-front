import React from 'react';
import MaterialTable from 'material-table';

export default function Table(props) {

    let actions = [];
    if (props.assignOnClick) {
        actions.push({
            icon: 'add_circle',
            tooltip: 'Inscribir',
            onClick: (event, rowData) => props.assignOnClick(event, rowData)
        });
    }
    if (props.deleteOnClick) {
        actions.push({
            icon: 'remove_circle',
            tooltip: 'Salir',
            onClick: (event, rowData) => props.deleteOnClick(event, rowData)
        });
    }
    if (props.detailOnClick) {
        actions.push({
            icon: 'assignment',
            tooltip: 'Ver Detalle',
            onClick: (event, rowData) => props.detailOnClick(event, rowData)
        });
    }

    return (
        <MaterialTable
            title={props.title}
            columns={props.columns}
            data={props.data}
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
                    lastTooltip: "Ultima Pagina"
                },
                header: {
                    actions: "Acciones"
                }
            }}
            actions={actions}
        />
    );
}
