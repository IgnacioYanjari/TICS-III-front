import React from 'react';
import {
    ListItem, ListItemIcon, ListItemText,
    Tooltip
} from '@material-ui/core';

import {
    AccountCircle as AccountCircleIcon, Home as HomeIcon,
    Ballot as BallotIcon
} from '@material-ui/icons';

import { Link } from "react-router-dom";

const AddLabel = (props) => {
    const { to } = props;
    return (
        <>
            {(!props.open) ? (
                <Tooltip title={props.title} placement="right">
                    <Link to={to} style={{ color: '#000000', textDecoration: 'none' }}>
                        {props.children}
                    </Link>
                </Tooltip>
            ) : <>
                    <Link to={to} style={{ color: '#000000', textDecoration: 'none' }}>
                        {props.children}
                    </Link>
                </>
            }
        </>
    );
}

const MainListItems = (props) => {
    const { open, role } = props;

    const listAdmin = (role !== 'ADM') ? null : (
        <>
            <AddLabel open={open} title="Gestionar usuarios" to="usuarios">
                <ListItem button>
                    <ListItemIcon>
                        <BallotIcon />
                    </ListItemIcon>
                    <ListItemText primary="Gestionar usuarios" />
                </ListItem>
            </AddLabel>
        </>
    );

    const listQA = (role !== 'QAS') ? null : (
        <>
        </>
    );

    return (
        <div>
            <AddLabel open={open} title="Mi Cuenta" to="cuenta">
                <ListItem button>
                    <ListItemIcon>
                        <AccountCircleIcon />
                    </ListItemIcon>
                    <ListItemText primary="Mi cuenta" />
                </ListItem>
            </AddLabel>

            <AddLabel open={open} title="Página principal" to="/">
                <ListItem button>
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Página principal" />
                </ListItem>
            </AddLabel>
            {listAdmin}
            {listQA}
        </div>
    );
}

export {
    MainListItems
}
