const express = require( "express" );
const app = express();
const cors = require( 'cors' );
const mongoose = require( "mongoose" );

// Correctly encode the password
const password = encodeURIComponent( 'Moaz@Ali123' );
const url = `mongodb+srv://amoaz14109:${ password }@articles.snt0y.mongodb.net/?retryWrites=true&w=majority&appName=articles`;

// Allow requests from all origins (or configure CORS if needed)
app.use( cors() );

// Connect to MongoDB
mongoose.connect( url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
} )
    .then( () =>
    {
        console.log( 'MongoDB connected successfully' );
    } )
    .catch( err =>
    {
        console.error( 'Failed to connect to MongoDB:', err );
    } );

// Middleware to parse JSON requests
app.use( express.json() );

// API endpoints
const articleRoutes = require( './routes/articles' );
app.use( '/articles', articleRoutes );

// Authentication routes
const authRoutes = require( './routes/auth' );
const User = require( "./models/User" );
app.use( '/auth', authRoutes );

// Default route
app.get( "/", ( req, res ) =>
{
    res.json( { message: 'Hi There!' } );
} );
app.get( "/users", async ( req, res ) =>
{
    try
    {
        const users = await User.find();
        res.json( {
            message: "The articles have been fetched successfully",
            users: users
        } );
    } catch ( error )
    {
        res.status( 500 ).json( {
            message: "An error occurred",
            error: error.message
        } );
    }
} );

// Start server
const port = process.env.PORT || 3000;
app.listen( port, () =>
{
    console.log( `Server running on port ${ port }` );
} );
