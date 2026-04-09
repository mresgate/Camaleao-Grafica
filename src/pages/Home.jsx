// src/pages/Home.jsx
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Zap, Shield, Clock, Star, Phone, CheckCircle, Package, Truck, MessageSquare } from 'lucide-react';
import ProductCard from '../components/ui/ProductCard';
import Button from '../components/ui/Button';
import FloatingProducts from '../components/canvas/FloatingProducts';
import { getProdutosDestaque, categorias } from '../data/produtos';
import './Home.css';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.4, 0, 0.2, 1] }
  }),
};

const diferenciais = [
  { icon: <Zap size={26} />, titulo: 'Entrega Expressa', desc: 'Produção em até 24h para pedidos urgentes. Nunca perca um prazo.' },
  { icon: <Shield size={26} />, titulo: 'Qualidade Garantida', desc: 'Revisão de arte gratuita. Se não ficar perfeito, refazemos sem custo.' },
  { icon: <Star size={26} />, titulo: 'Preço Justo', desc: 'Sem surpresas. O preço que você vê é o que você paga.' },
  { icon: <Clock size={26} />, titulo: 'Atendimento Ágil', desc: 'Resposta via WhatsApp em menos de 1h durante o horário comercial.' },
];

const passos = [
  { n: '01', titulo: 'Escolha o Produto', desc: 'Navegue pelo catálogo e selecione o produto ideal para o seu negócio.' },
  { n: '02', titulo: 'Personalize', desc: 'Faça o upload da sua arte ou use nossos templates profissionais.' },
  { n: '03', titulo: 'Pague com Segurança', desc: 'PIX, cartão, boleto ou WhatsApp Pay com confirmação instantânea.' },
  { n: '04', titulo: 'Receba em Casa', desc: 'Produzimos com qualidade e enviamos para todo o Brasil com rastreio.' },
];

const depoimentos = [
  { nome: 'Ana Ferreira', cargo: 'Proprietária · Café Aurora', texto: 'Os cardápios ficaram lindíssimos! A qualidade superou todas as minhas expectativas. Já fiz 3 pedidos.', nota: 5 },
  { nome: 'Carlos Mendes', cargo: 'CEO · StartTech RN', texto: 'Cartões de visita premium que impressionam qualquer cliente. Prazo cumprido e arte revisada sem custo extra.', nota: 5 },
  { nome: 'Maria Costa', cargo: 'Designer Freelancer', texto: 'Parceria perfeita! Entrego o arquivo e eles cuidam do resto. Qualidade consistente em todos os pedidos.', nota: 5 },
];

