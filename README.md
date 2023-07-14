### Next.js 13 com Pocketbase

## Pré-requisitos

- Node.js (de preferência a versão LTS) - [Página de download](https://nodejs.org/en/download/)
- Pocketbase - [pocketbase.io](https://pocketbase.io/)

## Setup

1. Antes de executar o framework, é necessário instalar as dependências com o comando ```npm install``` no terminal (certifique que esteja na pasta do projeto).
2. Se estiver usando Windows, execute o arquivo .exe, mas caso se você estiver no Linux, já tem no projeto pronto para ser executado.
3. Execute Pocketbase com o comando
`./pocketbase serve`
4. Abre o [Admin UI](http://127.0.0.1:8090/_/), crie uma collection, vá na engrenagem que se encontra no topo e ao lado do nome da collection, em seguida no "API RULES" e atualize todas as regras de segurança para "allow read/write access".
5. Execute o comando `npm run dev`.
