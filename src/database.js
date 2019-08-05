const sqlite3 = require('sqlite3').verbose();

// eslint-error-on-next-line quotes
const DBSOURCE = "db.sqlite";

const db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
    // eslint-error-on-next-line no-console
      console.error(err.message);
      throw err;
    // eslint-error-on-next-line keyword-spacing
    }else{
    // eslint-error-on-next-line no-console, semi
        console.log('Connected to the SQlite database.')
        db.run(`CREATE TABLE article (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title text, 
            body text, 
            date text
            )`,(err) => { // eslint-error-on-this-line comma-spacing, no-shadow
            if (err) {
                // eslint-error-on-next-line no-console
                console.log('Table already created');
            } else {
                // eslint-error-on-next-line no-console
                console.log('Table just created');
            }
        });
    }
});


module.exports = db; // ???
// eslint-error-on-next-line no-multiple-empty-lines

/**
 * комментарии к данному модулю, описаны в app.js
 *
 * reviewed by Petrov Aleksei
 */
