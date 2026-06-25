# Plano de atualização de dependências

Documento gerado após diagnóstico e aplicação dos **Lotes seguros 1 e 2** (jun/2026).

## Stack do projeto

| Aspecto | Valor |
|---------|-------|
| App | Frontend-only, vanilla JavaScript (ES modules) |
| Bundler | Webpack 5 (`webpack.config.js`) |
| Linter | ESLint 8 + eslint-config-airbnb-base 15 + eslint-plugin-import |
| Gerenciador | npm + `package-lock.json` |
| Testes | Placeholder (`npm test` sempre falha) |
| CI | Não configurado |

## Resultado do Lote 3 — Grupo B (jun/2026)

Migração para eliminar os 7 alertas abertos do Dependabot.

| Métrica | Antes (pós-Lote 2) | Depois (Lote 3) |
|---------|-------------------|-----------------|
| Total `npm audit` | 27 | **0** |
| `npm run build` | OK (webpack 4.47) | OK (webpack 5.107.2) |
| `npx eslint src/` | Sem config | OK (`.eslintrc.json`) |

### Dependências diretas atualizadas

| Pacote | Antes | Depois |
|--------|-------|--------|
| `webpack` | 4.47.0 | **5.107.2** |
| `webpack-cli` | 3.3.12 | **5.1.4** |
| `eslint` | 6.8.0 | **8.57.1** |
| `eslint-config-airbnb-base` | 14.2.1 | **15.0.0** |
| `eslint-plugin-import` | 2.22.1 | **2.29.1** |

### Alertas Dependabot resolvidos

| Alerta | Pacote | Solução |
|--------|--------|---------|
| #83 Prototype Pollution flatted | `flatted` | ESLint 8 + override `3.4.2` |
| #40 Uncontrolled resource consumption | `braces` | Webpack 5 |
| #79 serialize-javascript RCE | `serialize-javascript` | Webpack 5 |
| #87, #56 tmp path traversal | `tmp` | ESLint 8 (remove `inquirer`/`tmp` antigo) |
| #92 js-yaml DoS | `js-yaml` | Override `5.1.0` |
| #62 elliptic risky crypto | `elliptic` | Webpack 5 (remove polyfills crypto) |

### Overrides finais (mínimos)

```json
"overrides": {
  "lodash": "4.18.1",
  "minimatch": "3.1.5",
  "brace-expansion": "1.1.13",
  "flatted": "3.4.2",
  "js-yaml": "5.1.0"
}
```

### Arquivos novos/alterados

- `.eslintrc.json` — config airbnb-base, `linebreak-style: off` (Windows)
- `src/*.js` — apenas correções de estilo ESLint (`eol-last`, linha em branco)
- `dist/main.js` — rebuild Webpack 5

### Dependabot pausado

Após merge deste commit, o GitHub deve retomar PRs do Dependabot automaticamente. Se não retomar em 24h, reativar em **Settings → Code security → Dependabot**.

## Resultado do Lote 2 (jun/2026)

| Métrica | Antes (pós-Lote 1) | Depois (Lote 2) |
|---------|-------------------|-----------------|
| Total `npm audit` | 41 | **27** |
| Critical | 4 | **0** |
| High | 25 | **13** |
| Moderate | 9 | **7** |
| Low | 3 | **7** |
| `npm run build` | OK | OK (webpack 4.47.0, ~98ms) |
| `npm test` | Falha (placeholder) | Falha (placeholder, esperado) |

### Comandos executados (Lote 2)

```powershell
npm audit fix          # sem --force
npm install            # após overrides
npm audit fix          # segunda passagem
npm install            # minimatch 3.1.5
npm audit
npm test
npm run build
```

### Pacotes corrigidos no Lote 2

**Via `npm audit fix` (transitivos):** `cipher-base`, `pbkdf2`, `sha.js`, `browserify-sign`, `elliptic` (6.6.1), `decode-uri-component`, `ini`, `y18n`, `cross-spawn`, `ajv`, `terser`, `ssri`, `semver`, `inquirer`, `glob`, entre outros (~35 pacotes alterados no lockfile).

**Via `overrides` atualizados/novos em `package.json`:**

| Pacote | Lote 1 | Lote 2 | Nota |
|--------|--------|--------|------|
| `lodash` | 4.17.21 | **4.18.1** | 4.17.24 não existe no npm |
| `brace-expansion` | 1.1.12 | **1.1.13** | |
| `minimatch` | 3.1.2 | **3.1.5** | Corrige ReDoS em ESLint/glob |
| `y18n` | — | 4.0.3 | |
| `decode-uri-component` | — | 0.2.2 | |
| `ini` | — | 1.3.8 | |
| `semver` | — | 6.3.1 | |
| `cipher-base` | — | 1.0.7 | |
| `sha.js` | — | 2.4.12 | |
| `pbkdf2` | — | 3.1.6 | |
| `browserify-sign` | — | 4.2.6 | |
| `elliptic` | — | 6.6.1 | |
| `flatted` | — | 2.0.2 | Ainda flagged — ver restantes |
| `cross-spawn` | — | 6.0.6 | |
| `js-yaml` | — | 3.14.2 | Ainda flagged — ver restantes |
| `loader-utils`, `ansi-regex` | (Lote 1) | mantidos | |

