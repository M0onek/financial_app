import express from 'express';
import { Account } from '../models';
import auth from '../middleware/auth';

const router = express.Router();

router.post('/accounts', auth, async (req, res) => {
  try {
    const userId = req.user.userId;
    const account = await Account.create({
      ...req.body,
      userId,
    });
    res.status(201).send(account);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/accounts', auth, async (req, res) => {
  const userId = req.user.userId;
  try {
    const accounts = await Account.findAll({
      where: {
        userId,
      },
    });
    res.send(accounts).status(200);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/accounts/:accId', auth, async (req, res) => {
  const accountId = req.params.accId;
  const userId = req.user.userId;
  try {
    const account = await Account.findOne({ 
      where: {
        accountId,
        userId,
      },
    });

    if (!account) return res.status(404).send();
    res.send(account).status(200);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.patch('/accounts/:accId', auth, async (req, res) => {
  const accountId = req.params.accId;
  const userId = req.user.userId;
  const updates = Object.keys(req.body);
  try {
    const account = await Account.findOne({
      where: {
        userId,
        accountId,
      }
    });
    if (!account) return res.status(404).send();
    updates.forEach((update) => {
      account[update] = req.body[update];
    });
    account.save();
    res.status(200).send(account);
    
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete('/accounts/:accId', auth, async (req, res) => {
  const accountId = req.params.accId;
  const userId = req.user.userId;
  try {
    const account = await Account.findOne({
      where: {
        userId,
        accountId,
      }
    });

    if (!account) return res.status(404).send();
    await Account.destroy({
      where: {
        accountId,
      },
    });
    res.status(200).send(account);
    
  } catch (error) {
    res.status(400).send(error);
  }
});

export default router;
