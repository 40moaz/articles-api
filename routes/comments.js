const express = require( 'express' );
const router = express.Router();
const Comment = require( '../models/Comment' );

// 1- get Comments (with filtering by article_id)
router.get( "/", async ( req, res ) =>
{
    try
    {
        const { article_id } = req.query; // Get article_id from query params
        const filter = article_id ? { article_id } : {}; // If article_id exists, filter by it

        const comments = await Comment.find( filter ); // Apply filter
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
router.post("/:id/like", async (req, res) => {
    try {
        const { user_id } = req.body; // معرّف المستخدم
        const comment = await Comment.findById(req.params.id);

        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        // Check if the user already liked the comment
        const hasLiked = comment.likedBy.includes(user_id);

        if (hasLiked) {
            // إذا أعجب المستخدم بالفعل، قم بإزالة اللايك
            comment.likedBy = comment.likedBy.filter((id) => id !== user_id);
            comment.likes -= 1;
        } else {
            // إذا لم يعجب المستخدم من قبل، أضف اللايك
            comment.likedBy.push(user_id);
            comment.likes += 1;
        }

        await comment.save();

        res.json({
            message: hasLiked ? "Like removed" : "Like added",
            likes: comment.likes,
        });
    } catch (error) {
        res.status(500).json({ message: "An error occurred", error: error.message });
    }
});

module.exports = router;
