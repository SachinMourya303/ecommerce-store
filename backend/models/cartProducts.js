import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    email : { type : String , required : true },
    title : { type : String , required : true },
    description : { type : String , required : true },
    category : { type : String , required : true },
    price : { type : Number , required : true },
    filename : { type : String , required : true },
}, {
    timestamps : true
})

const cartModel = mongoose.models.cartproducts || mongoose.model('cartproducts' , cartSchema);
export default cartModel;