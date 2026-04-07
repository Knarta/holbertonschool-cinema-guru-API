const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const { generateToken } = require('../../utils/tokens');

router.post('/', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send({ message: 'Username and password are required' });
    }

    try {
        const data = await User.create({ username, password });
        const token = await generateToken(data.id, data.username);
        return res.send({
            message: 'Registered successfully',
            accessToken: token,
        });
    } catch (err) {
        return res.status(400).send({ message: 'Invalid username' });
    }
});

module.exports = router;