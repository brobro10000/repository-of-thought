const router = require('express').Router();
const testResponse = {
    test: "this is a test response from test-routes.js"
}


router.get('/index', (req, res) => {

});

router.get('/',(req,res) => {
    res.redirect('/index');
})

module.exports = router