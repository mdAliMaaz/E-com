import { Footer, Navbar } from "./components";
import { Route, Routes } from "react-router-dom";
import {
  HomePage,
  LoginPage,
  ProductDetailsPage,
  ProductsPage,
  RegisterPage,
} from "./pages";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/products' element={<ProductsPage />} />
        <Route path='/products/:id' element={<ProductDetailsPage />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
