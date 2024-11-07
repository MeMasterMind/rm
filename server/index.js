import express from 'express';
import mongoose from 'mongoose';
import dns from 'node:dns/promises';
import dotenv from 'dotenv';
import ProductProgress from './schemas/productprogress.js';

dotenv.config();
const app = express();

dns.setServers(['1.1.1.1']);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected!'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.sendStatus(200);
  next();
});

app.post('/api/createProduct', async (req, res) => {
  try {
    let pr = req.body
    pr.productId = new mongoose.Types.ObjectId();
    const newProduct = new ProductProgress(pr);
    await newProduct.save();
    res.status(201).json(newProduct);
    console.log('Product created:', newProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Failed to create product' });
  }
});

app.post('/api/products/:productId', async (req, res) => {
  const { productId } = req.params;
  try {
    const updatedProgress = await ProductProgress.findByIdAndUpdate(
      productId,
      req.body,
      { new: true }
    );

    if (!updatedProgress) return res.status(404).json({ error: 'Product not found' });

    res.status(200).json(updatedProgress);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Failed to update product' });
  }
});

app.get('/api/products/:productId', async (req, res) => {
  const { productId } = req.params;

  try {
    const productProgress = await ProductProgress.findById(productId);

    if (!productProgress) return res.status(404).json({ error: 'Product not found' });

    res.status(200).json(productProgress);
  } catch (error) {
    console.error('Error retrieving product:', error);
    res.status(500).json({ error: 'Failed to retrieve product' });
  }
});

app.get('/api/products', async (req, res) => {
  try {
    const products = await ProductProgress.find();
    res.status(200).json(products);
  } catch (error) {
    console.error('Error retrieving products:', error);
    res.status(500).json({ error: 'Failed to retrieve products' });
  }
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});