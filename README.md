# REPORT 

## Sobre o front

No geral utilizamos o scaffolding das aulas para a aplicação front-end, com algumas alterações que facilitaram o teste do nosso jogador mostrando mais informações na tela. A seguir detalho um pouco mais de cada adição:

* Foto de perfil dos jogadores mostrando de qual time são, Turing ou Lovelace, baseado em cores (Azul para Turing e Vermelho para Lovelace). Isso foi feito para sabermos quem está na partida e deixar a visualização um pouco mais bonita.

* Nome do vencedor. Adicionado para entendermos melhor os resultados da partida direto pelo front

* Histórico de jogadas. Ao abrir partidas já encerradas é possível acompanhar todo o jogo, jogada a jogada. Isso foi feito para podermos vizualisar se o nosso jogador inteligente estava se comportando de maneira ideal.

* Label avisando que estamos aguardando todos os jogadores a fim de mostrar por que a partida ainda não pode ser iniciada

* Botão para nosso jogador entrar nas partidas direto pelo front para facilitar o processo de testes.


# PI5 - Vite Frontend Starter

> Repositório com um scaffolding básico para construir o front-end do projeto do PI5: Aplicações de Inteligência Artificial, do prof. Guilherme Rey.

## Requisitos

- Node.js `v22` ou maior

## Dependências

- Vite
- React
- TypeScript
- React Router
- Tailwind

## Organização deste repositório

O projeto foi organizado de modo que vocês possam importar módulos utilizando aliases, para facilitar (e diminuir o uso de caminhos relativos), sendo:

| Pasta         |    Alias     | Descrição                                       |
| :------------ | :----------: | :---------------------------------------------- |
| `public`      |     `--`     | Contém assets e itens acessíveis via URL direta |
| `src/assets`  | `@assets/*`  | Assets de dados e outros para importação direta |
| `src/core`    |  `@core/*`   | Componentes, helpers, modelos e tipos globais   |
| `src/feature` | `@feature/*` | Módulos da aplicação, encapsulados em features  |
| `src/routes`  | `@routes/*`  | Páginas equivalente às rotas da sua app         |
| `src/styles`  | `@styles/*`  | Folhas de estilo                                |
| `src/ui`      |   `@ui/*`    | Componentes genéricos de interface              |

## Como executar

- Clone o projeto OU crie um novo projeto à partir deste usando `tiged`:
  ```
  npx tiged https://github.com/Yarquen/pi5-frontend-scaffolding [nome-do-projeto] --mode=git
  ```
- Instale as dependências com o seu package manager de preferência:
  ```sh
  npm install
  # OU
  pnpm install
  # OU
  yarn install
  # OU
  bun install
  ```
- Execute o projeto:
  ```sh
  npm run dev
  # OU
  pnpm run dev
  # OU
  yarn dev
  # OU
  bun dev
  ```
- O projeto será executado em [`https://localhost:5173`](https://localhost:5173)
