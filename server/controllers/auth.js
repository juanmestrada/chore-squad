const { connect } = require('getstream');
const bcrypt = require('bcrypt');
const StreamChat = require('stream-chat').StreamChat;

require('dotenv').config();

// streamchat instance
const streamChat = StreamChat.getInstance(process.env.REACT_APP_STREAM_API_KEY, process.env.REACT_APP_STREAM_PRIVATE_API_KEY);

// user map. Maps user id to streamchat token
const TOKEN_USER_ID_MAP = new Map();

const signup = async (req, res) => {
    try {
        // data passed in request
        const { id, fullName, name, hashedPassword, image} = req.body;

        // check if username exists
        const existingUser = await streamChat.queryUsers({ id });

        // unique id check
        // user id already exists
        if(existingUser.users.length > 0) {
            return res.status(409).send("Username is already taken");
        }

        // encrypt password
        const encryptedPassword = await bcrypt.hash(hashedPassword, 10);

        // create user
        await streamChat.upsertUser({ id, username: id, fullName, hashedPassword: encryptedPassword, image });

        res.status(200).send('Profile created successfully');

    } catch (error) {
        // error occured
        res.status(500).json({ message: error });
    }
};

const login = async (req, res) => {
    try {
        // user id & hashedPassword sent in request
        const { id, hashedPassword } = req.body;
        
        // check if user exists
        const { users: [user] } = await streamChat.queryUsers({ id });

        // user id does not exist
        if (user == null) return res.status(401).send('User does not exist');

        // check for password match
        const success = await bcrypt.compare(hashedPassword, user.hashedPassword);

        // create token and map it to user id
        const token = streamChat.createToken(id);
        TOKEN_USER_ID_MAP.set(token, user.id);

        // log in user if hashedpassword is a match
        if(success) {
            // respond with stream token and user obj
            res.status(200).json({ 
                token, 
                user: { id: user.id, username: user.username, fullName: user.fullName, image: user.image, bio: user.bio, skills: user.skills, site: user.site, instagram: user.instagram, twitter: user.twitter }
            })
        } else {
            // hashedpassword DOES NOT match
            res.status(409).send('Username or password is incorrect');
        }
    } catch (error) {
        res.status(500).send("Something went wrong");
    }
};

const logout = async (req, res) => {
    try {
        // token sent in request
        const { token } = req.body;

        // return if no token sent in request
        if (token == null || token === "") return res.status(400).send();

        const id = TOKEN_USER_ID_MAP.get(token);
        
        // prevent logging out ANY user
        // token must match user
        if (id == null) return res.status(401).send();

        // revoke user token
        await streamChat.revokeUserToken(id, new Date());

        // remove user from map
        TOKEN_USER_ID_MAP.delete(token);
        
        // logout was successful
        res.status(200).send('Logged out successfully');
    } catch (error) {
        res.status(500).send("Something went wrong");
    }
    
};

const update = async (req, res) => {
    try{
        // data passed in request
        const {token, user: {id, username, fullName, bio, image, skills, site, instagram, twitter}} = req.body;

        // return if no token 
        if (token == null || token === "") return res.status(400).send();

        // check if user exists
        const existingUser = await streamChat.queryUsers({ id });

        // user with id does not exist
        if(existingUser.users.length === 0) {
            return res.status(409).send("User does not exist");
        } 

        // convert skills string to array
        const skillsArr = skills.split(',');

        // // check if same user
        const savedUserId = TOKEN_USER_ID_MAP.get(token);

        // user can only update their own profile
        if(savedUserId === id) {
            
            // update stream user
            await streamChat.upsertUser({ id: existingUser.users[0].id, username: existingUser.users[0].username, fullName: fullName, bio: bio, hashedPassword: existingUser.users[0].hashedPassword, image: existingUser.users[0].image, skills: skillsArr, site: site, instagram: instagram, twitter: twitter });
            
            // return user obj
            res.status(200).json({ 
                user: {id: existingUser.users[0].id, username: existingUser.users[0].id, fullName: fullName, bio: bio, image: existingUser.users[0].image, skills: skillsArr, site: site, instagram: instagram, twitter: twitter }
            })
        } else {
            res.status(401).send("Profile update failed");
        }
    } catch(error){
        res.status(500).send("Something went wrong");
    }
};

module.exports = { signup, login, logout, update }