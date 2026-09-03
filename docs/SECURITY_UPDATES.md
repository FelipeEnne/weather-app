# Registro de atualizações de segurança

Histórico das mudanças de dependências com foco em vulnerabilidades.

## Lote 0 — Baseline (antes das atualizações)

**Data:** 24/06/2026  
**Node:** v22.22.0  
**npm:** 10.9.4

### Comandos executados

```bash
npm install
npm outdated
npm audit
npm run build
```

### Resultado baseline

| Métrica | Valor |
|---------|-------|
| Dependências auditadas | 525 |
| Vulnerabilidades totais | **51** |
| Critical | 7 |
| High | 30 |
| Moderate | 11 |
| Low | 3 |
| Build (`webpack` 4.42.0) | **Falhou** — `ERR_OSSL_EVP_UNSUPPORTED` (Node 22 + OpenSSL 3) |

---

## Lote seguro 1 — Aplicado

**Data:** 24/06/2026

### Pacotes atualizados (diretos)

| Pacote | Versão antiga | Versão nova | Tipo |
|--------|---------------|-------------|------|
| `webpack` | 4.42.0 | 4.47.0 | devDependency |
| `webpack-cli` | 3.3.11 | 3.3.12 | devDependency |
| `eslint-config-airbnb-base` | 14.0.0 | 14.2.1 | devDependency |
| `eslint-plugin-import` | 2.20.1 | 2.22.1 | devDependency (pin) |
| `@primer/octicons` | 9.5.0 | **removida** | dependency removida |

### Pacotes corrigidos via `overrides` (transitivos)

| Pacote | Versão antiga | Versão nova | CVE / motivo |
|--------|---------------|-------------|--------------|
| `loader-utils` | 1.2.3 | 1.4.2 | GHSA-76p3-8jx3-jpfq (prototype pollution) — **critical** |
| `lodash` | 4.17.19 | 4.17.21 | Prototype pollution fixes |
| `minimatch` | 3.0.4 | 3.1.2 | ReDoS fixes |
| `brace-expansion` | 1.1.11 | 1.1.12 | ReDoS (GHSA) |
| `ansi-regex` | 4.1.0 / 5.0.0 | 5.0.1 | ReDoS (GHSA-93q8-gq69-wqmw) — **high** |

Correção: **override** em `package.json` (npm 10.9.4).

### Comandos executados

```bash
# package.json editado manualmente (deps + overrides)
npm install
npm audit
npm run build
npm run npx-fix
npm test
```

### Resultado pós-Lote 1

| Métrica | Baseline | Pós-Lote 1 | Delta |
|---------|----------|------------|-------|
| Vulnerabilidades totais | 51 | **42** | −9 |
| Critical | 7 | **4** | −3 |
| High | 30 | **25** | −5 |
| Moderate | 11 | **11** | 0 |
| Low | 3 | **2** | −1 |

| Validação | Resultado |
|-----------|-----------|
| `npm run build` | **OK** — Webpack 4.47.0, Node 22.22.0 |
| `npm run npx-fix` | **Falhou** — sem `.eslintrc*` (pré-existente) |
| `npm test` | **Falhou** — placeholder esperado |

### Arquivos alterados

- `package.json` — deps, remoção de `@primer/octicons`, bloco `overrides`
- `package-lock.json` — lockfileVersion 1 → 3 (npm moderno)
- `dist/main.js` — regenerado pelo build (obrigatório para deploy GitHub Pages)

### Código-fonte

Nenhuma alteração em `src/`.

---

## Vulnerabilidades restantes (amostra)

Pacotes ainda reportados pelo `npm audit` após Lote 1:

| Pacote | Severidade | Notas |
|--------|------------|-------|
| `webpack` | high | Fix audit aponta Webpack **5** (major) |
| `micromatch` / `braces` | high | Cadeia Webpack 4 |
| `elliptic` / `cipher-base` / `pbkdf2` / `sha.js` | critical/high | Polyfills crypto Webpack 4 |
| `y18n` | high | Prototype pollution |
| `yargs-parser` | moderate | Prototype pollution — candidato Lote 2 |
| `eslint` | moderate/high | Árvore profunda — exige ESLint 8+ |
| `word-wrap` | moderate | Transitiva ESLint |

**Não foi executado** `npm audit fix --force`.

---

## Lote código + audit — Aplicado

**Data:** 03/09/2026

### Correções de aplicação

| Item | Mudança |
|------|---------|
| API key | Removida do source; injetada no build via `OPENWEATHER_API_KEY` (`DefinePlugin`) |
| Query injection | `encodeURIComponent` na cidade |
| XSS DOM | `innerHTML` → `textContent` |
| Mixed content | Ícones OpenWeatherMap em `https://` + allowlist do código do ícone |
| Erro de API | Early return quando `!response.ok` ou cidade ausente |
| Bundle | Webpack `mode: 'production'` (sem `eval`) |

### Dependências

| Pacote | Override anterior | Override novo | Motivo |
|--------|-------------------|---------------|--------|
| `fast-uri` | 3.1.5 | 3.1.6 | GHSA host confusion / SSRF-class |
| `browserslist` | (sem pin) | 4.28.7 | GHSA OOM / prototype write |

### Validação

| Comando | Resultado |
|---------|-----------|
| `npm audit` | **0** vulnerabilidades |
| `OPENWEATHER_API_KEY=… npm run build` | OK — `dist/main.js` ~2 KiB, minificado |

### Arquivos alterados

- `src/DOMmodel.js`, `webpack.config.js`
- `package.json`, `package-lock.json`
- `dist/main.js`
- `.env.example`, `docs/SETUP.md`, `docs/SECURITY_UPDATES.md`

### Pós-merge (manual)

Revogar/rotacionar a chave OpenWeatherMap que já esteve no repositório e rebuildar com a chave nova.

---

## Sugestão de commit

```bash
git add src/DOMmodel.js webpack.config.js package.json package-lock.json dist/main.js .env.example docs/SETUP.md docs/SECURITY_UPDATES.md
git commit -m "$(cat <<'EOF'
fix: harden API usage and clear npm audit highs

Move the OpenWeatherMap key to build-time env, encode city input,
prefer textContent/HTTPS icons, and bump fast-uri/browserslist.
EOF
)"
```

Não incluir `.env` no stage (está no `.gitignore`).
