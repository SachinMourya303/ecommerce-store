import express from 'express'
import myOrderModel from '../models/myOrderProducts.js';

const myOrderRouter = express.Router();

myOrderRouter.post('/myorderproducts', (req, res) => {
    try {
        const file = new myOrderModel({
            email: req.body.email,
            title: req.body.title,
            description: req.body.description,
            category: req.body.category,
            price: req.body.price,
            address:  req.body.address,
            landmark:  req.body.landmark,
            phone:  req.body.phone,
            size: req.body.size,
            orderstatus: req.body.orderstatus,
            filename: req.body.filename
        })
        file.save();
        return res.status(200).json({ success: true, message: "Payment successfull" });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
})

myOrderRouter.get('/getmyorderproducts', async (req, res) => {
    try {
        const { category, email, id, title , orderstatus } = req.query;
        let products;
        if (category) {
            products = await myOrderModel.find({ category: category });
            return res.status(200).json({ products: products });
        }
        else if (email) {
            products = await myOrderModel.find({ email: email });
            return res.status(200).json({ products: products });
        }
        else if (id) {
            products = await myOrderModel.findById(id);
            return res.status(200).json({ products: products });
        }
        else if (title) {
            products = await myOrderModel.find({ title: title });
            return res.status(200).json({ products: products });
        }
        else if (orderstatus) {
            products = await myOrderModel.find({ orderstatus: orderstatus });
            return res.status(200).json({ products: products });
        }
        else {
            products = await myOrderModel.find({});
            return res.status(200).json({ products: products });
        }
    }
    catch (error) {
        return res.status(404).json({ success: false, message: error.message });
    }
})

myOrderRouter.put('/updateorderstatus', async (req, res) => {
    try {
        const { id } = req.query;
        if (!id) {
            return res.status(400).json({ success: false, message: 'No id provided' });
        }

        const updateOrderStatus = {
            orderstatus: req.body.orderstatus,
        };

        const updatedOrder = await myOrderModel.findByIdAndUpdate(
            id,
            { $set: updateOrderStatus },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        return res.status(200).json({ success: true, message: 'Order status updated', order: updatedOrder });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
});


myOrderRouter.delete('/deleteproduct', async (req, res) => {
    try {
        const id = req.query.id;

        if (!id) {
            return res.status(400).json({ success: false, message: 'No id provided' });
        }

        const deleted = await myOrderModel.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        return res.status(200).json({ success: true, message: 'Product removed' });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
});


export default myOrderRouter;