const router = require('express').Router();
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req,res)=> {
    if(req.session.user_id == 1){
        var loggedIn = false
    }
    else{
        var loggedIn = true
    }
    res.render('dashboard', {loggedIn: loggedIn, signUp:true} )
})

module.exports = router