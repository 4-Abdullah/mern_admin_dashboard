
import {
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  Table
} from '../components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '../components/ui/card';
import { Product } from './product';
import { useNavigate } from 'react-router-dom';
// import { SelectProduct } from '@/lib/db';
// import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import React from 'react';
import { useState } from 'react';

export function ProductsTable({
  products,
  offset,
  limit,
  totalProducts,
  allProducts
}) {

  const navigate = useNavigate();

// console.log(offset)
// console.log(limit)


  function prevPage() {
    navigate(-1); // Moves one step back in history
  }
  
  function nextPage() {
    const newOffset =offset*1 + limit; // Example offset logic
    // console.log(newOffset)
    navigate(`/?offset=${newOffset}`, { replace: false }); // Adds to history stack
  }
  console.log(offset*1)
  return (
    <Card>
      <CardHeader>
        <CardTitle>Products</CardTitle>
        <CardDescription>
          Manage your products and view their sales performance.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-[100px] sm:table-cell">
                <span className="sr-only">Image</span>
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Price</TableHead>
              <TableHead className="hidden md:table-cell">
                Total Sales
              </TableHead>
              <TableHead className="hidden md:table-cell">Created at</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <form className="flex items-center w-full justify-between">
        <div className="text-xs text-muted-foreground">
            Showing{' '}
            <strong>
              {offset===0?1:offset * 1 + 1}-{Math.max(offset *  1 + limit, totalProducts)}
            </strong>{' '}
            of <strong>{allProducts}</strong> products
          </div>
          <div className="flex">
            <Button
              formAction={prevPage}
              variant="ghost"
              size="sm"
              type="submit"
              disabled={offset === 0}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Prev
            </Button>
            <Button
              formAction={nextPage}
              variant="ghost"
              size="sm"
              type="submit"
              disabled={allProducts===2?offset+2:offset*1+limit  >= allProducts}
            >
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      </CardFooter>
    </Card>
  );
}
