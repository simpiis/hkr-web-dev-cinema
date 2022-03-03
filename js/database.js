const betterSqlite3 = require('better-sqlite3');

const db = betterSqlite3('../database/moviedb.db');

// set directory to hkr-web-dev-cinema,
//type node database.js in terminal to run code




let user = null;



function getMovieLinks() {
  let stmt = db.prepare("SELECT link FROM movies");
  let links = stmt.all();

  console.log(links);
}

 function verifyLogin(username, password) {
  let stmt = db.prepare("SELECT * FROM accounts WHERE username = '" + username + "' AND password = '" + password + "'");
  user = stmt.all();

  console.log(user);

  if (user.length !=0) {
    sessionStorage.setItem("user", user[0].username);

    console.log("logged in");

    
  } else {
    console.log("invalid credentials")
    
  }
  
}



testExamples();

//getMovieLinks();




// EXAMPLE STATEMENTS

function testExamples() {
  // select statement -- get everything about every movie
/*  let stmtSelectAllMovies = db.prepare(`
SELECT * FROM movies
`)

  let movies = stmtSelectAllMovies.all();

  console.log(movies);

  */




  // get seat_list from a specific showing, can be used to print the booking section later, requires movie title and start time to function at the moment

  let movieTitleTest = 'Warcraft'
  let startTimeTest = '2022-02-19 16:54:00'

  let stmt = db.prepare("SELECT seat_list FROM showings WHERE movie_title = '" + movieTitleTest + "' AND start_time = '" + startTimeTest + "'");

  let seats = stmt.all();

  let seatInfo = seats[0].seat_list;


  console.log(seatInfo);
  seatInfo=markSeat(seatInfo,2,'t');
  console.log(seatInfo);


  
}

function markSeat(seatInfo,index,value) {
  seatInfo = seatInfo.substr(0, index) + value + seatInfo.substr(index + 1);

  return seatInfo
}


/* DATABASE TABLES
columns in showings table
id --- auto incremented integer for primary key
movie_title --- title of the movie
room_name --- name of room the movie is shown in
start_time --- when the movie starts in the format of YYYY-MM-DD HH:MM:SS
end_time --- when the movie ends in the format of YYYY-MM-DD HH:MM:SS
booked_seats_counter --- counts the number of booked seats ie. number of "t" in seat_list
seat_list --- list of all seats in format 1f,2f,3f etc...  f for false meaning not booked, insert t for true if booked


columns in movies table
title --- title of the movie
length --- length of movie in minutes
link --- youtube link to the trailer
synopsis --- synopsis of the movie, currently contains movie title + lorem ipsum
rating --- age rating of movie in string form ie. R or PG-13


columns in rooms table
name --- name of the room
seats --- amount of seats in the room, currently does not hold any relevant information


columns in accounts table
username --- primary key, varchar
password --- varchar, is not encrypted in any way
booking_history --- String, list of IDs from showings
*/
