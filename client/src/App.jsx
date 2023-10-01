import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import { Footer, Navbar, ProtectedRoute, PublicRoute } from "./components";

import { Route, Routes } from "react-router-dom";

import {
  CartPage,
  ChangePasswordPage,
  CheckoutPage,
  EditProfilePage,
  ForgotPasswordPage,
  HomePage,
  LoginPage,
  ProductDetailsPage,
  ProductsPage,
  RegisterPage,
  ResetPasswordPage,
  UserProfilePage,
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
        </Route>
        <Route element={<PublicRoute />}>
          {/* Public Routes */}
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/forgotpassword' element={<ForgotPasswordPage />} />
          <Route path='/resetpassword/:token' element={<ResetPasswordPage />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
