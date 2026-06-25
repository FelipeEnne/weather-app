# Banco de Dados — Weather App

## Resumo

**O projeto não utiliza banco de dados.**

Não há servidor de banco, ORM, migrations, seeds nem modelos de dados persistentes. Toda a "persistência" ocorre no navegador via `sessionStorage`.

## Persistência no navegador

### sessionStorage

| Aspecto | Detalhe |
|---------|---------|
| Tipo | Web Storage API (`sessionStorage`) |
| Chave | `0` (número usado como chave string) |
| Valor | Nome da cidade em JSON (`JSON.stringify(cidade)`) |
| Escopo | Sessão da aba do navegador |
| Arquivo responsável | `src/returnCity.js` |

### Operações

**Gravar cidade** (ao clicar no botão de busca):

```javascript
sessionStorage.setItem(0, JSON.stringify(cidade));
```

**Ler cidade** (ao chamar `getCity()`):

```javascript
const cit = sessionStorage.getItem(0);
return JSON.parse(cit);
```

### Comportamento

- Os dados são **perdidos** ao fechar a aba ou o navegador.
- Não há sincronização entre abas.
- Na primeira visita, `getItem(0)` retorna `null` e `JSON.parse(null)` retorna `null` em JavaScript.

## ORM

Não aplicável.

## Tabelas / Models

Não aplicável.

## Relacionamentos

Não aplicável.

## Migrations

Não existem.

## Seeds

Não existem.

## Dados sensíveis

| Dado | Sensibilidade | Observação |
|------|---------------|------------|
| Nome da cidade | Baixa | Armazenado apenas na sessão do navegador |
| API key OpenWeatherMap | **Alta** | Hardcoded em `src/DOMmodel.js` (não é dado de banco, mas é credencial exposta) |
| Dados meteorológicos | Pública | Retornados pela API e exibidos na tela |

A cidade informada pelo usuário não é enviada a nenhum backend próprio — apenas à API OpenWeatherMap como parâmetro de consulta.

## Evolução futura (sugestão)

Se a funcionalidade de "favoritar cidade" for implementada (mencionada no README), o armazenamento provavelmente usaria `localStorage` em vez de `sessionStorage`, ainda sem banco de dados. Isso é **A confirmar** conforme implementação futura.
