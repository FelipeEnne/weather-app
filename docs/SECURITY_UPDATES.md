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

## Sugestão de commit

```bash
git add package.json package-lock.json dist/main.js docs/DEPENDENCY_UPGRADE_PLAN.md docs/SECURITY_UPDATES.md
git commit -m "fix: update low-risk dependencies"
```

Plano Grupo B (somente documentação, sem mudanças de código):

```bash
git add docs/DEPENDENCY_UPGRADE_PLAN.md
git commit -m "docs: document major dependency upgrade plan"
```

Ou um único commit combinando deps + docs, conforme preferência do mantenedor.
