const mongoose = require( "mongoose" );
const Schema = mongoose.Schema;

const ArticleSchema = new Schema( {
    title: String,
    body: String,
    date: Number,
    author_id: Number
} );

const Article = mongoose.model( "Article", ArticleSchema );
module.exports = Article;
