# Turo
Coursework for Secure Programming course.

## Running locally

### Prerequisite
Docker: https://docs.docker.com/v17.12/install/#get-started
Flyway: https://flywaydb.org/documentation/commandline/#download-and-installation (NOTE! Install Early-Access Preview, ie. 6.0.0-beta)

### Installation
Create a folder for the application, e.g. turo_app.
Install Flyway inside the created turo_app folder.

Also inside the folder fetch the source code:
`git clone git@github.com:hjlammi/turo.git`

NOTE: Use Node version 10:
```
nvm install 10
nvm use 10
```

After that run
`npm install`
in all the following folders:
- `turo_app/turo`
- `turo_app/turo/frontend/turo-app`
- `turo_app/turo/backend`

### Database
Build the Docker container containing the database:
`docker-compose up -d`
Create database tables with the Flyway migrations scripts
`npm run migrate`

### Starting the server
`npx sls offline start`

### Starting the React app
`npm run start`

### Running tests
#### Unit tests
`npm test`

#### Integration tests
`npm run cypress:open`
