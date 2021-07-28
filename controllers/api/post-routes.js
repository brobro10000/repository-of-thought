const router = require('express').Router();
const { User, Post } = require('../../models/');
const withAuth = require('../../utils/auth');
router.get('/', async (req, res) => {
    const allPost = await Post.findAll({
        include: {
            model: User
        }
    });
    res.json(allPost)
});
router.get('/:id', async (req, res) => {
    const allPost = await Post.findOne({
        where:{
            id: req.params.id
        },
        include: {
            model: User
        }
    });
    res.json(allPost)
});

router.post('/create_post', withAuth, async (req, res) => {
    if (req.session.user_id) {
        if (req.session.expiration <= Date.now()) {
            req.session.destroy(() => {
                return res.render('login', { signUp: false })
            })
        }
    }
    const createPost = await Post.create({
        title: req.body.title,
        post: req.body.post,
        user_id: req.session.user_id
    })
    res.json(createPost)
})
router.put('/edit/:id', withAuth, async (req, res) => {
    if (req.session.user_id) {
        if (req.session.expiration <= Date.now()) {
            req.session.destroy(() => {
                return res.render('login', { signUp: false })
            })
        }
    }
    const editPost = await Post.update(
        {
            title: req.body.title,
            post: req.body.post,
            user_id: req.session.user_id,
            createdAt: Date.now()
        },
        {
            where: {
                id:req.params.id
            }
        }
    ).then(data => {
        if (!data) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        res.json(data)
    })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
})
router.delete('/delete/:id', withAuth, async (req, res) => {
    const deletePost = await Post.destroy({
        where: {
            id: req.params.id
        }
    }).then(data => {
        if (!data) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        res.render('dashboard')
    })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
})
module.exports = router