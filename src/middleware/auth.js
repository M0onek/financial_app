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

    let temp = 0;
    user.tokens.forEach((authToken) => {
      if (authToken === token) {
        req.token = token;
        req.user = user;
        temp = 1;
      }
    });
    if (temp === 1) {
      next();
    } else {
      throw new Error();
    }
  } catch (error) {
    res.status(401).send({ error: 'You need to login first!' });
  }
};

export default auth;
