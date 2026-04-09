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
