import {
        Card,
        CardContent,
        CardDescription,
        CardHeader,
        CardTitle,
      } from '../../components/ui/card';
      import { Input } from '../../components/ui/input';
      import { Button } from '../../components/ui/button';
      import { useState, useRef } from 'react';


const AddNewProducts = () => {
   
    const [productData, setProductData] = useState({
        productname: "",
        category: "",
        description: "",
        price: "",
        quantity: "",
        image:[]
    });
    const [isProcessing, setIsProcessing] = useState(false);
    const fileInputRef = useRef(null);
      const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData({
          ...productData,
          [name]: value,
        });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        setIsProcessing(true)
        const fileInput = e.target.elements.file; // Access file input
        const file = fileInput.files[0]; // Get the first selected file
    
        if (!file) {
          console.error("No file selected.");
          return;
        }
        const formData = new FormData();

        // Append text fields to FormData
        for (const key in productData) {
          if (key !== "image") { // Skip image, handle it separately
            formData.append(key, productData[key]);
          }
        }
        // formData.append("file", file);
        // Append image files to FormData

        // console.log(productData.image)
        productData.image.forEach((file, index) => {
          formData.append(`file${index}`, file); // Name files uniquely
        });

        // console.log(formData)


        // Log each key-value pair in the FormData
// for (const [key, value] of formData.entries()) {
//   console.log(`${key}:`, value); // Logs the key and the value (e.g., file objects)
// }

// // Using forEach to iterate
// formData.forEach((value, key) => {
//   console.log(`${key}:`, value); // Logs the same as above
// });
        

        try {
          const response = await fetch('/products', {
            method: 'POST',
            body: (formData),
          });
    
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
    
          console.log('Product added successfully:', await response.json());
          // Reset form fields
          setProductData({
             productname: "",
             category: "",
             description: "",
             price: "",
             quantity: "",
             image:[]
          });

          if (fileInputRef.current) {
            fileInputRef.current.value = ""; // Clear the file input field
          }

        setIsProcessing(false)

        } catch (error) {
          console.error('Error adding product:', error);
        }
      };

    return (
        <Card>
          <CardHeader>
            <CardTitle>Add New Product</CardTitle>
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
                <Input required type="file" name="file" accept="image/*"  ref={fileInputRef} onChange={(e) =>
      setProductData({
        ...productData,
        image: [...e.target.files], // Store selected files in the `image` array
      })
    } /> 
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

              <Button type="submit" className="w-full"  disabled={isProcessing || !(   
         productData.category&&productData.description&&productData.price&&productData.productname&&productData.quantity&&productData.image
        )}>
            Add Product 
              </Button>
            </form>
          </CardContent>
        </Card>
      );
    
}

export default AddNewProducts