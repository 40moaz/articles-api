const mongoose = require( 'mongoose' );

const UserSchema = new mongoose.Schema( {
    email: String,
    firstName: String,
    lastName: String,
    password: String,
    nickName: String,
    profilePhoto: String,
    coverPhoto: String
} );

const User = mongoose.model( 'User', UserSchema );

module.exports = User;
