// import Image from 'next/image';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '../components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { TableCell, TableRow } from '../components/ui/table';
import { useState } from 'react';
// import FetchProducts from './Reuse';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export function Product( {product} ) {
  console.log(product._id)
  const navigate = useNavigate()
  const [products, setProducts] = useState([]);

  // const fetchProducts = async () => {
  //   const response = await fetch('/products', { method: 'GET' }); // Endpoint to fetch all products
  //   if (!response.ok) {
  //     throw new Error(`HTTP error! Status: ${response.status}`);
  //   }
  //   const data = await response.json();
  //   setProducts(data); // Update the products state with the latest list
  // };

  const deleteProduct = async() => {
    
        
      console.log(product._id)
     
      const response = await fetch('/products', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({id: product._id,}) // Send product._id as part of the JSON body
      
      });

      console.log("Status Code:", response.status);
      console.log("Response OK?", response.ok);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Response JSON:", data);
     
       // Reload the page after successful deletion
         window.location.reload();
      // await fetchProducts()
      // {products.map((product) => (
      //               <Product key={product._id} product={product} />
      //             ))}
  }

  
  const gotoupdateProductPage = () => {
     
    const destination=`/update-product`
    navigate(destination, {state:product})
}

  return (
    // <>
    //   {products.map((product) => (
    <TableRow key={product._id}>
      <TableCell className="hidden sm:table-cell">
        <img
          alt="Product"
          className="aspect-square rounded-md object-cover"
          height="64"
          src={product.image}
          width="64"
        />
      </TableCell>
      <TableCell className="font-medium">{product.productname}</TableCell>
      <TableCell>
        <Badge variant="outline" className="capitalize">
          {product.quantity>0?"Active":"disable"}
        </Badge>
      </TableCell>
      <TableCell className="hidden md:table-cell">{`Rs. ${product.price}`}</TableCell>
      <TableCell className="hidden md:table-cell">{product.quantity}</TableCell>
      <TableCell className="hidden md:table-cell">
        {/* {product.availableAt.toLocaleDateString("en-US")} */}
        {product.updatedAt?product.updatedAt:product.createdAt}
      </TableCell>
      <TableCell>
        <DropdownMenu>    
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
                {/* <form onSubmit={gotoupdateProductPage}> */}
                  {/* <button type='submit'>Update</button> */}
                  <button onClick={gotoupdateProductPage}>Update</button>
                {/* </form> */}
            </DropdownMenuItem>
            <DropdownMenuItem>
              {/* <form onSubmit={deleteProduct}> */}
                {/* <button type='submit'>Delete</button> */}
                <button onClick={deleteProduct}>Delete</button>
              {/* </form> */}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
    //  ))}
    //  </>
  );
}
