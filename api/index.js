import express from 'express';
import cors from 'cors';
import bookData from './data/books.json' with { type: 'json' };

const app = express();
app.use(cors());

app.get('/random-book', (req, res) => {
  const randomIndex = Math.floor(Math.random() * bookData.length);
  res.json(bookData[randomIndex]);
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
