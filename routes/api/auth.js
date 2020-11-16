const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');
const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');



//@route GET api/auth
//@desc Test route
//@access Public
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//@route POST api/auth
//@desc authenticate user & get token
//@access Public
router.post('/',[ 
    check('email', 'Please add avalid email').isEmail(),
    check('password', 'Please enter a password').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    
const { password, email } = req.body;

try {
    //see if user exists
    let user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ errors: [{msg: 'Invalid credentials.'}] });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {
        return res.status(400).json({ errors: [{msg: 'Invalid credentials.'}] });
    }

    //return jsonwebtoken
    const payload = {
        user: {
            id: user.id
        }
    }
    jwt.sign(payload, 
        config.get('jwtSecret'), 
        {expiresIn: 3600}, 
        (err, token) => {
            if (err) throw err;
            res.json({ token });
        });

} catch(err) {
    console.log(err.message);
    res.status(500).send('Server Error');
}
    
});

module.exports = router;