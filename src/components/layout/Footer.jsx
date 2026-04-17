// src/components/layout/Footer.jsx
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, ExternalLink } from 'lucide-react';
import { Instagram, Facebook, Linkedin } from '../common/BrandIcons';

import './Footer.css';

const footerLinks = {
  produtos: [
    { label: 'Cartões de Visita', href: '/produtos?cat=cartoes' },
    { label: 'Flyers & Panfletos', href: '/produtos?cat=flyers' },
    { label: 'Banners & Lona', href: '/produtos?cat=banners' },
    { label: 'Embalagens', href: '/produtos?cat=embalagens' },
    { label: 'Ver Todos', href: '/produtos' },
  ],
  empresa: [
    { label: 'Sobre Nós', href: '/sobre' },
    { label: 'Contacto', href: '/contacto' },
    { label: 'Política de Privacidade', href: '#' },
    { label: 'Termos de Uso', href: '#' },
  ],
  conta: [
    { label: 'Minha Conta', href: '/minha-conta' },
    { label: 'Meus Pedidos', href: '/minha-conta' },
    { label: 'Meus Ficheiros', href: '/minha-conta' },
    { label: 'Rastrear Pedido', href: '/minha-conta' },
  ],
};

export default function Footer() {
  return (
    <footer className="footer">
      {/* Glow line */}
      <div className="footer-glow-line" />

      <div className="container">
        {/* Main grid */}
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <span className="footer-logo-icon">
                <img src="/logo.png" alt="" />
              </span>
              <div>
                <div className="footer-logo-main">Camaleão</div>
                <div className="footer-logo-sub">Gráfica · Parnamirim/RN</div>
              </div>
            </Link>
            <p className="footer-tagline">
              Transformamos a sua ideia em impressão de alto impacto. Qualidade, rapidez e preço justo — desde Parnamirim para todo o Brasil.
            </p>
            <div className="footer-social">
              <motion.a href="https://instagram.com/camaleao.grafica" target="_blank" rel="noopener" className="footer-social-btn" whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}>
                <Instagram size={18} />
              </motion.a>
              <motion.a href="#" target="_blank" rel="noopener" className="footer-social-btn" whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}>
                <Facebook size={18} />
              </motion.a>
              <motion.a href="#" target="_blank" rel="noopener" className="footer-social-btn" whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}>
                <Linkedin size={18} />
              </motion.a>
            </div>
          </div>

          {/* Products */}
          <div className="footer-col">
            <h4 className="footer-col-title">Produtos</h4>
            <ul className="footer-list">
              {footerLinks.produtos.map(l => (
                <li key={l.href}><Link to={l.href} className="footer-link">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Empresa */}
          <div className="footer-col">
            <h4 className="footer-col-title">Empresa</h4>
            <ul className="footer-list">
              {footerLinks.empresa.map(l => (
                <li key={l.label}><Link to={l.href} className="footer-link">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Conta */}
          <div className="footer-col">
            <h4 className="footer-col-title">Minha Conta</h4>
            <ul className="footer-list">
              {footerLinks.conta.map(l => (
                <li key={l.label}><Link to={l.href} className="footer-link">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div className="footer-col">
            <h4 className="footer-col-title">Contacto</h4>
            <ul className="footer-list footer-contact-list">
              <li>
                <Phone size={14} className="footer-contact-icon" />
                <a href="tel:+5584998475461" className="footer-link">(84) 99847-5461</a>
              </li>
              <li>
                <Mail size={14} className="footer-contact-icon" />
                <a href="mailto:camaleao.grafica@hotmail.com" className="footer-link">camaleao.grafica@hotmail.com</a>
              </li>
              <li>
                <MapPin size={14} className="footer-contact-icon" />
                <span className="footer-address">R. Aeroporto dos Guararapes, 11<br />Parque Industrial · Parnamirim/RN<br />CEP 59149-323</span>
              </li>
            </ul>

            {/* WhatsApp CTA */}
            <motion.a
              href="https://wa.me/5584998475461?text=Olá!%20Gostaria%20de%20fazer%20um%20orçamento."
              target="_blank"
              rel="noopener"
              className="footer-whatsapp-btn"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <span>💬</span> Fale pelo WhatsApp
              <ExternalLink size={13} />
            </motion.a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Camaleão Soluções Gráficas · CNAE C-1821-1/00 · Todos os direitos reservados</p>
          <p>Desenvolvido por <a href="https://precodexsolutions.pt" target="_blank" rel="noopener" className="text-gradient-blue">Precodex Solutions</a></p>
        </div>
      </div>
    </footer>
  );
}
