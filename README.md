## Boilerplate for Node.js

I am open sourcing for the first time a boilerplate for Node.js in the back-end.
It have tried to follow the best practices and included all folders required for big projects.

By the way, i am open for relocation and/or remote work.

## Required dependecies

- Install Mongo DB
- Install Redis DB
- A .env file at the root of your folder

## How to run ?

```
  npm install
  npm start
```

## How to test ?

I am using `jest`

```
npm test
```

### .env File Format

```
## This is the equivalent of the application.properties in Spring.
## All env variables in this file need to be different when in production.\
NODE_ENV=dev
# The application port
PORT=7009

# Database configuration (Do not use the default configs)
MONGO_URI="mongodb://127.0.0.1:25000/DB_NAME"
MONGO_USER="<enter the user>"
MONGO_PASSWORD="<enter the user>"

#Cryptography: We do not store password in clear but hashed with a secret salt.
# https://en.wikipedia.org/wiki/Salt_(cryptography)
PASSWORD_SALT="<enter the password hash>"

## Session
SESSION_SECRET="<enter the session-secret>"

## Redis Database configuration
REDIS_PORT=6379
REDIS_HOST=127.0.0.1
REDIS_SECRET=chooseTheBestPasswordIfNot150kPasswordGuessesPerSecondWillBeEnoughToBruteForce
REDIS_TTL=86400
REDIS_PREFIX=ClientRedis
REDIS_NAME="<prefix_name of the redis keys>"
REDIS_DATABASE=3

SLACK_WEB_HOOK_URL=https://hooks.slack.com/services/xxxxxxxxxxxx

```
