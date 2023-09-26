import { Footer, Navbar } from "./components";
import { Route, Routes } from "react-router-dom";
import { HomePage, ProductDetails } from "./pages";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/product/:id' element={<ProductDetails />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
