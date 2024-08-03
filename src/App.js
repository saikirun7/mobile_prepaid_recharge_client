import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/login/customer/Login';
import Register from './components/register/Register';
import Navbar from './components/navbar/Navbar';
import PrivateRoute from './RouteGuard/PrivateRoute';
import Dashboard from './components/dashboard/customer/Dashboard';
import AdminLogin from './components/login/admin/AdminLogin';
import ContactToAdminstrator from './components/login/admin/contact_to_admin/ContactToAdminstrator';
import Payment from './components/payment/Payment';
import AdminDashboard from './components/dashboard/admin/AdminDashboard';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route index path='login' element={<Login />}/>
        <Route path='adminlogin' element={<AdminLogin />} />
        <Route path='register' element={<Register />}/>
        <Route path='contacttoadministrator' element={<ContactToAdminstrator />}/>
        <Route path='dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>}/>
        <Route path='admindashboard' element={<PrivateRoute><AdminDashboard /></PrivateRoute>}/>
        <Route path='payment' element={<PrivateRoute><Payment /></PrivateRoute>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
