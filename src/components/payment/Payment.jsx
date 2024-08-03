import React, { useState } from 'react';
import { Box, Typography, Button, Container, Paper, TextField } from '@mui/material';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { getEmail, getMobile, getToken } from '../../services/AuthApi';
import './Payment.css';

const Payment = () => {
  const location = useLocation();
  const { plan } = location.state || {};
  const email = getEmail();
  const mobile = getMobile();
  const token = getToken();

  const [paymentMethod, setPaymentMethod] = useState('');

  const handleProceed = async () => {
    // Prepare payload
    const payload = {
      email: email,
      mobile: mobile,
      price: plan.price,
      validity: plan.validity,
      data: plan.data,
    };

    // Log the payload and token
    console.log('Payload:', payload);
    console.log('Token:', token);

    try {
      const response = await axios.post('http://localhost:7083/mobileplan/addUserPlan', payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Log the response
      console.log('Response:', response);

      if (response.status === 201) {
        alert('You have subscribed successfully to this plan');
      } else {
        alert('Payment failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during payment:', error);
      alert('An error occurred during payment. Please try again.');
    }
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  return (
    <Container className="container">
      <Typography variant="h4" gutterBottom className="paymentHeader">
        Payment
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6">Choose Payment Method</Typography>
          <Box className="paymentMethods">
            <Button
              className="paymentMethodButton"
              variant="outlined"
              onClick={() => handlePaymentMethodChange('UPI')}
            >
              UPI
            </Button>
            <Button
              className="paymentMethodButton"
              variant="outlined"
              onClick={() => handlePaymentMethodChange('Visa')}
            >
              Visa
            </Button>
            <Button
              className="paymentMethodButton"
              variant="outlined"
              onClick={() => handlePaymentMethodChange('MasterCard')}
            >
              MasterCard
            </Button>
            <Button
              className="paymentMethodButton"
              variant="outlined"
              onClick={() => handlePaymentMethodChange('RuPay')}
            >
              RuPay
            </Button>
          </Box>
          {paymentMethod && (
            <Box className="paymentDetailsBox">
              <Typography variant="h6" gutterBottom>
                Payment Details ({paymentMethod})
              </Typography>
              <TextField
                label="Card Number"
                variant="outlined"
                fullWidth
                sx={{ marginTop: 1 }}
              />
              <TextField
                label="Expiry Date"
                variant="outlined"
                fullWidth
                sx={{ marginTop: 1 }}
              />
              <TextField
                label="CVV"
                variant="outlined"
                fullWidth
                sx={{ marginTop: 1 }}
              />
            </Box>
          )}
        </Box>
        <Paper elevation={3} className="planDetailsPaper">
          <Typography variant="h6" gutterBottom className="planDetailsHeader">
            Plan Details
          </Typography>
          <Typography variant="body1" className="planDetailsText">Price: {plan?.price}</Typography>
          <Typography variant="body1" className="planDetailsText">Validity: {plan?.validity}</Typography>
          <Typography variant="body1">Data: {plan?.data}</Typography>
          <Button
            variant="contained"
            color="primary"
            className="proceedButton"
            onClick={handleProceed}
          >
            Proceed to Payment
          </Button>
        </Paper>
      </Box>
    </Container>
  );
};

export default Payment;
