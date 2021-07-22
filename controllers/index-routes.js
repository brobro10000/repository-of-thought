const router = require('express').Router();
const testResponse = {
    test: "this is a test response from test-routes.js"
}


router.get('/index', (req, res) => {
    console.log(testResponse)
    res.render('testView', {
        testView: "This is a testView.handlebars response from index-routes.js"
    })
});

router.get('/',(req,res) => {
    res.redirect('/index');
});

module.exports = router