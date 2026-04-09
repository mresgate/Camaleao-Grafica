// src/pages/Admin.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart2, Package, Users, ShoppingBag, Settings, TrendingUp, Eye, Edit, Trash2, Plus, Lock } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useAuthStore } from '../store/authStore';
import { useOrderStore } from '../store/orderStore';
import { vendasMensais, produtosMaisVendidos, clientesMock, pedidosMock } from '../data/pedidos';
import { produtos } from '../data/produtos';
import Button from '../components/ui/Button';
import './Admin.css';

const statusColor = { 
  'Entregue': 'green', 
  'Em produção': 'gold', 
  'Aguardando pagamento': 'orange', 
  'Enviado': 'blue' 
};


const KPI = ({ icon, label, valor, sub, color = 'gold' }) => (
  <div className={`admin-kpi glass admin-kpi--${color}`}>
    <div className="admin-kpi-icon">{icon}</div>
    <div>
      <div className="admin-kpi-valor">{valor}</div>
      <div className="admin-kpi-label">{label}</div>
      {sub && <div className="admin-kpi-sub">{sub}</div>}
    </div>
  </div>
);

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="admin-tooltip glass">
        <p className="admin-tooltip-label">{label}</p>
        <p className="admin-tooltip-val">R$ {payload[0].value.toLocaleString('pt-BR')}</p>
      </div>
    );
  }
  return null;
};

