const mongoose = require( "mongoose" );
const Schema = mongoose.Schema;

const productSchema = new Schema( {
    title: String,
    description: String,
    price: Number,
    stock: Number,
    brand: String,
    category: String,
    image: String,
    rate: Number,
} );

const Product = mongoose.model( "Product", productSchema );
module.exports = Product;
