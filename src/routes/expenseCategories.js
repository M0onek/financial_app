import express from 'express';
import ExpenseCategory from '../models/ExpenseCategory';

const router = express.Router();

router.get('/users/:id/accounts/:accId/expensecategories', async (req, res) => {
  try {
    // const { accountId } = req.params;
    const expenseCategories = await ExpenseCategory.findAll({
      where: {
        accountId: req.params.accId,
      },
    });
    res.send(expenseCategories).status(200);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/users/:id/accounts/:accountId/expensecategories/:categoryId', async (req, res) => {
  try {
    const expenseCategory = await ExpenseCategory.findByPk(req.params.categoryId);
    if (!expenseCategory) res.status(404).send();
    else res.send(expenseCategory).status(200);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post('/users/:id/accounts/:accountId/expensecategories', async (req, res) => {
  try {
    req.body.accountId = req.params.accountId;
    const expenseCategory = await ExpenseCategory.create(req.body);
    res.status(201).send(expenseCategory);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.patch('/users/:id/accounts/:accountId/expensecategories/:categoryId', async (req, res) => {
  const updates = Object.keys(req.body);
  try {
    const expenseCategory = await ExpenseCategory.findByPk(req.params.categoryId);
    if (!expenseCategory) res.status(404).send();
    else {
      updates.forEach((update) => {
        expenseCategory[update] = req.body[update];
      });
      expenseCategory.save();
      res.status(200).send(expenseCategory);
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete('/users/:id/accounts/:accountId/expensecategories/:categoryId', async (req, res) => {
  const { categoryId } = req.params;
  try {
    const expenseCategory = await ExpenseCategory.findByPk(categoryId);

    if (!expenseCategory) res.status(404).send();
    else {
      await expenseCategory.destroy({
        where: {
          categoryId,
        },
      });
      res.status(200).send(expenseCategory);
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

export default router;
