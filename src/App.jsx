import { useState } from 'react';

import viteLogo from '/vite.svg';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LayOut from './Components/LayOut/LayOut';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import Proudects from './Components/Proudects/Proudects';
import Cart from './Components/Cart/Cart';
import Brands from './Components/Brands/Brands';
import Home from './Components/Home/Home';
import NotFound from './Components/NotFound/NotFound';
import ProtectedRoute from './Components/ProtectRoute/ProtectedRoute';
import "flowbite/dist/flowbite.js";
import UserContextProvider from './Conttext/UserContext';
import ProductDetails from './Components/productDetails/productDetails';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import toast, { Toaster } from 'react-hot-toast';
import ForgetPasswored from './Components/ForgetPasswored/ForgetPasswored';
import RePasswored from './Components/RePasswored/RePasswored';
import Category from './Components/Category/Category';
import WishList from './Components/WishList/WishList';
import ShippingAddress from './Components/ShippingAddress/ShippingAddress';

import NewPasswored from './Components/NewPasswored/NewPasswored';
import CounterContextProvider from './Conttext/counterContext';

function App() {
  const router = createBrowserRouter(
    [
      {
        path: '',
        element: <LayOut />,
        children: [
          { index: true, element: <Register /> },
          { index:true, path: 'Login', element: <Login /> },
          { path: 'ForgetPasswored', element: <ForgetPasswored /> },
          { path: 'RePasswored', element: <RePasswored /> },
          { path: 'NewPasswored', element: <NewPasswored /> },
          { path: 'Home', element: <ProtectedRoute> <Home /> </ProtectedRoute> },
          { path: 'ShippingAddress', element: <ProtectedRoute> <ShippingAddress /> </ProtectedRoute> },
          { path: 'productDetails/:id', element: <ProtectedRoute> <ProductDetails /> </ProtectedRoute> },
          { path: 'Proudects', element: <ProtectedRoute> <Proudects /> </ProtectedRoute> },
          { path: 'WishList', element: <ProtectedRoute> <WishList /> </ProtectedRoute> },
          { path: 'Category', element: <ProtectedRoute> <Category /> </ProtectedRoute> },
          { path: 'Cart', element: <ProtectedRoute> <Cart /> </ProtectedRoute> },
          { path: 'Brands', element: <ProtectedRoute> <Brands /> </ProtectedRoute> },
          { path: 'Register', element: <Register /> },
          { path: '*', element: <NotFound /> },
        ],
      },
    ],
    {
      basename: '/ViteTest2', 
    }
  );

  const myClient = new QueryClient();

  return (
    <>

      <QueryClientProvider client={myClient}>
        <UserContextProvider>
          <CounterContextProvider>
            <Toaster />
            <RouterProvider router={router} />
            <ReactQueryDevtools />
          </CounterContextProvider>
        </UserContextProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;

