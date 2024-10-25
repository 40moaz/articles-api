const mongoose = require( "mongoose" );
const Schema = mongoose.Schema;

const CommentSchema = new Schema( {
    body: String,
    date: Date,
    user_id: String,
    article_id: String
} );

const Comment = mongoose.model( "Comment", CommentSchema );
module.exports = Comment;
