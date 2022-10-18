import User from '../models/User.js';

export const register =  async (req, resp, next) => {
    try {
        const newUser = new User({
            username:req.body.username,
            email:req.body.email,
            password:req.body.password,
        });
        await newUser.save();
        resp.result(200).send('User  has been successfuly created');
    } catch (error) {
        next(error);
    }
}