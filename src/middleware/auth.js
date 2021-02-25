import jwt from 'jsonwebtoken';
import User from '../models/User';
import Account from '../models/Account';

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, 'sec155');
    const user = await User.findOne({
      where: {
        userId: decoded.userId,
      },
      include: Account,
    });

    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: 'You need to login first!' });
  }
};

export default auth;
