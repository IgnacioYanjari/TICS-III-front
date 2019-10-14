import React from 'react';
import MaterialTable from 'material-table';

export default function OpTable(props) {

    let actions = [];
    if (props.viewOnClick) {
        actions.push({
            icon: 'add_circle',
            tooltip: 'Ver',
            onClick: props.viewOnClick
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
            tooltip: 'Realizar etapa',
            onClick: props.detailOnClick
        });
    }

    return (
        <MaterialTable
            title={props.title}
            columns={props.columns}
            data={props.data}
            options={{
                pageSize: 6,
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
