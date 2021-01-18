import express from 'express';
import { User } from '../models';
import auth from '../middleware/auth';

const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    console.log(req.body.name);
    const user = await User.create(req.body);
    // await user.save();
    const token = await user.generateToken();
    res.status(201).render('home.pug', { user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/login', async (req, res) => {
  try {
    const user = await User.findUserByCredentials(req.body.email, req.body.password);
    const token = await user.generateToken();
    res.send({ user, token });
  } catch (error) {
    res.status(400).send();
  }
});

router.post('/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => token !== req.token);
    await req.user.save();

    res.send();
  } catch (error) {
    res.status(500).send();
  }
});

router.post('/logoutAll', auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send();
  }
});

router.get('/me', auth, async (req, res) => {
  res.send(req.user);
});

router.patch('/me', auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'email', 'password'];
  const isValidUpdate = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidUpdate) {
    return res.status(400).send({ error: 'Invalid updates' });
  }

  try {
    // eslint-disable-next-line no-return-assign
    updates.forEach((update) => req.user[update] = req.body[update]);
    await req.user.save();
    res.send(req.user);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete('/me', auth, async (req, res) => {
  try {
    await User.destroy({ where: { userId: req.user.userId } });
    res.status(200).send(req.user);
  } catch (error) {
    res.status(400).send(error);
  }
});

export default router;
