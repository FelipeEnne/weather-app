# Setup Local — Weather App

## Pré-requisitos

- **Node.js** e **npm** instalados
- Versão mínima recomendada: **A confirmar** (projeto criado em ~2020; Node 14+ costuma funcionar)
- Navegador moderno com suporte a ES6, `fetch` e `sessionStorage`
- Conexão com a internet (para API OpenWeatherMap e CDN Bootstrap)

Não é necessário banco de dados, Docker nem servidor backend.

## Instalação

```bash
git clone <url-do-repositorio>
cd weather-app
npm install
```

O comando `npm install` instala Webpack, ESLint e demais dependências listadas em `package.json`.

> O script `npm run install-web` existe no projeto, mas é redundante — ele apenas instala o Webpack separadamente. Use `npm install` normalmente.

## Configuração de variáveis de ambiente

A chave da OpenWeatherMap **não** deve ficar no source. O Webpack injeta `OPENWEATHER_API_KEY` no bundle em tempo de build.

```bash
cp .env.example .env
# edite .env e preencha OPENWEATHER_API_KEY=sua_chave_aqui
```

Antes de `npm run build` ou `npm run watch`, exporte a variável (ou carregue o `.env` no shell):

```bash
export OPENWEATHER_API_KEY=sua_chave_aqui
npm run build
```

`.env` está no `.gitignore` e **não** deve ser commitado. Use `.env.example` apenas como modelo (sem valor real).

> Em um app 100% client-side, a chave ainda aparece no bundle público (`dist/main.js`). Revogue chaves vazadas e, para segredo real, use um proxy no backend.

Para obter uma chave própria, registre-se em [OpenWeatherMap](https://openweathermap.org/api) e gere uma API key na área de membros.

## Banco de dados

Não aplicável. O projeto não usa banco de dados. A única persistência é `sessionStorage` no navegador (ver `docs/DATABASE.md`).

## Migrations e seeds

Não existem.

## Como rodar localmente

### Opção 1 — Abrir HTML diretamente (conforme README)

1. Defina `OPENWEATHER_API_KEY` e gere `dist/main.js` (`export OPENWEATHER_API_KEY=... && npm run build`).
2. Abra `dist/index.html` no navegador.

```bash
# Windows
start dist/index.html

# macOS
open dist/index.html

# Linux
xdg-open dist/index.html
```

### Opção 2 — Desenvolvimento com rebuild automático

Em um terminal (com a chave exportada):

```bash
export OPENWEATHER_API_KEY=sua_chave_aqui
npm run watch
```

Em outro terminal, sirva a pasta `dist/` com um servidor HTTP local (recomendado para evitar restrições de `file://`):

```bash
# Com npx (sem instalar globalmente)
npx serve dist

# Ou com Python 3
python -m http.server 8080 --directory dist
```

Acesse `http://localhost:8080` (ou a porta indicada).

### Opção 3 — Build único

```bash
export OPENWEATHER_API_KEY=sua_chave_aqui
npm run build
```

Gera/atualiza `dist/main.js` a partir de `src/`. Sem a variável, o Webpack falha de propósito.

## Fluxo de desenvolvimento típico

1. `npm install` (primeira vez)
2. `npm run watch` (terminal 1)
3. Servidor estático em `dist/` (terminal 2)
4. Editar arquivos em `src/`
5. Recarregar o navegador após o Webpack recompilar

## Problemas comuns

### Cidade vazia no primeiro carregamento

Ao abrir a página pela primeira vez, `sessionStorage` está vazio. O app chama a API com `q=null`, o que pode falhar silenciosamente ou gerar erro. Informe uma cidade e use os botões °C/°F para forçar nova consulta (limitação conhecida — ver `docs/FLOWS.md`).

### Busca não atualiza o clima imediatamente

Clicar no botão de busca salva a cidade, mas não dispara novo fetch automaticamente. Recarregue a página ou alterne entre Celsius/Fahrenheit.

### `dist/main.js` desatualizado

Se você editou `src/` mas não rodou build, o navegador executará código antigo. Execute `npm run build` ou use `npm run watch`.

### ESLint sem configuração

O projeto declara `eslint-config-airbnb-base` mas não possui arquivo `.eslintrc*` no repositório. O comando `npm run npx-fix` pode falhar ou usar regras padrão. Ver `docs/TODO_LEGACY.md`.

### API retorna erro 401

A chave da API pode estar inválida, expirada ou revogada. Verifique na conta OpenWeatherMap ou substitua por uma chave própria.

### Imagens de clima não carregam em HTTPS

Os ícones usam URL `http://` (mixed content). Em alguns contextos HTTPS, o navegador pode bloquear. Usar `https://` na URL da imagem resolve.
