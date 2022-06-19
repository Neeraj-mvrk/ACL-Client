import React, { useState, useEffect } from 'react';
import Card from "react-bootstrap/Card";

function Product({products}) {
    console.log(products,"::::::")
    const displayproducts=(products)=>{
        if(products.length){
           return(
            products.map((product)=>{
            <div>
                <Card>
                <Card.Body>
                    {product.id}
                    {product.product_name}
                    {product.model}
                    {product.manufacturer}
                    {product.year}
                    </Card.Body>
                </Card>
            </div>
        })) 
}else{
    return  (<h3>No product yet!</h3>)
}
    }
  return (
    <>
    <div style={{textAlign: 'center'}}>Product List</div>
    {displayproducts(products)}
    </> 
  )
}

export default Product