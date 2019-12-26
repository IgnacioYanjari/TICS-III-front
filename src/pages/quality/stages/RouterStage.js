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
import { QaService } from 'services';

export default function RouterStage() {
    let { name, id: idOp } = useParams();
    const [link, setLink] = React.useState('');
    const [data, setData] = React.useState({});
    const qaService = new QaService();
    const links = [
        'porcionado', 'coccion', 'enfriamiento',
        'horneo', 'ultracongelacion', 'metales', 'aprobacion'
    ];
    const components = {
        porcionado: <StagePortioned data={data} />,
        coccion: <StageCooking data={data} />,
        enfriamiento: <StageCooling data={data} />,
        horneo: <StageBake data={data} />,
        ultracongelacion: <StageDeepFreezing data={data} />,
        metales: <StageMetalDetector data={data} />,
        aprobacion: <StageApproval data={data} />,
    }
    useEffect(() => {
        async function verify() {
            let indexStage = links.indexOf(name);
            let res = await qaService.verifyAccessStage(idOp, indexStage + 1);
            setData(res);
            if (res.status == 'fail') {
                setLink('/');
            } else {
                (indexStage === -1) ? setLink('/') : setLink('');
            }

        }
        verify();
        // Verificar si puede entrar a esta id op y etapa con token respectivo
    }, [])

    return (
        <>
            {(link === '/') ? <Redirect to={link} /> : null}
            {components[name]}
        </>
    );
}
