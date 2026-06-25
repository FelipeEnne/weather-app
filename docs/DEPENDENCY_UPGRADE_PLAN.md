# Plano de atualização de dependências

Documento gerado após diagnóstico e aplicação do **Lote seguro 1** (jun/2026).

## Stack do projeto

| Aspecto | Valor |
|---------|-------|
| App | Frontend-only, vanilla JavaScript (ES modules) |
| Bundler | Webpack 4 (`webpack.config.js`) |
| Linter | ESLint 6 + eslint-config-airbnb-base + eslint-plugin-import |
| Gerenciador | npm + `package-lock.json` |
| Testes | Placeholder (`npm test` sempre falha) |
| CI | Não configurado |

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
| 1 | Concluído | Grupo A direto + overrides + remoção octicons |
| 2 | Pendente | Overrides adicionais (`semver`, `yargs-parser`, `y18n`) com teste |
| 3+ | Pendente | Grupo B (Webpack 5, ESLint 8, etc.) |

## Lote 2 sugerido (próximo passo)

Pacotes candidatos (testar individualmente):

- `yargs-parser` → 13.1.2+ (via override)
- `y18n` → 4.0.1+ (via override ou `npm audit fix` seletivo)
- `semver` → 6.3.1 (cuidado com consumidores antigos)

**Não usar** `npm audit fix --force` sem aprovação explícita.

## Riscos conhecidos

- `npm run npx-fix` falha: não existe `.eslintrc*` no repositório (dívida pré-existente)
- `npm test` é placeholder e sempre falha
- `dist/main.js` foi regenerado pelo build pós-Lote 1 — incluir no commit de release
- Vulnerabilidades restantes (~42) exigem major upgrades ou Lote 2 de overrides

## Próximos passos

1. Commit do Lote 1 (`package.json`, `package-lock.json`, `dist/main.js`, docs)
2. Avaliar Lote 2 de overrides transitivos
3. Planejar branch para Webpack 5 ou Vite
4. Criar `.eslintrc.json` (separado do upgrade de deps)
