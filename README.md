# MunicipiosAPP

A MunicipiosAPP é uma aplicação frontend desenvolvida em Angular 21 com o objetivo de consumir a MunicipiosAPI e exibir os municípios de uma UF de forma paginada. O projeto utiliza Standalone Components, Angular Signals e um serviço dedicado para comunicação HTTP.

## 1. Objetivo

Fornecer uma interface web simples para consultar e navegar entre municípios brasileiros, ajustando tamanho de página e visualizando informações de forma organizada.

## 2. Arquitetura

### Componentes
- HomeComponent: tela principal com consulta, tabela paginada e controles de navegação.
- SobreComponent: página institucional sobre o projeto.

### Services
- MunicipiosService: responsável por realizar chamadas HTTP para a API.

### Models
- Municipio
- PaginatedResponse<T>

## 3. Tecnologias

- Angular 21
- TypeScript
- Angular Signals
- Standalone Components
- HttpClient
- Vercel (deploy)

## 4. Configuração da API

Arquivo: `src/environments/environment.ts`

```ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5119'
};
```

## 5. Execução

```
npm install
npm start
```

Disponível em: http://localhost:4200

## 6. Estrutura

```
/src/app
  /pages
  /services
  /models
  app.routes.ts
```

## 7. Deploy

A aplicação está publicada em: https://municipios-app.vercel.app