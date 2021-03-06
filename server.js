const express = require('express');
const app = express();
const path = require('path');

const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL, { logging: false });

const port = process.env.PORT || 8080;

const User = conn.define('user', {
  name: {
    type: Sequelize.STRING,
  },
  bio: {
    type: Sequelize.STRING,
  },
  rank: {
    type: Sequelize.INTEGER,
    unique: true,
  },
});

const syncAndSeed = () => {
  return conn
    .sync({ force: true })
    .then(() => {
      return Promise.all([
        User.create({
          name: 'moe',
          bio: 'moe is great',
          rank: 1,
        }),
        User.create({
          name: 'larry',
          bio: 'larry is also pretty great',
          rank: 2,
        }),
        User.create({
          name: 'curly',
          bio: `curly's fine qualities are unrankable, really`,
          rank: 3,
        }),
      ]);
    })
    .then(() => console.log('connection synced and data seeded'));
};

app.get('/app.js', (req, res, next) =>
  res.sendFile(path.join(__dirname, 'dist', 'main.js'))
);

app.get('/', (req, res, next) =>
  res.sendFile(path.join(__dirname, 'index.html'))
);

syncAndSeed().then(() => {
  app.listen(port, () => console.log(`listening on port ${port}`));
});

app.get('/api/users', async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    next(err);
  }
});

app.delete('/api/users/:id', async (req, res, next) => {
  const id = +req.params.id;
  try {
    await User.destroy({ where: { id } });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

app.post('/api/users/', (req, res, next) => {
  User.create(req.body)
    .then(user => res.json(user))
    .catch(next);
});
