import express from 'express';
import userRoute from './routes/users';
import accountRoute from './routes/accounts';
import incomeRoute from './routes/incomes';
import expenseRoute from './routes/expenses';
import incomeCatRoute from './routes/incomeCategories';
import expenseCatRoute from './routes/expenseCategories';

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(userRoute);
app.use(accountRoute);
app.use(incomeRoute);
app.use(expenseRoute);
app.use(incomeCatRoute);
app.use(expenseCatRoute);

app.listen(port, () => {
  console.log('App listening on port 8000!');
});
