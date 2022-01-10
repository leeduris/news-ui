import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Alert from '@material-ui/lab/Alert';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Cookies from 'js-cookie';

import { submitLogIn } from '../stores/authApi';
import hookFormStyles from '../../../styles/hookFormStyle';
import custContext from '../../../contexts/custContext';

const logInSchema = yup.object().shape({
  email: yup.string().required().email(),

  password: yup.string().min(8).max(30).matches(new RegExp('^[a-zA-Z0-9]{8,30}$'), '').required(),
});

export const LogIn = () => {
  const { dispatch } = useContext(custContext);
  const eye = <FontAwesomeIcon icon={faEye} />;
  const classes = hookFormStyles();
  const history = useHistory();
  const { register, handleSubmit, errors, formState } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(logInSchema),
  });

  const [errorLoginFail, setErrorLoginFail] = React.useState(false);
  const [passwordShown, setPasswordShown] = React.useState(false);

  const onSubmit = React.useCallback(async (data) => {
    try {
      setErrorLoginFail(false);
      const result = await submitLogIn(data);

      if (result.data.success === true) {
        const { accessToken, refreshToken } = result.data.data;
        Cookies.set('x_auth_access', accessToken);
        Cookies.set('x_auth_refresh', refreshToken);

        dispatch({ type: 'SET_USER', user: result.data.data.user });
        history.push('/main');
      }
    } catch (err) {
      setErrorLoginFail(true);
    }
  });

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5"></Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
          {errorLoginFail && (
            <Box>
              <Alert severity="error">Email or password is incorrect</Alert>
            </Box>
          )}
          <TextField
            error={errors.email}
            helperText={errors.email && errors.email.message}
            margin="normal"
            inputRef={register}
            fullWidth
            name="email"
            label="Email Address"
            defaultValue="guest@email.com"
            id="email"
          />
          <div className={classes.passWrapper}>
            <TextField
              error={errors.password}
              helperText={errors.password && errors.password.message}
              margin="normal"
              inputRef={register}
              fullWidth
              name="password"
              label="Password"
              defaultValue="guest1234"
              type={passwordShown ? 'text' : 'password'}
              id="password"
            />
            <i className={classes.eye} onClick={togglePasswordVisiblity}>
              {eye}
            </i>
          </div>
          <FormControlLabel
            control={
              <Checkbox
                inputRef={register}
                name="remember"
                color={passwordShown ? 'primary' : 'secondary'}
                defaultValue={false}
              />
            }
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
            disabled={!formState.isValid}
          >
            Sign In
          </Button>
          <Grid container>
            {/* <Grid item xs>
                    <Link href="#" variant="body2">
                        Forgot password?
                    </Link>
                    </Grid> */}
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};
