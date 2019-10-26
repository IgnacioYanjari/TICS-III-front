import React from 'react';
import loginStyle from 'styles/Login.js';
import {
    Paper, Typography, ListItem, List, Grid
} from '@material-ui/core';
import { AddImage, EditImage } from './index';

export default function ImageList(props) {
    const classes = loginStyle();
    const { data, type } = props;

    const renderImage = (type, val) => {
        if (type === "normal") {
            return <AddImage index={val.key} image={val.image} changeImage={changeImage} />
        } else {
            return <EditImage index={val.key} image={val.image} changeText={changeText} />
        }
    }

    const renderGrid = (val, auxType) => {
        if (val.title !== undefined) {
            return (
                <Grid container spacing={2} >
                    <Grid item xs={4}>
                        <Typography align="center" >{val.title}</Typography>
                    </Grid>
                    <Grid item xs={8}>
                        {renderImage(auxType, val)}
                    </Grid>
                </Grid>
            );
        }
        return renderImage(auxType, val);
    }

    const renderList = () => {
        let auxType = (type === undefined) ? "normal" : "edit";
        return data.list.map((val, pos) =>
            <ListItem key={val.key} divider={(pos !== data.list.length - 1)}>
                {renderGrid(val, auxType)}
            </ListItem>
        );
    }

    const renderTitle = () => {
        if (data.list[0].title !== undefined) {
            return (<Grid container spacing={2} >
                <Grid item xs={4}>
                    <Typography variant="h6" align="center" >Ingrediente</Typography>
                </Grid>
                <Grid item xs={8}>
                    <Typography variant="h6" align="center" > Lote / Fecha </Typography>
                </Grid>
            </Grid>);
        }
        return (
            <Grid container spacing={2} >
                <Grid item xs={4}>
                    <Typography variant="h6" align="center" >Descripción</Typography>
                </Grid>
                <Grid item xs={8}>
                    <Typography variant="h6" align="center" > Imagen</Typography>
                </Grid>
            </Grid>
        );
    }

    const changeImage = (pos, image) => props.changeImage(pos, image);
    const changeText = (pos, image, text) => props.changeText(pos, image, text);


    return (
        <>
            <Typography className={classes.subtitle} align="center" variant="h5"> {data.title} </Typography>
            <Paper className={classes.paper} >
                <List component="nav" aria-label="main mailbox folders" style={{ width: '100%' }}>
                    <ListItem divider={true}>
                        {renderTitle()}
                    </ListItem>
                    {renderList()}
                </List>
            </Paper>
        </>
    );
}
