// src/data/pedidos.js
export const pedidosMock = [
  {
    id: 'CAM-2024-0041',
    data: '2024-01-15',
    status: 'Entregue',
    total: 89.90,
    itens: [{ nome: 'Cartão de Visita Premium', qtd: 1000, subtotal: 89.90 }],
    rastreio: 'BR123456789BR',
  },
  {
    id: 'CAM-2024-0038',
    data: '2024-01-08',
    status: 'Em produção',
    total: 299.90,
    itens: [{ nome: 'Caixa Embalagem Personalizada', qtd: 100, subtotal: 299.90 }],
    rastreio: null,
  },
  {
    id: 'CAM-2024-0031',
    data: '2023-12-28',
    status: 'Entregue',
    total: 149.90,
    itens: [{ nome: 'Flyer A5 Frente e Verso', qtd: 500, subtotal: 149.90 }],
    rastreio: 'BR987654321BR',
  },
];

// src/data/clientes.js
export const clientesMock = [
  { id: 1, nome: 'João Silva', email: 'joao@empresa.com', telefone: '84 99999-0001', cidade: 'Natal', totalPedidos: 5, totalGasto: 892.50 },
  { id: 2, nome: 'Maria Costa', email: 'maria@loja.com.br', telefone: '84 99999-0002', cidade: 'Parnamirim', totalPedidos: 3, totalGasto: 547.80 },
  { id: 3, nome: 'Carlos Mendes', email: 'carlos@startup.io', telefone: '84 99999-0003', cidade: 'Mossoró', totalPedidos: 8, totalGasto: 2341.60 },
  { id: 4, nome: 'Ana Ferreira', email: 'ana@restaurante.com', telefone: '84 99999-0004', cidade: 'Natal', totalPedidos: 2, totalGasto: 239.80 },
  { id: 5, nome: 'Roberto Alves', email: 'roberto@consultoria.net', telefone: '84 99999-0005', cidade: 'Parnamirim', totalPedidos: 12, totalGasto: 4128.90 },
];

export const vendasMensais = [
  { mes: 'Jul', vendas: 12400 },
  { mes: 'Ago', vendas: 15800 },
  { mes: 'Set', vendas: 14200 },
  { mes: 'Out', vendas: 18900 },
  { mes: 'Nov', vendas: 22100 },
  { mes: 'Dez', vendas: 28700 },
  { mes: 'Jan', vendas: 19500 },
];

export const produtosMaisVendidos = [
  { nome: 'Cartão de Visita Premium', vendas: 247, receita: 22194.30 },
  { nome: 'Caneca Personalizada', vendas: 312, receita: 10888.80 },
  { nome: 'Flyer A5 F/V', vendas: 182, receita: 27281.80 },
  { nome: 'Caixa Embalagem', vendas: 67, receita: 20093.30 },
];
