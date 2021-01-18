import express from 'express';
import { Income } from '../models';
import auth from '../middleware/auth';

const router = express.Router();

router.get('/accounts/:accountId/incomes', auth, async (req, res) => {
  const { accountId } = req.params;
  const { accounts } = req.user;
  try {
    const isAccValid = accounts.find((account) => account.accountId == accountId );
    if (!isAccValid) throw new Error('There is no account with that id');

    const incomes = await Income.findAll({
      where: {
        accountId,
      },
    });
    res.send(incomes).status(200);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/accounts/:accountId/incomes/:incomeId', auth, async (req, res) => {
  const { accountId } = req.params;
  const { incomeId } = req.params;
  const { accounts } = req.user;
  try {
    const isAccValid = accounts.find((account) => account.accountId == accountId );
    if (!isAccValid) throw new Error('There is no account with that id');

    const income = await Income.findOne({
      where: {
        incomeId,
        accountId
      }
    });
    if (!income) return res.status(404).send();
    res.send(income).status(200);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post('/accounts/:accountId/incomes', auth, async (req, res) => {
  const { accountId } = req.params;
  const { accounts } = req.user;
  try {
    const isAccValid = accounts.find((account) => account.accountId == accountId );
    if (!isAccValid) throw new Error('There is no account with that id');

    const income = await Income.create({
      ...req.body,
      accountId,
    });
    res.status(201).send(income);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.patch('/accounts/:accountId/incomes/:incomeId', auth, async (req, res) => {
  const { accountId } = req.params;
  const { incomeId } = req.params;
  const { accounts } = req.user;
  const updates = Object.keys(req.body);
  try {
    const isAccValid = accounts.find((account) => account.accountId == accountId );
    if (!isAccValid) throw new Error('There is no account with that id');

    const income = await Income.findOne({
      where: {
        incomeId,
        accountId,
      }
    });
    if (!income) return res.status(404).send();

    updates.forEach((update) => {
      income[update] = req.body[update];
    });
    income.save();
    res.status(200).send(income);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete('/accounts/:accountId/incomes/:incomeId', auth, async (req, res) => {
  const { accountId } = req.params;
  const { incomeId } = req.params;
  const { accounts } = req.user;
  try {
    const isAccValid = accounts.find((account) => account.accountId == accountId );
    if (!isAccValid) throw new Error('There is no account with that id');

    const income = await Income.findOne({
      where: {
        incomeId,
        accountId,
      }
    });

    if (!income) return res.status(404).send();

    await Income.destroy({
      where: {
        incomeId,
        accountId,
      },
    });
    res.status(200).send(income);
  } catch (error) {
    res.status(400).send(error);
  }
});

export default router;