export default function Home() {
  const produtosRef = useRef(null);
  const produtosInView = useInView(produtosRef, { once: true });
  const destaque = getProdutosDestaque();

  return (
    <main className="home">
      {/* ====== HERO ====== */}
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-bg-grid" />
          <div className="hero-bg-glow hero-bg-glow--1" />
          <div className="hero-bg-glow hero-bg-glow--2" />
          <div className="hero-orb hero-orb--1" />
          <div className="hero-orb hero-orb--2" />
          <FloatingProducts />
        </div>

        <div className="container hero-content">
          <motion.div
            className="hero-eyebrow"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
          >
            <span className="hero-eyebrow-dot" />
            Gráfica Premium em Parnamirim, RN
          </motion.div>

          <motion.h1
            className="hero-title"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
          >
            Impressão não é produto.
            <br />
            <span className="text-gradient-gold glow-gold-text">É presença.</span>
          </motion.h1>

          <motion.p
            className="hero-subtitle"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
          >
            Se não chama atenção, não serve. Elevamos a sua marca ao topo com design futurista e impressão de alta fidelidade. De Parnamirim para o domínio do mercado.
          </motion.p>

          <motion.div
            className="hero-actions"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
          >
            <Link to="/produtos">
              <Button variant="gold" size="xl" iconRight={<ArrowRight size={20} />}>
                Ver Catálogo
              </Button>
            </Link>
            <a href="https://wa.me/5584998475461?text=Olá!%20Gostaria%20de%20um%20orçamento." target="_blank" rel="noopener">
              <Button variant="whatsapp" size="xl" icon={<MessageSquare size={20} />}>
                Pedir Orçamento
              </Button>
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="hero-stats"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={4}
          >
            {[
              { val: '+5mil', label: 'Pedidos Entregues' },
              { val: '4.9★', label: 'Avaliação Média' },
              { val: '24h', label: 'Entrega Expressa' },
              { val: '100%', label: 'Arte Revisada' },
            ].map((s, i) => (
              <div key={i} className="hero-stat">
                <span className="hero-stat-val text-gradient-gold">{s.val}</span>
                <span className="hero-stat-label">{s.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="hero-scroll-hint">
          <motion.div
            className="hero-scroll-line"
            animate={{ scaleY: [0, 1, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <span>scroll</span>
        </div>
      </section>

      {/* ====== CATEGORIAS ====== */}
      <section className="section section-categorias">
        <div className="container">
          <motion.div
            className="section-header"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <span className="section-eyebrow">Catálogo Completo</span>
            <h2>Tudo que o seu negócio precisa</h2>
          </motion.div>

          <div className="categorias-grid">
            {categorias.map((cat, i) => (
              <motion.div
                key={cat.id}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
              >
                <Link to={`/produtos?cat=${cat.id}`} className="categoria-card glass">
                  <span className="categoria-icon">{cat.icone}</span>
                  <span className="categoria-nome">{cat.nome}</span>
                  <ArrowRight size={16} className="categoria-arrow" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== PRODUTOS EM DESTAQUE ====== */}
      <section className="section" ref={produtosRef}>
        <div className="container">
          <motion.div
            className="section-header section-header--between"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div>
              <span className="section-eyebrow">Mais Vendidos</span>
              <h2>Produtos em Destaque</h2>
            </div>
            <Link to="/produtos">
              <Button variant="outline" size="sm" iconRight={<ArrowRight size={16} />}>
                Ver Todos
              </Button>
            </Link>
          </motion.div>

          <div className="produtos-grid">
            {destaque.map((produto, i) => (
              <ProductCard key={produto.id} produto={produto} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ====== DIFERENCIAIS ====== */}
      <section className="section section-diferenciais">
        <div className="diferenciais-bg" />
        <div className="container">
          <motion.div
            className="section-header"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <span className="section-eyebrow">Por que Camaleão?</span>
            <h2>O padrão que você merece</h2>
          </motion.div>

          <div className="diferenciais-grid">
            {diferenciais.map((d, i) => (
              <motion.div
                key={i}
                className="diferencial-card glass"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                whileHover={{ y: -8, borderColor: 'rgba(201,168,76,0.5)' }}
              >
                <div className="diferencial-icon">{d.icon}</div>
                <h4 className="diferencial-titulo">{d.titulo}</h4>
                <p className="diferencial-desc">{d.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== COMO FUNCIONA ====== */}
      <section className="section section-passos">
        <div className="container">
          <motion.div
            className="section-header"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <span className="section-eyebrow">Processo Simples</span>
            <h2>Como fazer seu pedido</h2>
          </motion.div>

          <div className="passos-grid">
            {passos.map((p, i) => (
              <motion.div
                key={i}
                className="passo-item"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
              >
                <div className="passo-numero text-gradient-gold">{p.n}</div>
                {i < passos.length - 1 && <div className="passo-line" />}
                <h4 className="passo-titulo">{p.titulo}</h4>
                <p className="passo-desc">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== FORMAS DE PAGAMENTO ====== */}
      <section className="section-sm section-pagamentos">
        <div className="container">
          <motion.div
            className="pagamentos-card glass"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="pagamentos-text">
              <h3>Pague do jeito que preferir</h3>
              <p>Aceitamos todas as formas de pagamento para sua comodidade</p>
            </div>
            <div className="pagamentos-metodos">
              {[
                { label: 'PIX', icon: '⚡', desc: 'Instantâneo' },
                { label: 'Cartão', icon: '💳', desc: 'Crédito/Débito' },
                { label: 'Boleto', icon: '🧾', desc: 'Bancário' },
                { label: 'WhatsApp Pay', icon: '💬', desc: 'Via WhatsApp' },
                { label: 'PicPay', icon: '📱', desc: 'Carteira Digital' },
                { label: 'Mercado Pago', icon: '🔵', desc: 'Mercado Pago' },
              ].map((m, i) => (
                <div key={i} className="pagamento-item">
                  <span className="pagamento-icon">{m.icon}</span>
                  <span className="pagamento-label">{m.label}</span>
                  <span className="pagamento-desc">{m.desc}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ====== DEPOIMENTOS ====== */}
      <section className="section section-depoimentos">
        <div className="container">
          <motion.div
            className="section-header"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <span className="section-eyebrow">Clientes Satisfeitos</span>
            <h2>O que dizem sobre nós</h2>
          </motion.div>

          <div className="depoimentos-grid">
            {depoimentos.map((dep, i) => (
              <motion.div
                key={i}
                className="depoimento-card glass"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                whileHover={{ y: -5 }}
              >
                <div className="depoimento-stars">
                  {[...Array(dep.nota)].map((_, s) => (
                    <Star key={s} size={14} fill="#C9A84C" color="#C9A84C" />
                  ))}
                </div>
                <p className="depoimento-texto">"{dep.texto}"</p>
                <div className="depoimento-autor">
                  <div className="depoimento-avatar">
                    {dep.nome.charAt(0)}
                  </div>
                  <div>
                    <div className="depoimento-nome">{dep.nome}</div>
                    <div className="depoimento-cargo">{dep.cargo}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== CTA FINAL ====== */}
      <section className="section-sm section-cta">
        <div className="container">
          <motion.div
            className="cta-card"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="cta-glow" />
            <div className="cta-content">
              <span className="section-eyebrow">Pronto para começar?</span>
              <h2>Dê vida à sua marca hoje</h2>
              <p>Mais de 5 mil clientes já confiaram na Camaleão Gráfica. Faça parte desta família.</p>
              <div className="cta-actions">
                <Link to="/produtos">
                  <Button variant="gold" size="xl" iconRight={<ArrowRight size={20} />}>
                    Fazer Pedido Agora
                  </Button>
                </Link>
                <a href="tel:+5584998475461">
                  <Button variant="ghost" size="xl" icon={<Phone size={20} />}>
                    (84) 99847-5461
                  </Button>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
