# Full Cycle Challenge - Nginx Reverse Proxy With NodeJS and MySQL 🚀

**Challenge Requirements 📋**

### Docker-Compose Configuration:

- Create a `docker-compose.yml` file to orchestrate the necessary services.
- Use Nginx as a reverse proxy.
- The Nginx service should forward requests to the Node.js application.

### Operation:

1. When accessing Nginx, it should make a call to the Node.js application.
2. The Node.js application will add a record to the MySQL database, registering a name in the `People` table.
3. The return from the Node.js application to Nginx should be:

    ```html
    <h1>Full Cycle Rocks!</h1>
    👥 List of names registered in the database.
    ```

### Docker-Compose:

- Generate the `docker-compose.yml` file in a way that running the command below is sufficient to have everything working and available on port 8080:

    ```bash
    🐳 docker-compose up -d
    ```

### Execution Result:

- By running `docker-compose up`, the application will be available at `http://localhost:8080`, with the NGINX web server acting as a reverse proxy, forwarding the request to the Node.js backend. When accessing or updating the web page, the NGINX web server will send the request to the Node.js backend, which will process it in `app.js`, registering the information in the database server, and returning to the NGINX web server a list of names that were recorded in the `people` table.

- If you want a development environment for the `app.js` application without the need for reconstruction, share the volume in the `docker-compose.yml` file in the `nodejs` service:

    ```yaml
    volumes:
      - ./nodejs:/usr/src/app
    ```

- The `.env` file defines environment variables for the MySQL `healthcheck:` test and the Nodejs `env_file:`, allowing `app.js` to connect to the database.

- The `./mysql/initdb/init.sql` file executes the creation of the `people` table if it does not exist for the insertion of names. The `./mysql/data` folder stores the database for data persistence.
