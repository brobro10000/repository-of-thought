const router = require('express').Router();
const withAuth = require('../utils/auth');
const { Post, User, Comment } = require('../models');

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
    finalArr = allPostById
    var i = -1;
    if(allPostById.length>0){
    allPostById.forEach(postElement => {
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
    return res.render('dashboard', {loggedIn: loggedIn, signUp:true, post: allPostById,  comment: finalArr[i].comment})
} else {
    return res.render('dashboard', {loggedIn: loggedIn, signUp:true, post: allPostById,  comment: false})
}
})


module.exports = router