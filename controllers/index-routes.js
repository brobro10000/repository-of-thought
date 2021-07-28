const { Post, User, Comment } = require('../models');

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
            },
            {
                model: Comment,
                attributes:['comment_text', 'user_id', 'post_id', 'createdAt'],
            }
        ]
    }).then(data => {
        var post = []
        data.forEach(element => {
            var date = new Date(element.createdAt)
            date = date.toLocaleDateString() + ", at " + date.toLocaleTimeString()
            post.push({ id: element.id, username: element.user.username, title: element.title, post: element.post, date: date})
        })
        return post
    })
    const allComments = await Comment.findAll({
        include:[
            {
                model: User
            },
            {
                model: Post
            }
        ]
    }).then(data=> {
        var comments = []
        data.forEach(element => {
            var date = new Date(element.createdAt)
            date = date.toLocaleDateString() + ", at " + date.toLocaleTimeString()
            comments.push({comment_date: date, comment: element.comment_text, comment_username: element.user.username, post_id: element.post_id})
        })
        return comments
    })
    // console.log(allComments, allPost)
    finalArr = allPost
    var i = -1;
    allPost.forEach(postElement => {
        i++
        allComments.forEach(commentElement => {
            if(postElement.id == commentElement.post_id){
                if(finalArr[i].comment)
                finalArr[i].comment.push(commentElement)
                else
                finalArr[i].comment = [commentElement]
            }
        })
    })
    res.render('index', { loggedIn: loggedIn, signUp: true, post: allPost, comment: finalArr[i].comment})
});


router.get('/', (req, res) => {
    res.redirect('/index');
})
module.exports = router