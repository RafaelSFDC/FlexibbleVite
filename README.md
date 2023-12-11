<br/>
<p align="center">
    <h3 align="center">

![Screen Shot](/public/logo-purple.svg)

  </h3>

  <p align="center">
    Rede para programadores mostrarem seus trabalhos
    <br/>
  </p>
</p>

![Contributors](https://img.shields.io/github/contributors/RafaelSFDC/AppWrite-Chat?color=dark-green) ![Issues](https://img.shields.io/github/issues/RafaelSFDC/AppWrite-Chat) ![License](https://img.shields.io/github/license/RafaelSFDC/AppWrite-Chat)

## Tabela de conteúdo

- [Projeto](#about-the-project)
- [Dependências](#built-with)
- [Começando](#getting-started)
  - [Pré-requisitos](#prerequisites)
  - [Instalação](#installation)
- [Como usar](#usage)

## Sobre o projeto

![Screen Shot](https://cloud.appwrite.io/v1/storage/buckets/6570be7171f4ac9e1f36/files/6575068f99c9e02908a2/view?project=656f996fca7e396a7523)

Esse é um projeto que eu fiz com base no [JavaScriptMastery](https://www.youtube.com/watch?v=986hztrfaSQ) porém eu mudei algumas coisas e pretendo implementar algumas funcionalidades extras. Ele fez o projeto em NextJS e eu fiz em Vite, por questão de gosto pessoal. Ele fez em GrahQL e eu preferi usar Appwrite. É uma especie de rede social onde os programdores podem postar, editar, e deletar projetos. E qualquer pessoa pode acessar o site e ver os projetos.

## Lista de dependências

- [Vite](https://vitejs.dev/)
- [AppWrite](https://appwrite.io/)
- [Framer Motion](https://www.framer.com/motion/)
- [Valtio](https://valtio.pmnd.rs/)
- [Sonner](https://sonner.emilkowal.ski/)
- [Tailwind](https://tailwindcss.com/)

## Começando

Vou assumir que você já tenha o básico para usar NextJS / Vite instalado.

1. Primeiramente você precisa ir para site [Appwrite](https://www.framer.com/motion/), criar uma conta e criar um projeto.
2. **(Opcional)** Use a opção adicionar plataforma selecione sua plataforma e use as instruções para configurar o seu projeto.
3. Depois disso crie uma Database e um Storage.
4. Crie 2 coleções Users e Projects ou pode configurar como quiser.
   > [!IMPORTANT]  
   > Se a Database for configurado de forma errada o projeto não vai funcionar então preste atenção em cada etapa.
5. Na coleção Users você vai adicionar 2 Attributes do tipo relationship.

- name : string , required.
- email : string , required.
- avatarURL : url.
- githubURL : url.
- description : string.
- accountId : string.
- Projects: relationship : Two-way relationship [
  Attribute Key = projects,
  Attribute Key (related collection) = createdBY
  Relation = Many to many
  On deleting a document = Set null
  ].

6. Na coleção Projects você vai adicionar 2 Attributes do tipo relationship.

- title : string , required.
- description : string.
- image : url.
- liveSiteUrl : url.
- githubURL : url.
- accountId : string.
- category : string.
- cratedBy : Criado anteriormente em Users

Pronto! Agora apenas instalar as dependências e configurar as váriaveis de ambiente.

### Pré-requisitos

- npm

```sh
npm install npm@latest -g
```

### Instalação

1. Clone o repositório

```sh
git clone https://github.com/RafaelSFDC/AppWrite-Chat.git
```

2. Instale as Dependências

```sh
npm install ou yarn
```

3. Crie seu arquivo .env.local e configure suas chaves, o nome das chaves é bem direto ao ponto então não acho que devam ter dificuldade

```JS
NEXT_PUBLIC_APPWRITE_PROJECT_ID=""
NEXT_PUBLIC_APPWRITE_URL=""
NEXT_PUBLIC_APPWRITE_STORAGE_ID=""
NEXT_PUBLIC_APPWRITE_DATABASE_ID=""
NEXT_PUBLIC_APPWRITE_USER_COLLECTION_ID=""
NEXT_PUBLIC_APPWRITE_PROJECTS_COLLECTION_ID=""


```

## Uso

Esse projeto ainda não está completo, mas pode ser usado como uma espécie de blog para postar seus projetos.
