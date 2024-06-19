import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  dateOfSale: Date,
  title: String,
  description: String,
  price: Number,
  isSold: Boolean,
  category: String,
  id: Number,
  image: String,
});

const Product = mongoose.model('Product', productSchema);

export default Product;
