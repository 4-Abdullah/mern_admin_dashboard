import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardLayout from './dashboard/layout';
import DashboardPage from './dashboard/page';
import AddNewProducts from './dashboard/AddNewProducts';
import UpdateProducts from './dashboard/UpdateProducts';


export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <DashboardLayout>
          <DashboardPage /> 
          </DashboardLayout>
        }
      />
      <Route path='/add-product' element={<DashboardLayout><AddNewProducts/></DashboardLayout>}></Route>
      <Route path='/update-product' element={<DashboardLayout><UpdateProducts/></DashboardLayout>}></Route>
    </Routes>
  );
} 