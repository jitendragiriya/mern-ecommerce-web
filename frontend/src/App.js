import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import store from './store'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from './components/Header/Header'
import Home from './screens/home/Home'
import Footer from './components/footer/Footer'
import Checkout from './screens/checkout/Checkout'
import Login from './screens/Forms/login/LoginForm'
import Signup from "./screens/Forms/signup/SignupFrom";
import Productdetails from "./screens/productDetails/Productdetails";
import { keepTheme } from './utils/theme/Theme';
import UserProfile from './screens/User/userProfile/UserProfile';
import UpdateProfile from "./screens/User/userProfile/UpdateProfile";
import ProtectedRoute from './middlewares/ProtectedRoute'
import { loggedInUser } from "./Redux/actions/userActions";
import UpdatePassword from './screens/User/userProfile/UpdatePassword'
import ForgotPassword from './screens/Forms/ForgotPassword'
import ResetPassword from './screens/Forms/ResetPassword'
import Shipping from "./screens/checkout/CheckoutStep/shipping/Shipping";
import ConfirmOrder from "./screens/checkout/CheckoutStep/confirmOrder/ConfirmOrder";
import Payment from './screens/checkout/CheckoutStep/payment/Payment'
import OrdersSuccess from "./screens/checkout/OrdersSuccess";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import MyOrders from "./screens/User/MyOrders";
import MyOrderDetails from "./screens/User/MyOrderDetails";
import Dashboard from "./screens/Admin/Dashboard/Dashboard";
import ProductList from "./screens/Admin/ProductList";
import NewProductAdd from "./screens/Admin/NewProductAdd";
import UpdateProduct from './screens/Admin/UpdateProduct'
import AllOrders from './screens/Admin/AllOrders'
import AllUser from "./screens/Admin/AllUsers";
import UserDetails from './screens/Admin/UserInfo/UserDetails'
import { useSelector } from 'react-redux'
import UpdateOrderStatus from "./screens/Admin/UpdateOrderStatus";
import AboutUs from "./screens/More/AboutUs";
import ForgotPassSuccess from "./screens/User/ForgotPassSuccess";

function App() {
  const { isAuthenticated } = useSelector(state => state.user)
  const [stripeApiKey, setStripeApiKey] = useState('');
  const url = '/api/sendStripeApiKey'

  const getStripeApiKey = async () => {
    if (isAuthenticated) {
      const { data } = await axios.get(url,
        {
          withCredentials: true
        });
      setStripeApiKey(data.stripeApiKey);
    }
  }

  getStripeApiKey()
  useEffect(() => {
    store.dispatch(loggedInUser());
    keepTheme();
  }, []);

  // window.addEventListener("contextmenu", (e) => e.preventDefault());

  return (
    <Router>
      <Header />
      <div className="app" >
        {stripeApiKey && (
          <Elements stripe={loadStripe(stripeApiKey)}>
            <ProtectedRoute path='/process/payment' component={Payment} />
          </Elements>
        )}
        <Switch>
          <Route exact path='/' component={Home} />
          <ProtectedRoute isAdmin={true} exact path='/dashboard' component={Dashboard} />
          <ProtectedRoute exact path='/account' component={UserProfile} />
          <ProtectedRoute exact path='/me/password/update' component={UpdatePassword} />
          <ProtectedRoute exact path='/me/update' component={UpdateProfile} />
          <Route exact path='/password/reset/:token' component={ResetPassword} />
          <Route exact path='/password/forgot' component={ForgotPassword} />
          <Route exact path='/product/:id' component={Productdetails} />
          <Route exact path='/forgot/:id' component={ForgotPassSuccess} />
          <Route exact path='/signup' component={Signup} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/cart' component={Checkout} />
          <Route exact path='/about' component={AboutUs} />
          <ProtectedRoute exact path='/shipping' component={Shipping} />
          <ProtectedRoute exact path='/order/confirm' component={ConfirmOrder} />
          <ProtectedRoute exact path='/order/success' component={OrdersSuccess} />
          <ProtectedRoute exact path='/orders' component={MyOrders} />
          <ProtectedRoute exact path='/order/:id' component={MyOrderDetails} />
          <Route exact path='/:keyword' component={Home} />
          <ProtectedRoute isAdmin={true} exact path='/dashboard' component={Dashboard} />
          <ProtectedRoute isAdmin={true} exact path='/admin/products' component={ProductList} />
          <ProtectedRoute isAdmin={true} exact path='/admin/product/new' component={NewProductAdd} />
          <ProtectedRoute isAdmin={true} exact path='/admin/product/:id' component={UpdateProduct} />
          <ProtectedRoute isAdmin={true} exact path='/admin/orders' component={AllOrders} />
          <ProtectedRoute isAdmin={true} exact path='/admin/users' component={AllUser} />
          <ProtectedRoute isAdmin={true} exact path='/admin/u/:id' component={UserDetails} />
          <ProtectedRoute isAdmin={true} exact path='/admin/u/order/:id' component={UpdateOrderStatus} />

        </Switch>
      </div>
      <Footer />
    </Router>
  );
}

export default App;