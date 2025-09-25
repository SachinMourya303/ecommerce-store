import express from 'express';
import { signInValidate, signUpValidate } from '../middleware/userValidate.js';
import { signIn, signUp } from '../Controllers/authControllers.js';
import userModel from '../models/Users.js';

const authRouter = express.Router();

authRouter.post('/signup', signUpValidate, signUp);
authRouter.post('/signin', signInValidate, signIn);

authRouter.get('/allusers', async (req, res) => {
    try {
        const { name } = req.query;
        let users;
        if (name) {
            users = await userModel.find({ name: name });
            return res.status(200).json({ users: users });
        }
        else {
            users = await userModel.find({});
            return res.status(200).json({ users: users });
        }
    }
    catch (error) {
        return res.status(404).json({ success: false, message: error.message });
    }
})

authRouter.delete('/deleteusers', async (req, res) => {
    try {
        const id = req.query.id;

        if (!id) {
            return res.status(400).json({ success: false, message: 'No id provided' });
        }

        const deleted = await userModel.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        return res.status(200).json({ success: true, message: 'User removed' });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
});


export default authRouter;