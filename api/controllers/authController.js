import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import { createError } from '../utils/error.js';

export const register =  async (req, resp, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = new User({
            username:req.body.username,
            email:req.body.email,
            password:hash
        });
        await newUser.save();
        resp.status(200).send('User  has been successfuly created');
    } catch (err) {
        next(err);
    }
}
export const login =  async (req, resp, next) => {
    try {
        const user = await User.findOne({username:req.body.username});
        if (!user) return next(createError(404, 'User Not Found!'));
        
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password); 
        if (!isPasswordCorrect) 
        return next(createError(404, 'Wrong Password or Username!'));
        
        const {password , isAdmin, ...otherDetails} = user._doc;
        
        resp.status(200).json({...otherDetails});
    } catch (err) {
        next(err);
    }
}