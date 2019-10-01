import React from 'react';
import { Link, Typography } from '@material-ui/core';

function Copyright() {
    return (
        <Typography mt={8} mb={8} variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="#">
                TrazApp
        </Link>{' '}
            {new Date().getFullYear()}
        </Typography>
    );
}

export default Copyright;
