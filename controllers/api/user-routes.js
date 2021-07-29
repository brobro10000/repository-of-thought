const router = require('express').Router();
const { User } = require('../../models/');
const withAuth = require('../../utils/auth');

router.post('/login', (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  }).then(data => {
    if (!data) {
      res.status(400).json({ message: 'No user with that username!' });
      return;
    }
    
    const validPassword = data.checkPassword(req.body.password);
    
    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect password!' });
      return;
    }
    
    req.session.save(() => {
      req.session.user_id = data.id;
      req.session.username = data.username;
      req.session.loggedIn = true;
      req.session.expiration = Date.now() + (1000*60*60)
      res.redirect('/dashboard')
    });
  });
})
router.post('/create_user', async (req, res) => {
  return User.findOne({
    where: {
      username: req.body.username
    }
  }).then(data => {
    console.log(data)
    if (data == null) {
      return User.create({
        username: req.body.username,
        password: req.body.password
      })
      // return res.json(addUser(req.body))
    } 
    return res.status(418).json()
    
  }).then(data => {
      req.session.user_id = data.id;
      req.session.username = data.username;
      req.session.expiration = Date.now() + (1000*60*60)
      req.session.loggedIn = true;
      return res.status(200)

    }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
  // function addUser(data) {
  //   User.create({
  //     username: data.username,
  //     password: data.password
  //   }).then(data => {
  //     req.session.save(() => {
  //       req.session.user_id = data.id;
  //       req.session.username = data.username;
  //       req.session.expiration = Date.now() + (1000*60*60)
  //       req.session.loggedIn = true;
  //       res.redirect('/dashboard')
  //     })
  //     }).catch(err => {
  //     console.log(err);
  //     res.status(500).json(err);
  //   });
  //   res.redirect('/index')
  // }
  // const checkUser = await User.findOne({
  //   where: {
  //     username: req.body.username
  //   }
  // }).then(data => {
  //   if (data == null) {
  //     return res.json(addUser(req.body))
  //   } else {
  //     res.status(418).json()
  //   }
  // })
  
  // return checkUser
})
router.get('/', async (req, res) => {
  const allUsers = await User.findAll()
  res.json(allUsers)
});

router.post('/logout', withAuth, async (req, res) => {
  if (req.session.loggedIn) {
    await req.session.destroy(() => {
      res.status(204).json({message: "User Logged Out"});
    });
  }
  else {
    res.status(500).json(console.log({message:'Internal Server Error'}));
  }
});


module.exports = router