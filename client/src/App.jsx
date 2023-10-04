import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import {
  AdminRoutes,
  Footer,
  Navbar,
  ProtectedRoute,
  PublicRoute,
} from "./components";

import { Route, Routes } from "react-router-dom";

import {
  AdminProductsPage,
  CartPage,
  ChangePasswordPage,
  CheckoutPage,
  ConformOrder,
  Dashboard,
  EditProfilePage,
  ForgotPasswordPage,
  HomePage,
  LoginPage,
  MyOrdersPage,
  OrderDetails,
  OrdersPage,
  PaymentSuccessPage,
  ProductDetailsPage,
  ProductsPage,
  RegisterPage,
  ResetPasswordPage,
  ReviewsPage,
  UserProfilePage,
  UsersPage,
} from "./pages";

const App = () => {
  return (
    <div>
      <ToastContainer position='top-right' autoClose={3000} />
      <Navbar />
      <Routes>
        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path='/profile' element={<UserProfilePage />} />
          <Route path='/myorders' element={<MyOrdersPage />} />
          <Route path='/orders/:id' element={<OrderDetails />} />
          <Route path='/profile/edit' element={<EditProfilePage />} />
          <Route
            path='/profile/changepassword'
            element={<ChangePasswordPage />}
          />
          <Route path='/' element={<HomePage />} />
          <Route path='/products' element={<ProductsPage />} />
          <Route path='/products/:id' element={<ProductDetailsPage />} />
          <Route path='/cart' element={<CartPage />} />
          <Route path='/checkout' element={<CheckoutPage />} />
          <Route path='/order/conform' element={<ConformOrder />} />
          <Route path='/payment/success' element={<PaymentSuccessPage />} />
        </Route>
        <Route element={<PublicRoute />}>
          {/* Public Routes */}
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/forgotpassword' element={<ForgotPasswordPage />} />
          <Route path='/resetpassword/:token' element={<ResetPasswordPage />} />
        </Route>
        {/*  Admin Routes*/}
        <Route element={<AdminRoutes />}>
          <Route path='/admin/dashboard' element={<Dashboard />} />
          <Route path='/admin/products' element={<AdminProductsPage />} />
          <Route path='/admin/users' element={<UsersPage />} />
          <Route path='/admin/orders' element={<OrdersPage />} />
          <Route path='/admin/reviews' element={<ReviewsPage />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
