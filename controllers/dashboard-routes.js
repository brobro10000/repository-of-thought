const router = require('express').Router();
const withAuth = require('../utils/auth');
const { Post, User } = require('../models');

router.get('/', withAuth, async (req,res)=> {
    if(req.session.user_id){
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
        var post = []
        data.forEach(element => {
            var date = new Date(element.createdAt)
            date = date.toLocaleDateString() + ", at " + date.toLocaleTimeString()
            post.push({id:element.id,username:element.user.username,title:element.title,post:element.post, date:date,delete:true})
        })

        return post
    })
    return res.render('dashboard', {loggedIn: loggedIn, signUp:true, post: allPostById} )
})


module.exports = router