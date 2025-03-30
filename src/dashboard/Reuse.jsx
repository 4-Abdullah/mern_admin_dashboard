import { useState, useEffect } from "react";
// import React from "react";
const FetchProducts = () => {
  const [products, setAllProducts] = useState([]);

useEffect(()=>{
    (async () => {
      
        const response = await fetch(`/products`);
        
        console.log("Status Code:", response.status);
        console.log("Response OK?", response.ok);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Response JSON:", data);

        setAllProducts(data); // Store data in state
     
  })();
  },[])
         console.log(products)   
 }          

export default FetchProducts