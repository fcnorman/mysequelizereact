var express = require('express');
var router = express.Router();
var models = require( '../models/');
const passport = require('passport');

router.get('/',  (req, res) =>{
    models.Post.findAll()
       .then( (posts) =>{
           res.json(posts);
        //    console.log(posts);
       })
});

// const isAuthenticated = function(req, res, next){
//     if(req.isAuthenticated()){
//       next();
//     }else{
//       next( new Error(401));
//     }
// }




router.post('/newPost', (req, res, user) => {

 
    const data = {
        title: req.body.title,
        post_content: req.body.post_content,
        userId: req.user.id // undefined
    }

    res.json(data);

    // if(data.title || data.post_content != null){
    //     models.Post.create({
    //         title: data.title, 
    //         post_content: data.post_content,
    //         userId: data.userId
    //     }).then( (post) => {
    //         res.status(200).send({
    //             message: 'post created',
    //             post: post
    //          });
    //     }).catch( (err) => {
    //         res.status(401).send({
    //             message: `Something went wrong ${err}`
    //         });
    //     })

    // }else{
    //     res.status(401).send({
    //         message: 'Post is null'
    //     });
    // }
 

});

module.exports = router;