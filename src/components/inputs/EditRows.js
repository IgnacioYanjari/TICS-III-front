import React, { useState, useEffect } from 'react';
import { forwardRef, useImperativeHandle } from 'react';
import { EditRow } from 'components';
import shortid from 'shortid';

const EditRows = forwardRef((props, ref) => {
    const [data, setData] = useState([]);
    const [prevFocus, setPrevFocus] = useState(-1);

    // arreglo de objetos con titulo, valor y tipo
    useEffect(() => {
        let aux = props.data.map(val => { return { ...val, focus: false } })
        setData(aux);
    }, [props.data]);

    useImperativeHandle(ref, () => ({
        getData() {
            return data;
        }
    }));

    const handleChange = (value, pos) => {
        console.log({ value, pos })
        let aux = [...data];
        aux[pos].val = value;
        if (prevFocus !== pos) {
            if (prevFocus !== -1) aux[prevFocus].focus = false;
            aux[pos].focus = true;
            setPrevFocus(pos);
        }
        setData(aux);
    }

    return (
        <>
            {data.map((item, pos) =>
                <EditRow
                    val={item.val} type={item.type}
                    title={item.title} key={shortid.generate()}
                    pos={pos} handleChange={handleChange}
                    focus={item.focus}
                />
            )}
        </>
    );
});
export default EditRows;
