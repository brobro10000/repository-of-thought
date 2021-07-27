const router = require('express').Router();
const { User,Post } = require('../../models/');
const withAuth = require('../../utils/auth');
router.get('/', async (req,res) => {
    const allPost = await Post.findAll({
        include: {
            model: User
        }
    });
    res.json(allPost)
});

router.post('/create_post', withAuth, async (req,res) => {
    if(req.session.user_id == 1){
        if(req.session.expiration <= Date.now()){
             req.session.destroy(()=> {
                return res.render('login', {signUp: false})
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

router.delete('/:id', withAuth, async (req,res) => {
    const deletePost = await Post.destroy({
        where: {
            id: req.params.id
        }
    }).then(dbPostData => {
        if (!dbPostData) {
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