import React from "react";
import {
    Box, Typography, CircularProgress, Fade
} from '@material-ui/core';
import LoginStyle from 'styles/Login.js';

const Loading = (props) => {

    const classes = LoginStyle();
    return (
        <div>
            <Box className={classes.load} mt={3}>
                {props.state === 'success' ? (
                    <Typography variant="body2"> {props.message} </Typography>
                ) : (
                        <div>
                            <Fade
                                in={props.state === 'sending'}
                                style={{
                                    transitionDelay: props.state === 'progress' ? '800ms' : '0ms',
                                }}
                                unmountOnExit
                            >
                                <CircularProgress color="primary" />
                            </Fade>
                        </div>
                    )}
            </Box>
        </div>
    );
}

export default Loading;
