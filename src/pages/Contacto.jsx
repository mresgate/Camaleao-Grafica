// src/pages/Contacto.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, MessageSquare, Send, CheckCircle } from 'lucide-react';
import Button from '../components/ui/Button';
import './Contacto.css';

const infoItems = [
  { icon: <Phone size={22}/>, titulo: 'Telefone / WhatsApp', valor: '(84) 99847-5461', href: 'tel:+5584998475461' },
  { icon: <Mail size={22}/>, titulo: 'E-mail', valor: 'camaleao.grafica@hotmail.com', href: 'mailto:camaleao.grafica@hotmail.com' },
  { icon: <MapPin size={22}/>, titulo: 'Endereço', valor: 'R. Aeroporto dos Guararapes, 11\nParque Industrial · Parnamirim/RN\nCEP 59149-323', href: null },
  { icon: <Clock size={22}/>, titulo: 'Horário', valor: 'Domingo a Domingo: 09h00–21h00', href: null },
];

export default function Contacto() {
  const [form, setForm] = useState({ nome: '', email: '', telefone: '', assunto: '', mensagem: '' });
  const [enviado, setEnviado] = useState(false);
  const [loading, setLoading] = useState(false);

  const upd = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setEnviado(true);
    setLoading(false);
  };

  return (
    <main className="contacto-page">
      {/* Hero */}
      <section className="contacto-hero">
        <div className="contacto-hero-bg" />
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="section-eyebrow">Fale Connosco</span>
            <h1>Entre em <span className="text-gradient-gold">Contacto</span></h1>
            <p className="contacto-hero-sub">
              Estamos prontos para ajudar! Preencha o formulário, ligue ou envie uma mensagem pelo WhatsApp.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="contacto-layout">
            {/* Info */}
            <motion.div
              className="contacto-info"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="contacto-info-title">Informações de Contacto</h2>
              <div className="contacto-items">
                {infoItems.map((item, i) => (
                  <div key={i} className="contacto-item glass">
                    <div className="contacto-item-icon">{item.icon}</div>
                    <div>
                      <div className="contacto-item-titulo">{item.titulo}</div>
                      {item.href ? (
                        <a href={item.href} className="contacto-item-valor contacto-item-valor--link">
                          {item.valor}
                        </a>
                      ) : (
                        <p className="contacto-item-valor" style={{ whiteSpace: 'pre-line' }}>{item.valor}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* WhatsApp CTA */}
              <motion.a
                href="https://wa.me/5584998475461?text=Olá!%20Gostaria%20de%20um%20orçamento%20ou%20tirar%20uma%20dúvida."
                target="_blank" rel="noopener"
                className="contacto-whatsapp glass"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="contacto-wa-icon"><MessageSquare size={26} /></div>
                <div>
                  <div className="contacto-wa-titulo">Atendimento Imediato</div>
                  <div className="contacto-wa-sub">Resposta em até 30 minutos via WhatsApp</div>
                </div>
                <span className="contacto-wa-btn">Iniciar Chat</span>
              </motion.a>

              {/* Map placeholder */}
              <div className="contacto-map glass">
                <div className="contacto-map-inner">
                  <MapPin size={32} color="var(--color-gold)" />
                  <span>Parnamirim, RN</span>
                  <a
                    href="https://maps.google.com/?q=R.+Aeroporto+dos+Guararapes,+11,+Parque+Industrial,+Parnamirim,+RN"
                    target="_blank" rel="noopener"
                    className="contacto-map-link"
                  >
                    Ver no Google Maps →
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              {enviado ? (
                <div className="contacto-enviado glass">
                  <CheckCircle size={52} color="var(--color-accent)" />
                  <h3>Mensagem Enviada!</h3>
                  <p>Recebemos o seu contacto e responderemos em até 24 horas. Para urgências, contacte-nos pelo WhatsApp.</p>
                  <Button variant="gold" onClick={() => { setEnviado(false); setForm({ nome:'',email:'',telefone:'',assunto:'',mensagem:'' }); }}>
                    Enviar Nova Mensagem
                  </Button>
                </div>
              ) : (
                <form className="contacto-form glass" onSubmit={handleSubmit}>
                  <h2 className="contacto-form-title">Enviar Mensagem</h2>
                  <div className="contacto-form-grid">
                    <div className="form-field">
                      <label>Nome Completo *</label>
                      <input name="nome" value={form.nome} onChange={upd} placeholder="João da Silva" required />
                    </div>
                    <div className="form-field">
                      <label>E-mail *</label>
                      <input name="email" type="email" value={form.email} onChange={upd} placeholder="joao@email.com" required />
                    </div>
                    <div className="form-field">
                      <label>Telefone / WhatsApp</label>
                      <input name="telefone" value={form.telefone} onChange={upd} placeholder="(84) 99999-9999" />
                    </div>
                    <div className="form-field">
                      <label>Assunto *</label>
                      <select name="assunto" value={form.assunto} onChange={upd} required>
                        <option value="">Selecione o assunto</option>
                        <option>Orçamento para impressão</option>
                        <option>Dúvida sobre produto</option>
                        <option>Acompanhamento de pedido</option>
                        <option>Reclamação</option>
                        <option>Parceria comercial</option>
                        <option>Outro</option>
                      </select>
                    </div>
                    <div className="form-field form-field--full">
                      <label>Mensagem *</label>
                      <textarea
                        name="mensagem"
                        value={form.mensagem}
                        onChange={upd}
                        placeholder="Descreva a sua necessidade em detalhes. Se for orçamento, informe quantidade, tamanho e acabamento desejado."
                        rows={6}
                        required
                      />
                    </div>
                  </div>
                  <Button
                    variant="gold" size="lg" type="submit" fullWidth
                    loading={loading}
                    iconRight={<Send size={18}/>}
                  >
                    Enviar Mensagem
                  </Button>
                  <p className="contacto-form-obs">
                    * Campos obrigatórios. Respondemos em até 24h.
                  </p>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
