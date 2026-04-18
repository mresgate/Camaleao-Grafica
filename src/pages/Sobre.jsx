// src/pages/Sobre.jsx
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Award, Users, MapPin, Clock, ArrowRight, CheckCircle } from 'lucide-react';
import Button from '../components/ui/Button';
import './Sobre.css';

const valores = [
  { icon: '🎨', titulo: 'Qualidade de Impressão', desc: 'Utilizamos equipamentos de última geração e tintas de alta resolução para garantir resultados impecáveis.' },
  { icon: '🌱', titulo: 'Consciência Ecológica', desc: 'Comprometimento com práticas sustentáveis, reduzindo o desperdício e priorizando materiais ecológicos.' },
  { icon: '🤝', titulo: 'Responsabilidade Social', desc: 'Projeto que apoia o desenvolvimento local em Parnamirim e fortalece o empreendedorismo regional.' },
  { icon: '💰', titulo: 'Preço Justo', desc: 'Transparência total nos preços. Sem taxas ocultas. O valor apresentado é o valor cobrado.' },
];

const timeline = [
  { ano: '2018', evento: 'Fundação da Camaleão', desc: 'A empresa nasce em Parnamirim, RN, com o objetivo de democratizar a impressão de qualidade.' },
  { ano: '2020', evento: 'Expansão do Portfólio', desc: 'Ampliação para embalagens personalizadas e brindes corporativos, atendendo grandes empresas do RN.' },
  { ano: '2022', evento: 'Digitalização', desc: 'Implementação do sistema de orçamentos online e atendimento via WhatsApp, expandindo o alcance.' },
  { ano: '2024', evento: 'Loja Online', desc: 'Lançamento da loja e-commerce, tornando possível pedidos de todo o Brasil com entrega rastreada.' },
];

export default function Sobre() {
  return (
    <main className="sobre-page">
      {/* Hero */}
      <section className="sobre-hero">
        <div className="sobre-hero-bg" />
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="section-eyebrow">Nossa História</span>
            <h1>Somos a <span className="text-gradient-gold">Camaleão Gráfica</span></h1>
            <p className="sobre-hero-sub">
              Mais de 6 anos transformando ideias em impressões. Da Parnamirim para todo o Brasil — com qualidade, compromisso e paixão pelo que fazemos.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Missão e valores */}
      <section className="section">
        <div className="container">
          <div className="sobre-missao-grid">
            <motion.div
              className="sobre-missao-text"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="section-eyebrow">Quem Somos</span>
              <h2>Dedicação e comprometimento com o seu empreendimento</h2>
              <p>
                A Camaleão Soluções Gráficas é uma empresa potiguar sediada em Parnamirim, RN,
                especializada em serviços de pré-impressão e produção gráfica de alto padrão.
                Atuamos com foco na qualidade do produto, no atendimento personalizado e na responsabilidade social.
              </p>
              <p>
                Nossa missão é ser a parceira estratégica do seu negócio, oferecendo impressões que constroem marcas
                fortes e geram resultados reais — desde o cartão de visita até as embalagens premium.
              </p>
              <p>
                <strong>Alguns dos nossos serviços:</strong> serviços gráficos, brindes e personalizados, embalagens, criação de artes, papelaria em geral, itens para formatura e demais eventos, entre outros.
              </p>
              <div className="sobre-checks">
                {['Equipa especializada e apaixonada', 'Equipamentos de última geração', 'Atendimento personalizado', 'Entrega para todo o Brasil'].map(c => (
                  <div key={c} className="sobre-check">
                    <CheckCircle size={18} color="var(--color-accent)" />
                    <span>{c}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="sobre-info-cards"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              {[
                { icon: <Award size={28} />, val: '+30.000', label: 'Pedidos Entregues' },
                { icon: <Users size={28} />, val: '+800', label: 'Clientes Ativos' },
                { icon: <Clock size={28} />, val: '6 anos', label: 'De Experiência' },
                { icon: <MapPin size={28} />, val: '26 estados', label: 'Alcance Nacional' },
              ].map((card, i) => (
                <div key={i} className="sobre-info-card glass">
                  <div className="sobre-info-icon">{card.icon}</div>
                  <div className="sobre-info-val text-gradient-gold">{card.val}</div>
                  <div className="sobre-info-label">{card.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="section sobre-valores-section">
        <div className="sobre-valores-bg" />
        <div className="container">
          <motion.div className="section-header" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="section-eyebrow">Nossos Pilares</span>
            <h2>O que nos define</h2>
          </motion.div>
          <div className="sobre-valores-grid">
            {valores.map((v, i) => (
              <motion.div
                key={i} className="sobre-valor-card glass"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6 }}
              >
                <span className="sobre-valor-icon">{v.icon}</span>
                <h4 className="sobre-valor-titulo">{v.titulo}</h4>
                <p className="sobre-valor-desc">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section">
        <div className="container">
          <motion.div className="section-header" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="section-eyebrow">Nossa Trajetória</span>
            <h2>Como chegamos até aqui</h2>
          </motion.div>
          <div className="sobre-timeline">
            {timeline.map((t, i) => (
              <motion.div
                key={i} className="sobre-tl-item"
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <div className="sobre-tl-card glass">
                  <span className="sobre-tl-ano text-gradient-gold">{t.ano}</span>
                  <h4 className="sobre-tl-evento">{t.evento}</h4>
                  <p className="sobre-tl-desc">{t.desc}</p>
                </div>
                <div className="sobre-tl-dot" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-sm">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2>Pronto para trabalhar juntos?</h2>
          <p style={{ marginBottom: '2rem', fontSize: '1.05rem' }}>Entre em contacto ou explore o nosso catálogo de produtos.</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/produtos"><Button variant="gold" size="lg" iconRight={<ArrowRight size={18} />}>Ver Produtos</Button></Link>
            <Link to="/contacto"><Button variant="outline" size="lg">Entrar em Contacto</Button></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
