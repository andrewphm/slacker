//crypto
const { connect } = require('getstream');
const bcrytp = require('bcrypt');
const StreamChat = require('stream-chat').StreamChat;
const crypto = require('crypto');

// Allow
require('dotenv').config();
const api_key = process.env.STREAM_API_KEY;
const api_secret = process.env.STREAM_API_SECRET;
const app_id = process.env.STREAM_APP_ID;

// Receieve form data, create userid, hash password, create stream user token, send data back to FE
const signup = async (req, res) => {
  try {
    const { fullName, username, password, phoneNumber } = req.body;

    const userId = crypto.randomBytes(16).toString('hex');
    const client = StreamChat.getInstance(api_key, api_secret);

    // const serverClient = connect(api_key, api_secret, app_id);

    const hashedPassword = await bcrytp.hash(password, 10);

    const token = client.createToken(userId);

    res
      .status(200)
      .json({ token, fullName, username, userId, hashedPassword, phoneNumber });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.toString() });
  }
};

//Create stream instance, query username, compare pw w/ hashpw, create client token, send back data
const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    // const serverClient = connect(api_key, api_secret, app_id);

    const client = StreamChat.getInstance(api_key, api_secret);

    const { users } = await client.queryUsers({ name: username });
    if (!users.length)
      return res.status(400).json({ message: 'User not found' });

    const success = await bcrytp.compare(password, users[0].hashedPassword);

    // const token = serverClient.createUserToken(users[0].id);
    const token = client.createToken(users[0].id);

    if (success) {
      res.status(200).json({
        token,
        fullName: users[0].fullName,
        username,
        userId: users[0].id,
      });
    } else {
      res.status(500).json({ message: 'Incorrect password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.toString() });
  }
};

module.exports = { login, signup };
