// src/pages/MinhaConta.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Package, Upload, MapPin, LogOut, Eye, EyeOff, Truck, Check, Clock, ChevronRight } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useOrderStore } from '../store/orderStore';
import { pedidosMock } from '../data/pedidos';
import Button from '../components/ui/Button';
import './MinhaConta.css';

const statusColor = { 'Entregue': 'green', 'Em produção': 'gold', 'Aguardando pagamento': 'orange', 'Enviado': 'blue' };

export default function MinhaConta() {
  const { isLoggedIn, usuario, login, register, logout } = useAuthStore();
  const { pedidos } = useOrderStore();
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
  const [tabAtiva, setTabAtiva] = useState('pedidos');
  const [showSenha, setShowSenha] = useState(false);
  const [form, setForm] = useState({ email: '', senha: '', nome: '', telefone: '' });
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);
  const [arquivos] = useState([
    { nome: 'cartao-visita-empresa.pdf', tamanho: '4.2 MB', data: '15/01/2024' },
    { nome: 'flyer-promocao.ai', tamanho: '18.7 MB', data: '08/01/2024' },
  ]);

  const upd = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleAuth = async () => {
    setErro('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    if (authMode === 'login') {
      const res = login(form.email, form.senha);
      if (!res.ok) setErro(res.erro);
    } else {
      register({ nome: form.nome, email: form.email, telefone: form.telefone });
    }
    setLoading(false);
  };

  if (!isLoggedIn) {
    return (
      <main className="conta-page">
        <div className="container">
          <div className="conta-auth-wrap">
            <motion.div className="conta-auth-card glass" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
              <div className="conta-auth-logo">
                <img src="/logo.png" alt="" style={{ width: '48px', height: '48px', marginBottom: '1rem', objectFit: 'contain' }} />
              </div>
              <h1 className="conta-auth-title">
                {authMode === 'login' ? 'Entrar na sua conta' : 'Criar conta'}
              </h1>

              <div className="conta-auth-tabs">
                <button className={`conta-auth-tab ${authMode === 'login' ? 'active' : ''}`} onClick={() => setAuthMode('login')}>Entrar</button>
                <button className={`conta-auth-tab ${authMode === 'register' ? 'active' : ''}`} onClick={() => setAuthMode('register')}>Criar Conta</button>
              </div>

              <AnimatePresence mode="wait">
                <motion.div key={authMode} initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
                  <div className="conta-auth-form">
                    {authMode === 'register' && (
                      <div className="form-field">
                        <label>Nome Completo</label>
                        <input name="nome" value={form.nome} onChange={upd} placeholder="João da Silva" />
                      </div>
                    )}
                    <div className="form-field">
                      <label>E-mail</label>
                      <input name="email" type="email" value={form.email} onChange={upd} placeholder="joao@email.com" />
                    </div>
                    <div className="form-field" style={{ position: 'relative' }}>
                      <label>Senha</label>
                      <input name="senha" type={showSenha ? 'text' : 'password'} value={form.senha} onChange={upd} placeholder="••••••••" />
                      <button className="conta-show-senha" type="button" onClick={() => setShowSenha(s => !s)}>
                        {showSenha ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    {authMode === 'register' && (
                      <div className="form-field">
                        <label>Telefone / WhatsApp</label>
                        <input name="telefone" value={form.telefone} onChange={upd} placeholder="(84) 99999-9999" />
                      </div>
                    )}
                    {erro && <div className="conta-auth-erro">{erro}</div>}
                    {authMode === 'login' && (
                      <div className="conta-auth-hint">
                        💡 Admin: admin@camaleao.com.br / admin2024
                      </div>
                    )}
                    <Button variant="gold" size="lg" fullWidth onClick={handleAuth} loading={loading}>
                      {authMode === 'login' ? 'Entrar' : 'Criar Conta'}
                    </Button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </main>
    );
  }

  const tabs = [
    { id: 'pedidos', label: 'Meus Pedidos', icon: <Package size={18} /> },
    { id: 'arquivos', label: 'Meus Arquivos', icon: <Upload size={18} /> },
    { id: 'enderecos', label: 'Endereços', icon: <MapPin size={18} /> },
    { id: 'perfil', label: 'Meu Perfil', icon: <User size={18} /> },
  ];

  return (
    <main className="conta-page">
      <div className="container">
        <div className="conta-layout">
          {/* Sidebar */}
          <aside className="conta-sidebar glass">
            <div className="conta-user-info">
              <div className="conta-avatar">
                <img src="/logo.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>
              <div>
                <div className="conta-user-nome">{usuario?.nome}</div>
                <div className="conta-user-email">{usuario?.email}</div>
              </div>
            </div>
            <nav className="conta-nav">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  className={`conta-nav-item ${tabAtiva === tab.id ? 'active' : ''}`}
                  onClick={() => setTabAtiva(tab.id)}
                >
                  {tab.icon} {tab.label} <ChevronRight size={14} className="conta-nav-arrow" />
                </button>
              ))}
              <button className="conta-nav-item conta-nav-item--logout" onClick={logout}>
                <LogOut size={18} /> Sair da Conta
              </button>
            </nav>
          </aside>

          {/* Content */}
          <div className="conta-content">
            <AnimatePresence mode="wait">
              {/* Pedidos */}
              {tabAtiva === 'pedidos' && (
                <motion.div key="pedidos" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  <h2 className="conta-section-title">Meus Pedidos</h2>
                  <div className="pedidos-lista">
                    {[...pedidos, ...pedidosMock].map(p => (
                      <div key={p.id} className="pedido-card glass">
                        <div className="pedido-header">
                          <div>
                            <div className="pedido-id">{p.id}</div>
                            <div className="pedido-data">Realizado em {p.data}</div>
                          </div>
                          <div className={`pedido-status pedido-status--${statusColor[p.status] || 'gold'}`}>
                            {p.status === 'Entregue' ? <Check size={14} /> : <Clock size={14} />}
                            {p.status}
                          </div>
                        </div>
                        {p.itens.map((item, i) => (
                          <div key={i} className="pedido-item">
                            <span>{item.nome}</span>
                            <span>{item.qtd.toLocaleString('pt-BR')} un.</span>
                            <span>R$ {item.subtotal.toFixed(2).replace('.', ',')}</span>
                          </div>
                        ))}
                        <div className="pedido-footer">
                          <span className="pedido-total">Total: <strong className="text-gradient-gold">R$ {p.total.toFixed(2).replace('.', ',')}</strong></span>
                          {p.rastreio && (
                            <div className="pedido-rastreio">
                              <Truck size={14} />
                              Rastreio: <span>{p.rastreio}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Arquivos */}
              {tabAtiva === 'arquivos' && (
                <motion.div key="arquivos" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  <h2 className="conta-section-title">Meus Arquivos de Arte</h2>
                  <div className="arquivos-upload-area">
                    <Upload size={32} color="var(--color-gold)" />
                    <p>Arraste ficheiros ou <span className="arquivos-upload-link">clique para fazer upload</span></p>
                    <span className="arquivos-hint">PDF, AI, CDR, PSD, PNG, JPG · Máx. 300MB por arquivo</span>
                  </div>
                  <div className="arquivos-lista">
                    {arquivos.map((arq, i) => (
                      <div key={i} className="arquivo-item glass">
                        <span className="arquivo-icon">📄</span>
                        <div className="arquivo-info">
                          <span className="arquivo-nome">{arq.nome}</span>
                          <span className="arquivo-meta">{arq.tamanho} · Enviado em {arq.data}</span>
                        </div>
                        <Button variant="ghost" size="sm">Baixar</Button>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Endereços */}
              {tabAtiva === 'enderecos' && (
                <motion.div key="enderecos" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  <h2 className="conta-section-title">Endereços Salvos</h2>
                  <div className="endereco-card glass">
                    <div className="endereco-badge">Principal</div>
                    <p className="endereco-texto">
                      {usuario?.cidade || 'Natal, RN'}<br />
                      CEP 59000-000
                    </p>
                    <Button variant="outline" size="sm">Editar</Button>
                  </div>
                  <Button variant="ghost" size="md" icon={<MapPin size={16}/>}>
                    + Adicionar Novo Endereço
                  </Button>
                </motion.div>
              )}

              {/* Perfil */}
              {tabAtiva === 'perfil' && (
                <motion.div key="perfil" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  <h2 className="conta-section-title">Meu Perfil</h2>
                  <div className="perfil-form glass">
                    <div className="checkout-form-grid">
                      <div className="form-field"><label>Nome</label><input defaultValue={usuario?.nome} /></div>
                      <div className="form-field"><label>E-mail</label><input defaultValue={usuario?.email} /></div>
                      <div className="form-field"><label>Telefone</label><input defaultValue={usuario?.telefone} /></div>
                      <div className="form-field"><label>Cidade</label><input defaultValue={usuario?.cidade} /></div>
                    </div>
                    <Button variant="gold" size="md">Salvar Alterações</Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </main>
  );
}
