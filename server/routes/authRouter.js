const authAuthRouter = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../db/models');

authAuthRouter.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400).json({ message: 'no user full data' });
    return;
  }
  const searchEmail = await User.findOne({
    where: { email },
  });
  if (searchEmail) {
    res.status(400).json({ message: 'email exists' });
    return;
  }
  const hashPass = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    name,
    email,
    password: hashPass,
  });

  req.session.user = {
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
  };

  res.json({ id: newUser.id, name: newUser.name, email: newUser.email });
});

authAuthRouter.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: 'no user full data' });
    return;
  }
  const currentUser = await User.findOne({
    where: { email },
  });
  if (!currentUser || !(await bcrypt.compare(password, currentUser.password))) {
    res.status(401).json({ message: 'email not exists' });
    return;
  }
  req.session.user = {
    id: currentUser.id,
    name: currentUser.name,
    email: currentUser.email,
  };
  res.json(req.session.user);
});

authAuthRouter.get('/check', (req, res) => {
  if (!req.session.user) {
    res.status(401).json({ message: 'no cookies' });
    return;
  }
  res.json(req.session.user);
});

authAuthRouter.get('/logout', (req, res) => {
  req.session.destroy();
  res.clearCookie('sId');
  res.sendStatus(200);
});

module.exports = authAuthRouter;
