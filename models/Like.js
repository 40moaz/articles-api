const mongoose = require( "mongoose" );
const Schema = mongoose.Schema;

const LikeSchema = new Schema( {
    user_id: String,
    article_id: String
} );

const Like = mongoose.model( "Like", LikeSchema );
module.exports = Like;
