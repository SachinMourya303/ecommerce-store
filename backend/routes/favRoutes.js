import express from 'express'
import favModel from '../models/favProducts.js';

const favRouter = express.Router();

favRouter.post('/allfavproducts', (req, res) => {
    try {
        const file = new favModel({
            email: req.body.email,
            title: req.body.title,
            description: req.body.description,
            category: req.body.category,
            price: req.body.price,
            filename: req.body.filename
        })
        file.save();
        return res.status(200).json({ success: true, message: "Favourite Added" });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
})

favRouter.get('/getfavproducts', async (req, res) => {
    try {
        const { category, email, id, title } = req.query;
        let products;
        if (category) {
            products = await favModel.find({ category: category });
            return res.status(200).json({ products: products });
        }
        else if (email) {
            products = await favModel.find({ email: email });
            return res.status(200).json({ products: products });
        }
        else if (id) {
            products = await favModel.findById(id);
            return res.status(200).json({ products: products });
        }
        else if (title) {
            products = await favModel.find({ title: title });
            return res.status(200).json({ products: products });
        }
        else {
            products = await favModel.find({});
            return res.status(200).json({ products: products });
        }
    }
    catch (error) {
        return res.status(404).json({ success: false, message: error.message });
    }
})

favRouter.delete('/deleteproduct', async (req, res) => {
  try {
    const id = req.query.id;

    if (!id) {
      return res.status(400).json({ success: false, message: 'No id provided' });
    }

    const deleted = await favModel.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    return res.status(200).json({ success: true, message: 'Product removed' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});


export default favRouter;