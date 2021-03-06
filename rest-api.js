// Import/require the password encryptor
const passwordEncryptor = require('./passwordEncryptor');
const session = require('express-session');
const store = require('better-express-store');

// Which table stores user data and name of password column?
const userTable = 'accounts';
const passwordField = 'password';

// Global variable for our database connection
let db;

// Helper function for creating prepared statements
// and running them and catching any errors
function runQuery(res, parameters, sqlForPreparedStatement, onlyOne = false) {

    let result;
    try {
        let stmt = db.prepare(sqlForPreparedStatement);
        // use the method all if the query starts with SELECT
        // otherwise use the method run
        let method = sqlForPreparedStatement.trim().toLowerCase().indexOf('select') === 0 ?
            'all' : 'run';
        result = stmt[method](parameters);
    } catch (error) {
        // if we have an error let the result be an object
        // with the single propery _error and convert the error to a string
        result = { _error: error + '' };
    }
    if (onlyOne) { result = result[0]; }
    result = result || null;
    res.status(result ? (result._error ? 500 : 200) : 404);
    res.json(result);
}

// Export the function setupRESTapi as a Node.js module
module.exports = function setupRESTapi(app, databaseConnection) {

    app.use(session({
        secret: 'ThomasFrankIsVeryCool',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: 'auto' },
        store: store({ dbPath: './database/moviedb.db' })
    }));

    // Store the database connection in the global variable db
    db = databaseConnection;

    // Get the names of all the tables and views in the db
    let tablesAndViews = db.prepare(`
  SELECT name, type 
  FROM sqlite_schema
  WHERE 
    (type = 'table' OR type = 'view') 
    AND name NOT LIKE 'sqlite_%'
`).all();

    // Add a special route that will list all the tables and views
    app.get('/api/tablesAndViews', (req, res) => {
        res.json(tablesAndViews);
    });


    // get booking and showing info for a user
    app.get('/api/bookings/:id', (req, res) => {

        let stmt = db.prepare("SELECT * FROM bookingsxshowings WHERE accounts_username = :id ORDER BY start_time DESC");
        let bookings = stmt.all(req.params);

        res.json(bookings);

    });

    app.get('/api/danne/:id', (req, res) => {

        let stmt = db.prepare("SELECT * FROM bookingsxshowings WHERE movie_title = :id");
        let bookings = stmt.all(req.params);

        res.json(bookings);

    });


    //sign the user in
    app.post('/api/login', (req, res) => {

        req.body[passwordField] =
            passwordEncryptor(req.body[passwordField]);

        let stmt = db.prepare(`
      SELECT * FROM accounts
      WHERE username = :username AND password = :password
    `);

        let result = stmt.all(req.body)[0] || { _error: 'No such user.' };

        delete result.password;

        if (!result._error) {
            req.session.user = result;
        }

        res.json(result);
    });

    // check if logged in
    app.get('/api/login', (req, res) => {
        res.json(req.session.user || { _error: 'Not logged in' });
    });

    app.delete('/api/login', (req, res) => {
        delete req.session.user;
        res.json(req.session.user);
    });

    app.put('/api/showings', (req, res) => {
       let stmt = db.prepare(`
        UPDATE showings SET seat_list = '${req.body.seat_list}' WHERE id=${req.body.showings_id} AND start_time = '${req.body.start_time}'
        `);
        let confirm = stmt.run(req.body)[0];
        res.json(confirm);
    });

   


    app.get('/api/trailers', (req, res) => {

        let stmt = db.prepare("SELECT link FROM movies");
        let trailers = stmt.all(req.params);

        res.json(trailers);

    });

    app.get('/api/movielist', (req, res) => {

        const query = "SELECT title, length, rating, synopsis, start_time FROM movies INNER JOIN showings ON movies.title = showings.movie_title";
        let stmt = db.prepare(query);
        let list = stmt.all(req.params);

        res.json(list);

    });

    app.get('/api/dannep/:title/:time', (req, res) => {
        let stmt = db.prepare(`
    SELECT * FROM showings WHERE movie_title = :title AND start_time = :time
    `)
        let showing = stmt.all(req.params);
        res.json(showing);
    });


    app.post('/api/bookings', (req, res) => {
        let stmt = db.prepare(`
        INSERT INTO bookings (accounts_username, showings_id, booked_seat) VALUES ('${req.body.userName}', ${req.body.id}, '${req.body.bookedSeats}')
        `)
        let booking = stmt.run(req.body)[0];
        res.json(booking);
    });

    app.delete('/api/bookings', (req, res) => {
        let stmt = db.prepare(`
        DELETE FROM bookings WHERE accounts_username = '${req.body.accounts_username}' AND showings_id = ${req.body.showings_id}
        `);

        let confirm = stmt.run(req.body)[0];
        
        res.json(confirm);
    });


    // Loop through all tables and views and create REST-routes for them
    for (let { name, type }
        of tablesAndViews) {


        // Create a route to get (read) all posts from a table
        app.get('/api/' + name, (req, res) => {
            runQuery(res, {}, `
        SELECT *
        FROM ${name}
      `);
        });

        // Create a route to get a single post from a table based on its id
        app.get('/api/' + name + '/:id', (req, res) => {
            // Create a prepared statement with a parameter :id as part of it
            runQuery(res, req.params, `
        SELECT *
        FROM ${name}
        WHERE id = :id
      `, true);
        });

        // Don't add POST, PUT or DELETE route to views
        if (type === 'view') {
            continue;
        }

        if (name === 'bookings') {
            continue;
        }

        // Add a post route for the table
        app.post('/api/' + name, (req, res) => {
            // do not allow id:s to be set manually
            delete req.body.id;

            // if this is the user table then encrypt the password
            if (name === userTable) {
                // encrypt the field whose name is stored in passwordField
                req.body[passwordField] =
                    passwordEncryptor(req.body[passwordField]);
            }

            runQuery(res, req.body, `
        INSERT INTO ${name} (${Object.keys(req.body)})
        VALUES (${Object.keys(req.body).map(x => ':' + x)})
      `);
        });

        // And put/patch routes
        let putAndPatch = (req, res) => {

            // if this is the user table then encrypt the password
            if (name === userTable && req.body[passwordField]) {
                // encrypt the field whose name is stored in passwordField
                req.body[passwordField] =
                    passwordEncryptor(req.body[passwordField]);
            }

            runQuery(res, {...req.body, ...req.params }, `
        UPDATE ${name}
        SET ${Object.keys(req.body).map(x => x + ' = :' + x)}
        WHERE id = :id
      `);
        };
        

        // Since the distinction between put and patch requests is 
        // floating nowadays let us provide the same logic for both
        app.put('/api/' + name + '/:id', putAndPatch);
        app.patch('/api/' + name + '/:id', putAndPatch);

        // App delete routes
        app.delete('/api/' + name + '/:id', (req, res) => {
            runQuery(res, req.params, `
        DELETE FROM ${name}
        WHERE id = :id
      `);
        });

    }

    // Add a 404 route to the api
    // (will only match the request if no other routes matches it,
    //  since this routes is declared last)
    app.all('/api/*', (req, res) => {
        res.status(404);
        res.json({ _error: 'No such route!' });
    });

    // Add our own middleware to catch errors occuring because
    // of invalid JSON syntax in request bodies
    // (note: runs for every query)
    app.use((error, req, res, next) => {
        if (error) {
            let result = {
                _error: error + ''
            };
            res.json(result);
        } else {
            // calling next will say "this middleware will not handle the response"
            next();
            
        }
    });

}