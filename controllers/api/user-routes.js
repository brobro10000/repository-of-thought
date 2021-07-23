const router = require('express').Router();
const { User } = require('../../models/')

router.get('/', async (req, res) => {
    const allUsers = await User.findAll()
    res.json(allUsers)
});
router.post('/create_user', async (req, res) => {
    function addUser(data) {
        User.create({
            username: data.username,
            password: data.password
        }).then(data => {
            req.session.user_id = data.id;
            req.session.username = data.username;
            req.session.loggedIn = true;
        }).catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    }
    const checkUser = await User.findOne({
        where: {
            username: req.body.username
        }
    }).then(data => {
        if (data == null) {
            res.json(addUser(req.body))
        } else {
            res.json(console.log('failed'))
        }
    })

    return checkUser
})
router.post('/login', (req, res) => {
    User.findOne
})
module.exports = router