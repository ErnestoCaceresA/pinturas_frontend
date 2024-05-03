import React, { useContext } from 'react';
import { Outlet, Route, Navigate } from 'react-router-dom'; // Cambios en las importaciones

// GlobalState
import { GlobalState } from '../../GlobalState';

// componentes
import NotFound from './utils/not_found/NotFound';
import Products from './products/Products';
import Login from './auth/Login';
import Register from './auth/Register';
import Cart from './cart/Cart';
import DetailProduct from '../mainpages/detailProduct/DetailProduct';
import OrderHistory from '../mainpages/history/OrderHistory';
import OrderDetails from '../mainpages/history/OrderDetails';
import Categories from '../mainpages/categories/Categories';
import CreateProduct from './createProduct/CreateProduct';
import AboutUs from './aboutUs/aboutUs.js';

function Pages() {
  // state para ver si está loggeado y si es admin
  const state = useContext(GlobalState);
  const [isLogged] = state.UserAPI.isLogged;
  const [isAdmin] = state.UserAPI.isAdmin;

  return (
    <Outlet>
      <Route path="/" element={<Products />} />
      <Route path="/detail/:id" element={<DetailProduct />} />


      <Route path="/aboutUs" element={<Products />} />


      {/*<Route path="/login" element={isLogged ? <Navigate to="/" /> : <Login />} />*/}
      <Route path="/login" element={isLogged ? <Navigate to="/login" /> : <Login />} />
      <Route path="/register" element={isLogged ? <Navigate to="/" /> : <Register />} />

      <Route path="/category" element={isAdmin ? <Categories /> : <Navigate to="/" />} />
      <Route path="/create_product" element={isAdmin ? <CreateProduct /> : <Navigate to="/" />} />
      <Route path="/edit_product/:id" element={isAdmin ? <CreateProduct /> : <Navigate to="/" />} />

      <Route path="/history" element={isLogged ? <OrderHistory /> : <Navigate to="/" />} />
      <Route path="/history/:id" element={isLogged ? <OrderDetails /> : <Navigate to="/" />} />
      {/*<Route path="/cart" element={<Cart />} /> */}
      <Route path="*" element={<NotFound />} /> {/* Manejo de ruta no encontrada */}
    </Outlet>
  );
}

export default Pages;


