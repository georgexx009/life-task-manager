import express from 'express';
import path from 'path'

const app = express();
const port = 3000;

if (process.env.NODE_ENV === 'development') {
  app.use('/@vite/client', express.static(path.join(__dirname, '../node_modules/@vite/client/dist')))
}

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
});

app.get('/two', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index-2.html'))
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});