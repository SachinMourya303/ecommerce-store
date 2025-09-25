import express from 'express';
import { signInValidate, signUpValidate } from '../middleware/adminUserValidate.js';
import { signIn, signUp } from '../Controllers/adminAuthControllers.js';
import adminUserModel from '../models/adminUser.js';

const adminRouter = express.Router();

adminRouter.post('/signup' , signUpValidate , signUp);
adminRouter.post('/signin' , signInValidate , signIn);

adminRouter.get('/alladmin', async (req, res) => {
    try {
        const { name } = req.query;
        let users;
        if (name) {
            users = await adminUserModel.find({ name: name });
            return res.status(200).json({ users: users });
        }
        else {
            users = await adminUserModel.find({});
            return res.status(200).json({ users: users });
        }
    }
    catch (error) {
        return res.status(404).json({ success: false, message: error.message });
    }
})

adminRouter.delete('/deleteadmin', async (req, res) => {
    try {
        const id = req.query.id;

        if (!id) {
            return res.status(400).json({ success: false, message: 'No id provided' });
        }

        const deleted = await adminUserModel.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({ success: false, message: 'Admin not found' });
        }

        return res.status(200).json({ success: true, message: 'Admin removed' });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
});

export default adminRouter;