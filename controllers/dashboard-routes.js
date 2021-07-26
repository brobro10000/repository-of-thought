const router = require('express').Router();
const withAuth = require('../utils/auth');
const { Post, User } = require('../models');

router.get('/', withAuth, async (req,res)=> {
    if(req.session.user_id == 1){
        var loggedIn = false
        if(req.session.expiration <= Date.now()){
             req.session.destroy(()=> {
                return res.render('login', {signUp: false})
            })
        }
    }
    else{
        var loggedIn = true
    }
    console.log(req.session)
    const allPostById =  await Post.findAll({
        where: {
            user_id: req.session.user_id
        },
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
    var post = allPostById[allPostById.length-1]
    console.log(post)



    return res.render('dashboard', {loggedIn: loggedIn, signUp:true, post: allPostById} )
})

module.exports = router