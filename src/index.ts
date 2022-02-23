import bodyParser from 'body-parser';
import express, { Application, Request, Response } from 'express';
import sqlite3 from 'sqlite3';

const app: Application = express();
const dbPath = 'db/database.sqlite3';

// リクエストのbodyをパースする
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/**
 * get all users
 */
app.get('/api/v1/users', (_req: Request, res: Response) => {
  const db = new sqlite3.Database(dbPath);

  db.all('select * from users', (err, rows) => {
    res.json(rows);
  });

  db.close();
});

/**
 * get a user
 */
app.get('/api/v1/users/:id', (req: Request, res: Response) => {
  const db = new sqlite3.Database(dbPath);
  const { id } = req.params;

  db.get(`SELECT * FROM users WHERE id = ${id}`, (err, row) => {
    if (!row) {
      res.status(404).send({ error: 'Not Found...' });
    } else {
      res.status(200).json(row);
    }
  });

  db.close();
});

// api server listen
const PORT = process.env.PORT || 3000;
app.listen(
  PORT,
  () => console.log(`dev server running at: http://localhost:${PORT}`), // eslint-disable-line no-console
);
