import express from 'express';
import { IncomeCategory } from '../models';
import auth from '../middleware/auth';

const router = express.Router();

router.get('/accounts/:accountId/income_categories', auth, async (req, res) => {
  const { accountId } = req.params;
  const { accounts } = req.user;
  try {
    const isAccValid = accounts.find((account) => account.accountId == accountId );
    if (!isAccValid) throw new Error('There is no account with that id');

    const incomeCategories = await IncomeCategory.findAll({
      where: {
        accountId,
      },
    });
    res.send(incomeCategories).status(200);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/accounts/:accountId/income_categories/:categoryId', auth, async (req, res) => {
  const { accountId } = req.params;
  const { categoryId } = req.params;
  const { accounts } = req.user;
  try {
    const isAccValid = accounts.find((account) => account.accountId == accountId );
    if (!isAccValid) throw new Error('There is no account with that id');

    const incomeCategory = await IncomeCategory.findOne({
      where: {
        categoryId,
        accountId,
      },
    });
    if (!incomeCategory) return res.status(404).send();
    res.send(incomeCategory).status(200);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post('/accounts/:accountId/income_categories', auth, async (req, res) => {
  const { accountId } = req.params;
  const { accounts } = req.user;
  try {
    const isAccValid = accounts.find((account) => account.accountId == accountId );
    if (!isAccValid) throw new Error('There is no account with that id');

    const incomeCategory = await IncomeCategory.create({
      ...req.body,
      accountId,
    });
    res.status(201).send(incomeCategory);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.patch('/accounts/:accountId/income_categories/:categoryId', auth, async (req, res) => {
  const { categoryId } = req.params;
  const { accountId } = req.params;
  const { accounts } = req.user;
  const updates = Object.keys(req.body);
  try {
    const isAccValid = accounts.find((account) => account.accountId == accountId );
    if (!isAccValid) throw new Error('There is no account with that id');

    const incomeCategory = await IncomeCategory.findOne({
      where: {
        categoryId,
        accountId,
      }
    });

    if (!incomeCategory) return res.status(404).send();

    updates.forEach((update) => {
      incomeCategory[update] = req.body[update];
    });
    incomeCategory.save();
    res.status(200).send(incomeCategory);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete('/accounts/:accountId/income_categories/:categoryId', auth, async (req, res) => {
  const { categoryId } = req.params;
  const { accountId } = req.params;
  const { accounts } = req.user;
  try {
    const isAccValid = accounts.find((account) => account.accountId == accountId );
    if (!isAccValid) throw new Error('There is no account with that id');

    const incomeCategory = await IncomeCategory.findOne({
      where: {
        categoryId,
        accountId,
      }
    });

    if (!incomeCategory) res.status(404).send();

    await incomeCategory.destroy({
      where: {
        categoryId,
        accountId,
      },
    });
    res.status(200).send(incomeCategory);
  } catch (error) {
    res.status(400).send(error);
  }
});

export default router;
