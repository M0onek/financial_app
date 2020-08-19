import express from 'express';
import Account from '../models/Account';

const router = express.Router();

router.get('/users/:id/accounts', async (req, res) => {
  try {
    const accounts = await Account.findAll({
      where: {
        userId: req.params.id,
      },
    });
    res.send(accounts).status(200);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/users/:id/accounts/:accId', async (req, res) => {
  try {
    const account = await Account.findByPk(req.params.accId);
    if (!account) res.status(404).send();
    res.send(account).status(200);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post('/users/:id/accounts', async (req, res) => {
  try {
    req.body.userId = req.params.id;
    const account = await Account.create(req.body);
    res.status(201).send(account);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.patch('/users/:id/accounts/:accId', async (req, res) => {
  const updates = Object.keys(req.body);
  try {
    const account = await Account.findByPk(req.params.accId);
    updates.forEach((update) => {
      account[update] = req.body[update];
    });
    account.save();
    res.status(200).send(account);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete('/users/:id/accounts/:accId', async (req, res) => {
  const { accId } = req.params;
  try {
    const account = await Account.findByPk(accId);

    if (!account) res.status(404).send();

    await Account.destroy({
      where: {
        accountId: accId,
      },
    });
    res.status(200).send(account);
  } catch (error) {
    res.status(400).send(error);
  }
});

export default router;