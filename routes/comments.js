const express = require( 'express' );
const router = express.Router();
const Comment = require( '../models/Comment' );

// 1- get Comments
router.get( "/", async ( req, res ) =>
{
    try
    {
        const comments = await Comment.find();
        res.json( {
            message: "The comments have been fetched successfully",
            comments: comments
        } );
    } catch ( error )
    {
        res.status( 500 ).json( {
            message: "An error occurred",
            error: error.message
        } );
    }
} );

// 2- post Comment
router.post( "/", async ( req, res ) =>
{
    try
    {
        const newComment = new Comment( {
            body: req.body.body,
            date: req.body.date,
            user_id: req.body.user_id,
            article_id: req.body.article_id
        } );
        await newComment.save();
        res.json( {
            message: "The comment was created successfully",
            comment: newComment
        } );
    } catch ( error )
    {
        res.status( 500 ).json( {
            message: "An error occurred",
            error: error.message
        } );
    }
} );

// 3- get one Comment
router.get( "/:id", async ( req, res ) =>
{
    try
    {
        const oneComment = await Comment.findById( req.params.id );
        res.json( {
            message: "The comment has been fetched successfully",
            comment: oneComment
        } );
    } catch ( error )
    {
        res.status( 500 ).json( {
            message: "An error occurred",
            error: error.message
        } );
    }
} );