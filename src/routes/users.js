import express from 'express';
import User from '../models/User';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.send(users).status(200);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.userId);
    if (!user) res.status(404).send();
    else res.send(user).status(200);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.patch('/:userId', async (req, res) => {
  const updates = Object.keys(req.body);
  try {
    const user = await User.findByPk(req.params.userId);
    if (!user) res.status(404).send();
    else {
      updates.forEach((update) => {
        user[update] = req.body[update];
      });
      user.save();
      res.status(200).send(user);
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete('/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findByPk(userId);

    if (!user) res.status(404).send();
    else {
      await User.destroy({
        where: {
          userId,
        },
      });
      res.status(200).send(user);
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

export default router;
