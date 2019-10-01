import React from 'react';
import clsx from 'clsx';
import {
    CssBaseline, Drawer, AppBar, Toolbar,
    List, Typography, Divider, IconButton,
    Container, Box, Tooltip
} from '@material-ui/core';
import { Menu as MenuIcon, ExitToApp as ExitToAppIcon } from '@material-ui/icons';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { Redirect, Link } from "react-router-dom";

import { MainListItems } from './ListItems';
import { Copyright } from 'components';
import TemplateStyle from 'styles/Template';

const ToHome = (props) => {
    let link = "";
    (props.userType === 'admin') ? link = "admin" : link = "calidad"
    return (
        <Link to={link} style={{ color: "#FFF", textDecoration: 'none' }}>
            TrazApp
        </Link>
    );
}


export default function Template(props) {
    const classes = TemplateStyle();
    const [open, setOpen] = React.useState(false);
    const [logout, setLogout] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleLogout = () => {
        setLogout(true);
    }

    return (
        <>
            {(logout) ? <Redirect to="/" /> : null}
            <div className={classes.root}>
                <CssBaseline />
                <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
                    <Toolbar className={classes.toolbar}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                            <ToHome userType={props.userType} />
                        </Typography>
                        <Typography component="h1" variant="h6" color="inherit" >
                            {props.userName}
                            <Tooltip title="Salir">
                                <IconButton color="inherit" style={{ marginLeft: 20 }} onClick={handleLogout} >
                                    <ExitToAppIcon />
                                </IconButton>
                            </Tooltip>
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    classes={{
                        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                    }}
                    open={open}
                >
                    <div className={classes.toolbarIcon}>
                        <Typography variant="h6" color="inherit" style={{ marginRight: 10 }} >
                            Menu
                        </Typography>

                        <IconButton onClick={handleDrawerClose}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        <MainListItems open={open} />
                    </List>
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.appBarSpacer} />
                    <Container maxWidth="lg" className={classes.container}>
                        {props.children}
                    </Container>
                    <Box mb={3}>
                        <Copyright />
                    </Box>

                </main>
            </div>
        </>
    );
}
