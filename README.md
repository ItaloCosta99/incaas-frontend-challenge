# Incaas Frontend Challenge

Uma aplicação Angular para consulta e gerenciamento de processos judiciais, integrando com a API pública do CNJ (Conselho Nacional de Justiça).

## Funcionalidades

- **Cadastro de Partes**

  - Formulário em modal para cadastro/edição
  - Formatação automática de CPF/CNPJ
  - Lista com todas as partes cadastradas
  - Operações de editar e excluir

- **Consulta de Processos**
  - Busca de processos via API do CNJ
  - Filtros por:
    - Número do processo
    - Grau de jurisdição
    - Tipo de justiça
  - Exibição dos dados:
    - Código da unidade
    - Assuntos principais
    - Classe judicial
    - Grau
    - Justiça (Estadual, Federal, etc.)

## Tecnologias Utilizadas

- Angular 19.2.0
- PrimeNG 19.1.3 (UI Components)
- TailwindCSS 4.1.10

## Pré-requisitos

- Node.js (versão LTS recomendada)
- npm (normalmente instalado com o Node.js)
- Angular CLI (`npm install -g @angular/cli`)

## Instalação

1. Clone o repositório:

```bash
git clone https://github.com/ItaloCosta99/incaas-frontend-challenge
cd incaas-frontend-challenge
```

2. Instale as dependências:

```bash
npm install
```

## Executando o Projeto

1. Inicie o servidor de desenvolvimento:

```bash
npm start
```

O aplicativo estará disponível em `http://localhost:4200/`.

A aplicação utiliza um proxy para evitar problemas de CORS ao acessar a API do CNJ. A configuração do proxy está em `proxy.conf.json`.

## Estrutura do Projeto

```
src/
├── app/
│   ├── core/
│   │   ├── models/       # Interfaces e tipos
│   │   └── services/     # Serviços compartilhados
│   ├── pages/
│   │   ├── partes/       # Componentes do cadastro de partes
│   │   └── processos/    # Componentes da consulta de processos
│   └── shared/          # Componentes, pipes e diretivas compartilhadas
├── assets/             # Recursos estáticos
└── environments/       # Configurações por ambiente
```

## Scripts Disponíveis

- `npm start` - Inicia o servidor de desenvolvimento com proxy
- `npm run build` - Gera build de produção
- `npm run test` - Executa os testes unitários
- `npm run watch` - Inicia build em modo watch

## Design System

O projeto utiliza o PrimeNG como biblioteca de componentes UI, combinado com TailwindCSS para estilização customizada:

- **PrimeNG**: Fornece componentes ricos como tabelas, modais e formulários
- **TailwindCSS**: Utilizado para layout e estilização customizada

## API e Integração

O projeto integra com a API pública do CNJ através de um proxy configurado para evitar problemas de CORS. As principais integrações incluem:

- Consulta de processos por número
- Filtragem por grau de jurisdição
- Filtragem por tipo de justiça

## Contribuindo

1. Crie um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request
