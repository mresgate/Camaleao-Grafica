// src/pages/Produtos.jsx
import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, SlidersHorizontal, ChevronDown, X } from 'lucide-react';
import ProductCard from '../components/ui/ProductCard';
import { produtos, categorias } from '../data/produtos';
import './Produtos.css';

const ordenacoes = [
  { val: 'destaque', label: 'Destaque' },
  { val: 'preco-asc', label: 'Menor Preço' },
  { val: 'preco-desc', label: 'Maior Preço' },
  { val: 'avaliacao', label: 'Mais Avaliados' },
  { val: 'nome', label: 'Nome A-Z' },
];

export default function Produtos() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [busca, setBusca] = useState(searchParams.get('q') || '');
  const [categoriaAtiva, setCategoriaAtiva] = useState(searchParams.get('cat') || 'todos');
  const [ordenacao, setOrdenacao] = useState('destaque');
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    const q = searchParams.get('q');
    const cat = searchParams.get('cat');
    if (q) setBusca(q);
    if (cat) setCategoriaAtiva(cat);
  }, [searchParams]);

  const produtosFiltrados = useMemo(() => {
    let result = [...produtos];
    if (categoriaAtiva !== 'todos') result = result.filter(p => p.categoria === categoriaAtiva);
    if (busca.trim()) {
      const q = busca.toLowerCase();
      result = result.filter(p => p.nome.toLowerCase().includes(q) || p.descricao.toLowerCase().includes(q));
    }
    switch (ordenacao) {
      case 'preco-asc':   result.sort((a, b) => a.preco - b.preco); break;
      case 'preco-desc':  result.sort((a, b) => b.preco - a.preco); break;
      case 'avaliacao':   result.sort((a, b) => b.avaliacoes - a.avaliacoes); break;
      case 'nome':        result.sort((a, b) => a.nome.localeCompare(b.nome)); break;
      case 'destaque':    result.sort((a, b) => (b.destaque ? 1 : 0) - (a.destaque ? 1 : 0)); break;
    }
    return result;
  }, [busca, categoriaAtiva, ordenacao]);

  const limparFiltros = () => {
    setBusca('');
    setCategoriaAtiva('todos');
    setOrdenacao('destaque');
    setSearchParams({});
  };

  const temFiltros = busca || categoriaAtiva !== 'todos';

  return (
    <main className="produtos-page">
      {/* Page header */}
      <section className="produtos-header">
        <div className="produtos-header-bg" />
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-eyebrow">Catálogo Completo</span>
            <h1 className="produtos-title">Nossos <span className="text-gradient-gold">Produtos</span></h1>
            <p className="produtos-subtitle">
              Qualidade gráfica premium para o seu negócio. Personalização total com entrega para todo o Brasil.
              <br />
              <br />
              <strong>Alguns dos nossos serviços:</strong> serviços gráficos, brindes e personalizados, embalagens, criação de artes, papelaria em geral, itens para formatura e demais eventos, entre outros.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters bar */}
      <div className="produtos-filters-bar">
        <div className="container">
          {/* Search */}
          <div className="filter-search-wrap">
            <Search size={18} className="filter-search-icon" />
            <input
              type="text"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Buscar produto..."
              className="filter-search-input"
            />
            {busca && (
              <button className="filter-clear-btn" onClick={() => setBusca('')}>
                <X size={16} />
              </button>
            )}
          </div>

          {/* Sort */}
          <div className="filter-sort-wrap">
            <SlidersHorizontal size={16} />
            <select
              value={ordenacao}
              onChange={(e) => setOrdenacao(e.target.value)}
              className="filter-sort-select"
            >
              {ordenacoes.map(o => (
                <option key={o.val} value={o.val}>{o.label}</option>
              ))}
            </select>
          </div>

          {/* Results & clear */}
          <div className="filter-results">
            <span>{produtosFiltrados.length} produto{produtosFiltrados.length !== 1 ? 's' : ''}</span>
            {temFiltros && (
              <button onClick={limparFiltros} className="filter-clear-all">
                <X size={14} /> Limpar filtros
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Category tabs */}
      <div className="produtos-cats-bar">
        <div className="container">
          <div className="cats-tabs">
            <button
              className={`cat-tab ${categoriaAtiva === 'todos' ? 'active' : ''}`}
              onClick={() => setCategoriaAtiva('todos')}
            >
              Todos
            </button>
            {categorias.map(cat => (
              <button
                key={cat.id}
                className={`cat-tab ${categoriaAtiva === cat.id ? 'active' : ''}`}
                onClick={() => setCategoriaAtiva(cat.id)}
              >
                {cat.icone} {cat.nome}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="container">
        <AnimatePresence mode="wait">
          {produtosFiltrados.length > 0 ? (
            <motion.div
              key="grid"
              className="produtos-grid-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {produtosFiltrados.map((produto, i) => (
                <ProductCard key={produto.id} produto={produto} index={i} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              className="produtos-empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <span className="produtos-empty-icon">🔍</span>
              <h3>Nenhum produto encontrado</h3>
              <p>Tente outros termos ou remova os filtros aplicados.</p>
              <button onClick={limparFiltros} className="btn btn--gold btn--md">
                Ver todos os produtos
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
