# aebchat

a [Sails](http://sailsjs.org) application

#Requirements

`brew install node`
`npm install -g grunt-cli`
`npm install -g bower`

##Install mysql
brew install mysql or sudo apt-get install mysql

##Setup the google credentials

copy the file config/auth_credentials.json.example as config/auth_credentials.json
## Start the application
#
Edit the file `config/connections.js` and setup your database credentials change all except adapter option.
```
  "host": "YOUR_MYSQL_SERVER_HOSTNAME_OR_IP_ADDRESS",
  "user": "YOUR_MYSQL_USER",
  "password": "YOUR_MYSQL_PASSWORD",
  "database": "YOUR_MYSQL_DB"
  ```

##Setup your database
Copy the file config/database.json.example as config/database.json and setup your credentials
Then if you are using postgres you need to specify the database on the models file
Edit your config/models.js and chnage the name of the connection `someMysqlServer` to `somePostgresqlServer`

##install all dependencies
`nmp install`
## install js and css dependencies
`bower install`
## Run the app
`sails lift`



#Run the tests

#### Run all tests
`make test`

### Run tests under a specific directory
### This will run all tests under test/unit/controllers directory
`make test controllers`

### This will run tests under test/unit/controllers and test/unit/models directories
`make test controllers models`

### Run a specific test file
### This will run tests in test/unit/controllers/SampleController.test.js file
`make test controllers/SampleController.test`
