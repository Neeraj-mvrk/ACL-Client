import React, { useState, useEffect } from 'react'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import '../css/style.css'
import axios from '../api/axios';
import {Navigate} from 'react-router-dom';
const PRODUCT_URL= '/products';

function AddProduct() {

       // States for Add Product
       const [product_name, setName] = useState('');
       const [manufacturer, setMan] = useState('');
       const [model, setModel] = useState('');
       const [year, setYear] = useState('');
   
       // States for checking the errors
       const [submitted, setSubmitted] = useState(false);
       const [error, setError] = useState(false);


    const handleName = (e) => {
        setName(e.target.value);
        setSubmitted(false);
    };


    const handleMan = (e) => {
        setMan(e.target.value);
        setSubmitted(false);
    };

    const handleModel = (e) => {
        setModel(e.target.value);
        setSubmitted(false);
    };


    const handleYear = (e) => {
        setYear(e.target.value);
        setSubmitted(false);
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

     const addproduct = async(e)=>{
        e.preventDefault();
        if (product_name === '' || manufacturer === ''|| model === '' || year === '') {
            setError(true);
        } else {
            try {
                const response = await axios.post(
                    PRODUCT_URL,
                    JSON.stringify({ product_name, manufacturer, model, year }),
                    {
                        headers: { 'Content-Type': 'application/json',
                                   'Authorization':`Bearer ${localStorage.getItem('token')}` }
                    }
                );
                 if(response){
                    setSubmitted(true);
                 }

            } catch (error) {
                console.log(error);
            }
        }

        } 
  return (
    <>
    <div className="AddProduct">
    <div>
    <h1 style={{textAlign: 'center'}}>Add Product</h1>
    </div>
    <Form onSubmit={addproduct}>
      <Form.Group size="lg" controlId="product_name">
        <Form.Label>Product Name</Form.Label>
        <Form.Control
          autoFocus
          type="text"
          value={product_name}
          onChange={handleName}
        />
      </Form.Group>
      <Form.Group size="lg" controlId="manufacturer">
        <Form.Label>Manufacturer</Form.Label>
        <Form.Control
          type="text"
          value={manufacturer}
          onChange={handleMan}
        />
      </Form.Group>

      <Form.Group size="lg" controlId="model">
        <Form.Label>Model</Form.Label>
        <Form.Control
          type="text"
          value={model}
          onChange={handleModel}
        />
      </Form.Group>

      <Form.Group size="lg" controlId="year">
        <Form.Label>Year</Form.Label>
        <Form.Control
          type="text"
          value={year}
          onChange={handleYear}
        />
      </Form.Group>

      <Button block="true" size="lg" type="submit" >
        Add
      </Button>
    </Form>

    {submitted && (
      <Navigate to="/dashboard" replace={true} />
    )}
    {/* Calling to the methods */}
    <div className="messages">
            {errorMessage()}
        </div>  
  </div>
    </>
    
  )
}

export default AddProduct