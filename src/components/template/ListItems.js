import React from 'react';
import {
    ListItem, ListItemIcon, ListItemText,
    Tooltip
} from '@material-ui/core';

import {
    AccountCircle as AccountCircleIcon, BarChart as BarChartIcon
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
    const { open } = props;
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
            {/* <AddLabel open={open} title="Rendimiento">
                <ListItem button>
                    <ListItemIcon>
                        <BarChartIcon />
                    </ListItemIcon>
                    <ListItemText primary="Rendimiento" />
                </ListItem>
            </AddLabel> */}
        </div>
    );
}

export {
    MainListItems
}
