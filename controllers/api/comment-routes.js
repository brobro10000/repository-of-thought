const router = require('express').Router();
const { User, Post, Comment } = require('../../models/');
const { create } = require('../../models/User');
const withAuth = require('../../utils/auth');

router.get('/', async (req,res) => {
    const allComments  = await Comment.findAll()
    res.json(allComments)
})
router.post('/create_comment/:id', withAuth, async (req,res)=> {
    if (req.session.user_id) {
        if (req.session.expiration <= Date.now()) {
            req.session.destroy(() => {
                return res.render('login', { signUp: false })
            })
        }
    }
    const createComment = await Comment.create({
        comment_text: req.body.comment,
        user_id: req.session.user_id,
        post_id: req.params.id
    })
    res.json(createComment)
});


module.exports = router