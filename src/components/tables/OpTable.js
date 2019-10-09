import React from 'react';
import MaterialTable from 'material-table';

export default function OpTable(props) {

    let actions = [];
    if (props.assignOnClick) {
        actions.push({
            icon: 'add_circle',
            tooltip: 'Inscribir',
            onClick: props.assignOnClick
        });
    }
    if (props.deleteOnClick) {
        actions.push({
            icon: 'remove_circle',
            tooltip: 'Salir',
            onClick: props.deleteOnClick
        });
    }
    if (props.detailOnClick) {
        actions.push({
            icon: 'assignment',
            tooltip: 'Ver Detalle',
            onClick: props.detailOnClick
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
