import { Route, Routes } from 'react-router-dom';
import Layout from './layout/Layout';
import Home from './layout/pages/Home';
import Signup from './auth/SignUp';
import Login from './auth/Login';
import ShopManager from './layout/pages/shop/ShopManager';
import ShopProducts from './layout/pages/shop/ShopProducts';
import AddNewProduct from './layout/pages/shop/AddNewProduct';
import EditProduct from './layout/pages/shop/EditProduct';
import Search from './layout/pages/search/Search';
import Cart from './layout/pages/cart/Cart';
import ProductDetail from './layout/pages/product/ProductDetail';
import UserDetail from './layout/pages/user/UserDetail';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Layout></Layout>}>
          <Route path='' element={<Home></Home>}></Route>
          <Route path='product/:productId' element={<ProductDetail></ProductDetail>}></Route>
          <Route path='shop' element={<ShopManager></ShopManager>}>
            <Route path='' element={<ShopProducts></ShopProducts>}></Route>
            <Route path='add' element={<AddNewProduct></AddNewProduct>}></Route>
            <Route path='edit' element={<EditProduct></EditProduct>}></Route>
          </Route>
          <Route path='cart' element={<Cart></Cart>}></Route>
          <Route path='search/:search' element={<Search></Search>}></Route>
          <Route path='search/' element={<Search></Search>}></Route>
          <Route path='/user' element={<UserDetail></UserDetail>}></Route>
        </Route>
        <Route path='/signup' element={<Signup></Signup>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
      </Routes>
    </div>
  );
}

export default App;
