import bodyParser from 'body-parser';
import express, { Application, Request, Response } from 'express';
import sqlite3 from 'sqlite3';
import { ExRequestBoby } from 'types/exRequestBody';
import { ExRequestQuery } from 'types/exRequestQuery';

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

  db.all('select * from users', (_err, rows) => {
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

  db.get(`SELECT * FROM users WHERE id = ${id}`, (_err, row) => {
    if (!row) {
      res.status(404).send({ error: 'Not Found...' });
    } else {
      res.status(200).json(row);
    }
  });

  db.close();
});

/**
 * user search
 */
app.get('/api/v1/search', (req: ExRequestQuery, res: Response) => {
  const db = new sqlite3.Database(dbPath);
  const { keyword } = req.query;

  if (typeof keyword === 'undefined') return; // 型の絞り込み。keywordがundefinedなら即時return
  db.all(`select * from users where name like "%${keyword}%"`, (_err, rows) => {
    res.json(rows);
  });

  db.close();
});

/**
 * DB接続関数
 */
const run = async (sql: string, db: sqlite3.Database) =>
  new Promise((resolve, reject) => {
    db.run(sql, (err) => {
      if (err) return reject(err);

      return resolve({ message: 'success' });
    });
  });

/**
 * create user
 */
app.post('/api/v1/users', async (req: ExRequestBoby, res: Response) => {
  if (!req.body.name || req.body.name === '') {
    res.status(400).send({ error: 'ユーザー名が指定されていません' });
  } else {
    const db = new sqlite3.Database(dbPath);

    const { name } = req.body;
    const profile = req.body.profile ? req.body.profile : '';
    const dateOfBirth = req.body.date_of_birth ? req.body.date_of_birth : '';

    try {
      await run(
        `INSERT INTO users (name, profile, date_of_birth) VALUES ("${name}", "${profile}", "${dateOfBirth}")`,
        db,
      );
      res.status(201).send({ message: '新規ユーザーを作成しました。' });
    } catch (e) {
      res.status(500).send({ error: e });
    }

    db.close();
  }
});

// api server listen
const PORT = process.env.PORT || 3000;
app.listen(
  PORT,
  () => console.log(`dev server running at: http://localhost:${PORT}`), // eslint-disable-line no-console
);
