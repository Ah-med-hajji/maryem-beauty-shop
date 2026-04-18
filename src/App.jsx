import { useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import ScrollAnimator from "./components/ScrollAnimator";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CartSidebar from "./components/CartSidebar";
import MobileCartBar from "./components/MobileCartBar";
import AdminGuard from "./components/AdminGuard";
import Home from "./pages/Home";
import Category from "./pages/Category";
import About from "./pages/About";
import Contact from "./pages/Contact";
import OrderForm from "./pages/OrderForm";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import "./App.css";

function AppRoutes({ cartOpen, setCartOpen }) {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  if (isAdmin) {
    return (
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <AdminGuard>
              <AdminDashboard />
            </AdminGuard>
          }
        />
      </Routes>
    );
  }

  return (
    <>
      <Navbar onCartClick={() => setCartOpen(true)} />
      <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categorie/:categoryId" element={<Category />} />
        <Route path="/a-propos" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/commander" element={<OrderForm />} />
      </Routes>
      <Footer />
      <MobileCartBar onCartClick={() => setCartOpen(true)} />
    </>
  );
}

export default function App() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <BrowserRouter>
      <ScrollAnimator>
        <div className="app">
          <AppRoutes cartOpen={cartOpen} setCartOpen={setCartOpen} />
        </div>
      </ScrollAnimator>
    </BrowserRouter>
  );
}
