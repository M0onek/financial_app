import express from 'express';
import Expense from '../models/Expense';

const router = express.Router();

router.get('/users/:id/accounts/:accountId/expenses', async (req, res) => {
  try {
    const expenses = await Expense.findAll({
      where: {
        accountId: req.params.accountId,
      },
    });
    res.send(expenses).status(200);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/users/:id/accounts/:accountId/expenses/:expenseId', async (req, res) => {
  try {
    const expense = await Expense.findByPk(req.params.expenseId);
    if (!expense) res.status(404).send();
    else res.send(expense).status(200);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post('/users/:id/accounts/:accountId/expenses', async (req, res) => {
  try {
    req.body.accountId = req.params.accountId;
    const expense = await Expense.create(req.body);
    res.status(201).send(expense);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.patch('/users/:id/accounts/:accountId/expenses/:expenseId', async (req, res) => {
  const updates = Object.keys(req.body);
  try {
    const expense = await Expense.findByPk(req.params.expenseId);
    if (!expense) res.status(404).send();
    else {
      updates.forEach((update) => {
        expense[update] = req.body[update];
      });
      expense.save();
      res.status(200).send(expense);
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete('/users/:id/accounts/:accountId/expenses/:expenseId', async (req, res) => {
  const { expenseId } = req.params;
  try {
    const expense = await Expense.findByPk(expenseId);

    if (!expense) res.status(404).send();
    else {
      await Expense.destroy({
        where: {
          expenseId,
        },
      });
      res.status(200).send(expense);
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

export default router;
