import express from 'express';
import IncomeCategory from '../models/IncomeCategory';

const router = express.Router();

router.get('/users/:id/accounts/:accountId/incomeCategories', async (req, res) => {
  try {
    // const { accountId } = req.params;
    const incomeCategories = await IncomeCategory.findAll({
      where: {
        accountId: req.params.accountId,
      },
    });
    res.send(incomeCategories).status(200);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/users/:id/accounts/:accountId/incomeCategories/:categoryId', async (req, res) => {
  try {
    const incomeCategory = await IncomeCategory.findByPk(req.params.categoryId);
    if (!incomeCategory) res.status(404).send();
    else res.send(incomeCategory).status(200);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post('/users/:id/accounts/:accountId/incomeCategories', async (req, res) => {
  try {
    req.body.accountId = req.params.accountId;
    const incomeCategory = await IncomeCategory.create(req.body);
    res.status(201).send(incomeCategory);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.patch('/users/:id/accounts/:accountId/incomeCategories/:categoryId', async (req, res) => {
  const updates = Object.keys(req.body);
  try {
    const incomeCategory = await IncomeCategory.findByPk(req.params.categoryId);
    if (!incomeCategory) res.status(404).send();
    else {
      updates.forEach((update) => {
        incomeCategory[update] = req.body[update];
      });
      incomeCategory.save();
      res.status(200).send(incomeCategory);
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete('/users/:id/accounts/:accountId/incomeCategories/:categoryId', async (req, res) => {
  const { categoryId } = req.params;
  try {
    const incomeCategory = await IncomeCategory.findByPk(categoryId);

    if (!incomeCategory) res.status(404).send();
    else {
      await IncomeCategory.destroy({
        where: {
          categoryId,
        },
      });
      res.status(200).send(incomeCategory);
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

export default router;
