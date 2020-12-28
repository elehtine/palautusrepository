import express from 'express';
const app = express();
const cors = require('cors')

app.use(cors())
app.use(express.json());

app.get('/api/ping', (_req, res) => {
  console.log('pinged');
  res.send('pong');
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
