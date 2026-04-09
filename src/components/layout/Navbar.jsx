// src/components/layout/Navbar.jsx
import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, User, Menu, X, ChevronDown, Phone, Mail, Search } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import { useAuthStore } from '../../store/authStore';
import './Navbar.css';

const navLinks = [
  { label: 'Início', href: '/' },
  {
    label: 'Produtos',
    href: '/produtos',
    sub: [
      { label: 'Cartões de Visita', href: '/produtos?cat=cartoes' },
      { label: 'Flyers & Panfletos', href: '/produtos?cat=flyers' },
      { label: 'Banners & Lona', href: '/produtos?cat=banners' },
      { label: 'Embalagens', href: '/produtos?cat=embalagens' },
      { label: 'Papelaria', href: '/produtos?cat=papelaria' },
      { label: 'Brindes', href: '/produtos?cat=brindes' },
    ],
  },
  { label: 'Sobre', href: '/sobre' },
  { label: 'Contacto', href: '/contacto' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { itens } = useCartStore();
  const { isLoggedIn, isAdmin } = useAuthStore();
  const dropdownRef = useRef(null);

  const totalItens = itens.reduce((acc, i) => acc + i.quantidade, 0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, [location]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/produtos?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      {/* Top bar */}
      <div className="navbar-topbar">
        <div className="container flex-between" style={{ gap: '1rem' }}>
          <div className="navbar-topbar-info">
            <span><Phone size={12} /> (84) 99847-5461</span>
            <span><Mail size={12} /> camaleao.grafica@hotmail.com</span>
          </div>
          <div className="navbar-topbar-info">
            <span>Parnamirim, RN · Seg–Sex 8h–18h</span>
          </div>
        </div>
      </div>

      <motion.nav
        className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="container flex-between navbar-inner">
          {/* Logo */}
          <Link to="/" className="navbar-logo">
            <motion.div
              className="navbar-logo-icon"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <img src="/logo.png" alt="" />
            </motion.div>
            <div className="navbar-logo-text">
              <span className="navbar-logo-main">Camaleão</span>
              <span className="navbar-logo-sub">Gráfica</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <ul className="navbar-links" ref={dropdownRef}>
            {navLinks.map((link) => (
              <li
                key={link.href}
                className="navbar-item"
                onMouseEnter={() => link.sub && setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  to={link.href}
                  className={`navbar-link ${location.pathname === link.href ? 'active' : ''}`}
                >
                  {link.label}
                  {link.sub && <ChevronDown size={14} className="navbar-chevron" />}
                </Link>

                <AnimatePresence>
                  {link.sub && activeDropdown === link.label && (
                    <motion.div
                      className="navbar-dropdown glass"
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      {link.sub.map((sub) => (
                        <Link key={sub.href} to={sub.href} className="navbar-dropdown-item">
                          {sub.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="navbar-actions">
            {/* Search */}
            <motion.button
              className="navbar-icon-btn"
              onClick={() => setSearchOpen(!searchOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Search size={20} />
            </motion.button>

            {/* Cart */}
            <Link to="/carrinho" className="navbar-icon-btn navbar-cart-btn">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <ShoppingCart size={20} />
                {totalItens > 0 && (
                  <motion.span
                    className="navbar-badge"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    key={totalItens}
                  >
                    {totalItens}
                  </motion.span>
                )}
              </motion.div>
            </Link>

            {/* User */}
            <Link to={isLoggedIn ? '/minha-conta' : '/minha-conta'} className="navbar-icon-btn">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <User size={20} />
              </motion.div>
            </Link>

            {isAdmin && (
              <Link to="/admin" className="navbar-admin-btn">
                Admin
              </Link>
            )}

            {/* Mobile menu toggle */}
            <button className="navbar-mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Search bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              className="navbar-search-bar glass"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <form onSubmit={handleSearch} className="container">
                <div className="navbar-search-input-wrap">
                  <Search size={18} />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Pesquisar produtos gráficos..."
                    autoFocus
                  />
                  <button type="submit" className="btn-gold-sm">Buscar</button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="navbar-mobile glass"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: '0%' }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="navbar-mobile-inner">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <Link to={link.href} className="navbar-mobile-link">{link.label}</Link>
                  {link.sub && (
                    <div className="navbar-mobile-sub">
                      {link.sub.map((sub) => (
                        <Link key={sub.href} to={sub.href} className="navbar-mobile-sublink">
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
              <div className="navbar-mobile-divider" />
              <Link to="/minha-conta" className="navbar-mobile-link">Minha Conta</Link>
              <Link to="/carrinho" className="navbar-mobile-link">
                Carrinho {totalItens > 0 && <span className="navbar-badge-inline">{totalItens}</span>}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
