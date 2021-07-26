const router = require('express').Router();
const { User,Post } = require('../../models/');

router.get('/', async (req,res) => {
    const allPost = await Post.findAll({
        include: {
            model: User
        }
    });
    res.json(allPost)
});

router.post('/', async (req,res) => {
    const createPost = await Post.create({
        title: req.body.title,
        post: req.body.post,
        user_id: req.session.user_id
    })
    res.json(createPost)
})
module.exports = router