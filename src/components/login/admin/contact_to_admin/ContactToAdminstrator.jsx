import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function ContactToAdminstrator() {

  const navigate = useNavigate();

  const adminlogin = () => {
    navigate('/adminlogin');
  }
  return (
    <div>
      <h1>Contact To Adminstrator<strong><h1>Hello@123</h1></strong></h1>
      <Button onClick={adminlogin}>Click to Admin Login</Button>
    </div>
  )
}

export default ContactToAdminstrator