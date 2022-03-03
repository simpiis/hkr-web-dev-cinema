// SQLite
let sqlite3 = require("sqlite3").verbose();


// Connect to the database, with some error handling
let db = new sqlite3.Database("database\\moviedb.db", sqlite3.OPEN_READWRITE, (err) => {
  if (err) return console.error(err.message);

  console.log("Connection successful");
});


// Query to select the trailer link rows for the movies table
let sql = `SELECT link FROM movies`;
let sql = `SELECT * FROM movies`;

// Goes through the database with he sql query
db.all(sql, [], (err, rows) => {
  if (err) return console.error(err.message);

  rows.forEach((row) => {
    // Trim the string to just get the link from the row, then add it to the array
    trailers.push(row.link);
  })
  console.log(trailers);

  closeConnection();
})


// Array that will hold the links to all the trailers
let trailers = [];
let movies = [];


// Play the previous trailer
function previousTrailer() {

  document.getElementById("trailervid").src = "https://www.youtube.com/embed/eHp3MbsCbMg?autoplay=1";
}


// Play the next trailer
function nextTrailer() {

  document.getElementById("trailervid").src = "https://www.youtube.com/embed/pGi3Bgn7U5U?autoplay=1";
}


// Simply closes the connection to the database, some error handling
function closeConnection() {
  db.close((err) => {
  if (err) console.error(err.message);
  console.log("Connection closed");
  });
}