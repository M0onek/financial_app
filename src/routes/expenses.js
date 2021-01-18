import express from 'express';
import { Expense } from '../models';
import auth from '../middleware/auth';

const router = express.Router();

router.get('/accounts/:accountId/expenses', auth, async (req, res) => {
  const { accountId } = req.params;
  const { accounts } = req.user;
  try {
    const isAccValid = accounts.find((account) => account.accountId == accountId );
    if (!isAccValid) throw new Error('There is no account with that id');

    const expenses = await Expense.findAll({
      where: {
        accountId,
      },
    });
    res.send(expenses).status(200);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/accounts/:accountId/expenses/:expenseId', auth, async (req, res) => {
  const { accountId } = req.params;
  const { expenseId } = req.params;
  const { accounts } = req.user;
  try {
    const isAccValid = accounts.find((account) => account.accountId == accountId );
    if (!isAccValid) throw new Error('There is no account with that id');

    const expense = await Expense.findOne({
      where: {
        expenseId,
        accountId,
      }
    });
    if (!expense) return res.status(404).send();
    res.send(expense).status(200);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post('/accounts/:accountId/expenses', auth, async (req, res) => {
  const { accountId } = req.params;
  const { accounts } = req.user;
  try {
    const isAccValid = accounts.find((account) => account.accountId == accountId );
    if (!isAccValid) throw new Error('There is no account with that id');

    const expense = await Expense.create({
      ...req.body,
      accountId,
    });
    res.status(201).send(expense);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.patch('/accounts/:accountId/expenses/:expenseId', auth, async (req, res) => {
  const { accountId } = req.params;
  const { expenseId } = req.params;
  const { accounts } = req.user;
  const updates = Object.keys(req.body);
  try {
    const isAccValid = accounts.find((account) => account.accountId == accountId );
    if (!isAccValid) throw new Error('There is no account with that id');

    const expense = await Expense.findOne({
      where: {
        expenseId,
        accountId,
      }
    });

    if (!expense) return res.status(404).send();

    updates.forEach((update) => {
      expense[update] = req.body[update];
    });
    expense.save();
    res.status(200).send(expense);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete('/accounts/:accountId/expenses/:expenseId', auth, async (req, res) => {
  const { accountId } = req.params;
  const { expenseId } = req.params;
  const { accounts } = req.user;
  try {
    const isAccValid = accounts.find((account) => account.accountId == accountId );
    if (!isAccValid) throw new Error('There is no account with that id');

    const expense = await Expense.findOne({
      where: {
        expenseId,
        accountId,
      }
    });

    if (!expense) return res.status(404).send();

    await Expense.destroy({
      where: {
        expenseId,
      },
    });
    res.status(200).send(expense);
  } catch (error) {
    res.status(400).send(error);
  }
});

export default router;
