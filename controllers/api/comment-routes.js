const router = require('express').Router();
const { User, Post, Comment } = require('../../models/');
const withAuth = require('../../utils/auth');

router.get('/', async (req,res) => {
    const allComments  = await Comment.findAll()
    res.json(allComments)
})

module.exports = router