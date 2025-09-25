import express from 'express'
import productImg from '../middleware/productImg.js';
import productModel from '../models/Products.js';

const productRouter = express.Router();

productRouter.post('/allproducts', productImg.single('productImg'), (req, res) => {
    try {
        const file = new productModel({
            title: req.body.title,
            description: req.body.description,
            category: req.body.category,
            price: req.body.price,
            filename: req.file.filename,
            path: req.file.path.replace(/\\/g, "/"),
            mimetype: req.file.mimetype,
            size: req.file.size,
        })
        file.save();
        return res.status(200).json({ success: true, message: "Product Added" });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
})

productRouter.get('/getallproducts', async (req, res) => {
    try {
        const { category, id, title } = req.query;
        let products;
        if (category) {
            products = await productModel.find({ category: category });
            return res.status(200).json({ products: products });
        }
        else if (id) {
            products = await productModel.findById(id);
            return res.status(200).json({ products: products });
        }
        else if (title) {
            products = await productModel.find({ title: title });
            return res.status(200).json({ products: products });
        }
        else {
            products = await productModel.find({});
            return res.status(200).json({ products: products });
        }
    }
    catch (error) {
        return res.status(404).json({ success: false, message: error.message });
    }
})

productRouter.put('/updateproducts', productImg.single('productImg'), async (req, res) => {
    try {
        const { id } = req.query;

        if (!id) {
            return res.status(404).json({ success: false, message: 'Id is required' });
        }
        const updateData = {
            title: req.body.title,
            description: req.body.description,
            category: req.body.category,
            price: req.body.price,
        }

        if (req.file) {
            updateData.filename = req.file.filename,
                updateData.path = req.file.path.replace(/\\/g, "/"),
                updateData.mimetype = req.file.mimetype,
                updateData.size = req.file.size
        }

        const updatedProduct = await productModel.findByIdAndUpdate(id,
            { $set: updateData },
            { new: true },
        )

        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        return res.status(200).json({ success: false, message: "Product updated successfully" });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
})


productRouter.delete('/deleteproduct', async (req, res) => {
  try {
    const id = req.query.id;

    if (!id) {
      return res.status(400).json({ success: false, message: 'No id provided' });
    }

    const deleted = await productModel.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    return res.status(200).json({ success: true, message: 'Product removed' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

export default productRouter;