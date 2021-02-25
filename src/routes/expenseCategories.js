import express from 'express';
import { ExpenseCategory } from '../models';
import auth from '../middleware/auth';

const router = express.Router();

router.get('/accounts/:accountId/expense_categories', auth, async (req, res) => {
  const { accountId } = req.params;
  const { accounts } = req.user;
  try {
    const isAccValid = accounts.find((account) => account.accountId == accountId );
    if (!isAccValid) throw new Error('There is no account with that id');

    const expenseCategories = await ExpenseCategory.findAll({
      where: {
        accountId,
      },
    });
    res.send(expenseCategories).status(200);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/accounts/:accountId/expense_categories/:categoryId', auth, async (req, res) => {
  const { accountId } = req.params;
  const { categoryId } = req.params;
  const { accounts } = req.user;
  try {
    const isAccValid = accounts.find((account) => account.accountId == accountId );
    if (!isAccValid) throw new Error('There is no account with that id');

    const expenseCategory = await ExpenseCategory.findOne({
      where: {
        categoryId,
        accountId,
      },
    });
    if (!expenseCategory) return res.status(404).send();
    res.send(expenseCategory).status(200);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post('/accounts/:accountId/expense_categories', auth, async (req, res) => {
  const { accountId } = req.params;
  const { accounts } = req.user;
  try {
    const isAccValid = accounts.find((account) => account.accountId == accountId );
    if (!isAccValid) throw new Error('There is no account with that id');

    const expenseCategory = await ExpenseCategory.create({
      ...req.body,
      accountId,
    });

    res.status(201).send(expenseCategory);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.patch('/accounts/:accountId/expense_categories/:categoryId', auth, async (req, res) => {
  const { categoryId } = req.params;
  const { accountId } = req.params;
  const { accounts } = req.user;
  const updates = Object.keys(req.body);
  try {
    const isAccValid = accounts.find((account) => account.accountId == accountId );
    if (!isAccValid) throw new Error('There is no account with that id');

    const expenseCategory = await ExpenseCategory.findOne({
      where: {
        categoryId,
        accountId,
      }
    });

    if (!expenseCategory) return res.status(404).send();

    updates.forEach((update) => {
      expenseCategory[update] = req.body[update];
    });
    expenseCategory.save();
    res.status(200).send(expenseCategory);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete('/accounts/:accountId/expense_categories/:categoryId', auth, async (req, res) => {
  const { categoryId } = req.params;
  const { accountId } = req.params;
  const { accounts } = req.user;
  try {
    const isAccValid = accounts.find((account) => account.accountId == accountId );
    if (!isAccValid) throw new Error('There is no account with that id');

    const expenseCategory = await ExpenseCategory.findOne({
      where: {
        categoryId,
        accountId,
      }
    });

    if (!expenseCategory) return res.status(404).send();

    await expenseCategory.destroy({
      where: {
        categoryId,
        accountId,
      },
    });
    res.status(200).send(expenseCategory);
  } catch (error) {
    res.status(400).send(error);
  }
});

export default router;
