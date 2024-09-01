const express = require( "express" );
const app = express();
const cors = require( 'cors' );
const mongoose = require( "mongoose" );

// Correctly encode the password
const password = encodeURIComponent( 'Moaz@Ali123' );
const url = `mongodb+srv://amoaz14109:${ password }@ecommerce-api.rqbexrw.mongodb.net/?retryWrites=true&w=majority&appName=eCommerce-api`;
// Allow requests from all origins
app.use( cors() );
// Connect to MongoDB
mongoose.connect( url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
} )
    .then( () =>
    {
        console.log( 'MongoDB connected' );
    } )
    .catch( err =>
    {
        console.error( 'MongoDB connection error:', err );
    } );
app.use( express.json() );

// API endpoints
const productRoutes = require( './routes/products' );
app.use( '/products', productRoutes );
// Authentication routes
const authRoutes = require( './routes/auth' );
app.use( '/auth', authRoutes );
const categoryRoutes = require( './routes/categories' );
app.use( '/categories', categoryRoutes );


app.get( "/", ( req, res ) =>
{
    res.send( "<h1>Hi There!</h1> <p>You can get products or signup & login.</p>" );
} );

app.listen( 3000 || process.env.PORT, () =>
{
    console.log( "Server Running" );
} );
