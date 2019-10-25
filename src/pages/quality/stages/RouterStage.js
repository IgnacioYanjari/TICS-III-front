import React, { useEffect } from 'react';
import {
    useParams,
    Redirect
} from "react-router-dom";
import {
    StagePortioned,
    StageCooking,
    StageCooling,
    StageBake,
    StageDeepFreezing,
    StageMetalDetector,
    StageApproval,
} from './index';

export default function RouterStage() {
    let { name, id: idOp } = useParams();
    const [link, setLink] = React.useState('');
    const links = [
        'coccion', 'porcionado', 'enfriamiento',
        'horneo', 'ultracongelacion', 'metales', 'aprobación'
    ];
    const components = {
        porcionado: <StagePortioned />,
        coccion: <StageCooking />,
        enfriamiento: <StageCooling />,
        horneo: <StageBake />,
        ultracongelacion: <StageDeepFreezing />,
        metales: <StageMetalDetector />,
        aprobación: <StageApproval />,
    }
    useEffect(() => {
        console.log({ links, name, idOp });
        (links.indexOf(name) === -1) ? setLink('/') : setLink('');
        // Verificar si puede entrar a esta id op y etapa con token respectivo
    }, [])

    return (
        <>
            {(link === '/') ? <Redirect to={link} /> : null}
            {components[name]}
        </>
    );
}
