const betterSqlite3 = require('better-sqlite3');

const db = betterSqlite3('./database/moviedb.db');


let stmt = db.prepare(`
SELECT * FROM movies
`);

let movies = stmt.all();

console.log(movies);

// set directory to hkr-web-dev-cinema, 
//type node index in terminal to run code