### Vulnerabilidades restantes (27) — exigem Grupo B

| Pacote | Severidade | Origem | Fix disponível |
|--------|------------|--------|----------------|
| `braces` / `micromatch` | High | `webpack` → `watchpack-chokidar2` | Webpack 5 (`--force`) |
| `serialize-javascript` | High | `webpack` → `terser-webpack-plugin` | Webpack 5 (`--force`) |
| `elliptic` | Low* | `webpack` → `crypto-browserify` | Webpack 5 (`--force`) |
| `flatted` | High | `eslint` → `flat-cache` | ESLint 8+ (`--force`) |
| `js-yaml` | Moderate | `eslint` | ESLint 8+ (`--force`) |
| `tmp` | High | `eslint` → `inquirer` | ESLint 8+ (`--force`) |

\* Advisory marca `elliptic` como `*` (todas as versões); severidade reportada como low após patches.

**Não usar** `npm audit fix --force` sem aprovação — instalaria `webpack@5.107.2` e/ou `eslint@10.5.0`.

## Pacotes analisados (dependências diretas)

| Pacote | Antes | Depois (Lote 1) | Tipo |
|--------|-------|-----------------|------|
| `webpack` | 4.42.0 | 4.47.0 | dev |
| `webpack-cli` | 3.3.11 | 3.3.12 | dev |
| `eslint` | 6.8.0 | 6.8.0 (sem mudança) | dev |
| `eslint-config-airbnb-base` | 14.0.0 | 14.2.1 | dev |
| `eslint-plugin-import` | 2.20.1 | 2.22.1 (pin) | dev |
| `@primer/octicons` | 9.5.0 | **removida** (não utilizada) | — |

## Overrides transitivos (Lote 1)

| Pacote | Antes | Depois | Método |
|--------|-------|--------|--------|
| `loader-utils` | 1.2.3 | 1.4.2 | `overrides` |
| `lodash` | 4.17.19 | 4.17.21 | `overrides` |
| `minimatch` | 3.0.4 | 3.1.2 | `overrides` |
| `brace-expansion` | 1.1.11 | 1.1.12 | `overrides` |
| `ansi-regex` | 4.1.0 / 5.0.0 | 5.0.1 | `overrides` |

## Grupo A — Seguros para atualização (concluído no Lote 1)

Pacotes atualizados com patch/minor na mesma major, sem alterar código-fonte em `src/`.

## Grupo B — Alto impacto (não executado)

| Pacote | Atual | Alvo típico | Risco | Motivo |
|--------|-------|-------------|-------|--------|
| `webpack` | 4.47.0 | 5.107.2 | Alto | Major; API, plugins, polyfills Node; maior parte das CVEs restantes |
| `webpack-cli` | 3.3.12 | 5.x / 7.x | Alto | Acoplado ao Webpack 5 |
| `eslint` | 6.8.0 | 8.x / 9.x | Alto | Major; flat config; ecossistema de plugins |
| `eslint-config-airbnb-base` | 14.2.1 | 15.x | Alto | Exige ESLint 7+ |
| `eslint-plugin-import` | 2.22.1 | 2.32+ | Médio–alto | Versões recentes exigem ESLint 8+ |
| Node (runtime) | 22.22.0 testado | 18/20 LTS | Médio | Webpack 4 em Node 22 falhou no baseline (4.42.0); 4.47.0 build OK |
| Migração Vite | — | — | Alto | Alternativa documentada em `TODO_LEGACY.md` |
| `lockfileVersion` | 1 → 3 | — | Baixo–médio | npm moderno reescreveu o lockfile no `npm install` |

### Vulnerabilidades que provavelmente exigem Grupo B

- `micromatch` / `braces` / `anymatch` (cadeia Webpack 4)
- `elliptic` / `cipher-base` / `pbkdf2` / `sha.js` (polyfills crypto)
- `webpack` (audit sugere fix em Webpack 5)
- `eslint` e árvore profunda (`inquirer`, `tmp`, `y18n`, etc.)

## Planos de migração Grupo B (detalhados)

### 1. Webpack 4 → 5

```text
Pacote: webpack
Versão atual: 4.47.0
Versão recomendada: 5.107.2
Por que precisa atualizar: Maioria das CVEs high/critical na árvore de build
Tipo de breaking change: API de plugins, optimization, remoção de polyfills Node
Arquivos provavelmente afetados: webpack.config.js, package.json
Risco: Alto
Benefício: Segurança, compatibilidade Node moderno, ecossistema atual
Plano de migração: Atualizar webpack + webpack-cli juntos; ajustar config mínima; rebuild dist/
Como testar: npm run build; smoke test manual no browser
Deve ser feito agora ou depois: Depois — após Lote 1 estável
```

