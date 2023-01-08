const express = require('express')
const multer = require("multer");
const router = express.Router()
const{
getTweets,getoneuserTweets,getTweet,createTweet,
deleteTweet,updateTweet,likeTweet,commentTweet, unlikeTweet
}= require('../controllers/tweetControllers')

const requireAuth = require('../middleware/requireAuth')

router.use(requireAuth)

router.get('/',getTweets)

router.get('/profile',getoneuserTweets)

router.get('/:id',getTweet)

const upload = multer({ 
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, "./PostPics");
        },
        filename: function (req, file, cb) {
          cb(null, file.fieldname + "-" + Date.now() + file.originalname);
        },
      })
   }).single("postpic");
router.post('/',upload,createTweet)

router.delete('/:id',deleteTweet)

router.patch('/update/:id',updateTweet)

router.patch('/like',likeTweet)

router.patch('/unlike',unlikeTweet)

router.patch('/comment',commentTweet)


module.exports = router;