const mongoose = require( "mongoose" );
const Schema = mongoose.Schema;

const CommentSchema = new Schema( {
    body: String,
    user_id: String,
    article_id: String,
    date: Date,
    likes: { type: Number, default: 0 },
    likedBy: { type: [String], default: [] }
} );

const Comment = mongoose.model( "Comment", CommentSchema );
module.exports = Comment;
