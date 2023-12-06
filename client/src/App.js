import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase/app'
import { toast, ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.css'
import "react-toastify/dist/ReactToastify.css"
import React, { useEffect, useState, lazy, Suspense } from 'react'
import {useDispatch} from 'react-redux'
import {auth} from './firebaseFile' ;
import { currentUser } from './functions/auth' ;
import { LoadingOutlined } from '@ant-design/icons';



import { Home } from './pages/Home';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { Header } from './components/nav/Header';
import { RegisterComplete } from './pages/auth/RegisterComplete';
import { ForgotPassword } from './pages/auth/ForgotPassword';
import { History } from './pages/user/History';
import {UserRoute} from './components/routes/UserRoute'
import {AdminRoute} from './components/routes/AdminRoute'
import { SideDrawer } from './components/drawer/SideDrawer';
import { Password } from './pages/user/Password';
import { Wishlist } from './pages/user/Wishlist';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { CategoryCreate } from './pages/admin/category/CategoryCreate';
import { CategoryUpdate } from './pages/admin/category/CategoryUpdate';
import { SubCreate } from './pages/admin/category/sub/SubCreate';
import { SubUpdate } from './pages/admin/category/sub/SubUpdate';
import { ProductCreate } from './pages/admin/product/ProductCreate';
import { AllProducts } from './pages/admin/product/AllProducts';
import { ProductUpdate } from './pages/admin/product/ProductUpdate';
import { Product } from './pages/Product';
import { SingleProduct } from './components/cards/SingleProduct';
import { Shop } from './pages/Shop';
import {Cart, cart} from './pages/Cart'
import { Checkout } from './pages/Checkout';

// // using lazy

// const { Home }=lazy(()=>import('./pages/Home')) ;
// const { Login }=lazy(()=>import('./pages/auth/Login')) ;
// const { Register }=lazy(()=>import('./pages/auth/Register')) ;
// const { Header }=lazy(()=>import('./components/nav/Header')) ;
// const { RegisterComplete }=lazy(()=>import('./pages/auth/RegisterComplete')) ;
// const { ForgotPassword }=lazy(()=>import('./pages/auth/ForgotPassword')) ;
// const { History }=lazy(()=>import('./pages/user/History')) ;
// const {UserRoute}=lazy(()=>import('./components/routes/UserRoute')) 
// const {AdminRoute}=lazy(()=>import('./components/routes/AdminRoute')) 
// const { SideDrawer }=lazy(()=>import('./components/drawer/SideDrawer')) ;
// const { Password }=lazy(()=>import('./pages/user/Password')) ;
// const { Wishlist }=lazy(()=>import('./pages/user/Wishlist')) ;
// const { AdminDashboard } =lazy(()=>import('./pages/admin/AdminDashboard'));
// const { CategoryCreate }=lazy(()=>import('./pages/admin/category/CategoryCreate')) ;
// const { CategoryUpdate }=lazy(()=>import('./pages/admin/category/CategoryUpdate')) ;
// const { SubCreate }=lazy(()=>import('./pages/admin/category/sub/SubCreate')) ;
// const { SubUpdate } =lazy(()=>import('./pages/admin/category/sub/SubUpdate'));
// const { ProductCreate }=lazy(()=>import('./pages/admin/product/ProductCreate')) ;
// const { AllProducts }=lazy(()=>import('./pages/admin/product/AllProducts')) ;
// const { ProductUpdate } =lazy(()=>import('./pages/admin/product/ProductUpdate'));
// const { Product }=lazy(()=>import('./pages/Product')) ;
// const { SingleProduct }=lazy(()=>import('./components/cards/SingleProduct')) ;
// const { Shop }=lazy(()=>import('./pages/Shop'));
// const {Cart, cart}=lazy(()=>import('./pages/Cart'))
// const { Checkout }=lazy(()=>import('./pages/Checkout'));



function App() {
  const dispatch = useDispatch();
 
  useEffect(() =>{
    const unsubscribe = auth.onAuthStateChanged(async (user)=>{
      // const { user } = useSelector((state) => ({...state}))
      console.log(user);
      if(user){
        const idTokenResult = await user.getIdTokenResult()
        currentUser(idTokenResult.token)
        .then((res) =>{
          dispatch({
            type: "LOGGED_IN_USER",
            payload:{
              name: res.data?.name,
              email: res.data.email,
              token: idTokenResult.token,
              role: res.data.role,
              _id: res.data._id
            }
          })
        })
        .catch((err) =>{
          console.log(err.message);
          toast.error(err.message);
        })
      }
    })
    //cleanup
    return () => unsubscribe();
  }, [dispatch])
 
  return (
   <Suspense
    fallback={
      <div className='col text-center p-5' >
        ___React Redux EC<LoadingOutlined/>MMERCE___
      </div>
    }
   >
    <BrowserRouter>
    <Header/>
    <SideDrawer />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/register/complete' element={<RegisterComplete/>}/>
        <Route path='/forgot/password' element={<ForgotPassword/>}/>
        <Route path='/user/history' element={<UserRoute children={<History/>}></UserRoute>} />
        <Route path='/user/password' element={<UserRoute children={<Password/>}></UserRoute>} />
        <Route path='/user/wishlist' element={<UserRoute children={<Wishlist/>}></UserRoute>} />
        <Route path='/checkout' element={<UserRoute children={<Checkout/>}></UserRoute>} />
        <Route path='/admin/dashboard' element={<AdminRoute children={<AdminDashboard/>}></AdminRoute>} />
        <Route path='/admin/category' element={<AdminRoute children={<CategoryCreate/>}></AdminRoute>} />
        <Route path='/admin/category/:slug' element={<AdminRoute children={<CategoryUpdate/>}></AdminRoute>} />
        <Route path='/admin/sub' element={<AdminRoute children={<SubCreate/>}></AdminRoute>} />
        <Route path='/admin/sub/:slug' element={<AdminRoute children={<SubUpdate/>}></AdminRoute>} />
        <Route path='/admin/product' element={<AdminRoute children={<ProductCreate/>}></AdminRoute>} />
        <Route path='/admin/products' element={<AdminRoute children={<AllProducts/>}></AdminRoute>} />
        <Route path='/admin/product/:slug' element={<AdminRoute children={<ProductUpdate/>}></AdminRoute>} />
        <Route path='/product/:slug' element={<Product/>} />
        <Route path='/shop' element={<Shop/>} />
        <Route path='/cart' element={<Cart/>} />
      </Routes>
      <ToastContainer/>
    </BrowserRouter>
   </Suspense>

  );
}

export default App;
