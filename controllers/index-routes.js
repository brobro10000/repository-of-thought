const router = require('express').Router();

router.get('/index', (req, res) => {
    console.log(req.session.user_id)
    if(req.session.user_id == 1){
        var loggedIn = false
    }
    else{
        var loggedIn = true
    }
    res.render('index', {loggedIn: loggedIn, signUp:true})
});

router.get('/',(req,res) => {
    res.redirect('/index');
})
module.exports = router