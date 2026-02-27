# 💰 Expense Tracker

Aplicação web moderna para gerenciamento de despesas pessoais, desenvolvida com React, TypeScript e Vite, com sistema completo de filtros, persistência de dados e design responsivo.

**[Ver projeto ao vivo](https://expense-tracker-tawny-beta-38.vercel.app/)**

![CI](https://github.com/felipedev90/expense-tracker/actions/workflows/main.yml/badge.svg)
![Badge](https://img.shields.io/badge/Status-Concluído-success)
![Badge](https://img.shields.io/badge/Testes-76%25%20Cobertura-success)
![Badge](https://img.shields.io/badge/TypeScript-100%25-blue)

## Funcionalidades

### Gestão de Despesas

- ✅ Adicionar despesas com descrição, valor, data e categoria
- ✅ Visualizar lista de despesas organizada
- ✅ Deletar despesas individualmente
- ✅ Persistência automática no LocalStorage

### Filtros Avançados

- Filtrar por categoria (Alimentação, Saúde, Lazer, Transporte, Educação, Casa, Outros)
- Filtrar por período (últimos 7 dias, 30 dias, todos)
- Filtros múltiplos combinados
- Botão de limpar filtros com feedback visual

### Dashboard

- Total de despesas registradas
- Valor total gasto com cálculo em tempo real
- Valores ajustados conforme filtros ativos

### Interface

- Design moderno com sistema de cores profissional
- Totalmente responsivo (mobile-first)
- Menus dropdown interativos
- Animações e transições suaves
- Acessibilidade (ARIA labels, navegação por teclado)

## Tecnologias

### Core

- **React 18** - Biblioteca UI com hooks modernos
- **TypeScript** - Tipagem estática completa
- **Vite** - Build tool ultra-rápido

### Estilização

- **CSS Modules** - Estilos escopados por componente
- **Design System** - Tokens customizados (cores, espaçamentos, tipografia)
- **Lucide React** - Ícones SVG otimizados

### Qualidade

- **Vitest** - Framework de testes (16 testes)
- **Testing Library** - Testes de componentes e integração
- **76% de cobertura** - Componentes críticos 100% cobertos

### Infraestrutura

- **Vercel** - Deploy contínuo e hospedagem
- **Git** - Controle de versão com commits semânticos

## Testes

Suite completa com 16 testes automatizados:

```bash
npm test           # Rodar testes em watch mode
npm run coverage   # Gerar relatório de cobertura
```

**Cobertura:**

- ✅ Utilities (100%)
- ✅ Custom Hooks (72%)
- ✅ Componentes críticos (100%)
- ✅ Fluxo de integração completo

## CI/CD Pipeline

Este projeto utiliza **GitHub Actions** para integração e entrega contínuas.

### Integração Contínua (CI)

Executada automaticamente em todo push e pull request para `main`:

1. Instalar dependências (`npm ci`)
2. Lint (`npm run lint`)
3. Testes (`npm run test`)
4. Build (`npm run build`)

### Deploy Automático (CD)

Após o CI passar com sucesso na branch `main`, o deploy é feito automaticamente na **Vercel** via GitHub Actions.

## Como rodar localmente

### Pré-requisitos

- Node.js 18+
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone https://github.com/felipedev90/expense-tracker.git

# Entre na pasta
cd expense-tracker

# Instale as dependências
npm install

# Rode em modo desenvolvimento
npm run dev
```

Acesse: **http://localhost:5173**

### Build para produção

```bash
npm run build        # Gera build otimizado
npm run preview      # Preview local da build
```

## Estrutura do Projeto

```
expense-tracker/
├── src/
│   ├── components/         # Componentes React
│   │   ├── expenseForm/   # Formulário de despesas
│   │   ├── expenseItem/   # Card individual de despesa
│   │   ├── expenseList/   # Lista com filtros
│   │   ├── filters/       # Sistema de filtros dropdown
│   │   └── ...
│   ├── hooks/             # Custom hooks (useLocalStorage)
│   ├── types/             # Definições TypeScript
│   ├── utils/             # Funções utilitárias
│   ├── styles/            # Design tokens globais
│   └── test/              # Setup de testes
├── public/                # Assets estáticos
└── ...
```

## Features Técnicas

- **Custom Hooks** - `useLocalStorage` com Generics
- **TypeScript Strict Mode** - Zero `any`, types completos
- **Componentes controlados** - Forms com validação
- **Estado local otimizado** - React hooks eficientes
- **Lazy initialization** - Performance otimizada
- **Design System** - Tokens CSS reutilizáveis
- **Mobile-first** - Responsividade em todos breakpoints

## Preview

<div align="center">
  <img src="./screenshots/expense-tracker-dashboard.jpg" alt="Expense Tracker - Dashboard Principal" width="800">
  <p><em>Interface principal mostrando dashboard de resumo e formulário de cadastro</em></p>
</div>

## Autor

**Felipe Augusto**  
Desenvolvedor Front-end

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/felipesilva90/)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/felipedev90)

---

⭐ **Se este projeto foi útil, considere dar uma estrela no repositório!**
