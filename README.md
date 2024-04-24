# Node.js Express template

This is a Node.js Express project with an HTTP server.

Add your [configuration](https://codesandbox.io/docs/projects/learn/setting-up/tasks) to optimize it for [CodeSandbox](https://codesandbox.io).

## How does this work?

We run `yarn start` to start an HTTP server that runs on http://localhost:8080. You can open new or existing devtools with the + button next to the devtool tabs.

## Resources

- [CodeSandbox — Docs](https://codesandbox.io/docs)
- [CodeSandbox — Community](https://codesandbox.community)


# Documentation de l'API

## Endpoints

### 1. Liste des Films

#### URL

/api/movies

#### Méthode HTTP

- POST: Crée un nouveau film
- GET: Récupère la liste de tous les films

#### Description

- `POST /api/movies`: Crée un nouveau film.
{
  "title": "Titre du film",
  "description": "Description du film"
}
- `GET /api/movies`: Récupère la liste de tous les films.

### 2. Détails d'un Film

#### URL

/api/movies/:movieId

#### Méthode HTTP

- GET: Récupère les détails d'un film spécifique
- PUT: Met à jour les détails d'un film spécifique
- DELETE: Supprime un film spécifique

#### Description

- `GET /api/movies/:movieId`: Récupère les détails d'un film spécifique.
- `PUT /api/movies/:movieId`: Met à jour les détails d'un film spécifique.
{
  "title": "Nouveau titre du film",
  "description": "Nouvelle description du film"
  "status": "Changement du status"
}

- `DELETE /api/movies/:movieId`: Supprime un film spécifique.

### 3. Modifier le Statut d'un Film

#### URL

/api/movies/:movieId/status

#### Méthode HTTP

- PATCH: Modifie le statut d'un film spécifique

#### Description

- `PATCH /api/movies/:movieId/status`: Modifie le statut d'un film spécifique.

{
  "status": "Nouveau statut du film"
}

### 4. Utilisateurs

#### URL

/api/users

#### Méthode HTTP

- POST: Crée un nouvel utilisateur
- GET: Récupère les détails de l'utilisateur actuellement connecté
- PUT: Met à jour les détails de l'utilisateur actuellement connecté
- DELETE: Supprime l'utilisateur actuellement connecté

#### Description

- `POST /api/users`: Crée un nouvel utilisateur.
{
  "username": "Nom d'utilisateur",
  "email": "adresse@example.com",
  "password": "MotDePasse123"
  "role": "Role de l'utilisateur"
}
- `GET /api/users`: Récupère les détails de l'utilisateur actuellement connecté.
- `PUT /api/users`: Met à jour les détails de l'utilisateur actuellement connecté.
{
  "username": "Nom d'utilisateur",
  "email": "adresse@example.com",
  "password": "MotDePasse123"
  "role": "Role de l'utilisateur"
}

- `DELETE /api/users`: Supprime l'utilisateur actuellement connecté.

### 5. Autres Opérations Utilisateur (Administration)

#### URL

/api/users/:id

#### Méthode HTTP

- GET: Récupère les détails d'un utilisateur spécifique (Administration)
- PUT: Met à jour les détails d'un utilisateur spécifique (Administration)

- DELETE: Supprime un utilisateur spécifique (Administration)

#### Description

- `GET /api/users/:id`: Récupère les détails d'un utilisateur spécifique pour l'administration.
- `PUT /api/users/:id`: Met à jour les détails d'un utilisateur spécifique pour l'administration.
{
  "username": "Nom d'utilisateur",
  "email": "adresse@example.com",
  "password": "MotDePasse123"
  "role": "Role de l'utilisateur"
}
- `DELETE /api/users/:id`: Supprime un utilisateur spécifique pour l'administration.
