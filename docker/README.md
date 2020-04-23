# HelpMeCook  1.0.0

### Exigenced:

- Docker

- PHP 7.3

- Composer

- NodeJS / npm

### Installation:

- **monter (et construire) l'environnement de développement**

  - `cd docker`

  - `docker-compose -f docker-compose/docker-compose.yml up`

  - Exécuter en mode détaché (optionnel):

    - `docker-compose -f docker-compose/docker-compose.yml up -d`

  - Configurer le fichier hostes pour ajouter les vhosts suivant:

    - `127.0.0.1 api.local web.local phpmyadmin.local`

### Configuration API:

- Apres avoir monter l'env de dev sous docker il faut installer les dépendances:

  - `cd docker-compose`

  - `docker-compose -f docker-compose.yml run --rm composer install`

- Dans un navigateur web accéder à l'api via http://api.local

> Accès phpmyadmin: http://phpmyadmin.local

### Configuration Web Client:

1. staller Agular cli globalement:

   - `npm install -g @angular/cli`

2. List item:

   - `cd web/`

   - `npm install`

3. Servir l'application localement (dev mode):

   - `ng serve`

   - Accéder à l'app via http://localhost:4200

> Servir l'application sur un Vhost (sous docker):
>
> - `ng build --prod`
>
> - Accéder à l'app via http://web.local ou via localhost:4200

### Configuration SSO:

 1. Installation: déjà faite avec docker-compose
 

```
 ...
 keycloak:  
  image: jboss/keycloak  
  environment:  
    - DB_VENDOR=MYSQL  
    - DB_ADDR=dbase  
    - DB_DATABASE=keycloak  
    - DB_USER=keycloak  
    - DB_PASSWORD=password  
    - KEYCLOAK_USER=admin  
    - KEYCLOAK_PASSWORD=admin  
    - KEYCLOAK_HOSTNAME=keycloak.local
  ports:  
    - 8080:8080  
  links:  
    - database:dbase  
  network_mode: "bridge"
  ...
```


> Accès a l'admin console:
> - url: http://keycloak.local:8080
> - login: admin | password: admin

 2. Comprendre les concepts de base et la terminologie de keycloak. Cela aidera à comprendre les étapes ci-dessous
 3. [Créer un realm](https://www.keycloak.org/docs/latest/server_admin/index.html#_create-realm)
 4. [Créer un OpenId connect client](https://www.keycloak.org/docs/latest/server_admin/index.html#_clients)
 5. Dans les paramètres du client, définissez une URL de redirection valide (*Valid Redirect URL*) pour pointer sur l'application Angular.
 6. Dans les paramètres du client, définissez Web Origin pour qu'il pointe vers l'application Angular.
 7. [Configurer la connexion avec LDAP](https://www.keycloak.org/docs/latest/server_admin/index.html#_user-storage-federation)
 
### Configuration ELK:
 
 - Kibana url: http://kibana:5601
 - Elasticsearch url: http://elasticsearch:9200
