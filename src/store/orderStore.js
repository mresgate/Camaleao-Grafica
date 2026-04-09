// src/store/orderStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useOrderStore = create(
  persist(
    (set, get) => ({
      pedidos: [],

      adicionarPedido: (novoPedido) => {
        set((state) => ({
          pedidos: [
            {
              id: `CAM-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
              data: new Date().toLocaleDateString('pt-BR'),
              status: 'Aguardando pagamento',
              ...novoPedido,
            },
            ...state.pedidos,
          ],
        }));
      },

      atualizarStatus: (pedidoId, novoStatus) => {
        set((state) => ({
          pedidos: state.pedidos.map((p) =>
            p.id === pedidoId ? { ...p, status: novoStatus } : p
          ),
        }));
      },

      getPedidoById: (id) => get().pedidos.find((p) => p.id === id),
    }),
    { name: 'camaleao-pedidos' }
  )
);
