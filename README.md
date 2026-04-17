# Camaleão - E-commerce de Impressão Gráfica 🦎

Bem-vindo ao repositório do **Camaleão**, uma plataforma moderna de e-commerce voltada para produtos de impressão gráfica. Este projeto combina um catálogo dinâmico com visualização 3D interativa de produtos e um Painel Administrativo robusto desenhado para operar em tempo real.

---

## 🛠️ Stack Tecnológica

O projeto foi construído utilizando as ferramentas de ponta em desenvolvimento web moderno:

- **React (19.2.4)**: Framework front-end moderno.
- **Vite (8.0.4)**: Ferramenta de build super rápida.
- **React Router DOM**: Gestão eficiente de rotas no formato Single Page Application (SPA).
- **Zustand**: Gestão de estados globais (usado para o carrinho persistente e autenticação).
- **Framer Motion**: Animações fluidas entre páginas e elementos da UI.
- **Three.js & React Three Fiber**: Visualização imersiva 3D integrada aos produtos da loja.
- **Recharts**: Geração de gráficos interativos para o dashboard administrativo.

---

## 🚀 Como Rodar o Projeto (Localmente)

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/mresgate/Camaleao-Grafica.git
   cd "Camaleao Grafica"
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

4. **Acesse no navegador:**
   Geralmente a aplicação inicializa em `http://localhost:5173`.

---

## 🛍️ Funcionalidades Públicas (Loja)

- **Catálogo Dinâmico:** Produtos exibidos de forma inteligente, com badges de categoria, avaliações dos clientes e opções variadas de personalização.
- **Carrinho Inteligente:** Desenvolvido com `Zustand` e persistência no `localStorage`. Ao fechar ou recarregar a página, os itens continuam lá. Inclui cálculo inteligente de frete em tempo real com base no CEP.
- **Experiência 3D Glassmorphism:** Interface fluida, desenhada sob preceitos modernos de UI (Glassmorphism), e visualização em componentes 3D interativos.

---

## 🛡️ Painel Administrativo (Knowledge Base)

O painel administrativo é o centro de controle da aplicação, projetado para que donos e gestores da gráfica validem fluxos e ajustem informações essenciais.

### 🔑 Como Acessar o Painel
Para acessar o admin, role as rotas até o `/admin` ou clique no link designado, se disponível. 
Na tela de login, utilize as seguintes credenciais padrão:
- **E-mail:** `admin@camaleao.com.br`
- **Senha:** `admin2024`

### 📊 Funcionalidades por Seção no Admin:

#### 1. Dashboard (Visão Geral)
A primeira tela exibida tem como foco dar aos gestores os parâmetros de "saúde" do negócio em tempo real.
- **KPIs Essenciais**: Você encontra atalhos visuais de Receita Total Mensal (com comparativo ao mês anterior), Quantidade de Pedidos, Clientes Cadastrados e Total de Produtos no catálogo.
- **Gráfico de Vendas Mensais**: Gráfico visual (em área contínua, usando Recharts) apontando picos e quedas de faturamento (em R$), de forma interativa.
- **Produtos Mais Vendidos**: Um ranking (Top List) listando ativamente quais itens do catálogo trazem melhor conversão e margem para ajudar numa reposição inteligente de estoque.

#### 2. Gestão de Produtos
Tabela de catálogo completo disponível no e-commerce.
- **Listagem Rápida**: Veja imediatamente a imagem, categoria, valor, estoque e nota média de cada item. 
- **Ações Rápidas**: Funções dedicadas para visualizar, editar detalhes dos produtos impressos e excluir o que estiver fora de linha. Existe também um botão de **"+ Novo Produto"** para popular o e-commerce.

#### 3. Gestão de Pedidos
Local de expedição e logística. É onde você gerencia ativamente os itens comprados pelos clientes.
- **Acompanhamento de Status:** Ao abrir essa aba, é possível conferir cada Pedido, Data de Entrada, o Cliente, e o Status. 
- **Fluxo de Trabalho de Produção:** É possível alterar o status atual do pedido através de um dropdown com cores variadas (`Aguardando pagamento`, `Em produção`, `Enviado`, e `Entregue`), facilitando a leitura de em que etapa está a fila de impressão do cliente.

#### 4. Clientes
Banco de Dados central do comportamento do seu público.
- Exibe métricas relativas aos compradores (Nome, E-mail, Cidade).
- Foca em gerar **Insights de LTV (Life Time Value)** listando **Total de Pedidos** e **Total Gasto (em R$)** de um respectivo cliente para criar promoções direcionadas e identificar grandes contas (B2B ou B2C ativos).

#### 5. Configurações 
Um hub administrativo em modal para os pilares técnicos da loja, sem necessitar alterar linha de código diretamente. Clicando nas caixas, você abre menus para parametrizar:
- **Métodos de Envio**: Criação de integrações de PAC / Sedex ou fretes customizados, preços base, prazo em dias e ativação/inativação da modalidade.
- **Gateways de Pagamento**: Setup de chaves de API (ex: Mercado Pago, Stripe), Token, e checkbox de "Modo Sandbox" (para testes).
- **Banners do Site**: Alteração das Hero sections do e-commerce (URL da Imagem, Título, Link de destino).
- **Textos & SEO**: Indexação via *Meta Titles*, descrições do site e palavras-chave.
- **Promoções & Cupons**: Geração ativa de cupons na loja com (%) de desconto, validade total, uso máximo.
- **Notificações**: Caixa de seleção e setup de quais alertas o perfil "Admin" deseja receber via e-mail e relatórios.

---

Esse repositório serve a um portfólio rico, validando UX/UI moderno, fluxo completo de loja e complexidade de estado com React. Modifique as *mocks* simuladas dos arquivos de dados base para transição em uma API real para produção final.
