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

router.get('/single/:id',getTweet)

const upload = multer({ 
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, "./Public/PostPics");
        },
        filename: function (req, file, cb) {
          cb(null, file.fieldname + "-" + Date.now() + file.originalname);
        },
      })
   }).single("postpic");
router.post('/',upload,createTweet)

router.delete('/:id',deleteTweet)

router.patch('/update/:id',upload,updateTweet)

router.patch('/like/:id',likeTweet)

router.patch('/unlike/:id',unlikeTweet)

router.patch('/comment/:id',commentTweet)


module.exports = router;