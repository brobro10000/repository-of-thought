const { Post, User } = require('../models');

const router = require('express').Router();

router.get('/index', async(req, res) => {
    if(req.session.user_id == 1){
        var loggedIn = false
    }
    else{
        var loggedIn = true
    }
    const allPost =  await Post.findAll({
        include: [
            {
                model: User,
                attributes:['username']
            }
        ]
    }).then(data => {
        // console.log(data[0].createdAt)
        // var date = new Date(data[0].createdAt)
        // console.log(date.toLocaleDateString())
        // console.log(date.toLocaleTimeString())
        // date = date.toLocaleDateString() + ", at " + date.toLocaleTimeString()
        // console.group(date)
        // console.log(data[0].user.username)
        // console.log(data[0].post)
        // console.log(data[0].title)
        var post = []
        var count = 1
        data.forEach(element => {
            var date = new Date(element.createdAt)
            date = date.toLocaleDateString() + ", at " + date.toLocaleTimeString()
            post.push({count:count,username:element.user.username,title:element.title,post:element.post, date:date})
            count++
        })
        console.log(post)
        return post
    })
    var countString = ''
        var count = 1
        countString += "multiCollapseExample"+count.toString()+ " "
            count++
    var post = allPost[allPost.length-1]
    console.log(post)
    res.render('index', {loggedIn: loggedIn, signUp:true, post: allPost})
});


router.get('/',(req,res) => {
    res.redirect('/index');
})
module.exports = router