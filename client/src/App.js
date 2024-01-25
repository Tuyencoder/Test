import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import ProductListClient from "./components/ProductListClient.js";
import { AuthProvider } from "./context/auth.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminDashboard from "./pages/admin/AdminDashboard.js";
import AdminRoute from "./components/routes/AdminRoute.js";
import LoginForm from "./pages/Login.js";
import RegisterForm from "./pages/Register.js"
import { Toaster } from "react-hot-toast";
import AddProduct from "./pages/admin/AddProduct.js";
import UpdateProduct from "./pages/admin/UpdateProduct.js"
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        
        <AuthProvider>
          <Toaster />
          <Header />
          <Routes>
            <Route path="/" element={<ProductListClient />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/admin" element={<AdminRoute />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="edit-product/:productId" element={<UpdateProduct />} />
              <Route path="addProduct" element={<AddProduct />} />
              {/* Thêm các Route khác cho Admin ở đây nếu cần */}
            </Route>
          </Routes>
        </AuthProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
