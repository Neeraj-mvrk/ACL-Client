import React, { useState, useEffect } from 'react'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from '../api/axios';
const SIGNUP_URL = '/signup';

function Register() {
  // States for registration
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  // Handling the name change
  const handleUserName = (e) => {
      setUsername(e.target.value);
      setSubmitted(false);
  };


  // Handling the password change
  const handlePassword = (e) => {
      setPassword(e.target.value);
      setSubmitted(false);
  };

  const handleRole = (e) => {
    setRole(e.target.value);
    setSubmitted(false);
};

  // Handling the form submission
  const handleSubmit = async(e) => {
      e.preventDefault();
      if (username === '' || password === '' || role === '') {
          setError(true);
      } else {
        try {
          const response = await axios.post(
            SIGNUP_URL,
              JSON.stringify({ username, password, role }),
              {
                  headers: { 'Content-Type': 'application/json' }
              }
          );
      console.log(response);
      setSubmitted(true);
      setError(false);
      } catch (error) {
          
      }
      }
  };

  // Showing success message
  const successMessage = () => {
      return (
          <div
              className="success"
              style={{
                  display: submitted ? '' : 'none',
              }}>
              <h1>User {username} successfully registered!!</h1>
          </div>
      );
  };

  // Showing error message if error is true
  const errorMessage = () => {
      return (
          <div
              className="error"
              style={{
                  display: error ? '' : 'none',
              }}>
              <h1>Please enter all the fields</h1>
          </div>
      );
  };
  

  return (
      <div className="Login">
        <div>
        <h1 style={{textAlign: 'center'}}>User Registration</h1>
        </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="username">
          <Form.Label>Userame</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            value={username}
            onChange={handleUserName}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={handlePassword}
          />
        </Form.Group>
        
        <Form.Group size="lg" controlId="role">
        <Form.Label>User Role</Form.Label>
        <Form.Select aria-label="Default select example"
        value={role}
        onChange={handleRole}>
        <option value="">Select</option>
        <option value="1">ADMIN</option>
        <option value="2">SELLER</option>
        <option value="3">SUPPORTER</option>
        <option value="4">CUSTOMER</option>
        </Form.Select>
        </Form.Group>
        <Button block="true" size="lg" type="submit" >
          Sign Up
        </Button>
      </Form>

      {/* Calling to the methods */}
      <div className="messages">
              {errorMessage()}
              {successMessage()}
          </div>
    </div>
  );
}

export default Register