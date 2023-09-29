import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Footer, Navbar, ProtectedRoute, PublicRoute } from "./components";
import { Route, Routes } from "react-router-dom";
import {
  EditProfilePage,
  HomePage,
  LoginPage,
  ProductDetailsPage,
  ProductsPage,
  RegisterPage,
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
          <Route path='/' element={<HomePage />} />
          <Route path='/products' element={<ProductsPage />} />
          <Route path='/products/:id' element={<ProductDetailsPage />} />
        </Route>
        <Route element={<PublicRoute />}>
          {/* Public Routes */}
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
