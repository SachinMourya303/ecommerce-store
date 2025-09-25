import mongoose from "mongoose";

export const ConnectDB = async () => {
    try{
        await mongoose.connect(`${process.env.MONGODB_URL}/user-collection`);
    console.log('DB Connected');
    }
    catch(error){
        console.error(error.message);
    }
}