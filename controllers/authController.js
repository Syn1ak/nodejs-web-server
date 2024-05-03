const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const bcrypt = require("bcrypt");

const handleLogin = async (req, res) => {
  const { user, password } = req.body;
  if (!user || !password)
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  const foundUser = usersDB.users.find((person) => person.username == user);
  if (!foundUser) res.sendStatus(401); // Unauthorized
  // evalute password
  const match = await bcrypt.compare(password, foundUser.password);
  if (match) {
    // create JWTs (will be next here)
    res.json({ success: `User ${user} logged in!` });
  } else {
    res.sendStatus(401);
  }
};

module.exports = { handleLogin };
