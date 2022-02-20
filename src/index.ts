import express, { Application, Request, Response } from 'express';

const app: Application = express();

const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) =>
  res.status(200).send({ message: 'hello world!!' }),
);

try {
  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`dev server running at: http://localhost:${PORT}`);
  });
} catch (error) {
  if (error instanceof Error) {
    // eslint-disable-next-line no-console
    console.error(error.message);
  }
}
