import {
        Card,
        CardContent,
        CardDescription,
        CardHeader,
        CardTitle,
      } from '../../components/ui/card';
      import { Input } from '../../components/ui/input';
      import { Button } from '../../components/ui/button';
      import { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';


const UpdateProducts = () => {
  const location  = useLocation()
  const productObj = location.state || {};
  const navigate = useNavigate()
  // console.log(productObj._id)
    const [productData, setProductData] = useState({
        productname: productObj.productname,
        category: productObj.category,
        description: productObj.description,
        price: productObj.price,
        quantity:productObj.quantity,
        image:[productObj.image[0]]
    });
    // const [Allproducts, setAllProducts] = useState([]);
    
    // const [isProcessing, setIsProcessing] = useState(false);
    const fileInputRef = useRef(null);
    const id = productObj._id
      const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData({
          ...productData,
          [name]: value,
        });
      };
    
      const handleFileChange = (e) => {
        const file = e.target.files[0];
        
        console.log(file) 

        if (file) {
          setProductData({
            ...productData,
            image: [ { 
              file: file, // Store the actual file object
              preview: URL.createObjectURL(file),  // Show preview of selected file
            },]
          });
        }
        // const savedImageFile = productData.image[0].file;
        console.log(productData.image[0].file)
        // console.log("Image File Object:", savedImageFile);
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        // setIsProcessing(true)
        const fileInput = e.target.elements.file; // Access file input
        const file = fileInput.files[0]; // Get the first selected file
    
        // if (!file) {
        //   console.error("No file selected.");
        //   return;
        // }
        const formData = new FormData();
        
        // console.log(file) 
       
// Append text fields to FormData
for (const key in productData) {
  if (key !== "image") { // Skip image, handle it separately
    formData.append(key, productData[key]);
  }
}
// formData.append("file", file);
// Append image files to FormData

// console.log(productData.image)

        formData.append("image",productData.image[0].file)
        console.log(formData.get("image")); // Logs the appended value for "image"
        
        // console.log(formData.image.file)
        formData.append("id", id);
        
        try {
          const response = await fetch(`https://mern-back-end-production.up.railway.app/products`, {
            method: 'PUT',
            body: (formData),
          });
            
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
        console.log(formData)

          console.log('Product added successfully:', await response.json());
          // Reset form fields
          // setProductData({
          //    productname: "",
          //    category: "",
          //    description: "",
          //    price: "",
          //    quantity: "",
          //    image:[]
          // });

          // if (fileInputRef.current) {
          //   fileInputRef.current.value = ""; // Clear the file input field
          // }

          // const gotoupdateProductPage = () => {
     
            const destination=`/`
            navigate(destination)
        // }

        // setIsProcessing(false)

        } catch (error) {
          console.error('Error adding product:', error);  
        }
      };

    return (
        <Card>
          <CardHeader>
            <CardTitle>Update Product</CardTitle>
            <CardDescription>Fill in the details below to add a new product.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium">ProductName</label>
                <Input
                  name="productname"
                  type="text"
                  value={productData.productname}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">Category</label>
                <Input
                  name="category"
                  type="text"
                  value={productData.category}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">Description</label>
                <Input
                  name="description"
                  type="text"
                  value={productData.description}
                  onChange={handleChange}
                  
                />
              </div>
              <div>
                <label className="text-sm font-medium">Price</label>
                <Input 
                  name="price"
                  type="number"
                  value={productData.price}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div>
                <label className="text-sm font-medium">Image</label>
                <input
                    type="file"
                    name="file"
                    accept="image/*"
                    ref={fileInputRef} 
                    onChange={handleFileChange}
                  />
                  {productData.image.length>0  && (
                    <div>
                      <p>Current Image:</p>
                      <img
                        src={productData.image[0].preview || productData.image[0]}
                        alt="Current product"
                        style={{ width: "200px", height: "auto" }}
                      />
                    </div>
                  )}
              </div>
              <div>
                <label className="text-sm font-medium">Quantity</label>
                <Input 
                  name="quantity"
                  type="number"
                  value={productData.quantity}
                  onChange={handleChange}
                  required
                />
              </div>

              <Button type="submit" className="w-full"  disabled={
                // isProcessing || 
                !(   
         productData.category&&productData.description&&productData.price&&productData.productname&&productData.quantity&&productData.image
        )}>
            Update Product 
              </Button>
            </form>
          </CardContent>
        </Card>
      );
    
}

export default UpdateProducts