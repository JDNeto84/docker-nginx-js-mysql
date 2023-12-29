const express = require('express');

const app = express();

const port = 3000;

const config = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_ROOT_PASSWORD,
  database: process.env.MYSQL_DATABASE
};

const mysql = require('mysql');

const connection = mysql.createConnection(config);

connection.connect((error) => {
  if (error) {
    console.error('disconnected database', error);
  } else {
    console.log('connected database');
  }
});

app.get('/', async (req, res) => {
  try {
    const insertQuery = `INSERT INTO people (name) VALUES ('Full Cycle')`;
    await queryAsync(insertQuery);    
    const selectQuery = 'SELECT name FROM people';
    const results = await queryAsync(selectQuery);    
    const rows = Array.isArray(results) ? results : [results];    
    const names = rows.map(result => result.name).join(', ');    
    const response = `<h1>Full Cycle Rocks!</h1>
                      <p>List of names registered in the database:</p>
                      <p>${names}</p>`;    
    res.send(response);
  } catch (error) {
    console.error('database communication error', error);    
  }
});

function queryAsync(sql) {
  return new Promise((resolve, reject) => {
    connection.query(sql, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
