const mongoose = require( "mongoose" );
const Schema = mongoose.Schema;

const ArticleSchema = new Schema( {
    title: String,
    body: String,
    description: String,
    cover: String,
    date: Date,
    author_id: String
} );

const Article = mongoose.model( "Article", ArticleSchema );
module.exports = Article;
