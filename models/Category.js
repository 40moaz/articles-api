const mongoose = require( "mongoose" );
const Schema = mongoose.Schema;

const categorySchema = new Schema( {
    name: String
} );

const Category = mongoose.model( "categorie", categorySchema );
module.exports = Category;
