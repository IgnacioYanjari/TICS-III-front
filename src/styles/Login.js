import { makeStyles } from '@material-ui/core/styles';

const loginStyle = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(6),
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
  },
  add: {
    margin: theme.spacing(1),
  },
  title: {
    margin: theme.spacing(2),
  },
  subtitle: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(1),
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },

}));

export default loginStyle;
