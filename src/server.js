import express from 'express';
import bodyParser from 'body-parser';
import db from './config/database';
import userRoute from './routes/users';
import accountRoute from './routes/accounts';
import incomeRoute from './routes/incomes';

//  Test DB
db.authenticate()
  .then(() => {
    console.log('Database connected...');
  })
  .catch((err) => {
    console.log(`Error: ${err}`);
  });

const app = express();

const jsonParser = bodyParser.json();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/users', jsonParser, userRoute);

app.use('/', jsonParser, accountRoute);

app.use('/', jsonParser, incomeRoute);

app.listen(8000, () => {
  console.log('Example app listening on port 8000!');
});
