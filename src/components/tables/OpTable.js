import React from 'react';
import MaterialTable from 'material-table';

export default function OpTable(props) {

    let actions = [];
    if (props.listOnClick) {
        actions.push({
            icon: 'add_circle',
            tooltip: 'Ver Informes',
            onClick: props.listOnClick
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
    let editable = {}
    if (props.handleEdit) editable['onRowUpdate'] = props.handleEdit;
    if (props.handleDelete) editable['onRowDelete'] = props.handleDelete;

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
                },
                body: {
                    editRow: {
                        deleteText: 'Seguro que quieres cancelar la Orden?',
                        cancelTooltip: 'Cancelar',
                        saveTooltip: 'Guardar'
                    },
                    editTooltip: "Editar",
                    deleteTooltip: "Cancelar Orden",
                    emptyDataSourceMessage: "No hay resultados"
                }
            }}
            actions={actions}
            isLoading={props.isLoading}
            editable={editable}
        />
    );
}
