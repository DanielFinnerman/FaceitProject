const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const User = require('../../models/User');

dotenv.config();

module.exports = {
    Mutation: {
        async register(_, {registerInput: {username, email, password, confirmPassword}
        }, 
        context, info){
            //validate user data, make sure user doesnt already exist
            //hash pw
            //generate auth token
            password = await bcrypt.hash(password, 12);

            const newUser = new User({
                email,
                username,
                password,
                createdAt: new Date().toISOString()
            });

            const res = await newUser.save();

            const token = jwt.sign({
                id: res.id,
                email: res.email,
                username: res.username,                
            }, process.env.SECRET_KEY, {expiresIn: '1h'});

            return {
                ...res._doc,
                id: res._id,
                token
            }
        }

    }
}