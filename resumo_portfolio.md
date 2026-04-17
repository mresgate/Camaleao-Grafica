# Kit de Portfólio - Camaleão

## Título de Impacto
**Camaleão: E-commerce de Impressão Gráfica com Experiência 3D Imersiva**

## Elevator Pitch
Plataforma de e-commerce completa para produtos de impressão gráfica, combinando catálogo dinâmico com visualização 3D interativa e painel administrativo em tempo real. Entrega fluxo de compra otimizado com persistência de estado, animações fluidas e dashboard analítico para gestão eficiente de pedidos e clientes.

## Stack Tecnológica
- **React 19.2.4** - Framework UI com componentes funcionais e hooks modernos
- **Vite 8.0.4** - Build tool ultra-rápido com HMR
- **React Router DOM 7.14.0** - Navegação SPA com rotas dinâmicas
- **Framer Motion 12.38.0** - Animações e transições de alta performance
- **Three.js + @react-three/fiber** - Renderização 3D no browser
- **Zustand 5.0.12** - State management leve com persistência local
- **Recharts 3.8.1** - Gráficos interativos para dashboard
- **Lucide React 1.8.0** - Biblioteca de ícones consistentes

## Funcionalidades Chave
- **Catálogo de Produtos Dinâmico**: Sistema de categorização com filtros, badges de destaque, avaliações e prazos de produção personalizados por produto
- **Carrinho Inteligente**: Store Zustand com persistência no localStorage, suporte a opções personalizadas, cálculo automático de totais e gestão de frete
- **Painel Administrativo Completo**: Dashboard com KPIs em tempo real, gráficos de vendas mensais (Recharts), gestão de produtos/pedidos/clientes e autenticação segura
- **Experiência Visual Premium**: Animações Framer Motion em transições de página, cards com efeito glassmorphism e componentes 3D interativos

## Código de Exemplo
**Store de Carrinho com Zustand + Persistência + Getters Computados**

```javascript
// src/store/cartStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
      itens: [],
      frete: null,
      cepDestino: '',

      addItem: (produto, opcoes, quantidade, arte = null) => {
        const key = `${produto.id}-${JSON.stringify(opcoes)}-${arte || ''}`;
        const itens = get().itens;
        const existente = itens.find(i => i.key === key);
        if (existente) {
          set({ itens: itens.map(i => i.key === key ? { ...i, quantidade: i.quantidade + quantidade } : i) });
        } else {
          set({ itens: [...itens, { key, produto, opcoes, quantidade, preco: produto.preco, arte }] });
        }
      },

      removeItem: (key) => set({ itens: get().itens.filter(i => i.key !== key) }),

      updateQuantidade: (key, quantidade) => {
        if (quantidade <= 0) {
          get().removeItem(key);
          return;
        }
        set({ itens: get().itens.map(i => i.key === key ? { ...i, quantidade } : i) });
      },

      clearCart: () => set({ itens: [], frete: null, cepDestino: '' }),

      setFrete: (frete) => set({ frete }),
      setCep: (cep) => set({ cepDestino: cep }),

      get total() {
        return get().itens.reduce((acc, i) => acc + i.preco * i.quantidade, 0);
      },

      get totalItens() {
        return get().itens.reduce((acc, i) => acc + i.quantidade, 0);
      },

      get totalComFrete() {
        const frete = get().frete;
        return get().total + (frete ? frete.preco : 0);
      },
    }),
    { name: 'camaleao-cart' }
  )
);
```

**Por que este código é interessante:**
- Demonstra uso moderno de Zustand com middleware de persistência
- Getters computados para cálculos dinâmicos de totais
- Lógica de deduplicação de itens com mesmo key (produto + opções)
- API limpa e intuitiva para manipulação de estado complexo
- Persistência automática no localStorage para UX contínua
