
/*
Check if all keys in values exists.
*/

function checkArray(array) {
    let check = true;
    for (let i = 0; i < array.length; i++) {
        Object.keys(array[i]).forEach(key => {
            if (array[i][key] === undefined || array[i][key] === null || array[i][key] === "") {
                check = false;
            }
        });
    }
    return check;
}

function check(value) {
    if (value instanceof Array) {
        // Verificar si tiene todos los datos y si los tiene.
        if (value.length === 0) return false;
        return checkArray(value);
    }

    if (typeof value === 'object' && !(value instanceof Array)) {
        let keys = Object.keys(value),
            result = true;
        for (let i = 0; i < keys.length; i++) {
            result = result && check(value[keys[i]]);
        }
        // console.log('final', { value, result });
        return result;
    }

    return true;
}

export default check;
