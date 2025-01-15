
# **Gestão PABX - Documentação Completa**

## **Descrição**
O **Gestão PABX** é um sistema desenvolvido para gerenciar usuários de um sistema PABX, permitindo o **cadastro**, **edição**, **exclusão**, e **listagem** de usuários. O sistema implementa controle de acesso baseado em login e senha, oferecendo funcionalidades de filtragem e organização dos usuários cadastrados. Ele utiliza **React** no frontend, **AdonisJS** no backend, e **PostgreSQL** como banco de dados.

---

## **Tecnologias Utilizadas**

### **Frontend**
- **React**: Framework para criação de interfaces dinâmicas.
- **Tailwind CSS**: Framework CSS para estilização rápida e responsiva.

### **Backend**
- **AdonisJS**: Framework backend para API RESTful.

### **Banco de Dados**
- **PostgreSQL**: Sistema de banco de dados relacional.

---

## **Configuração do Ambiente**

Configure as variáveis de ambiente no arquivo `.env` para conectar o backend ao banco de dados e definir os parâmetros do sistema. Exemplo:

```plaintext
DB_CONNECTION=pg
TZ=UTC
PORT=3333
HOST=localhost
LOG_LEVEL=info
APP_KEY=<sua_chave_app>
NODE_ENV=development
DB_HOST=127.0.0.1
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=<sua_senha>
DB_DATABASE=GestaoPabx
```

---

## **Instalação**

### **Pré-requisitos**
Antes de começar, certifique-se de ter instalado:
- **Node.js** (v14 ou superior)
- **npm** ou **yarn**
- **PostgreSQL**

### **Passos de Instalação**

1. **Clonar o repositório**
   ```bash
   git clone <url-do-repositório>
   cd <nome-do-diretório>
   ```

2. **Instalar dependências**
   - Instale as dependências do projeto:
     ```bash
     npm install
     ```

3. **Configurar variáveis de ambiente**
   - Preencha o arquivo `.env` com as configurações necessárias.

4. **Configurar Tailwind CSS**
   - Inicialize o Tailwind CSS:
     ```bash
     npx tailwindcss init
     ```

5. **Instalar cliente PostgreSQL**
   - Adicione o cliente PostgreSQL para integração com o backend:
     ```bash
     npm install pg
     ```

6. **Executar migrações do banco de dados**
   - Crie as tabelas necessárias no banco:
     ```bash
     adonis migration:run
     ```

7. **Iniciar o servidor**
   - Para iniciar o projeto manualmente:
     - Backend:
       ```bash
       cd backend
       npm run dev
       ```
     - Frontend:
       ```bash
       cd frontend
       npm start
       ```

---

## **Execução Simultânea com `concurrently`**

Para simplificar a execução do **frontend** e **backend** simultaneamente, utilize o pacote `concurrently`:

### **Instalar `concurrently`**
```bash
npm install concurrently --save-dev
```

### **Adicionar Script ao `package.json`**
No `package.json` da raiz, adicione o script:

```json
"scripts": {
  "start:all": "concurrently \"cd backend && npm run dev\" \"cd frontend && npm start\""
}
```

### **Executar o Projeto**
Agora, basta rodar o comando:

```bash
npm run start:all
```

Isso iniciará os servidores do frontend e backend simultaneamente.

---

## **Estrutura do Projeto**

### **Frontend**

#### **Rotas Principais**
- `/`: Página de login.
- `/cadastro`: Cadastro de novos logins.
- `/usuarios`: Lista de usuários.
- `/usuarios/cadastro`: Cadastro de novos usuários.
- `/usuarioslogin`: Lista de logins de usuários.

### **Backend**

#### **Controllers**
- **NovosUsuariosController**: Gerencia o CRUD de novos usuários.
- **UsuariosController**: Gerencia o CRUD dos usuários cadastrados.

#### **Modelos**
- **User**: Modelo responsável pelos logins.
- **Usuario**: Modelo dos dados de usuários.

---

## **Banco de Dados**

Estrutura básica das tabelas no PostgreSQL:
- **Users**: Tabela para gerenciar logins.
- **Usuarios**: Tabela que armazena os dados dos usuários.

---

## **Funcionalidades**

### **CRUD de Usuários**
- **Criar**: Cadastro de novos logins e usuários.
- **Ler**: Exibição de usuários com informações detalhadas.
- **Atualizar**: Atualização dos dados dos usuários.
- **Excluir**: Exclusão de usuários com confirmação.

### **Controle de Acesso**
- Somente usuários autenticados podem acessar as funcionalidades.
- Senha específica (**183610**) para acessar páginas críticas, como `/usuarioslogin`.

### **Filtragem**
- Filtragem de usuários por **nome** e **status** (ativo/inativo).

---

## **Decisões Técnicas**

### **Motivação para Escolha das Tecnologias**
1. **AdonisJS**: Escolhido para explorar sua simplicidade e estrutura robusta para APIs.
2. **React**: Utilizado pela familiaridade e pela flexibilidade para construção de interfaces dinâmicas.
3. **Tailwind CSS**: Escolhido para estilização rápida e responsiva.
4. **PostgreSQL**: Optado devido à sua segurança, escalabilidade e compatibilidade com AdonisJS.

### **Aprendizado e Pesquisa**
Cada tecnologia foi implementada após pesquisa aprofundada e prática, utilizando tutoriais, documentação oficial e discussões em fóruns para garantir qualidade e adoção de melhores práticas.

---

## **Uso**

1. **Início do Sistema**
   - Use `npm run start:all` para iniciar frontend e backend simultaneamente.
   - Acesse a interface no navegador em [http://localhost:3000](http://localhost:3000).

2. **Cadastro e Gerenciamento**
   - Adicione novos usuários em `/usuarios/cadastro`.
   - Liste e gerencie usuários em `/usuarios` e `/usuarioslogin`.

3. **Filtragem**
   - Filtre usuários pelo campo de busca ou pelo status (ativo/inativo).

4. **Edição e Exclusão**
   - Edite os dados dos usuários pelo botão "Editar".
   - Exclua usuários com a segurança de uma confirmação antes da ação.

---

## **Contribuição**

Sinta-se à vontade para contribuir com melhorias ou relatórios de problemas.

### **Passos para Contribuir**
1. Faça um fork do repositório:
   ```bash
   git clone <url-do-repositório>
   ```
2. Crie uma nova branch para sua feature:
   ```bash
   git checkout -b minha-feature
   ```
3. Commit suas mudanças:
   ```bash
   git commit -m "Adiciona minha nova feature"
   ```
4. Submeta um pull request.

---

## **Contato**

Para dúvidas ou sugestões, entre em contato através de [seu email ou canal preferido].
