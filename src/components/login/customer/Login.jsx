import React, { useCallback } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { Link, useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import CurrencyRupeeOutlinedIcon from '@mui/icons-material/CurrencyRupeeOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { login, setEmail, setMobile, setName, setToken } from '../../../services/AuthApi';
import './Login.css';

const defaultTheme = createTheme();

function Login() {
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    async (values) => {
      try {
        console.log(values);

        const response = await login(values);

        console.log(response);
        setName(response.name);
        setEmail(response.email);
        setMobile(response.mobile);
        setToken(response.token);
        navigate('/dashboard');

      } catch (error) {
        console.error('Login error:', error.message);
      }
    },
    [navigate]
  );

  const validationSchema = Yup.object({
    mobile: Yup.string()
      .required('Mobile number is required')
      .matches(/^\d{10}$/, 'Mobile number must be exactly 10 digits'),
  });

  const formik = useFormik({
    initialValues: {
      mobile: "",
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box className="container">
          <Avatar className="avatar">
            <CurrencyRupeeOutlinedIcon />
          </Avatar>
          <Typography variant="h4" gutterBottom className="heading">
            Prepaid Recharge
          </Typography>
          <Typography component="h1" variant="h5" className="subheading">
            Enter your details to find the best prepaid plans.
          </Typography>
          <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              className="textField"
              margin="normal"
              required
              fullWidth
              id="mobile"
              label="Mobile Number"
              name="mobile"
              autoComplete="mobile"
              autoFocus
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value)) {
                  formik.setFieldValue("mobile", value);
                }
              }}
              value={formik.values.mobile}
              error={formik.touched.mobile && Boolean(formik.errors.mobile)}
              helperText={formik.touched.mobile && formik.errors.mobile}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className="submitButton"
            >
              Submit
            </Button>
            <Grid container>
              <Grid item>
                <Link to="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Login;
