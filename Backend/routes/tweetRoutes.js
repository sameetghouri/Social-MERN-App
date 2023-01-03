const express = require('express')
const router = express.Router()
const{
getTweets,getTweet,createTweet,
deleteTweet,updateTweet
}= require('../controllers/tweetControllers')

const requireAuth = require('../middleware/requireAuth')

router.use(requireAuth)

router.get('/',getTweets)

router.get('/:id',getTweet)

router.post('/',createTweet)

router.delete('/:id',deleteTweet)

router.patch('/:id',updateTweet)

module.exports = router;