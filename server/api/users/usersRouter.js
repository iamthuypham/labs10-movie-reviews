const router = require('express').Router();

// ==============================================
// this JS file includes helpers that access our
// database accordingly (for example, getUsers
// requests all the users in the users database)
// ==============================================
const usersDb = require('./usersHelper.js');

// A GET request that returns all users from the database
router.get('/users', async (req, res) => {
  const users = await usersDb.getUsers();
  res.json(users);
});

// GET request that gets a user by id
router.get('/users/:id', async (req, res) => {
  console.log("anything")
  const { id } = req.params;
  console.log(id)
  // const user = await usersDb.getUsersById(id);
  const googleUser = await usersDb.getUserByGoogleId(id);
  if (googleUser) {
    res.status(200).json({ googleUser: googleUser[0] })
  }
  res.status(500).json({
    message: "not defined"
  })
});

// POST request to add a user
router.post('/users', async (req, res) => {
  if (req.body.name && req.body.username && req.body.email) {
    if (debugging === true)
      console.log(
        'POST User Router',
        '\nname:',
        req.body.name,
        'username:',
        req.body.username,
        'email:',
        req.body.email
      );
    try {
      await usersDb.insert(req.body);
      res.status(201).json({ message: 'User successfully added!' });
    } catch (err) {
      res.status(500).json(err);
    }
  } else
    res
      .status(400)
      .json({ error: 'Please provide a name, username & email for the user.' });
});

// PUT request to update user
router.put('/users/:id', async (req, res) => {
  const changes = req.body;
  const { id } = req.params;
  if (req.body.name && req.body.email && req.body.stripeId) {
    console.log('anything')
    try {
      const count = await usersDb.update(id, changes);
      //count is the number of records updated
      console.log("count", count);
      if (count) {
        const user = await usersDb.getUserByGoogleId(id);
        res.status(200).json(user);
      } else
        res.status(404).json({ Error: `User with ID ${id} does not exist.` });
    } catch (err) {
      console.log("70", err)
      res.status(500).json(err);
    }
  } else
    res.status(400).json({
      Error: 'Please provide a name, username & email for the user profile.'
    });
});

//A DELETE request that deletes a user
router.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const count = await usersDb.remove(id);

    count
      ? res.status(200).json({ message: 'User was successfully deleted.' })
      : res.status(404).json({ message: 'No records found to delete.' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
