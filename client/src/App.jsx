import { Footer, Navbar } from "./components";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages";
const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
