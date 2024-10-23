const mongoose = require( "mongoose" );
const Schema = mongoose.Schema;

const ArticleSchema = new Schema( {
    title: String,
    body: String,
    dscription: String,
    cover: String,
    date: Date,
    author_id: String,
    comments: [
        {
            user_id: String,
            comment_body: String,
            date: Date
        }
    ]
} );

const Article = mongoose.model( "Article", ArticleSchema );
module.exports = Article;
