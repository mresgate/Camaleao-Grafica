// src/store/authStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const USUARIO_MOCK = {
  id: 1,
  nome: 'João Silva',
  email: 'joao@empresa.com',
  telefone: '84 99999-0001',
  cidade: 'Natal, RN',
  avatar: null,
};

const ADMIN_CREDENTIALS = { email: 'admin@camaleao.com.br', senha: 'admin2024' };

export const useAuthStore = create(
  persist(
    (set, get) => ({
      usuario: null,
      isAdmin: false,
      isLoggedIn: false,

      login: (email, senha) => {
        if (email === ADMIN_CREDENTIALS.email && senha === ADMIN_CREDENTIALS.senha) {
          set({ usuario: { ...USUARIO_MOCK, nome: 'Admin', email }, isAdmin: true, isLoggedIn: true });
          return { ok: true, admin: true };
        }
        if (email && senha.length >= 6) {
          set({ usuario: { ...USUARIO_MOCK, email }, isAdmin: false, isLoggedIn: true });
          return { ok: true, admin: false };
        }
        return { ok: false, erro: 'Credenciais inválidas' };
      },

      register: (dados) => {
        set({ usuario: { ...USUARIO_MOCK, ...dados }, isAdmin: false, isLoggedIn: true });
        return { ok: true };
      },

      logout: () => set({ usuario: null, isAdmin: false, isLoggedIn: false }),

      updatePerfil: (dados) => set({ usuario: { ...get().usuario, ...dados } }),
    }),
    { name: 'camaleao-auth' }
  )
);
