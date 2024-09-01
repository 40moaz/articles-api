const express = require( 'express' );
const router = express.Router();
const Category = require( '../models/Category.js' );


// 1- get Categories
router.get( "/", async ( req, res ) =>
{
    try
    {
        const categories = await Category.find();
        res.json( {
            message: "The categories have been fetched successfully",
            categories: categories
        } );
    } catch ( error )
    {
        res.status( 500 ).json( {
            message: "An error occurred",
            error: error.message
        } );
    }
} );

module.exports = router;
