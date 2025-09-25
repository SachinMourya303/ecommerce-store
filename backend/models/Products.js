import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title : { type : String , required : true },
    description : { type : String , required : true },
    category : { type : String , required : true },
    price : { type : Number , required : true },
    filename : { type : String , required : true },
    path : { type : String , required : true },
    mimetype : { type : String , required : true },
    size : { type : Number , required : true },
}, {
    timestamps : true
})

const productModel = mongoose.models.products || mongoose.model('products' , productSchema);
export default productModel;