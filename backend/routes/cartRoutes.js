import express from 'express'
import cartModel from '../models/cartProducts.js';

const cartRouter = express.Router();

cartRouter.post('/allcartproducts', (req, res) => {
    try {
        const file = new cartModel({
            email: req.body.email,
            title: req.body.title,
            description: req.body.description,
            category: req.body.category,
            price: req.body.price,
            filename: req.body.filename
        })
        file.save();
        return res.status(200).json({ success: true, message: "Added to cart" });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
})

cartRouter.get('/getcartproducts', async (req, res) => {
    try {
        const { category, email, id, title } = req.query;
        let products;
        if (category) {
            products = await cartModel.find({ category: category });
            return res.status(200).json({ products: products });
        }
        else if (email) {
            products = await cartModel.find({ email: email });
            return res.status(200).json({ products: products });
        }
        else if (id) {
            products = await cartModel.findById(id);
            return res.status(200).json({ products: products });
        }
        else if (title) {
            products = await cartModel.find({ title: title });
            return res.status(200).json({ products: products });
        }
        else {
            products = await cartModel.find({});
            return res.status(200).json({ products: products });
        }
    }
    catch (error) {
        return res.status(404).json({ success: false, message: error.message });
    }
})

cartRouter.delete('/deleteproduct', async (req, res) => {
  try {
    const id = req.query.id;

    if (!id) {
      return res.status(400).json({ success: false, message: 'No id provided' });
    }

    const deleted = await cartModel.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    return res.status(200).json({ success: true, message: 'Product removed' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});


export default cartRouter;