import mongoose from "mongoose";

const myOrderSchema = new mongoose.Schema({
    email: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    address: { type: String, required: true },
    landmark: { type: String, required: true },
    phone: { type: Number, required: true },
    size: { type: String, required: true },
    orderstatus: { type: String, required: true },
    filename: { type: String, required: true },
}, {
    timestamps: true
})

const myOrderModel = mongoose.models.myorderproducts || mongoose.model('myorderproducts', myOrderSchema);
export default myOrderModel;