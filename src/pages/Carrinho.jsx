// src/pages/Carrinho.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, MapPin, Truck, Package, Zap } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import Button from '../components/ui/Button';
import './Carrinho.css';

const opcoesFrete = [
  { id: 'pac',     nome: 'PAC – Correios',    preco: 18.90, prazo: '8-12 dias úteis', icon: <Package size={18}/> },
  { id: 'sedex',   nome: 'SEDEX – Correios',  preco: 34.70, prazo: '2-4 dias úteis',  icon: <Truck size={18}/> },
  { id: 'jadlog',  nome: 'JadLog Econômico',  preco: 22.50, prazo: '5-8 dias úteis',  icon: <Truck size={18}/> },
  { id: 'expresso',nome: 'Expresso Camaleão', preco: 0,     prazo: 'Retirada na loja', icon: <Zap size={18}/> },
];

export default function Carrinho() {
  const navigate = useNavigate();
  const { itens, removeItem, updateQuantidade, frete, setFrete, cepDestino, setCep, total } = useCartStore();
  const [cep, setCepLocal] = useState(cepDestino || '');
  const [cepValido, setCepValido] = useState(false);
  const [loadingCep, setLoadingCep] = useState(false);
  const [freteOpcoes, setFreteOpcoes] = useState([]);
  const [freteSel, setFreteSel] = useState(frete?.id || null);

  const totalCarrinho = itens.reduce((acc, i) => acc + i.preco * i.quantidade, 0);
  const temFreteGratisLocal = totalCarrinho >= 200;

  const getFretePreco = (freteOp) => {
    if (!freteOp) return 0;
    if (temFreteGratisLocal && (freteOp.id === 'pac' || freteOp.id === 'sedex' || freteOp.id === 'jadlog')) {
      return 0; // Você pode limitar a quais métodos são grátis, aqui aplicando a todos ou pode criar um método específico. Vamos manter o preço original, mas dar desconto no calculo.
    }
    return freteOp.preco;
  };

  const calcularPrecoFreteAplicado = (op) => temFreteGratisLocal ? 0 : op.preco;
  const totalComFrete = totalCarrinho + (frete ? calcularPrecoFreteAplicado(frete) : 0);

  const calcularFrete = async () => {
    const cepLimpo = cep.replace(/\D/g, '');
    if (cepLimpo.length !== 8) return;
    setLoadingCep(true);
    await new Promise(r => setTimeout(r, 1200));
    setFreteOpcoes(opcoesFrete);
    setCepValido(true);
    setCep(cep);
    setLoadingCep(false);
  };

  const selecionarFrete = (op) => {
    setFreteSel(op.id);
    setFrete(op);
  };

  if (itens.length === 0) {
    return (
      <main className="carrinho-page">
        <div className="container">
          <motion.div
            className="carrinho-empty"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="carrinho-empty-icon">🛒</span>
            <h2>O seu carrinho está vazio</h2>
            <p>Adicione produtos ao carrinho para continuar a compra.</p>
            <Link to="/produtos">
              <Button variant="gold" size="lg" iconRight={<ArrowRight size={18} />}>
                Explorar Produtos
              </Button>
            </Link>
          </motion.div>
        </div>
      </main>
    );
  }

  return (
    <main className="carrinho-page">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="carrinho-header">
            <h1>Carrinho <span className="text-gradient-gold">({itens.length} {itens.length === 1 ? 'item' : 'itens'})</span></h1>
          </div>

          <div className="carrinho-layout">
            {/* Items */}
            <div className="carrinho-itens">
              <AnimatePresence>
                {itens.map((item) => (
                  <motion.div
                    key={item.key}
                    className="carrinho-item glass"
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img src={item.produto.imagem} alt={item.produto.nome} className="carrinho-item-img" />
                    <div className="carrinho-item-info">
                      <Link to={`/produto/${item.produto.id}`} className="carrinho-item-nome">
                        {item.produto.nome}
                      </Link>
                      <div className="carrinho-item-opcoes">
                        {Object.entries(item.opcoes).map(([k, v]) => (
                          <span key={k}>{k}: {v}</span>
                        ))}
                      </div>
                      <div className="carrinho-item-preco">
                        R$ {item.preco.toFixed(2).replace('.', ',')}
                      </div>
                    </div>

                    <div className="carrinho-item-actions">
                      <div className="produto-qty-ctrl">
                        <button onClick={() => updateQuantidade(item.key, item.quantidade - 1)}><Minus size={14}/></button>
                        <span>{item.quantidade}</span>
                        <button onClick={() => updateQuantidade(item.key, item.quantidade + 1)}><Plus size={14}/></button>
                      </div>
                      <div className="carrinho-item-subtotal">
                        R$ {(item.preco * item.quantidade).toFixed(2).replace('.', ',')}
                      </div>
                      <button className="carrinho-remove-btn" onClick={() => removeItem(item.key)}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Sidebar resumo */}
            <div className="carrinho-sidebar">
              {/* Frete */}
              <div className="carrinho-frete glass">
                <h3 className="carrinho-sidebar-title">
                  <MapPin size={18} /> Calcular Frete
                </h3>
                <div className="carrinho-cep-row">
                  <input
                    type="text"
                    value={cep}
                    onChange={(e) => {
                      let v = e.target.value.replace(/\D/g,'');
                      if (v.length > 5) v = v.slice(0,5) + '-' + v.slice(5,8);
                      setCepLocal(v);
                      setCepValido(false);
                      setFreteOpcoes([]);
                    }}
                    placeholder="00000-000"
                    maxLength={9}
                    className="carrinho-cep-input"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={calcularFrete}
                    loading={loadingCep}
                  >
                    Calcular
                  </Button>
                </div>

                <AnimatePresence>
                  {freteOpcoes.length > 0 && (
                    <motion.div
                      className="carrinho-frete-opcoes"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                    >
                      {freteOpcoes.map(op => (
                        <button
                          key={op.id}
                          className={`carrinho-frete-op ${freteSel === op.id ? 'active' : ''}`}
                          onClick={() => selecionarFrete(op)}
                        >
                          <span className="carrinho-frete-icon">{op.icon}</span>
                          <div className="carrinho-frete-info">
                            <span className="carrinho-frete-nome">{op.nome}</span>
                            <span className="carrinho-frete-prazo">{op.prazo}</span>
                          </div>
                          <span className="carrinho-frete-preco">
                            {calcularPrecoFreteAplicado(op) === 0 ? 'Grátis' : `R$ ${calcularPrecoFreteAplicado(op).toFixed(2).replace('.', ',')}`}
                          </span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Resumo */}
              <div className="carrinho-resumo glass">
                <h3 className="carrinho-sidebar-title"><ShoppingBag size={18} /> Resumo do Pedido</h3>
                <div className="carrinho-resumo-linha">
                  <span>Subtotal</span>
                  <span>R$ {totalCarrinho.toFixed(2).replace('.', ',')}</span>
                </div>
                <div className="carrinho-resumo-linha">
                  <span>Frete {temFreteGratisLocal && <span className="text-gradient-gold" style={{ fontSize: '0.75rem', marginLeft: '0.25rem' }}>(Grátis)</span>}</span>
                  <span>{frete ? (calcularPrecoFreteAplicado(frete) === 0 ? 'Grátis' : `R$ ${calcularPrecoFreteAplicado(frete).toFixed(2).replace('.', ',')}`) : '—'}</span>
                </div>
                <div className="carrinho-resumo-total">
                  <span>Total</span>
                  <span className="text-gradient-gold">R$ {totalComFrete.toFixed(2).replace('.', ',')}</span>
                </div>

                <Button
                  variant="gold"
                  size="lg"
                  fullWidth
                  onClick={() => navigate('/checkout')}
                  iconRight={<ArrowRight size={18} />}
                >
                  Finalizar Compra
                </Button>

                <a
                  href={`https://wa.me/5584998475461?text=Olá!%20Gostaria%20de%20finalizar%20meu%20pedido%20pelo%20WhatsApp.`}
                  target="_blank" rel="noopener"
                  className="carrinho-whatsapp-btn"
                >
                  💬 Finalizar pelo WhatsApp
                </a>

                <div className="carrinho-seguranca">
                  🔒 Compra 100% segura e protegida
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
