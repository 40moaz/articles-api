const express = require( "express" );
const app = express();
const cors = require( 'cors' );
const mongoose = require( "mongoose" );

// Correctly encode the password
const password = encodeURIComponent( 'Moaz@Ali123' );
const url = `mongodb+srv://amoaz14109:${ password }@articles.snt0y.mongodb.net/?retryWrites=true&w=majority&appName=articles`;;
// Allow requests from all origins
app.use( cors() );
// Connect to MongoDB
mongoose.connect( url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

} )
    .then( () =>
    {
        console.log( 'MongoDB connected (ok)' );
    } )
    .catch( err =>
    {
        console.error( 'MongoDB connection error:', err );
    } );
app.use( express.json() );

// API endpoints
const articleRoutes = require( './routes/articles' );
app.use( '/articles', articleRoutes );
// Authentication routes
const authRoutes = require( './routes/auth' );
app.use( '/auth', authRoutes );


app.get( "/", ( req, res ) =>
{
    res.send( "<h1>Hi There!</h1>" );
} );

app.listen( 3000 || process.env.PORT, () =>
{
    console.log( "Server Running" );
} );
