1. CREATION OF THE API
- use express-generator
- creation of 1 folder "app-server"
- inside, creation of 2 folders "controllers" and "models"
- put the folders "routes" and "views" inside and change their path in the app.js file
2. CONNECTION TO THE DATABASE
- in app.js, connect to mysql
- run the tables.sql file in command line to create the database and the tables
- TO EXECUTE ANY MYSQL QUERY :
        con.query('SELECT * FROM users', (err, rows) => {
        if (err) throw err;
        console.log(rows);
        });
https://www.sitepoint.com/using-node-mysql-javascript-client/