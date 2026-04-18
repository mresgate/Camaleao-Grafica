// src/pages/Checkout.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronRight, CreditCard, QrCode, FileText, Smartphone, Lock, ArrowLeft } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useOrderStore } from '../store/orderStore';
import Button from '../components/ui/Button';
import './Checkout.css';

const STEPS = ['Dados Pessoais', 'Endereço', 'Pagamento', 'Confirmação'];

const BANDEIRAS = ['Visa', 'Mastercard', 'Elo', 'Hipercard', 'Amex'];

export default function Checkout() {
  const navigate = useNavigate();
  const { itens, frete, clearCart } = useCartStore();
  const { adicionarPedido } = useOrderStore();
  const [step, setStep] = useState(0);
  const [pagamento, setPagamento] = useState('pix');
  const [loading, setLoading] = useState(false);
  const [pedidoConcluido, setPedidoConcluido] = useState(false);
  const [ultimoPedidoId, setUltimoPedidoId] = useState('');

  const [dados, setDados] = useState({ nome: '', email: '', cpf: '', telefone: '' });
  const [endereco, setEndereco] = useState({ cep: '', rua: '', numero: '', complemento: '', bairro: '', cidade: '', estado: '' });
  const [cartao, setCartao] = useState({ numero: '', nome: '', validade: '', cvv: '', parcelas: '1x sem juros' });

  const total = itens.reduce((acc, i) => acc + i.preco * i.quantidade, 0);
  const temFreteGratisLocal = total >= 200;
  const calcularPrecoFreteAplicado = (op) => temFreteGratisLocal ? 0 : op?.preco || 0;
  const precoFreteAplicado = calcularPrecoFreteAplicado(frete);
  const totalComFrete = total + precoFreteAplicado;

  const upd = (setter) => (e) => setter(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const finalizarPedido = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 2000));
    
    // Salvar pedido no store
    const novoPedido = {
      itens: itens.map(i => ({ nome: i.produto.nome, qtd: i.quantidade, subtotal: i.preco * i.quantidade })),
      total: totalComFrete,
      frete: precoFreteAplicado,
      pagamento,
      dados,
      endereco
    };
    
    // Adicionar ao store e pegar o ID gerado (simulado através de retorno ou apenas acompanhando o estado)
    // Como o store gera o ID internamente, vamos apenas simular um ID local para o feedback imediato
    const tempId = `CAM-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    adicionarPedido({ ...novoPedido, id: tempId });
    setUltimoPedidoId(tempId);

    setPedidoConcluido(true);
    clearCart();
    setLoading(false);
    setStep(3);
  };

  if (pedidoConcluido) {
    return (
      <main className="checkout-page">
        <div className="container">
          <motion.div
            className="checkout-success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="checkout-success-icon">
              <Check size={48} />
            </div>
            <h1>Pedido Confirmado! 🎉</h1>
            <p className="checkout-success-sub">
              O seu pedido foi recebido com sucesso. Enviaremos um e-mail de confirmação e você pode acompanhar o seu pedido na área do cliente.
            </p>
            <div className="checkout-success-codigo">
              <span>Código do Pedido</span>
              <strong className="text-gradient-gold">{ultimoPedidoId}</strong>
            </div>
            <div className="checkout-success-actions">
              <Button variant="gold" size="lg" onClick={() => navigate('/minha-conta')}>
                Ver Meus Pedidos
              </Button>
              <Button variant="ghost" size="lg" onClick={() => navigate('/produtos')}>
                Continuar Comprando
              </Button>
            </div>
          </motion.div>
        </div>
      </main>
    );
  }

  return (
    <main className="checkout-page">
      <div className="container">
        <div className="checkout-header">
          <button className="checkout-back" onClick={() => step > 0 ? setStep(s => s - 1) : navigate('/carrinho')}>
            <ArrowLeft size={18} /> {step === 0 ? 'Voltar ao Carrinho' : 'Passo Anterior'}
          </button>
          <h1 className="checkout-title">Finalizar <span className="text-gradient-gold">Compra</span></h1>
        </div>

        {/* Stepper */}
        <div className="checkout-stepper">
          {STEPS.map((s, i) => (
            <div key={s} className={`stepper-item ${i <= step ? 'active' : ''} ${i < step ? 'done' : ''}`}>
              <div className="stepper-circle">
                {i < step ? <Check size={14} /> : i + 1}
              </div>
              <span className="stepper-label">{s}</span>
              {i < STEPS.length - 1 && <div className="stepper-line" />}
            </div>
          ))}
        </div>

        <div className="checkout-layout">
          {/* Form area */}
          <div className="checkout-form-area">
            <AnimatePresence mode="wait">
              {/* Step 0 — Dados Pessoais */}
              {step === 0 && (
                <motion.div key="step0" className="checkout-step glass" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
                  <h2 className="checkout-step-title">Dados Pessoais</h2>
                  <div className="checkout-form-grid">
                    <div className="form-field">
                      <label>Nome Completo</label>
                      <input name="nome" value={dados.nome} onChange={upd(setDados)} placeholder="João da Silva" />
                    </div>
                    <div className="form-field">
                      <label>E-mail</label>
                      <input name="email" type="email" value={dados.email} onChange={upd(setDados)} placeholder="joao@email.com" />
                    </div>
                    <div className="form-field">
                      <label>CPF / CNPJ</label>
                      <input name="cpf" value={dados.cpf} onChange={upd(setDados)} placeholder="000.000.000-00" />
                    </div>
                    <div className="form-field">
                      <label>Telefone / WhatsApp</label>
                      <input name="telefone" value={dados.telefone} onChange={upd(setDados)} placeholder="(84) 99999-9999" />
                    </div>
                  </div>
                  <Button variant="gold" size="lg" fullWidth onClick={() => setStep(1)} iconRight={<ChevronRight size={18} />}>
                    Continuar para Endereço
                  </Button>
                </motion.div>
              )}

              {/* Step 1 — Endereço */}
              {step === 1 && (
                <motion.div key="step1" className="checkout-step glass" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
                  <h2 className="checkout-step-title">Endereço de Entrega</h2>
                  <div className="checkout-form-grid">
                    <div className="form-field">
                      <label>CEP</label>
                      <input name="cep" value={endereco.cep} onChange={upd(setEndereco)} placeholder="00000-000" />
                    </div>
                    <div className="form-field form-field--full">
                      <label>Rua / Logradouro</label>
                      <input name="rua" value={endereco.rua} onChange={upd(setEndereco)} placeholder="Rua das Flores" />
                    </div>
                    <div className="form-field form-field--sm">
                      <label>Número</label>
                      <input name="numero" value={endereco.numero} onChange={upd(setEndereco)} placeholder="123" />
                    </div>
                    <div className="form-field">
                      <label>Complemento</label>
                      <input name="complemento" value={endereco.complemento} onChange={upd(setEndereco)} placeholder="Apto 42, Bloco B" />
                    </div>
                    <div className="form-field">
                      <label>Bairro</label>
                      <input name="bairro" value={endereco.bairro} onChange={upd(setEndereco)} placeholder="Centro" />
                    </div>
                    <div className="form-field">
                      <label>Cidade</label>
                      <input name="cidade" value={endereco.cidade} onChange={upd(setEndereco)} placeholder="Natal" />
                    </div>
                    <div className="form-field form-field--sm">
                      <label>Estado</label>
                      <input name="estado" value={endereco.estado} onChange={upd(setEndereco)} placeholder="RN" maxLength={2} />
                    </div>
                  </div>
                  <Button variant="gold" size="lg" fullWidth onClick={() => setStep(2)} iconRight={<ChevronRight size={18} />}>
                    Continuar para Pagamento
                  </Button>
                </motion.div>
              )}

              {/* Step 2 — Pagamento */}
              {step === 2 && (
                <motion.div key="step2" className="checkout-step glass" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
                  <h2 className="checkout-step-title">Forma de Pagamento</h2>

                  {/* Payment tabs */}
                  <div className="pagamento-tabs">
                    {[
                      { id: 'pix',    label: 'PIX',         icon: <QrCode size={18} /> },
                      { id: 'cartao', label: 'Cartão',       icon: <CreditCard size={18} /> },
                      { id: 'boleto', label: 'Boleto',       icon: <FileText size={18} /> },
                      { id: 'wallet', label: 'Carteira',     icon: <Smartphone size={18} /> },
                    ].map(tab => (
                      <button key={tab.id} className={`pagamento-tab ${pagamento === tab.id ? 'active' : ''}`} onClick={() => setPagamento(tab.id)}>
                        {tab.icon} {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* PIX */}
                  {pagamento === 'pix' && (
                    <div className="pix-area">
                      <div className="pix-qr-mock">
                        <div className="pix-qr-inner">
                          <QrCode size={80} color="var(--color-gold)" />
                          <span>QR Code PIX</span>
                        </div>
                      </div>
                      <div className="pix-instructions">
                        <p>1. Abra o app do seu banco e escolha <strong>Pagar com PIX</strong></p>
                        <p>2. Escaneie o QR Code ou copie a chave abaixo</p>
                        <p>3. Confirme o pagamento — aprovação <strong>instantânea</strong></p>
                        <div className="pix-key-box">
                          <span>Chave PIX: camaleao.grafica@hotmail.com</span>
                          <button onClick={() => navigator.clipboard?.writeText('camaleao.grafica@hotmail.com')} className="pix-copy-btn">Copiar</button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Cartão */}
                  {pagamento === 'cartao' && (
                    <div className="checkout-form-grid" style={{ marginTop: '1rem' }}>
                      <div className="form-field form-field--full">
                        <label>Número do Cartão</label>
                        <input name="numero" value={cartao.numero} onChange={upd(setCartao)} placeholder="0000 0000 0000 0000" maxLength={19} />
                        <div className="cartao-bandeiras">
                          {BANDEIRAS.map(b => <span key={b} className="cartao-bandeira">{b}</span>)}
                        </div>
                      </div>
                      <div className="form-field form-field--full">
                        <label>Nome no Cartão</label>
                        <input name="nome" value={cartao.nome} onChange={upd(setCartao)} placeholder="NOME SOBRENOME" style={{ textTransform: 'uppercase' }} />
                      </div>
                      <div className="form-field">
                        <label>Validade</label>
                        <input name="validade" value={cartao.validade} onChange={upd(setCartao)} placeholder="MM/AA" maxLength={5} />
                      </div>
                      <div className="form-field">
                        <label>CVV</label>
                        <input name="cvv" value={cartao.cvv} onChange={upd(setCartao)} placeholder="123" maxLength={4} type="password" />
                      </div>
                      <div className="form-field form-field--full">
                        <label>Parcelas</label>
                        <select name="parcelas" value={cartao.parcelas} onChange={upd(setCartao)}>
                          {[...Array(12)].map((_, i) => (
                            <option key={i+1} value={`${i+1}x`}>{i+1}x de R$ {(totalComFrete / (i+1)).toFixed(2).replace('.', ',')} {i === 0 ? 'sem juros' : '+ juros'}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}

                  {/* Boleto */}
                  {pagamento === 'boleto' && (
                    <div className="boleto-area">
                      <div className="boleto-icon"><FileText size={48} /></div>
                      <p>O boleto bancário será gerado após a confirmação do pedido. Prazo de compensação: <strong>1-2 dias úteis</strong>.</p>
                      <p style={{ fontSize: '0.82rem', color: 'var(--color-text-faint)' }}>⚠️ A produção só inicia após a compensação do boleto.</p>
                    </div>
                  )}

                  {/* Carteira digital */}
                  {pagamento === 'wallet' && (
                    <div className="wallet-area">
                      {[
                        { nome: 'WhatsApp Pay', icon: '💬', desc: 'Pague diretamente pelo WhatsApp' },
                        { nome: 'PicPay', icon: '📱', desc: 'Pague com saldo PicPay ou cartão' },
                        { nome: 'Mercado Pago', icon: '🔵', desc: 'Usuários Mercado Livre e mais' },
                      ].map(w => (
                        <button key={w.nome} className="wallet-option">
                          <span className="wallet-icon">{w.icon}</span>
                          <div>
                            <div className="wallet-nome">{w.nome}</div>
                            <div className="wallet-desc">{w.desc}</div>
                          </div>
                          <ChevronRight size={16} />
                        </button>
                      ))}
                    </div>
                  )}

                  <div className="checkout-seguranca">
                    <Lock size={14} /> Pagamento seguro com criptografia SSL 256-bit
                  </div>

                  <Button variant="gold" size="lg" fullWidth onClick={finalizarPedido} loading={loading} iconRight={<Check size={18} />}>
                    Confirmar e Pagar — R$ {totalComFrete.toFixed(2).replace('.', ',')}
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Order summary */}
          <div className="checkout-resumo-sidebar glass">
            <h3 className="checkout-resumo-title">Resumo do Pedido</h3>
            {itens.map(item => (
              <div key={item.key} className="checkout-resumo-item">
                <img src={item.produto.imagem} alt={item.produto.nome} className="checkout-resumo-img" />
                <div className="checkout-resumo-info">
                  <span>{item.produto.nome}</span>
                  <span className="checkout-resumo-qtd">Qtd: {item.quantidade}</span>
                </div>
                <span className="checkout-resumo-preco">
                  R$ {(item.preco * item.quantidade).toFixed(2).replace('.', ',')}
                </span>
              </div>
            ))}
            <div className="checkout-resumo-linha">
              <span>Subtotal</span><span>R$ {total.toFixed(2).replace('.', ',')}</span>
            </div>
            <div className="checkout-resumo-linha">
              <span>Frete {temFreteGratisLocal && <span className="text-gradient-gold" style={{ fontSize: '0.75rem', marginLeft: '0.25rem' }}>(Grátis)</span>}</span>
              <span>{frete ? (precoFreteAplicado === 0 ? 'Grátis' : `R$ ${precoFreteAplicado.toFixed(2).replace('.', ',')}`) : '—'}</span>
            </div>
            <div className="checkout-resumo-total">
              <span>Total</span>
              <span className="text-gradient-gold">R$ {totalComFrete.toFixed(2).replace('.', ',')}</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
