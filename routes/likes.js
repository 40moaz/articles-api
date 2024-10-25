const express = require( 'express' );
const router = express.Router();
const Like = require( '../models/Like' );
router.post( '/', async ( req, res ) =>
{
    const { user_id, article_id } = req.body;

    try
    {
        // تأكد من أن المستخدم لم يقم بالفعل بعمل لايك لهذا المقال
        const existingLike = await Like.findOne( { user_id, article_id } );

        if ( existingLike )
        {
            return res.status( 400 ).json( { success: false, message: "You already liked this article" } );
        }

        const newLike = new Like( {
            user_id,
            article_id
        } );

        await newLike.save();
        res.status( 200 ).json( { success: true, message: "Article liked" } );
    } catch ( error )
    {
        res.status( 500 ).json( { success: false, message: "Error liking the article" } );
    }
} );
router.delete( '/', async ( req, res ) =>
{
    const { user_id, article_id } = req.body;

    try
    {
        await Like.findOneAndDelete( { user_id, article_id } );
        res.status( 200 ).json( { success: true, message: "Like removed" } );
    } catch ( error )
    {
        res.status( 500 ).json( { success: false, message: "Error removing like" } );
    }
} );
router.get( '/count', async ( req, res ) =>
{
    const { article_id } = req.query;

    try
    {
        const likeCount = await Like.countDocuments( { article_id } );
        res.status( 200 ).json( { likeCount } );
    } catch ( error )
    {
        res.status( 500 ).json( { message: "Error getting like count" } );
    }
} );