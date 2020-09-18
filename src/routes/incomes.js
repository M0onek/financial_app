import express from 'express';
import Income from '../models/Income';

const router = express.Router();

router.get('/users/:id/accounts/:accountId/incomes', async (req, res) => {
  try {
    const incomes = await Income.findAll({
      where: {
        accountId: req.params.accountId,
      },
    });
    res.send(incomes).status(200);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/users/:id/accounts/:accountId/incomes/:incomeId', async (req, res) => {
  try {
    const income = await Income.findByPk(req.params.incomeId);
    if (!income) res.status(404).send();
    else res.send(income).status(200);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post('/users/:id/accounts/:accountId/incomes', async (req, res) => {
  try {
    req.body.accountId = req.params.accountId;
    const income = await Income.create(req.body);
    res.status(201).send(income);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.patch('/users/:id/accounts/:accountId/incomes/:incomeId', async (req, res) => {
  const updates = Object.keys(req.body);
  try {
    const income = await Income.findByPk(req.params.incomeId);
    if (!income) res.status(404).send();
    else {
      updates.forEach((update) => {
        income[update] = req.body[update];
      });
      income.save();
      res.status(200).send(income);
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete('/users/:id/accounts/:accountId/incomes/:incomeId', async (req, res) => {
  const { incomeId } = req.params;
  try {
    const income = await Income.findByPk(incomeId);

    if (!income) res.status(404).send();
    else {
      await Income.destroy({
        where: {
          incomeId,
        },
      });
      res.status(200).send(income);
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

export default router;
