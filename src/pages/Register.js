import React from 'react';
import { useForm } from 'react-hook-form';
import { string, object, ref } from 'yup';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core';

import { backendUrl } from '../config';
import { setAuthUser } from '../actions/authActions';

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
    padding: theme.spacing(6),
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(4),

      maxHeight: '600px'
    }
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
  username: string().required(),
  email: string()
    .email()
    .required(),
  password: string()
    .min(8)
    .required(),
  confirmPassword: string()
    .required()
    .oneOf([ref('password')], `Passwords doesn't match`)
});

const Register = ({ history }) => {
  const classes = useStyles();
  const { register, handleSubmit, errors, formState } = useForm({
    validationSchema: schema,
    mode: 'onBlur'
  });
  const dispatch = useDispatch();
  const onSubmit = async data => {
    const { username, email, password } = data;
    const res = await axios.post(`${backendUrl}user/register`, {
      username,
      email,
      password
    });

    if (res.status === 200) {
      dispatch(setAuthUser(res.data.user));

      localStorage.setItem('token', res.data.token);
      history.replace('/');
    }
  };

  return (
    <div className={classes.bg}>
      <Container component='main' maxWidth='xs'>
        <Paper className={classes.paper} elevation={2}>
          <Avatar className={classes.avatar}>
            <LockOpenIcon />
          </Avatar>
          <Typography component='h2' variant='h6'>
            Welcome New Member
          </Typography>
          <form
            className={classes.form}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  variant='standard'
                  fullWidth
                  id='username'
                  label='Username'
                  name='username'
                  error={!!errors.username}
                  helperText={errors.username?.message}
                  inputRef={register}
                />
              </Grid>
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
              <Grid item xs={12}>
                <TextField
                  variant='standard'
                  fullWidth
                  name='confirmPassword'
                  label='Confirm Password'
                  type='password'
                  id='confirmPassword'
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
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
              Sign Up
            </Button>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default Register;
