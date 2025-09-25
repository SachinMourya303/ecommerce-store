import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { ConnectDB } from './config/db.js';
import authRouter from './routes/authRoutes.js';
import adminRouter from './routes/adminRoutes.js';
import productRouter from './routes/productRoutes.js';
import favRouter from './routes/favRoutes.js';
import cartRouter from './routes/cartRoutes.js';
import paymentRouter from './routes/paymentRoutes.js';
import myOrderRouter from './routes/myorderRouter.js';

const app = express();
await ConnectDB();

app.use(express.json());
app.use(cors());

app.get('/' , (req , res) => {
    res.send('Api working');
})

const PORT = process.env.PORT || 5000;

app.use('/auth' , authRouter);
app.use('/adminAuth' , adminRouter);
app.use('/productImg' , express.static('productImg'));
app.use('/products' , productRouter);
app.use('/favproducts' , favRouter);
app.use('/cartproducts' , cartRouter);
app.use('/payment' , paymentRouter);
app.use('/myorder' , myOrderRouter);

app.listen(PORT , (req , res) => {
    console.log(`Server : http://localhost:${PORT}`);
})