import { makeStyles } from '@material-ui/core/styles';

const loginStyle = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.common.grey,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    color: 'white'
  },
  load: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }

}));

export default loginStyle;
