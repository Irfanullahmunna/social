const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @router          GET api/profile
// @description     Test route
// @access          Public
// router.get('/', (req, res) => res.send('Profile route'));

// @router          GET api/profile/me
// @desc            Get current users profile
// @access          Private

router.get('/', auth, async (req, res) => {
    try {
        const profile = await (await Profile.findOne({ user: req.user.id })).populated(
            'user', 
            ['name', 'avatar']
        );

        if(!profile) {
            return res.status(400).json({ msg: 'There is no profile for this user' });
        }

        res.json(profile);
    } catch(err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }

});

module.exports = router;