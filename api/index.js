import express from 'express';
import cors from 'cors';
import bookData from './data/books.json' with { type: 'json' };

const app = express();
app.use(cors());

const getRandomBook = () => {
  const randomIndex = Math.floor(Math.random() * bookData.length);
  const randomBook =bookData[randomIndex];
  return randomBook
}

app.get('/random-book', (req, res) => {
  res.json(getRandomBook());
});

app.get('/random-book-delayed', (req, res) => {
  setTimeout(() => {
    res.json(getRandomBook());
  }, 2000)
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
