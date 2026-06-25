# TODO Legacy — Weather App

Lista de dívidas técnicas, riscos e melhorias identificadas na análise do projeto. Classificadas por prioridade.

---

## Alta prioridade

### API key exposta no repositório

A chave da OpenWeatherMap está hardcoded em `src/DOMmodel.js` e compilada em `dist/main.js`, ambos versionados no Git. Qualquer pessoa com acesso ao repositório ou ao site pode extrair e abusar da chave.

**Ação sugerida:** revogar/rotacionar a chave na conta OpenWeatherMap, mover para variável de ambiente injetada no build, e nunca commitar segredos.

### Fluxo de busca não atualiza o clima

Ao clicar no botão de busca, a cidade é salva no `sessionStorage`, mas `displayData()` não é chamada. O usuário precisa recarregar ou alternar °C/°F para ver o resultado.

**Ação sugerida:** chamar `displayData()` após salvar a cidade, ou unificar busca e fetch em um único fluxo.

### Tratamento de erro da API insuficiente

Quando `data.ok === false`, o painel é ocultado, mas o código ainda faz `await data.json()` e acessa `data.name`, `data.weather[0]`, etc., o que pode gerar `TypeError` em runtime.

**Ação sugerida:** retornar cedo em caso de erro, exibir mensagem ao usuário, validar estrutura da resposta.

### Formulário pode recarregar a página

O form `#form-getCity` usa `method="GET"` e o botão é `type="submit"` sem `preventDefault()`. Isso pode causar reload indesejado.

**Ação sugerida:** adicionar `event.preventDefault()` no handler de submit ou mudar o botão para `type="button"`.

### Mixed content (HTTP em página HTTPS)

Ícones do clima usam `http://openweathermap.org/img/wn/...`. Em contexto HTTPS (GitHub Pages), navegadores podem bloquear.

**Ação sugerida:** trocar para `https://` na URL da imagem.

---

## Média prioridade

### `dist/` versionado pode dessincronizar do `src/`

O bundle `dist/main.js` é commitado manualmente. Esquecer `npm run build` após editar `src/` leva a deploy com código desatualizado.

**Ação sugerida:** automatizar build no CI antes do deploy, ou documentar checklist de release; avaliar parar de versionar `dist/` e gerar no GitHub Actions.

### ESLint sem arquivo de configuração

`package.json` declara `eslint-config-airbnb-base`, mas não há `.eslintrc*` no repositório. O comando `npm run npx-fix` pode não aplicar as regras esperadas.

**Ação sugerida:** criar `.eslintrc.json` com `extends: ["airbnb-base"]` e ambiente browser.

### Dependência `@primer/octicons` não utilizada

Listada em `dependencies`, mas o ícone de busca no HTML é SVG inline. Ocupa espaço no `node_modules` sem benefício.

**Ação sugerida:** remover do `package.json` se confirmado que não é usada.

### Bootstrap 4 via CDN descontinuado

O CDN `maxcdn.bootstrapcdn.com` para Bootstrap 4.3.1 pode estar desatualizado ou indisponível no futuro.

**Ação sugerida:** migrar para Bootstrap 5 via CDN atualizado ou instalar como dependência local.

### Ausência total de testes

`npm test` é placeholder. Não há cobertura para fetch, conversão de temperatura nem persistência da cidade.

**Ação sugerida:** adicionar Jest ou Vitest com mocks de `fetch` e `sessionStorage`.

### Re-fetch desnecessário ao alternar °C/°F

Trocar unidade refaz a chamada completa à API em vez de reutilizar dados já carregados.

**Ação sugerida:** cachear resposta da API em variável de módulo e converter localmente.

### Side effect no import de `returnCity.js`

O módulo registra event listener ao ser importado, dificultando testes unitários e reuso.

**Ação sugerida:** exportar função de inicialização chamada explicitamente em `index.js`.

---

## Baixa prioridade

### Typos em IDs e classes HTML

- `buttom-celsius`, `buttom-fahrenheit` (deveria ser `button`)
- `backgrond` (deveria ser `background`)
- `icon-seach` (deveria ser `search`)
- Meta tags com `poperty` em vez de `property`

**Ação sugerida:** corrigir com cuidado — IDs são referenciados no JS; exige alteração coordenada em HTML e JS.

### Dependências desatualizadas

Webpack 4, ESLint 6 e plugins associados estão em versões de 2020. Podem ter vulnerabilidades conhecidas.

**Ação sugerida:** atualizar gradualmente ou migrar para ferramenta moderna (Vite).

### Modo Webpack sempre `development`

`webpack.config.js` usa `mode: 'development'`, gerando bundle maior e sem otimizações de produção.

**Ação sugerida:** usar `production` para builds de deploy.

### Script `install-web` redundante

`npm run install-web` apenas instala Webpack, duplicando o que `npm install` já faz.

**Ação sugerida:** remover script legado.

### Funcionalidade de favoritar cidade

Mencionada no README como "future work", mas não implementada.

**Ação sugerida:** implementar com `localStorage` quando houver demanda.

### Ausência de servidor de desenvolvimento

Não há `webpack-dev-server` configurado. Desenvolvimento depende de `watch` + servidor estático manual.

**Ação sugerida:** adicionar `webpack-dev-server` ou `vite` para DX melhor.

### Documentação original apenas em inglês

O `README.md` original está em inglês. A pasta `docs/` agora cobre em português, mas o README não foi atualizado.

**Ação sugerida:** adicionar link para `docs/` no README ou traduzir (decisão do mantenedor).

### Acoplamento DOM + lógica em `DOMmodel.js`

Fetch, conversão e renderização estão no mesmo arquivo.

**Ação sugerida:** separar em módulos (`weatherApi.js`, `renderWeather.js`) em refatoração futura.

---

## Resumo por categoria

| Categoria | Itens alta | Itens média | Itens baixa |
|-----------|------------|-------------|-------------|
| Segurança | 2 | 0 | 0 |
| Bugs / UX | 2 | 1 | 0 |
| Arquitetura | 0 | 3 | 2 |
| Dependências | 0 | 2 | 2 |
| DX / Organização | 0 | 2 | 4 |
| Testes | 0 | 1 | 0 |
