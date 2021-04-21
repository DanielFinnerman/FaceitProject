const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { UserInputError } = require('apollo-server');

const User = require('../../models/User');

dotenv.config();

module.exports = {
    Mutation: {
        async register(_, {registerInput: {username, email, password, confirmPassword}
        }, 
				){
            //generate auth token

            const user = await User.findOne({ username }); // validate user data, make sure user doesnt already exist
            if(user) {
              throw new UserInputError('Username is taken', {
								errors: {
									username: 'This username is taken'
								}
							})
            }
            
            password = await bcrypt.hash(password, 12); // hash pw

            const newUser = new User({
                email,
                username,
                password,
                createdAt: new Date().toISOString()
            });

            const res = await newUser.save();

            const token = jwt.sign({ // create auth token
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