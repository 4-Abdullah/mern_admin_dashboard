import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { File, PlusCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { ProductsTable } from './products-table';
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

 const ProductsPage =()=> {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams();
  
  const offset = searchParams.get("offset") ?? 0;
console.log(offset)

 
  const [products, setProducts] = useState([]);
  const [Allproducts, setAllProducts] = useState([]);
 
  const limit = 5; // Products per page
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
  
  useEffect(() => {
  (async () => {
      
        const response = await fetch(`/products?offset=${offset}&limit=${limit}`);
        
        console.log("Status Code:", response.status);
        console.log("Response OK?", response.ok);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Response JSON:", data);

        setProducts(data); // Store data in state
      
  })();
  },[offset]);
  

    const gotoAddProductPage = () => {
     
        const destination=`/add-product`
        navigate(destination)
    }


  return (
    <Tabs defaultValue="all">
      <div className="flex items-center">
        {/* <TabsList> */}
          {/* <TabsTrigger value="all">All</TabsTrigger> */}
          {/* <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="draft">Draft</TabsTrigger>
          <TabsTrigger value="archived" className="hidden sm:flex">
            Archived
          </TabsTrigger> */}
        {/* </TabsList> */}
        <div className="ml-auto flex items-center gap-2">
          {/* <Button size="sm" variant="outline" className="h-8 gap-1">
            <File className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Export
            </span>
          </Button> */}
          <Button onClick={gotoAddProductPage} size="sm" className="h-8 gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add Product
            </span>
          </Button>
        </div>
      </div>
      <TabsContent value="all">
        <ProductsTable
          products={products}
          offset={offset}
          limit={limit}
          totalProducts={products.length}
          allProducts={Allproducts.length}
        />
      </TabsContent>
    </Tabs>
  );
}
export default ProductsPage