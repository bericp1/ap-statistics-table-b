## Web App Skeleton/Bootstrap
#### An Angular client with an express.js server

### Getting Started

In an existing git project (right after `git init`):

 1. `git remote add skeleton https://github.com/bericp1/skeleton`
 2. `git pull skeleton master`
   * Change `master` to `master:dev` if you want to develop on a `dev` 
branch
 3. `npm install`
 4. `grunt init`

### Structure

 * `/client/`:
   * `app/`: The front end of the app (using Angular)
     * `index.html`: The single page that is served to the browser
     * `scripts/`:
       * `app.js`: The main angular app/module logic
       * `controllers/`: Angular controllers
       * `directives/`: Angular directives
       * etc.
     * `styles/`: SCSS styles go here
     * `templates/`: The html templates go here
     * `vendor/`: For Third-party libraries
   * `test/`:
     * `mock/`: Unit testing mocks
     * `spec/`: The actual test specs
  * `/server/`:
    * `app/`: The back end of the app (using express.js)
      * `server.js`: Server logic (will eventually be split into sep. directories for routes, etc.)
      * `start.js`: Quick start script that loads, inits, and starts the server from `server.js`
    * `test/`:
      * `mock/`: Unit testing mocks
      * `spec/`: The actual test specs

### Deploying to Heroku

One might consider doing some version tagging of some sort at this point while on the `master`/`dev` branch.

    git checkout master
    git merge dev             # Only If you work off of a dev branch
    git merge -s ours deploy  # Fake merge of deploy to master
    git checkout deploy
    git merge master          # Overwrite everything in deploy branch (thanks to above fake merge)
    grunt build
    git add -A
    git commit -m 'Deploying to heroku'
    git push heroku deploy:master

### Testing

Scripts for unit testing will be loaded (in both client and server) from {client|server}/test/mock first and then from
{client,server}/test/spec (directories which currently lack in their existence)
