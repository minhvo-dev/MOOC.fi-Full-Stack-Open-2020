# PATIENTOR APPLICATION

_TypeScript makes things more complicated and easier at the same time._   
https://nameless-brook-69308.herokuapp.com/

## Table of Content
- [Overview](#Overview)
- [Installation](#Installation)
- [Design](#Design)
- [Acknowledgement](#Acknowledgement)

## Overview
- [**Patientor**][app-link] is a simple web application for doctors to record health information of their patients.
- [**Patientor**][app-link] is the final product of [Part 9 - Fullstack Open 2020 course][part-9-link] with slight modification to be able to deploy to [Heroku][heroku-homepage]. The original version can be found [here][original-version-link].

## Installation
- Clone both `backend` and `frontend` projects
- Install packages in both projects   

  ```bash
  cd backend/
  npm install
  cd ../frontend/
  npm install
  ```
- Build the projects   

  ```bash
  cd ../backend/
  npm run build:full
  ```   
- Start up the projects

  ```bash
  npm start
  ```
- By default, the application is started at http://localhost:3001

## Design  
- [**Patientor**][app-link] is a fullstack web application written in [TypeScript][typescript-homepage].
  - Frontend is built with [React][react-homepage] and [Semantic UI React][semantic-ui-react-homepage].
  - Backend is built with [Node.js][nodejs-homepage] and [Express.js][expressjs-homepage].
  - Database is built with [MongoDB][mongodb-homepage] and [moongoose][mongoose-homepage].
  - Hosting service is [Heroku][heroku-homepage].

## Acknowledgement
- Frontend was developed based on this [existing project][original-front-end-github].     
- Backend was developed based on the instruction of [the course][part-9-link] with slight modification.


[app-link]: https://nameless-brook-69308.herokuapp.com/
[part-9-link]: https://fullstackopen.com/en/part9   
[original-version-link]: https://github.com/minhvo-dev/MOOC.fi-Full-Stack-Open-2020/tree/882ce1bdefa3ad3a912ab0ee7f92148de1728ff1/part_09/patientor   
[original-front-end-github]: https://github.com/fullstack-hy2020/patientor
[heroku-homepage]: https://www.heroku.com/  
[mongodb-homepage]: https://www.mongodb.com/    
[mongoose-homepage]: https://mongoosejs.com/  
[nodejs-homepage]: https://nodejs.org/en/   
[expressjs-homepage]: https://expressjs.com/   
[react-homepage]: https://reactjs.org/   
[semantic-ui-react-homepage]: https://react.semantic-ui.com/   
[typescript-homepage]: https://www.typescriptlang.org/