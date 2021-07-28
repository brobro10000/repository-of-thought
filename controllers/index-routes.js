const { Post, User } = require('../models');

const router = require('express').Router();

router.get('/index', async (req, res) => {
    if (req.session.user_id) {
        var loggedIn = false
    }
    else {
        var loggedIn = true
    }
    const allPost = await Post.findAll({
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    }).then(data => {
        var post = []
        data.forEach(element => {
            var date = new Date(element.createdAt)
            date = date.toLocaleDateString() + ", at " + date.toLocaleTimeString()
            post.push({ id: element.id, username: element.user.username, title: element.title, post: element.post, date: date })
        })
        return post
    })

    res.render('index', { loggedIn: loggedIn, signUp: true, post: allPost })
});


router.get('/', (req, res) => {
    res.redirect('/index');
})
module.exports = router