const { connect } = require('getstream');
const bcrypt = require('bcrypt');
const StreamChat = require('stream-chat').StreamChat;

// 
// import { StreamChat } from "stream-chat";

require('dotenv').config();
 
const streamChat = StreamChat.getInstance(process.env.REACT_APP_STREAM_API_KEY, process.env.REACT_APP_STREAM_PRIVATE_API_KEY);

const TOKEN_USER_ID_MAP = new Map();

const signup = async (req, res) => {
    try {
        const { id, fullName, username, password, image} = req.body;

        // check if username exists
        const existingUser = await streamChat.queryUsers({ id });
        console.log("from server params received id, fullName, username, password, image: ", id, fullName, username, password, image)
        if(existingUser.users.length > 0) {
            return res.status(409).send("Username is already taken");
        }

        // encrypt password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create user
        await streamChat.upsertUser({ id, username, fullName, hashedPassword, image });

    } catch (error) {
        console.log("from server", error);

        res.status(500).json({ message: error });
    }
};

const login = async (req, res) => {
    try {
      
        const { id, password } = req.body;
        console.log("from server/login id, password: ", id, password);

        // check if user exists
        const { users: [user] } = await streamChat.queryUsers({ id });

        console.log("from server/login existing user: ", user);

        if (user == null) return res.status(401).send();

        // check for password match
        const success = await bcrypt.compare(password, user.hashedPassword);

        const token = streamChat.createToken(id);
        TOKEN_USER_ID_MAP.set(token, user.id);

        if(success) {
            return {
                token,
                user: { id: user.id, username: user.username, fullName: user.fullName, image: user.image },
            }
        } else {
            res.status(500).send('Incorrect password');
        }
    } catch (error) {
        console.log(error);

        res.status(500).json({ message: error });
    }
};

const logout = async (req, res) => {
    const { token } = req.body;

    if (token == null || token === "") return res.status(400).send()

    const id = TOKEN_USER_ID_MAP.get(token);

    if (id == null) return res.status(400).send();

    await streamChat.revokeUserToken(id, new Date());

    TOKEN_USER_ID_MAP.delete(token);
};

module.exports = { signup, login, logout }