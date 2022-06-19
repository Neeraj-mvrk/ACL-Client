import React, { useState, useEffect } from 'react'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {Navigate} from 'react-router-dom';
import '../css/style.css'
import axios from '../api/axios';
const LOGIN_URL = '/login';


function Login() {
    // States for Login
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

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

    // Handling the form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (username === '' || password === '') {
            setError(true);
        } else {
            try {
                const response = await axios.post(
                    LOGIN_URL,
                    JSON.stringify({ username, password }),
                    {
                        headers: { 'Content-Type': 'application/json' }
                    }
                );
            console.log(response);
            const accessToken = response?.data?.data?.token;
            localStorage.setItem('token', accessToken)
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
                <h1>User {username} successfully Logged In!!</h1>
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
        <h1 style={{textAlign: 'center'}}>User Login</h1>
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
          <Button block="true" size="lg" type="submit" >
            Login
          </Button>
        </Form>

        {submitted && (
          <Navigate to="/dashboard" replace={true} />
        )}
        {/* Calling to the methods */}
        <div className="messages">
                {errorMessage()}
                {successMessage()}
            </div>  
      </div>
    );
}

export default Login