import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useForm, Controller } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

import { submitCreateAccount, checkEmailExist } from '../stores/authApi';
import hookFormStyles from '../../../styles/hookFormStyle';

const createAccountSchema = yup.object().shape({
  firstName: yup.string().required().max(30),

  lastName: yup.string().required().max(30),

  email: yup.string().required().email(),

  password: yup.string().min(8).max(30).matches(new RegExp('^[a-zA-Z0-9]{8,30}$')).required(),

  passwordConfirm: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),

  role: yup.string().required().oneOf(['customer', 'admin'], 'Role must be either customer or admin'),

  phoneNumber: yup
    .string()
    .matches(new RegExp('^[0-9]+$'), { message: 'Only numbers are allowed', excludeEmptyString: true }),
});

export const SignUp = () => {
  const eye = <FontAwesomeIcon icon={faEye} />;
  const classes = hookFormStyles();
  const { register, handleSubmit, errors, unregister, formState, control } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(createAccountSchema),
  });
  const history = useHistory();

  const [errorEmail, setErrorEmail] = useState('');
  const [passwordShown, setPasswordShown] = useState(false);
  const [role, setRole] = useState('');

  const onBlur = async (event) => {
    const { name, value } = event.target;
    if (name === 'email' && value) {
      setErrorEmail('');
      const result = await checkEmailExist(value);

      if (result.status === 200) {
        setErrorEmail('This email is already in use');
      }
    }
  };

  const onSubmit = async (data) => {
    const result = await submitCreateAccount(data);
    if (result.status === 201) {
      history.push('/login');
    } else {
      alert('Try Again');
    }
  };

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const handleChangeRole = (event) => {
    setRole(event.target.value);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AssignmentIndIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <TextField
            error={errors.firstName}
            helperText={errors.firstName && errors.firstName.message}
            margin="normal"
            inputRef={register}
            fullWidth
            id="firstName"
            label="First Name"
            name="firstName"
            onBlur={onBlur}
          />
          <TextField
            error={errors.lastName}
            helperText={errors.lastName && errors.lastName.message}
            margin="normal"
            inputRef={register}
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastName"
            onBlur={onBlur}
          />
          <TextField
            error={errors.email}
            helperText={errorEmail ? errorEmail : (errors.email && errors.email.message) || ''}
            margin="normal"
            inputRef={register}
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            onBlur={onBlur}
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
              type={passwordShown ? 'text' : 'password'}
              id="password"
              onBlur={onBlur}
            />
            <i className={classes.eye} onClick={togglePasswordVisiblity}>
              {eye}
            </i>
          </div>
          <TextField
            error={errors.passwordConfirm}
            helperText={errors.passwordConfirm && errors.passwordConfirm.message}
            margin="normal"
            inputRef={register}
            fullWidth
            name="passwordConfirm"
            label="Confirm Password"
            type={passwordShown ? 'text' : 'password'}
            id="passwordConfirm"
            onBlur={onBlur}
          />
          <TextField
            error={errors.phoneNumber}
            helperText={errors.phoneNumber && errors.phoneNumber.message}
            margin="normal"
            inputRef={register}
            fullWidth
            id="phoneNumber"
            label="Phone Number"
            name="phoneNumber"
            onBlur={onBlur}
          />
          <FormControl className={classes.formControl} fullWidth>
            <InputLabel id="roleLabel">Role</InputLabel>
            <Controller
              as={
                <Select labelId="roleLabel" value={role} onChange={handleChangeRole} ref={register}>
                  <MenuItem value={'customer'}>Customer</MenuItem>
                  <MenuItem value={'admin'}>Admin</MenuItem>
                </Select>
              }
              id="role"
              name="role"
              control={control}
              defaultValue={role}
            />
            <FormHelperText>Only admins will be able to fetch recent news</FormHelperText>
          </FormControl>
          <FormControlLabel
            control={<Checkbox inputRef={register} name="remember" color="primary" defaultValue={false} />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
            onClick={() => unregister('passwordConfirm')}
            disabled={!formState.isValid}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item xs></Grid>
            <Grid item>
              <Link href="/login" variant="body2">
                {'Already have an account? Sign In'}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};
