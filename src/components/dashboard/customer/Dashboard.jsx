import React from 'react';
import { Box, Grid, Paper, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getMobile, getName } from '../../../services/AuthApi'
import './Dashboard.css'

const plans = [
  { category: 'Popular Plans', price: '₹3599', validity: '365 Days', data: '2.5 GB/Day', image: 'https://jep-asset.akamaized.net/jiocom/static/images/5GTag.svg' },
  { category: 'Popular Plans', price: '₹2999', validity: '240 Days', data: '2 GB/Day', image: 'https://jep-asset.akamaized.net/jiocom/static/images/5GTag.svg' },
  { category: 'Popular Plans', price: '₹1999', validity: '180 Days', data: '1.5 GB/Day', image: 'https://jep-asset.akamaized.net/jiocom/static/images/5GTag.svg' },
  { category: 'Validity Plans', price: '₹1499', validity: '90 Days', data: '2 GB/Day', image: 'https://jep-asset.akamaized.net/jiocom/static/images/5GTag.svg' },
  { category: 'Validity Plans', price: '₹999', validity: '60 Days', data: '1.5 GB/Day', image: 'https://jep-asset.akamaized.net/jiocom/static/images/5GTag.svg' },
  { category: 'Data Plans', price: '₹599', validity: '30 Days', data: '1 GB/Day', image: 'https://jep-asset.akamaized.net/jiocom/static/images/5GTag.svg' },
  { category: 'Unlimited Data Plans', price: '₹399', validity: '15 Days', data: 'Unlimited', image: 'https://jep-asset.akamaized.net/jiocom/static/images/5GTag.svg' },
  { category: 'Unlimited Data Plans', price: '₹299', validity: '10 Days', data: 'Unlimited', image: 'https://jep-asset.akamaized.net/jiocom/static/images/5GTag.svg' },
  { category: 'Unlimited Data Plans', price: '₹199', validity: '7 Days', data: 'Unlimited', image: 'https://jep-asset.akamaized.net/jiocom/static/images/5GTag.svg' }
];

const Dashboard = () => {
    const navigate = useNavigate();
    const name = getName();
    const mobile = getMobile();
  
    const handleRecharge = (plan) => {
      navigate('/payment', { state: { plan } });
    };
  
    const renderPlans = (category) => (
      <Grid container spacing={2} className="plan-grid">
        {plans.filter(plan => plan.category === category).map((plan, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper elevation={3} className="plan-card">
              <Box className="plan-price">
                <Typography variant="h2">{plan.price}</Typography>
                <img src={plan.image} alt="plan badge" className="plan-badge" />
              </Box>
              <Typography variant="body2">Validity: {plan.validity}</Typography>
              <Typography variant="body2">Data: {plan.data}</Typography>
              <Button variant="contained" color="primary" sx={{ mt: 1 }} onClick={() => handleRecharge(plan)}>
                Recharge
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    );
  
    return (
      <Box className="centered-box">
        <Container className="container">
          <Typography variant="h4" gutterBottom className="heading">
            Customer Dashboard
          </Typography>
          <Typography variant="h4" gutterBottom className="heading">
            Welcome, {name}
          </Typography>
          <Typography variant="h5" gutterBottom className="subheading">
            Prepaid Mobile Number: {mobile}
          </Typography>
          <Typography variant="h4" gutterBottom className="plan-category">
            Popular Plans
          </Typography>
          {renderPlans('Popular Plans')}
          <Typography variant="h4" gutterBottom className="plan-category">
            Validity Plans
          </Typography>
          {renderPlans('Validity Plans')}
          <Typography variant="h4" gutterBottom className="plan-category">
            Data Plans
          </Typography>
          {renderPlans('Data Plans')}
          <Typography variant="h4" gutterBottom className="plan-category">
            Unlimited Data Plans
          </Typography>
          {renderPlans('Unlimited Data Plans')}
        </Container>
      </Box>
    );
  };
  
  export default Dashboard;