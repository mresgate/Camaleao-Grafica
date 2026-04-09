// src/pages/Produto.jsx
import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, ArrowLeft, Star, Upload, Check, Plus, Minus, MessageSquare, Truck, Shield, Zap } from 'lucide-react';
import { getProdutoById } from '../data/produtos';
import { useCartStore } from '../store/cartStore';
import Button from '../components/ui/Button';
import './Produto.css';

export default function Produto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const produto = getProdutoById(id);
  const { addItem } = useCartStore();

  const [imgAtiva, setImgAtiva] = useState(0);
  const [quantidade, setQuantidade] = useState(1);
  const [opcoesSel, setOpcoesSel] = useState({});
  const [arquivoArte, setArquivoArte] = useState(null);
  const [adicionado, setAdicionado] = useState(false);
  const [tabAtiva, setTabAtiva] = useState('descricao');

  if (!produto) {
    return (
      <div className="produto-not-found">
        <h2>Produto não encontrado</h2>
        <Link to="/produtos"><Button variant="gold">Ver Catálogo</Button></Link>
      </div>
    );
  }

  const opcKeys = produto.opcoes ? Object.keys(produto.opcoes) : [];

  const handleAddToCart = () => {
    addItem(produto, opcoesSel, quantidade, arquivoArte?.name);
    setAdicionado(true);
    setTimeout(() => setAdicionado(false), 2500);
  };

  const handleArteUpload = (e) => {
    const file = e.target.files[0];
    if (file) setArquivoArte(file);
  };

  const desconto = produto.precoOriginal
    ? Math.round(((produto.precoOriginal - produto.preco) / produto.precoOriginal) * 100)
    : 0;

  return (
    <main className="produto-page">
      <div className="container">
        {/* Breadcrumb */}
        <div className="produto-breadcrumb">
          <Link to="/produtos" className="produto-back">
            <ArrowLeft size={16} /> Voltar ao Catálogo
          </Link>
          <span className="produto-breadcrumb-sep">/</span>
          <span>{produto.nome}</span>
        </div>

        {/* Main content */}
        <div className="produto-grid">
          {/* Gallery */}
          <div className="produto-gallery">
            <motion.div
              className="produto-img-main"
              layoutId={`produto-img-${produto.id}`}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={imgAtiva}
                  src={produto.imagens[imgAtiva]}
                  alt={produto.nome}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </AnimatePresence>
              {desconto > 0 && <span className="produto-img-badge">-{desconto}%</span>}
            </motion.div>

            {produto.imagens.length > 1 && (
              <div className="produto-thumbnails">
                {produto.imagens.map((img, i) => (
                  <button
                    key={i}
                    className={`produto-thumb ${i === imgAtiva ? 'active' : ''}`}
                    onClick={() => setImgAtiva(i)}
                  >
                    <img src={img} alt="" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="produto-info">
            <span className="produto-categoria">{produto.categoria}</span>
            <h1 className="produto-nome">{produto.nome}</h1>

            {/* Rating */}
            <div className="produto-rating">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill={i < Math.round(produto.avaliacoes) ? '#00C26B' : 'none'} color={i < Math.round(produto.avaliacoes) ? '#00C26B' : '#555'} />
              ))}
              <span className="produto-rating-val">{produto.avaliacoes}</span>
              <span className="produto-rating-count">({produto.numAvaliacoes} avaliações)</span>
            </div>

            {/* Price */}
            <div className="produto-price-block">
              {produto.precoOriginal && (
                <span className="produto-price-original">R$ {produto.precoOriginal.toFixed(2).replace('.', ',')}</span>
              )}
              <span className="produto-price-current text-gradient-gold">
                R$ {produto.preco.toFixed(2).replace('.', ',')}
              </span>
              {desconto > 0 && <span className="produto-price-tag">Economize {desconto}%</span>}
            </div>

            <p className="produto-descricao">{produto.descricao}</p>

            {/* Options */}
            {opcKeys.filter(k => k !== 'quantidade').map((key) => (
              <div key={key} className="produto-opcao">
                <label className="produto-opcao-label">{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
                <div className="produto-opcao-btns">
                  {produto.opcoes[key].map((val) => (
                    <button
                      key={val}
                      className={`produto-opcao-btn ${opcoesSel[key] === val ? 'active' : ''}`}
                      onClick={() => setOpcoesSel(prev => ({ ...prev, [key]: val }))}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {/* Quantidade */}
            {produto.opcoes?.quantidade && (
              <div className="produto-opcao">
                <label className="produto-opcao-label">Quantidade:</label>
                <div className="produto-opcao-btns">
                  {produto.opcoes.quantidade.map((val) => (
                    <button
                      key={val}
                      className={`produto-opcao-btn ${opcoesSel.quantidade === val ? 'active' : ''}`}
                      onClick={() => setOpcoesSel(prev => ({ ...prev, quantidade: val }))}
                    >
                      {val.toLocaleString('pt-BR')} un.
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Upload arte */}
            <div className="produto-upload-arte">
              <label className="produto-upload-label">
                <Upload size={18} />
                <div>
                  <span className="produto-upload-title">
                    {arquivoArte ? `✅ ${arquivoArte.name}` : 'Enviar Arquivo de Arte'}
                  </span>
                  <span className="produto-upload-hint">PDF, AI, CDR, PSD, PNG (máx. 300MB)</span>
                </div>
                <input type="file" accept=".pdf,.ai,.cdr,.psd,.png,.jpg,.eps" onChange={handleArteUpload} hidden />
              </label>
            </div>

            {/* Add to cart */}
            <div className="produto-cart-row">
              <div className="produto-qty-ctrl">
                <button onClick={() => setQuantidade(q => Math.max(1, q - 1))}><Minus size={16} /></button>
                <span>{quantidade}</span>
                <button onClick={() => setQuantidade(q => q + 1)}><Plus size={16} /></button>
              </div>

              <Button
                variant={adicionado ? 'ghost' : 'gold'}
                size="lg"
                fullWidth
                onClick={handleAddToCart}
                icon={adicionado ? <Check size={20} /> : <ShoppingCart size={20} />}
              >
                {adicionado ? 'Adicionado ao Carrinho!' : 'Adicionar ao Carrinho'}
              </Button>
            </div>

            {/* WhatsApp */}
            <a
              href={`https://wa.me/5584998475461?text=Olá!%20Tenho%20interesse%20no%20produto:%20${encodeURIComponent(produto.nome)}`}
              target="_blank" rel="noopener"
              className="produto-whatsapp"
            >
              <MessageSquare size={18} />
              Pedir por WhatsApp / Solicitar Orçamento
            </a>

            {/* Guarantees */}
            <div className="produto-garantias">
              {[
                { icon: <Shield size={16} />, text: 'Arte revisada gratuita' },
                { icon: <Zap size={16} />, text: produto.prazoProd },
                { icon: <Truck size={16} />, text: 'Envio para todo Brasil' },
              ].map((g, i) => (
                <div key={i} className="produto-garantia">
                  {g.icon}
                  <span>{g.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="produto-tabs">
          <div className="produto-tabs-nav">
            {['descricao', 'detalhes', 'avaliacoes'].map(tab => (
              <button
                key={tab}
                className={`produto-tab-btn ${tabAtiva === tab ? 'active' : ''}`}
                onClick={() => setTabAtiva(tab)}
              >
                {tab === 'descricao' ? 'Descrição' : tab === 'detalhes' ? 'Detalhes Técnicos' : 'Avaliações'}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={tabAtiva}
              className="produto-tab-content glass"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              {tabAtiva === 'descricao' && (
                <div>
                  <p style={{ lineHeight: 1.8, color: 'var(--color-text-muted)' }}>{produto.descricao}</p>
                </div>
              )}
              {tabAtiva === 'detalhes' && (
                <div className="produto-detalhes-list">
                  {produto.detalhes.split('·').map((item, i) => (
                    <div key={i} className="produto-detalhe-item">
                      <Check size={16} className="produto-detalhe-check" />
                      <span>{item.trim()}</span>
                    </div>
                  ))}
                </div>
              )}
              {tabAtiva === 'avaliacoes' && (
                <div className="produto-avaliacoes">
                  <div className="produto-av-score">
                    <span className="produto-av-num text-gradient-gold">{produto.avaliacoes}</span>
                    <div>
                      <div className="produto-rating" style={{ marginBottom: '0.3rem' }}>
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={20} fill={i < Math.round(produto.avaliacoes) ? '#00C26B' : 'none'} color={i < Math.round(produto.avaliacoes) ? '#00C26B' : '#555'} />
                        ))}
                      </div>
                      <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>{produto.numAvaliacoes} avaliações</span>
                    </div>
                  </div>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                    As avaliações dos clientes são verificadas. Apenas compradores confirmados podem avaliar.
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
