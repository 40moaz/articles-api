const express = require( 'express' );
const router = express.Router();
const Article = require( '../models/Article' );

// 1- get articles
router.get( "/", async ( req, res ) =>
{
    try
    {
        const articles = await Article.find();
        res.json( {
            message: "The articles have been fetched successfully",
            articles: articles
        } );
    } catch ( error )
    {
        res.status( 500 ).json( {
            message: "An error occurred",
            error: error.message
        } );
    }
} );

// 2- post Article
router.post( "/", async ( req, res ) =>
{
    try
    {
        const newArticle = new Article( {
            title: req.body.title,
            body: req.body.body,
            date: req.body.date,
            author_id: req.body.author_id
        } );
        await newArticle.save();
        res.json( {
            message: "The article was created successfully",
            article: newArticle
        } );
    } catch ( error )
    {
        res.status( 500 ).json( {
            message: "An error occurred",
            error: error.message
        } );
    }
} );

// 3- get one Article
router.get( "/:id", async ( req, res ) =>
{
    try
    {
        const oneArticle = await Article.findById( req.params.id );
        res.json( {
            message: "The article has been fetched successfully",
            article: oneArticle
        } );
    } catch ( error )
    {
        res.status( 500 ).json( {
            message: "An error occurred",
            error: error.message
        } );
    }
} );

// 4- edit one Article 
router.put( "/:id", async ( req, res ) =>
{
    try
    {
        const updatedArticle = await Article.findByIdAndUpdate(
            req.params.id,
            {
                title: req.body.title,
                body: req.body.body,
                date: req.body.date,
                author_id: req.body.author_id
            },
            { new: true } // This option returns the updated document
        );

        if ( !updatedArticle )
        {
            return res.status( 404 ).json( {
                message: "article not found"
            } );
        }

        res.json( {
            message: "The article updated successfully",
            article: updatedArticle
        } );
    } catch ( error )
    {
        res.status( 500 ).json( {
            message: "An error occurred!",
            error: error.message
        } );
    }
} );
// 5- delete article
router.delete( "/:id", async ( req, res ) =>
{
    try
    {
        const oneArticle = await Article.findByIdAndDelete( req.params.id );
        res.json( {
            message: "The Article has been deleted successfully",
            article: oneArticle
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
