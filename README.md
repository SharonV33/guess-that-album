# Guess that album

[livelink](https://guessthatalbum.herokuapp.com/)
## About the app

## Table of content
* [Installing](#installing)
* [Concept](#concept)
* [Usage and features](#usage-and-features)
* [Last.FM api](#last.fm-api)
* [Working with sockets](#working-with-sockets)
* [Data management](#data-management)
* [NPM packages](#npm-packages)
* [to do](#to-do)

## Installing
clone the repo
```
git clone https://github.com/SharonV33/guess-that-album.git
```
install dependencies
```
npm install
```
start the program
```
npm run start
```
or start the project in developer mode (with nodemon)
```
npm run dev
```
navigate to localhost in the browser
```
http://localhost:8080/
```
## concept

## Usage and features

## Last.FM api

## Working with sockets

## Data management 

## NPM packages
* Express.js - route handling
* HTTP - server management
* Nodemon - hot reloads and script watching
* node-fetch - async data fetching from api's
* socket.io - websocket management
* ejs - templating engine
* node-localstorage - server side local storage
* compression - general server compression

## To do
Must have
* [x] set up sockets
* [x] connect to last.fm api
* [x] blur album art
* [ ] set up buttons based on album names
* [ ] create point system based on correct guesses
* [ ] create leaderboard

Could have
* [ ] save username in localstorage
* [ ] make points based on how fast the guess was made
* [ ] add hints