export default function Admin() {
  const { isAdmin, isLoggedIn, login, logout } = useAuthStore();
  const { pedidos, atualizarStatus } = useOrderStore();
  const [tab, setTab] = useState('dashboard');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminSenha, setAdminSenha] = useState('');
  const [adminErro, setAdminErro] = useState('');

  const handleAdminLogin = () => {
    const res = login(adminEmail, adminSenha);
    if (!res.ok || !res.admin) setAdminErro('Acesso negado. Use as credenciais de administrador.');
    else setAdminErro('');
  };

  if (!isLoggedIn || !isAdmin) {
    return (
      <main className="admin-page">
        <div className="container">
          <motion.div className="admin-login glass" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
            <div className="admin-login-icon"><Lock size={32} /></div>
            <h2>Área Administrativa</h2>
            <p>Acesso restrito. Insira as credenciais de administrador.</p>
            <input type="email" placeholder="admin@camaleao.com.br" value={adminEmail} onChange={e => setAdminEmail(e.target.value)} />
            <input type="password" placeholder="Senha" value={adminSenha} onChange={e => setAdminSenha(e.target.value)} />
            {adminErro && <div className="admin-login-erro">{adminErro}</div>}
            <div className="admin-login-hint">💡 Email: admin@camaleao.com.br / Senha: admin2024</div>
            <Button variant="gold" size="lg" fullWidth onClick={handleAdminLogin}>Entrar no Painel</Button>
          </motion.div>
        </div>
      </main>
    );
  }

  const adminTabs = [
    { id: 'dashboard', label: 'Dashboard',  icon: <BarChart2 size={18} /> },
    { id: 'produtos',  label: 'Produtos',   icon: <Package size={18} /> },
    { id: 'pedidos',   label: 'Pedidos',    icon: <ShoppingBag size={18} /> },
    { id: 'clientes',  label: 'Clientes',   icon: <Users size={18} /> },
    { id: 'config',    label: 'Config.',    icon: <Settings size={18} /> },
  ];

  return (
    <main className="admin-page">
      <div className="container">
        {/* Admin top bar */}
        <div className="admin-topbar glass">
          <div className="admin-topbar-left">
            <span className="admin-topbar-logo">
              <img src="/logo.png" alt="" style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
            </span>
            <span className="admin-topbar-title">Painel Admin <span className="admin-topbar-badge">ADMIN</span></span>
          </div>
          <button className="admin-logout-btn" onClick={logout}>Sair</button>
        </div>

        <div className="admin-layout">
          {/* Sidebar */}
          <aside className="admin-sidebar glass">
            {adminTabs.map(t => (
              <button key={t.id} className={`admin-tab-item ${tab === t.id ? 'active' : ''}`} onClick={() => setTab(t.id)}>
                {t.icon} {t.label}
              </button>
            ))}
          </aside>

          {/* Content */}
          <div className="admin-content">
            <AnimatePresence mode="wait">
              {/* Dashboard */}
              {tab === 'dashboard' && (
                <motion.div key="dash" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  <h2 className="admin-section-title">Dashboard</h2>

                  {/* KPIs */}
                  <div className="admin-kpis">
                    <KPI icon={<TrendingUp size={24}/>} label="Receita (Jan)" valor={`R$ ${(19.5 + (pedidos.reduce((acc, p) => acc + p.total, 0) / 1000)).toFixed(1)}k`} sub="+12% vs Dez" color="gold" />
                    <KPI icon={<ShoppingBag size={24}/>} label="Pedidos" valor={87 + pedidos.length} sub="Este mês" color="blue" />
                    <KPI icon={<Users size={24}/>} label="Clientes" valor="312" sub="+28 novos" color="green" />
                    <KPI icon={<Package size={24}/>} label="Produtos" valor={produtos.length} sub="Em catálogo" color="purple" />
                  </div>

                  {/* Vendas chart */}
                  <div className="admin-chart-card glass">
                    <h3 className="admin-chart-title">Vendas Mensais (R$)</h3>
                    <ResponsiveContainer width="100%" height={260}>
                      <AreaChart data={vendasMensais} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <defs>
                          <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#C9A84C" stopOpacity={0.35} />
                            <stop offset="95%" stopColor="#C9A84C" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                        <XAxis dataKey="mes" tick={{ fill: '#888', fontSize: 12 }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fill: '#888', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `R$${(v/1000).toFixed(0)}k`} />
                        <Tooltip content={<CustomTooltip />} />
                        <Area type="monotone" dataKey="vendas" stroke="#C9A84C" strokeWidth={2} fill="url(#goldGrad)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Mais vendidos */}
                  <div className="admin-chart-card glass" style={{ marginTop: '1.5rem' }}>
                    <h3 className="admin-chart-title">Produtos Mais Vendidos</h3>
                    <div className="admin-mais-vendidos">
                      {produtosMaisVendidos.map((p, i) => (
                        <div key={i} className="admin-mv-item">
                          <span className="admin-mv-rank">#{i+1}</span>
                          <span className="admin-mv-nome">{p.nome}</span>
                          <span className="admin-mv-qtd">{p.vendas} un.</span>
                          <span className="admin-mv-receita text-gradient-gold">R$ {p.receita.toLocaleString('pt-BR', {minimumFractionDigits:2})}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Produtos */}
              {tab === 'produtos' && (
                <motion.div key="prods" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  <div className="admin-section-header">
                    <h2 className="admin-section-title">Gestão de Produtos</h2>
                    <Button variant="gold" size="sm" icon={<Plus size={16}/>}>Novo Produto</Button>
                  </div>
                  <div className="admin-table glass">
                    <table>
                      <thead>
                        <tr>
                          <th>Produto</th><th>Categoria</th><th>Preço</th><th>Stock</th><th>Avaliação</th><th>Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        {produtos.map(p => (
                          <tr key={p.id}>
                            <td>
                              <div className="admin-prod-cell">
                                <img src={p.imagem} alt={p.nome} className="admin-prod-img" />
                                <span>{p.nome}</span>
                              </div>
                            </td>
                            <td><span className="admin-tag">{p.categoria}</span></td>
                            <td className="admin-preco">R$ {p.preco.toFixed(2).replace('.',',')}</td>
                            <td>{p.estoque}</td>
                            <td>⭐ {p.avaliacoes}</td>
                            <td>
                              <div className="admin-actions">
                                <button className="admin-action-btn admin-action-btn--view"><Eye size={14}/></button>
                                <button className="admin-action-btn admin-action-btn--edit"><Edit size={14}/></button>
                                <button className="admin-action-btn admin-action-btn--del"><Trash2 size={14}/></button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}

              {/* Pedidos */}
              {tab === 'pedidos' && (
                <motion.div key="peds" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  <h2 className="admin-section-title">Gestão de Pedidos</h2>
                  <div className="admin-table glass">
                    <table>
                      <thead>
                        <tr><th>ID</th><th>Data</th><th>Cliente</th><th>Total</th><th>Status</th><th>Rastreio</th></tr>
                      </thead>
                      <tbody>
                        {[...pedidos, ...pedidosMock].map(p => (
                          <tr key={p.id}>
                            <td><strong style={{color:'var(--color-gold)'}}>{p.id}</strong></td>
                            <td>{p.data}</td>
                            <td>{p.dados?.nome || 'Cliente #' + Math.floor(Math.random()*5+1)}</td>
                            <td className="admin-preco">R$ {p.total.toFixed(2).replace('.',',')}</td>
                            <td>
                              <select 
                                className={`admin-status-select admin-status--${statusColor[p.status] || 'gold'}`}
                                value={p.status}
                                onChange={(e) => atualizarStatus(p.id, e.target.value)}
                              >
                                {['Aguardando pagamento', 'Em produção', 'Enviado', 'Entregue'].map(s => (
                                  <option key={s} value={s}>{s}</option>
                                ))}
                              </select>
                            </td>
                            <td style={{fontSize:'0.82rem',color:'var(--color-text-muted)'}}>{p.rastreio || '—'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}

              {/* Clientes */}
              {tab === 'clientes' && (
                <motion.div key="clts" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  <h2 className="admin-section-title">Gestão de Clientes</h2>
                  <div className="admin-table glass">
                    <table>
                      <thead>
                        <tr><th>Nome</th><th>Email</th><th>Cidade</th><th>Pedidos</th><th>Total Gasto</th></tr>
                      </thead>
                      <tbody>
                        {clientesMock.map(c => (
                          <tr key={c.id}>
                            <td><strong>{c.nome}</strong></td>
                            <td style={{fontSize:'0.85rem',color:'var(--color-text-muted)'}}>{c.email}</td>
                            <td>{c.cidade}</td>
                            <td>{c.totalPedidos}</td>
                            <td className="admin-preco">R$ {c.totalGasto.toFixed(2).replace('.',',')}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}

              {/* Config */}
              {tab === 'config' && (
                <motion.div key="cfg" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  <h2 className="admin-section-title">Configurações</h2>
                  <div className="admin-config-grid">
                    {['Métodos de Envio', 'Gateways de Pagamento', 'Banners do Site', 'Textos & SEO', 'Promoções & Cupons', 'Notificações'].map(item => (
                      <button key={item} className="admin-config-item glass">
                        <Settings size={22} />
                        <span>{item}</span>
                      </button>
                    ))}
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
