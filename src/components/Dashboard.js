import Card from "react-bootstrap/Card";
import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import Button from "react-bootstrap/Button";
import {Navigate} from 'react-router-dom';
const PRODUCT_URL= '/products';





function Dashboard() {
const [products, setProducts] =  useState([]); 
const [addClick, setAddClick] = useState(false);
useEffect(() => {
    axios.get( PRODUCT_URL,
        {
            headers: { 'Content-Type': 'application/json',
                       'Authorization':`Bearer ${localStorage.getItem('token')}` },
        })
    .then(res=>{
        console.log(res);
        let products = res.data.data;
        setProducts(products); 

    })
    .catch(err=>{
        console.log(err);
    })
},[]);

const addButtonClicked = ()=>{
    setAddClick(true);
}

const deleteProduct = async(e)=>{
    try {
        e.preventDefault();
        console.log(e);
        const response = await axios.delete(
            PRODUCT_URL,
            {
                headers: { 'Content-Type': 'application/json',
                           'Authorization':`Bearer ${localStorage.getItem('token')}` },
                data:{id: e.target.value }
            }
        );
        console.log(response,":::RESPONSE");
    } catch (error) {
        console.log(error);
    }
}
  return (
    <>
     <h1 style={{textAlign: 'center'}}>Dashboard</h1>
     <ul>
        {
            products.map(product=> <div>
                <Card style={{ width: '18rem',align:'center' }}>
                <Card.Body>
                    <Card.Title>Product ID - {product.id}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Product Name - {product.product_name}</Card.Subtitle>
                    <Card.Text>Product Model - {product.model}</Card.Text>
                    <Card.Text>Product Launch Year - {product.year}</Card.Text>
                    <Card.Text>Product Manufacturer - {product.manufacturer}</Card.Text> 
                    <Button block="true" size="lg"  id="del" value={product.id} onClick={deleteProduct}>
                    Delete
                    </Button>
                </Card.Body>
                </Card>
            </div>)
        }
<Button block="true" size="lg"  id="add" onClick={addButtonClicked}>
            Add product
          </Button>
     </ul>
     {addClick && (
          <Navigate to="/add" replace={true} />
        )}
</>
  )
}

export default Dashboard