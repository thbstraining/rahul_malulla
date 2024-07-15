import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import MenuPage from "./pages/MenuPage";
import OrderPage from "./pages/Orderpage";
import PastOrdersPage from "./pages/PastOrderPage";
import Home from "./pages/Home";

const App = () => (
  <Router>
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/restaurants/:restaurantId" element={<MenuPage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/past-orders" element={<PastOrdersPage />} />
      </Routes>
    </div>
  </Router>
);

export default App;
