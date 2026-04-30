# 🦎 Camaleão - E-commerce de Impressão Gráfica

Plataforma de e-commerce completa para produtos de impressão gráfica, combinando catálogo dinâmico com visualização 3D interativa e painel administrativo em tempo real.

---

## 🚀 Stack Tecnológica

**Frontend Moderno**
- **React 19.2.4** - Framework UI com componentes funcionais e hooks modernos
- **Vite 8.0.4** - Build tool ultra-rápido com Hot Module Replacement
- **React Router DOM 7.14.0** - Navegação SPA com rotas dinâmicas

**UX & Visual**
- **Framer Motion 12.38.0** - Animações e transições de alta performance
- **Three.js + @react-three/fiber** - Renderização 3D interativa no browser
- **Lucide React 1.8.0** - Biblioteca de ícones consistentes

**State Management & Analytics**
- **Zustand 5.0.12** - State management leve com persistência local
- **Recharts 3.8.1** - Gráficos interativos para dashboard administrativo

---

## ✨ Funcionalidades Principais

### 🛍️ Loja (Cliente)
- **Catálogo Dinâmico** - Sistema de categorização com filtros, badges de destaque, avaliações e prazos personalizados
- **Carrinho Inteligente** - Store Zustand com persistência no localStorage, suporte a opções personalizadas e cálculo automático de frete
- **Experiência 3D** - Visualização interativa de produtos com Three.js
- **Glassmorphism UI** - Interface moderna com efeitos de vidro e animações fluidas

### 🛡️ Painel Administrativo
- **Dashboard Analytics** - KPIs em tempo real (receita, pedidos, clientes), gráficos de vendas mensais e ranking de produtos mais vendidos
- **Gestão de Produtos** - CRUD completo com visualização de imagem, categoria, valor, estoque e avaliações
- **Gestão de Pedidos** - Fluxo de produção com status coloridos (Aguardando pagamento → Em produção → Enviado → Entregue)
- **Base de Clientes** - Métricas de LTV (Life Time Value), total gasto e histórico de pedidos
- **Configurações Centralizadas** - Métodos de envio, gateways de pagamento, banners, SEO, promoções e notificações

---

## 🔧 Destaques Técnicos

**State Management Avançado**
- Store Zustand com middleware de persistência
- Getters computados para cálculos dinâmicos de totais
- Lógica de deduplicação de itens com key única (produto + opções)
- API limpa e intuitiva para manipulação de estado complexo

**Arquitetura**
- Single Page Application (SPA) com React Router
- Componentização reutilizável e escalável
- Separação clara entre UI components, layout components e pages
- Dados mockados para fácil transição para API real

---

## 📦 Como Executar

```bash
# Clone o repositório
git clone https://github.com/mresgate/Camaleao-Grafica.git
cd "Camaleao Grafica"

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

Acesse em `http://localhost:5173`

**Acesso ao Painel Admin:**
- E-mail: `admin@camaleao.com.br`
- Senha: `admin2024`

---

## 💎 Sobre o Projeto

Este repositório é parte de um portfólio que valida:
- ✅ UX/UI moderno com Glassmorphism
- ✅ Fluxo completo de e-commerce (catálogo → carrinho → checkout → pedidos)
- ✅ Gestão complexa de estado com React e Zustand
- ✅ Visualização 3D integrada ao e-commerce
- ✅ Dashboard analítico com gráficos interativos
- ✅ Painel administrativo funcional em tempo real

---

**Desenvolvido com React 19 + Vite + Zustand + Three.js**
