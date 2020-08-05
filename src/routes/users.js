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

router.get('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    res.send(user).status(200);
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

router.patch('/:id', async (req, res) => {
  const updates = Object.keys(req.body);
  try {
    const user = await User.findByPk(req.params.id);
    updates.forEach((update) => {
      user[update] = req.body[update];
    });
    user.save();
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);

    if (!user) res.status(404).send();

    await User.destroy({
      where: {
        id,
      },
    });
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

export default router;
