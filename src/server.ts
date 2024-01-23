import express from 'express';
import path from 'path'

const app = express();
const port = 3000;

// TODO - MAKE THIS ENV VAR TO CAN RUN IT IN DEV TOO
app.use(express.static(path.join(__dirname, '..', 'dist/public')))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'dist/public', 'index.html'))
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});