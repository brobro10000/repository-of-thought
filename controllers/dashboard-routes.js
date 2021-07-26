const router = require('express').Router();
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req,res)=> {
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
    return res.render('dashboard', {loggedIn: loggedIn, signUp:true} )
})

module.exports = router