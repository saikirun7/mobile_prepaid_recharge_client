import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { removeEmail, removeMobile, removeName, removeToken } from '../../services/AuthApi';
import logo from '../../assets/Mahindra_Logo.jpg'

function Navbar() {
    const location = useLocation();
    const navigate = useNavigate();

    // Determine the current route
    const currentPath = location.pathname;

    // Define the navigation items
    const navItems = [
        { label: 'Login', path: '/login' },
        { label: 'Register', path: '/register' },
        { label: 'Admin', path: '/adminlogin' }
    ];

    const logoutButton = (
        <Button
            sx={{ color: '#fff' }}
            onClick={() => {
                removeName();
                removeEmail();
                removeMobile();
                removeToken();
                navigate('/login');
            }}
        >
            Logout
        </Button>
    );

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar component="nav" position='static' sx={{ backgroundColor: '#333' }}>
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                        <img src={logo} alt="Logo" style={{ width: '50px', height: '50px' }} />
                    </Typography>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        {currentPath === '/login' || currentPath === '/register' || currentPath === '/adminlogin' || currentPath === '/contacttoadministrator' ? (
                            navItems.map((item) => (
                                <Button
                                    key={item.label}
                                    sx={{ color: '#fff' }}
                                    component={Link}
                                    to={item.path}
                                >
                                    {item.label}
                                </Button>
                            ))
                        ) : (
                            logoutButton
                        )}
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Navbar;
