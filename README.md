# :guitar: Guess that album :guitar:
[livelink](https://guessthatalbum.herokuapp.com/)
<img src="https://i.ibb.co/2db0C76/Screenshot-2021-04-15-at-14-58-53.png">

## :microphone: About the app
Want to prove to your friends that you know the most about metalcore? Prove yourself
by getting on top of the leaderboard of "guess that album". This is the ultimate test
for any metalcore fans. You will be able to see live results of the players who guessed 
correctly.

## :thinking: Concept
Based on the requirements for this subject, I decided to create an album guessing game. This was inspired by my previous projects
where I used the Last.fm API to let users browse metalcore albums. At the moment, metalcore is my favourite genre which is why I use
this genre. Even though I never know what an album is called, I thought it would be fun to make a game around these albums. 

By showing the user a blurred version of an album cover, the users can guess which album title belongs to the blurred image. In order
to really make it a game, I use a score board where I keep track of the amount of correct guessed made by each user. After the album is
guessed by a user, the album will de-blur for everyone playing at that moment. The name of the winner will also be displayed for a few
seconds. After this a new album will be selected and shown (blurred) for the users to guess.
first sketch: 
<img src="https://i.ibb.co/ph2pX3Z/concept.jpg" width="500">

## :gear: Installing
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

## :musical_note: Last.FM api
For this web app, I use data from the [last.FM api](https://www.last.fm/api). I've worked with this API a few times now, so I know my way around it.
The specific type of data I want is the top albums from the genre "metalcore", Last.FM has a standard function url which allows me
to get all the data I want from a single endpoint. This function is "get top albums". The url which I use as an endpoint is as follows 
```
https://www.last.fm/api/2.0/?method=tag.gettopalbums&tag=GENRE&api_key=YOUR_API_KEY&format=json 
```
In order to use this link, you need to add an api key, this can be gained by creating an account. Passing a genre (or as the api calls it, tag)
with the url is required, I changed this to metalcore. The url can also be changed to set a limit of albums to be fetched, the
standard is 50 which I decided to keep for testing, this could easily be changed to a larger number for production
By using a XMLHttpRequest on the link, I was able to get the data quite easily. The data I received looked like this:

[comment]: <> (<img src="https://i.ibb.co/x3d6YrY/Screenshot-2021-02-05-at-10-27-03.png" width="500">)
```
"Albums": {                     //general wrapper for all albums
  "Album": [                    //single album entry
    {
            "name":             //Name of the album
            "mbid":             //Unique identifyer of the album
            "url":              //Url to the last.fm page of the album
            "artist":{
                "name":         //Name of the artist
                "mbid":         //Unique identifyer of the artist
                "url":          //Link to the last.fm page of the artist
            }
            "image": [
                {
                    "#text":    //Image source
                    "size":     //Image size
                }
            ]
            "@attr": {
                "rank":         //Album rank in most popular albums of that genre
            }
        }      
  ]
}
```

Each album has a name, an url to the related page on last.fm, a unique identifier, information about the artist and 4 formats
of album art. This structure is repeated for each album, making it easy to create a template which I can fill with data.


## :electric_plug: Working with sockets
Before this project, sockets were completely new to me. This meant that I had to start on researching what sockets are and how they
can be used. My teacher, Justus, showed an example in a lecture using "socket.io". After this lecture I made sure to read [the documentation](https://socket.io/)
on the official website. I found the documentation quite easy to follow and there were quite a lot of examples. Together with the documentation
and the example of my teacher I was ready to get started. I first downloaded the example and made sure I understood it, then I added
a feature which would not only send a message but also a name. 

My next step was using the name and message for making a guess. This guess will then need to be compared to the name of the current album. If the 
guess is correct, I need to change the current album and add that user to the leaderboard. For all this, I added a message type to the message. If the user
submits a guess, the message type is 'guess'. In this step, the user's name and guess. Next, I check the answer. If the answer is correct I send a message
with the type 'albumGuessed'. With this message type, I un-blur the album art, show a message with the name of the winner and update the leaderboard. After this, 
I set a timeout in my project of 3 seconds to keep the un-blurred album on screen for a bit. Lastly, I emit a message with the type 'newAlbum'. This
re-runs the function which saves a random album into the localstorage of the server and places this image into the page. After this the cycle starts again.

## :clock830: Real time events
When you are playing a game online with a few friends, you want to know right away if someone scores a point. Constantly refreshing your browser can become quite
tedious and annoying. This is why I implemented a few real time events into the album guesser. All of these events play out when a user correctly guesses the current 
album. The first thing thar happens is that the album de-blurs, showing which album it was. The name of the user who made the correct guess will appear
on the screen at this same moment, showing all users who won that round. As soon as these 2 events start, a timer is set for 3 seconds. After this, the user
with the winning guess will be added to the scoreboard with their new score. Then, a new album will be loaded and blurred so that a new round can start

## :file_folder: Data management 
Data lifecycle diagram

<img src="https://i.ibb.co/D9bR6X1/diagram.png" width="700">

## :hammer_and_wrench: NPM packages
* Express.js - route handling
* HTTP - server management
* Nodemon - hot reloads and script watching
* node-fetch - async data fetching from api's
* socket.io - websocket management
* ejs - templating engine
* node-localstorage - server side local storage
* compression - general server compression

## :white_check_mark: To do
**Must have**
* [x] set up sockets
* [x] connect to last.fm api
* [x] blur album art
* [x] check answers 
* [x] create point system based on correct guesses
* [x] create leaderboard
* [x] update album after correct guess
* [x] update leaderboard after correct guess
* [x] show winner's name after correct guess

**Could haves**
* [ ] filter api data to only what is needed
* [ ] save username in localstorage
* [ ] make points based on how fast the guess was made
* [ ] add hints

**Would haves**
* [ ] Show incorrect guesses that have already been made
* [ ] allow different genre's

## :books: Resources
* [last.FM api documentation](https://www.last.fm/api)
* [Socket.io documentation](https://socket.io/)
* [Node localstorage documentation](https://www.npmjs.com/package/node-localstorage)
