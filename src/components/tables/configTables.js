export default {
    options: {
        pageSize: 10,
        pageSizeOptions: [],
        sorting: false,
        draggable: false,
        search: false
    },
    localization: {
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
                deleteText: 'Seguro que quieres eliminar esta fila?',
                cancelTooltip: 'Cancelar',
                saveTooltip: 'Guardar'
            },
            editTooltip: "Editar",
            deleteTooltip: "Eliminar",
            emptyDataSourceMessage: "Ingresar Datos"
        }
    }
}
