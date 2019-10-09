import { makeStyles } from '@material-ui/core/styles';

const UserStyle = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(4)
    },
    load: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    image: {
        maxWidth: '100%',
        maxHeight: '300px',
    },
    item: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(1)
    },
    rightIcon: {
        marginLeft: theme.spacing(1),
    },
    title: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left'
    }

}));

export default UserStyle;
