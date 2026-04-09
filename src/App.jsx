// src/App.jsx
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Produtos from './pages/Produtos';
import Produto from './pages/Produto';
import Carrinho from './pages/Carrinho';
import Checkout from './pages/Checkout';
import MinhaConta from './pages/MinhaConta';
import Admin from './pages/Admin';
import Sobre from './pages/Sobre';
import Contacto from './pages/Contacto';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function AppLayout() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <>
      <ScrollToTop />
      {!isAdmin && <Navbar />}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/"           element={<Home />} />
          <Route path="/produtos"   element={<Produtos />} />
          <Route path="/produto/:id" element={<Produto />} />
          <Route path="/carrinho"   element={<Carrinho />} />
          <Route path="/checkout"   element={<Checkout />} />
          <Route path="/minha-conta" element={<MinhaConta />} />
          <Route path="/admin"      element={<Admin />} />
          <Route path="/sobre"      element={<Sobre />} />
          <Route path="/contacto"   element={<Contacto />} />
          <Route path="*"           element={<Home />} />
        </Routes>
      </AnimatePresence>
      {!isAdmin && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}
