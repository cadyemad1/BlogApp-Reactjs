import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { string, object } from 'yup';
import axios from 'axios';
import axiosInterceptor from '../components/Interceptor/interceptor';

import { setAuthUser } from '../actions/authActions';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  bg: {
    backgroundColor: '#021834',
    position: 'fixed',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(6)
  },
  avatar: {
    margin: theme.spacing(2),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',

    '&:hover': {
      textDecoration: 'underline'
    }
  }
}));
const schema = object().shape({
  email: string()
    .email()
    .required(),
  password: string()
    .min(8)
    .required()
});

const Login = props => {
  const classes = useStyles();
  const { register, handleSubmit, errors, formState } = useForm({
    validationSchema: schema,
    mode: 'onBlur'
  });

  const dispatch = useDispatch();
  const onSubmit = async data => {
    const { email, password } = data;
    const res = await axios.post('http://localhost:3000/user/login', {
      email,
      password
    });
    if (res.status === 200) {
      dispatch(setAuthUser(res.data.user));

      localStorage.setItem('token', res.data.token);
      props.history.replace('/');
    }
  };
  return (
    <div className={classes.bg}>
      <Container component='main' maxWidth='xs'>
        <Paper className={classes.paper} elevation={2}>
          <Avatar className={classes.avatar}>
            <LockOpenIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Login
          </Typography>
          <form
            className={classes.form}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant='standard'
                  fullWidth
                  id='email'
                  label='Email Address'
                  name='email'
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  inputRef={register}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant='standard'
                  fullWidth
                  name='password'
                  label='Password'
                  type='password'
                  id='password'
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  inputRef={register}
                />
              </Grid>
            </Grid>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='secondary'
              className={classes.submit}
              disabled={formState.isSubmitting}
            >
              Login
            </Button>
            <Grid container justify='flex-end'>
              <Grid item>
                <Link to='/sign-up' className={classes.link}>
                  Not a member? Sign up
                </Link>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default Login;
