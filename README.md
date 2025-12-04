# :checkered_flag: Cultural Events

O projeto **Cultural Events** é um portal centralizado para a divulgação de eventos culturais, como manifestações artísticas, peças de teatro, apresentações musicais, feiras de artesanato, entre outros. A plataforma permite que qualquer visitante visualize os eventos que acontecerão na comunidade. Usuários cadastrados, sejam eles artistas ou membros da comunidade, podem contribuir divulgando seus próprios eventos, fortalecendo a cena cultural local.

---

## :technologist: Membros da equipe

| Matrícula | Nome                    | Curso                  |
|-----------|-------------------------|------------------------|
| 555524    | Renan Alencar Soares    | Engenharia de Software |

---

## :bulb: Objetivo Geral

Fortalecer a cultura local e dar visibilidade a artistas independentes, criando um espaço digital acessível para divulgação e descoberta de eventos culturais na comunidade.

---

## :eyes: Público-Alvo

- Comunidades locais interessadas em participar de eventos culturais
- Artistas independentes e organizadores de eventos
- Produtores culturais que buscam promover manifestações artísticas

---

## :star2: Impacto Esperado

- Aumentar o engajamento da comunidade em eventos locais
- Gerar maior interação social e fortalecimento de vínculos comunitários
- Democratizar o acesso à informação sobre eventos culturais
- Promover a economia criativa e valorizar artistas locais

---

## :people_holding_hands: Papéis ou tipos de usuário da aplicação

| Papel                    | Descrição                                                                 |
|--------------------------|---------------------------------------------------------------------------|
| **Visitante**            | Usuário não autenticado que pode visualizar eventos publicamente          |
| **Usuário Logado**       | Usuário autenticado que pode criar e gerenciar seus próprios eventos     |
| **Administrador**        | Usuário com permissões totais de gerenciamento da plataforma             |

---

## :triangular_flag_on_post: Principais funcionalidades da aplicação

### 1. Visitante (Usuário não logado)
- Visualizar a lista completa de eventos (com paginação)
- Filtrar eventos por categoria, data ou localização
- Ver os detalhes completos de um evento específico
- Realizar cadastro (criar uma nova conta)
- Realizar login na plataforma

### 2. Usuário Logado
Todas as permissões do Visitante, além de:
- **[Restrito]** Criar novos eventos culturais
- **[Restrito]** Atualizar e deletar apenas os eventos que ele mesmo criou
- **[Restrito]** Gerenciar sua própria conta de usuário (atualizar dados pessoais, alterar senha)
- Realizar logout da plataforma

### 3. Administrador
Todas as permissões do Usuário Logado, além de:
- **[Restrito]** Gerenciar **TODOS** os eventos, de qualquer usuário (CRUD completo: Criar, Ler, Atualizar, Deletar)
- **[Restrito]** Gerenciar todas as contas de usuário (visualizar, atualizar papel/permissões, deletar)
- **[Restrito]** Gerenciar as categorias de eventos (criar, editar e deletar categorias como "Música", "Teatro", "Arte", "Dança", etc.)

---

## :spiral_calendar: Entidades ou tabelas do sistema

| Entidade    | Descrição                                                                 |
|-------------|---------------------------------------------------------------------------|
| **User**    | Armazena informações dos usuários (dados pessoais, credenciais, papel)    |
| **Event**   | Contém dados dos eventos culturais (título, descrição, data, local, etc.) |
| **Category**| Define as categorias de eventos disponíveis na plataforma                 |
