import React,{useContext} from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { DataProvider } from './GlobalState';
import Header from './components/headers/Header';
import Pages from './components/mainpages/Pages'; // Cambié el nombre de importación

// GlobalState
import { GlobalState } from './GlobalState';

// componentes
import NotFound from './components/mainpages/utils/not_found/NotFound';
import Products from './components/mainpages/products/Products';
import Login from './components/mainpages/auth/Login';
import Register from './components/mainpages/auth/Register';
import Cart from './components/mainpages/cart/Cart';
import DetailProduct from './components/mainpages/detailProduct/DetailProduct';
import OrderHistory from './components/mainpages/history/OrderHistory';
import OrderDetails from './components/mainpages/history/OrderDetails';
import Categories from './components/mainpages/categories/Categories';
import CreateProduct from './components/mainpages/createProduct/CreateProduct';
import AboutUs from './components/mainpages/aboutUs/aboutUs.js'


import { ChakraProvider } from '@chakra-ui/react'


function App() {


  // state para ver si está loggeado y si es admin
  {/*const state = useContext(GlobalState);
  const [isLogged] = state.UserAPI.isLogged;
  const [isAdmin] = state.UserAPI.isAdmin;
  */}

  return (

    <ChakraProvider>
      <DataProvider>
        <Router>
          <div className="App">
            <Header />



            <Routes>



              {/*<Route path="/" element={<Products />} />
              <Route path="/detail/:id" element={<DetailProduct />} />
              <Route path="/login" element={isLogged ? <NotFound /> : <Login/> }/>
              <Route path="/register" element={isLogged ? <NotFound /> : <Register/> }/>
              <Route path="/category" element={isAdmin ? <Categories /> : <NotFound/> }/>
              <Route path="/create_product" element={isAdmin ? <CreateProduct /> : <NotFound/> }/>
              <Route path="/edit_product/:id" element={isAdmin ? <CreateProduct /> : <NotFound/> }/>
              <Route path="/history" element={isLogged ? <OrderHistory /> : <NotFound/> }/>
              <Route path="/history/:id" element={isLogged ? <OrderDetails /> : <NotFound/> }/>
              <Route path="/cart" element={<Cart />} />
              */}



              <Route path="/" element={<Products />} />
              <Route path="/login" element={ <Login/> }/>
              <Route path="/register" element={ <Register/> }/>
              <Route path="/detail/:id" element={<DetailProduct />} />
              <Route path="/category" element={<Categories />}/>
              <Route path="/create_product" element={<CreateProduct />}/>
              <Route path="/edit_product/:id" element={<CreateProduct /> }/>
              <Route path="/history" element={ <OrderHistory /> }/>
              <Route path="/history/:id" element={<OrderDetails />}/>
              <Route path="/cart" element={<Cart />} />
              <Route path="/aboutUs" element={<AboutUs />} />
              
              


            </Routes>



          {/*<Pages />*/}
          </div>
        </Router>
      </DataProvider>
    </ChakraProvider>
  );
}

export default App;

