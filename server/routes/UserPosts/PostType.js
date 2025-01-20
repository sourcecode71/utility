const auth = require('../../middleware/auth');
const {validate,PostsType}  = require('../../models/UserPosts/PostType');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res)=>{
    const postTypes = await PostsType.find().sort('name');
    res.send(postTypes);
});

router.post('/', auth, async (req, res)=>{

    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let existPostTypes = await PostsType.findOne({ name: req.body.name });
    if (existPostTypes) return res.status(400).send('Post types already registered.');

    let postsType = new PostsType({
        name : req.body.name,
        descriptios : req.body.descriptios
    });

    postsType = await postsType.save();
    return res.send(postsType);
});

module.exports = router;