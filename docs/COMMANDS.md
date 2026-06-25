# Comandos Úteis — Weather App

## Instalação de dependências

```bash
npm install
```

Instala todas as dependências de `package.json` (Webpack, ESLint, etc.).

```bash
npm run install-web
```

Script legado que instala apenas o Webpack. **Redundante** — prefira `npm install`.

## Build

```bash
npm run build
```

Executa Webpack em modo único. Compila `src/index.js` e dependências → `dist/main.js`.

```bash
npm run watch
```

Executa Webpack em modo watch — recompila automaticamente quando arquivos em `src/` mudam.

## Lint

```bash
npm run npx-fix
```

Roda ESLint em `src/` com auto-fix (`npx eslint src/ --fix`).

> **Nota:** o projeto não possui arquivo `.eslintrc*` versionado. O comportamento exato do ESLint pode variar.

## Testes

```bash
npm test
```

**Não implementado.** O script retorna erro com mensagem `"Error: no test specified"`.

## Execução da aplicação

### Abrir no navegador

```bash
# Após build
start dist/index.html        # Windows
open dist/index.html         # macOS
xdg-open dist/index.html     # Linux
```

### Servidor estático local (recomendado)

```bash
npx serve dist
```

```bash
python -m http.server 8080 --directory dist
```

## Format

Não há script de formatação configurado (Prettier, etc.). O projeto usa apenas ESLint via `npx-fix`.

## Banco de dados

Não aplicável — o projeto não usa banco de dados.

## Docker

Não existe `Dockerfile` nem `docker-compose` no projeto.

## Git (referência rápida)

```bash
git status
git add docs/
git commit -m "docs: adiciona documentação do projeto legado"
```

Consulte `.cursor/rules/git.mdc` para regras locais de versionamento.

## Resumo dos scripts npm

| Script | Comando | Descrição |
|--------|---------|-----------|
| `build` | `npm run build` | Build único com Webpack |
| `watch` | `npm run watch` | Build contínuo (watch mode) |
| `npx-fix` | `npm run npx-fix` | ESLint com auto-fix em `src/` |
| `install-web` | `npm run install-web` | Instala Webpack (legado) |
| `test` | `npm test` | Placeholder — não implementado |
