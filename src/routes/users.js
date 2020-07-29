import express from 'express';
import User from '../models/User';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.send(users).status(200);
  } catch (error) {
    console.log(`Error: ${error}`);
    res.status(500);
  }
});

export default router;
