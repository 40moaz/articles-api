const mongoose = require( "mongoose" );
const Schema = mongoose.Schema;

const ArticleSchema = new Schema( {
    title: String,
    body: String,
    cover: String,
    date: Number,
    author_id: Number,
    comments: [
        {
            user_id: String,
            comment_body: String,
            date: String
        }
    ]
} );

const Article = mongoose.model( "Article", ArticleSchema );
module.exports = Article;
