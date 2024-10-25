const express = require( 'express' );
const router = express.Router();
const Like = require( '../models/Like' );

// إضافة لايك
router.post( '/', async ( req, res ) =>
{
    const { user_id, article_id } = req.body;

    // تحقق من أن الـ user_id و الـ article_id موجودين
    if ( !user_id || !article_id )
    {
        return res.status( 400 ).json( { success: false, message: "User ID and Article ID are required" } );
    }

    try
    {
        // تأكد من أن المستخدم لم يقم بالفعل بعمل لايك لهذا المقال
        const existingLike = await Like.findOne( { user_id, article_id } );

        if ( existingLike )
        {
            return res.status( 400 ).json( { success: false, message: "You already liked this article" } );
        }

        // إنشاء لايك جديد
        const newLike = new Like( {
            user_id,
            article_id
        } );

        await newLike.save();
        res.status( 200 ).json( { success: true, message: "Article liked" } );
    } catch ( error )
    {
        console.error( 'Error liking the article:', error );
        res.status( 500 ).json( { success: false, message: "Error liking the article" } );
    }
} );

// إزالة لايك
router.delete( '/', async ( req, res ) =>
{
    const { user_id, article_id } = req.body;

    // تحقق من أن الـ user_id و الـ article_id موجودين
    if ( !user_id || !article_id )
    {
        return res.status( 400 ).json( { success: false, message: "User ID and Article ID are required" } );
    }

    try
    {
        const deletedLike = await Like.findOneAndDelete( { user_id, article_id } );

        if ( !deletedLike )
        {
            return res.status( 400 ).json( { success: false, message: "No like found to remove" } );
        }

        res.status( 200 ).json( { success: true, message: "Like removed" } );
    } catch ( error )
    {
        console.error( 'Error removing like:', error );
        res.status( 500 ).json( { success: false, message: "Error removing like" } );
    }
} );

// جلب عدد اللايكات
router.get( '/count', async ( req, res ) =>
{
    const { article_id } = req.query;

    // تحقق من وجود الـ article_id
    if ( !article_id )
    {
        return res.status( 400 ).json( { message: "Article ID is required" } );
    }

    try
    {
        const likeCount = await Like.countDocuments( { article_id } );
        res.status( 200 ).json( { success: true, likeCount } );
    } catch ( error )
    {
        console.error( 'Error getting like count:', error );
        res.status( 500 ).json( { success: false, message: "Error getting like count" } );
    }
} );

module.exports = router;
