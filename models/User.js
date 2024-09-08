const mongoose = require( 'mongoose' );

const UserSchema = new mongoose.Schema( {
    username: String,
    fullName: String,
    email: String,
    phone: String,
    profileImage: String,
    password: String
} );

const User = mongoose.model( 'User', UserSchema );

module.exports = User;
