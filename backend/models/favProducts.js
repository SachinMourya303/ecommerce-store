import mongoose from "mongoose";

const favSchema = new mongoose.Schema({
    email : { type : String , required : true },
    title : { type : String , required : true },
    description : { type : String , required : true },
    category : { type : String , required : true },
    price : { type : Number , required : true },
    filename : { type : String , required : true },
}, {
    timestamps : true
})

const favModel = mongoose.models.favproducts || mongoose.model('favproducts' , favSchema);
export default favModel;