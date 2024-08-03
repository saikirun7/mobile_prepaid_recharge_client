import React, { useEffect, useState } from 'react';
import { Box, Typography, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { getMobile, getName, getToken } from '../../../services/AdminAuthApi';
import axios from 'axios';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const name = getName();
  const mobile = getMobile();
  const token = getToken();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:7083/mobileplan/getAllPlans', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data.plans);
      } catch (err) {
        setError('Failed to fetch data.');
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, [token]);

  return (
    <Box className="centered-box">
      <Container className="container">
        <Typography variant="h4" gutterBottom className="heading">
          Admin Dashboard
        </Typography>
        <Typography variant="h4" gutterBottom className="heading">
          Welcome, {name}
        </Typography>
        <Typography variant="h5" gutterBottom className="subheading">
          Prepaid Mobile Number: {mobile}
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        {data && (
          <TableContainer component={Paper} className="table-container">
            <Table aria-label="plans table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Mobile</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Validity</TableCell>
                  <TableCell>Data</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((plan) => (
                  <TableRow key={plan.id}>
                    <TableCell>{plan.id}</TableCell>
                    <TableCell>{plan.email}</TableCell>
                    <TableCell>{plan.mobile}</TableCell>
                    <TableCell>{plan.price}</TableCell>
                    <TableCell>{plan.validity}</TableCell>
                    <TableCell>{plan.data}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Container>
    </Box>
  );
};

export default AdminDashboard;