### 2. webpack-cli 3 → 5/7

```text
Pacote: webpack-cli
Versão atual: 3.3.12
Versão recomendada: 5.x ou 7.x (conforme Webpack 5)
Por que precisa atualizar: Acoplado ao upgrade Webpack 5; CVEs em loader-utils/yargs
Tipo de breaking change: Flags CLI, integração com Webpack 5
Arquivos provavelmente afetados: package.json (scripts build/watch)
Risco: Alto
Benefício: Paridade com Webpack 5
Plano de migração: Instalar junto com webpack@5; validar scripts
Como testar: npm run build && npm run watch
Deve ser feito agora ou depois: Junto com Webpack 5
```

### 3. ESLint 6 → 8+

```text
Pacote: eslint
Versão atual: 6.8.0
Versão recomendada: 8.57.x (ou 9.x com flat config)
Por que precisa atualizar: Versão EOL; CVEs em dependências profundas
Tipo de breaking change: Config format, regras, peer deps airbnb-base 15+
Arquivos provavelmente afetados: package.json, .eslintrc.json (hoje ausente)
Risco: Alto
Benefício: Lint moderno, menos CVEs transitivas
Plano de migração: Criar .eslintrc.json; subir eslint + airbnb-base 15 + import 2.29+
Como testar: npm run npx-fix (ou novo script lint)
Deve ser feito agora ou depois: Depois do Webpack 5 (ou em paralelo em branch)
```

### 4. Node + engines

```text
Pacote: Node (runtime)
Versão atual: 22.22.0 (ambiente de desenvolvimento)
Versão recomendada: 20 LTS ou 18 LTS documentado em engines
Por que precisa atualizar: Webpack 4.42.0 falhou com ERR_OSSL_EVP_UNSUPPORTED no Node 22
Tipo de breaking change: OpenSSL 3 vs algoritmos legados do Webpack 4 antigo
Arquivos provavelmente afetados: package.json (campo engines), README/docs
Risco: Médio
Benefício: Ambiente reproduzível; evita surpresas em CI
Plano de migração: Adicionar "engines": { "node": ">=18 <23" }; testar em 20 LTS
Como testar: npm run build em Node 18/20/22
Deve ser feito agora ou depois: Documentar após validar Webpack 4.47.0 (build OK em Node 22)
```

### 5. Migração para Vite (alternativa)

```text
Pacote: vite (substitui webpack)
Versão atual: N/A
Versão recomendada: A confirmar (última estável)
Por que precisa atualizar: DX, deps modernas, menos polyfills legados
Tipo de breaking change: Novo bundler, nova config, scripts
Arquivos provavelmente afetados: package.json, novo vite.config.js, dist/
Risco: Alto (escopo de projeto)
Benefício: Toolchain moderna para projeto pequeno
Plano de migração: Branch dedicada; manter API pública do app
Como testar: build + deploy GitHub Pages
Deve ser feito agora ou depois: Opcional — branch separada
```

## Ordem recomendada de migração (Grupo B)

1. Documentar `engines` Node após validação em LTS
2. Webpack 5 + webpack-cli compatível
3. ESLint 8 + airbnb-base 15 + `.eslintrc.json`
4. Avaliar Vite (opcional, branch separada)
5. Adicionar testes reais (Jest/Vitest)

## Lotes planejados

| Lote | Status | Escopo |
|------|--------|--------|
| 0 | Concluído | `npm install` + baseline audit/build |
| 1 | Concluído | Grupo A direto + overrides iniciais + remoção octicons |
| 2 | Concluído | `npm audit fix` + overrides expandidos; 41 → 27 vulns |
| 3 | **Concluído** | Webpack 5 + ESLint 8; 27 → **0** vulns; alertas Dependabot |
| 4 | Pendente | Opcional: ESLint 9 flat config, Vite, CI build |

## Branch Webpack 5 (concluída no Lote 3)

A migração foi feita diretamente em `development`. Referência histórica:

```bash
npm install webpack@5 webpack-cli@5 eslint@8 eslint-config-airbnb-base@15 eslint-plugin-import@2.29.1 --save-dev
npm run build
npm audit   # 0 vulnerabilities
```

## Riscos conhecidos

- `npm run npx-fix` falha: não existe `.eslintrc*` no repositório (dívida pré-existente)
- `npm test` é placeholder e sempre falha
- `dist/main.js` foi regenerado pelo build pós-Lote 2 — incluir no commit de release
- Vulnerabilidades restantes (27) exigem major upgrades (Webpack 5 / ESLint 8)

## Próximos passos

1. Commit do Lote 3 (ver mensagem sugerida abaixo)
2. Merge em `main`/`development` para fechar alertas no GitHub
3. Opcional: ESLint 9 + flat config; migração Vite; CI com build automático
4. Adicionar `engines` Node em `package.json`
