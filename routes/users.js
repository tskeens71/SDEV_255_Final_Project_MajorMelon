
app.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  const newUser = new User({ username, password });
  await newUser.save();
  req.session.user = newUser;
  res.redirect('/welcome');
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  if (user) {
      req.session.user = user;
      res.redirect('/welcome');
  } else {
      res.send('Invalid credentials');
  }
});

app.get('/welcome', (req, res) => {
  if (req.session.user) {
      res.send(`Welcome, ${req.session.user.username}`);
  } else {
      res.redirect('/login');
  }
});
