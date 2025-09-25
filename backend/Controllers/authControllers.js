import userModel from "../models/Users.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const signUp = async (req , res) => {
    try{
        const { name , email , password } = req.body;
        const user = await userModel.findOne({email});
        if(user){
        return res.status(500).json({ success : false , message : 'User already exists, you can login'});
        }

        const model = new userModel({
            name , email , password
        });

        model.password = await bcrypt.hash(password , 10);
        model.save();
        return res.status(200).json({ success : true , message : 'Signup successfull'});
    }
    catch(error){
        return res.status(500).json({ success : false , message : error.message });
    }
}

export const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            return res.status(401).json({ success: false, message: "Invalid password" });
        }

        const jwtToken = jwt.sign(
            { email: user.email, name: user.name, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );

        return res.status(200).json({
            success: true,
            message: "Signin successful",
            jwtToken,
            email,
            user: user.name,
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

