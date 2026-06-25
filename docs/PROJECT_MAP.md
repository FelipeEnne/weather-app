# Mapa do Projeto — Weather App

## Propósito

Aplicação web de previsão do tempo que consulta a API [OpenWeatherMap](https://openweathermap.org/current) e exibe dados meteorológicos de uma cidade informada pelo usuário. O projeto foi desenvolvido como exercício do [Odin Project](https://www.theodinproject.com/courses/javascript/lessons/weather-app) e está publicado no [GitHub Pages](https://felipeenne.github.io/weather-app/).

## Stack principal

| Tecnologia | Uso |
|------------|-----|
| JavaScript (ES modules) | Lógica da aplicação |
| HTML + CSS | Interface estática |
| Webpack 4 | Bundling de `src/` → `dist/main.js` |
| ESLint 6 (Airbnb Base) | Lint do código-fonte |
| Bootstrap 4 (CDN) | Estilos de formulário e botões |
| OpenWeatherMap API | Dados meteorológicos |
| sessionStorage | Persistência da cidade na sessão do navegador |

Não há backend, banco de dados, framework frontend (React/Vue/etc.) nem Docker.

## Estrutura de pastas

```
weather-app/
├── src/                 # Código-fonte JavaScript (editar aqui)
│   ├── index.js         # Ponto de entrada
│   ├── DOMmodel.js      # Fetch da API + renderização
│   ├── returnCity.js    # Captura e leitura da cidade
│   └── buttonCF.js      # Botões Celsius/Fahrenheit
├── dist/                # Build + HTML + assets (ponto de execução/deploy)
│   ├── index.html       # Página principal
│   ├── main.js          # Bundle gerado pelo Webpack
│   └── assets/          # CSS, imagens
├── docs/                # Documentação do projeto
├── package.json         # Dependências e scripts npm
├── webpack.config.js    # Configuração do Webpack
├── README.md            # Documentação original (inglês)
└── LICENSE              # MIT
```

## Responsabilidade de cada pasta

### `src/`

Contém toda a lógica JavaScript modularizada em 4 arquivos. É o local correto para alterações de comportamento. Após mudanças, é necessário rodar `npm run build` ou `npm run watch` para atualizar `dist/main.js`.

### `dist/`

Contém a aplicação pronta para execução e deploy. Inclui HTML, CSS, imagens e o bundle `main.js`. O README orienta abrir `dist/index.html` diretamente no navegador. Esta pasta é versionada no Git para suportar GitHub Pages.

### Raiz do projeto

Arquivos de configuração (`package.json`, `webpack.config.js`) e documentação.

## Arquivos mais importantes

| Arquivo | Responsabilidade |
|---------|------------------|
| `src/index.js` | Inicializa a app no `window.onload` e registra eventos |
| `src/DOMmodel.js` | Chamada à API, conversão de temperatura, atualização do DOM |
| `src/returnCity.js` | Salva cidade no `sessionStorage` e exporta `getCity()` |
| `src/buttonCF.js` | Event listeners dos botões °C e °F |
| `dist/index.html` | Markup da interface (formulário, área de resultados) |
| `dist/assets/css/style.css` | Estilos visuais (fundo, layout, painel de dados) |
| `webpack.config.js` | Entry `./src/index.js` → output `dist/main.js` |
| `package.json` | Scripts de build, watch e lint |

## Dependências relevantes

### Produção (`dependencies`)

- `@primer/octicons` — listada no `package.json`, mas o ícone de busca no HTML é um SVG inline (não utilizada no `src/`)

### Desenvolvimento (`devDependencies`)

- `webpack` + `webpack-cli` — bundling
- `eslint` + `eslint-config-airbnb-base` + `eslint-plugin-import` — lint

## Integrações externas

- **OpenWeatherMap API** — endpoint `https://api.openweathermap.org/data/2.5/weather`
- **Bootstrap 4.3.1** — carregado via CDN em `dist/index.html`
- **Imagens de ícone do clima** — `http://openweathermap.org/img/wn/{icon}@2x.png`

## Guia rápido para novo desenvolvedor

1. Clone o repositório e rode `npm install`.
2. Edite arquivos em `src/` — não edite `dist/main.js` manualmente.
3. Rode `npm run build` (ou `npm run watch` durante desenvolvimento).
4. Abra `dist/index.html` no navegador ou use um servidor estático local.
5. Consulte `docs/SETUP.md` para detalhes e `docs/FLOWS.md` para entender o fluxo de dados.
6. Leia `docs/TODO_LEGACY.md` antes de fazer alterações significativas — há dívidas técnicas conhecidas.
