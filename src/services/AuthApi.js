import axios from 'axios';

const baseURL = 'http://localhost:7082/auth/user';

const AuthenticationApi = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

const login = async (credentials) => {
    try {
        const response = await AuthenticationApi.post('/login', credentials);
        return response.data;
    } catch (error) {
        console.error("Error during login:", error.message);
        throw error;
    }
};

const register = async (userData) => {
    try {
        const response = await AuthenticationApi.post('/register', userData);
        return response.data;
    } catch (error) {
        console.error("Error during registration:", error.message);
        throw error;
    }
};

export function setName(name) {
    localStorage.setItem('userName', name);
}

export function getName() {
    return localStorage.getItem('userName');
}

export function removeName() {
    localStorage.removeItem('userName');
}

export function setToken(token) {
    localStorage.setItem('jwtToken', token);
}

export function getToken() {
    return localStorage.getItem('jwtToken');
}

export function removeToken() {
    localStorage.removeItem('jwtToken');
}

export function setEmail(email) {
    localStorage.setItem('email', email);
}

export function getEmail() {
    return localStorage.getItem('email');
}

export function removeEmail() {
    localStorage.removeItem('email');
}

export function setMobile(mobile) {
    localStorage.setItem('mobile', mobile);
}

export function getMobile() {
    return localStorage.getItem('mobile');
}

export function removeMobile() {
    localStorage.removeItem('mobile');
}

export function tokenExpired(token) {
    if (token === null) {
        return true;
    }
    const expiry = JSON.parse(atob(token.split('.')[1])).exp;
    return Math.floor(new Date().getTime() / 1000) >= expiry;
}

export { login, register };