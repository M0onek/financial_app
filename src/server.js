import express from 'express';
import db from './config/database';
import userRoute from './routes/users';

//  Test DB
db.authenticate()
  .then(() => {
    console.log('Database connected...');
  })
  .catch((err) => {
    console.log(`Error: ${err}`);
  });

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/users', userRoute);

app.listen(8000, () => {
  console.log('Example app listening on port 8000!');
});
