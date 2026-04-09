// src/components/ui/ProductCard.jsx
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, Zap } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import './ProductCard.css';

export default function ProductCard({ produto, index = 0 }) {
  const { addItem } = useCartStore();

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(produto, {}, 1);
  };

  const desconto = produto.precoOriginal
    ? Math.round(((produto.precoOriginal - produto.preco) / produto.precoOriginal) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <Link to={`/produto/${produto.id}`} className="product-card glass">
        {/* Badges */}
        <div className="product-card-badges">
          {desconto > 0 && <span className="product-badge product-badge--sale">-{desconto}%</span>}
          {produto.destaque && <span className="product-badge product-badge--hot"><Zap size={11} /> Destaque</span>}
        </div>

        {/* Image */}
        <div className="product-card-img-wrap">
          <img src={produto.imagem} alt={produto.nome} className="product-card-img" loading="lazy" />
          <div className="product-card-img-overlay" />
          <motion.button
            className="product-card-quick-add"
            onClick={handleQuickAdd}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ShoppingCart size={16} />
            Adicionar
          </motion.button>
        </div>

        {/* Body */}
        <div className="product-card-body">
          <span className="product-card-category">{produto.categoria.replace('-', ' ')}</span>
          <h3 className="product-card-name">{produto.nome}</h3>

          {/* Stars */}
          <div className="product-card-rating">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={13}
                className={i < Math.round(produto.avaliacoes) ? 'star-filled' : 'star-empty'}
                fill={i < Math.round(produto.avaliacoes) ? '#00C26B' : 'none'}
              />
            ))}
            <span className="product-card-rating-count">({produto.numAvaliacoes})</span>
          </div>

          {/* Price */}
          <div className="product-card-price">
            {produto.precoOriginal && (
              <span className="product-price-original">R$ {produto.precoOriginal.toFixed(2).replace('.', ',')}</span>
            )}
            <span className="product-price-current">R$ {produto.preco.toFixed(2).replace('.', ',')}</span>
          </div>

          <span className="product-card-prazo">⏱ {produto.prazoProd}</span>
        </div>
      </Link>
    </motion.div>
  );
}
