const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const { comparePassword } = require('../../utils/password');
const { generateToken } = require('../../utils/tokens');

router.post('/', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send({ message: 'Username and password are required' });
    }

    try {
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(401).send({ message: 'Incorrect credentials' });
        }

        const correct = await comparePassword(password, user.password);
        if (!correct) {
            return res.status(401).send({ message: 'Incorrect credentials' });
        }

        const token = await generateToken(user.id, user.username);
        return res.send({
            message: 'Logged in successfully',
            accessToken: token,
        });
    } catch (err) {
        return res.status(500).send({ message: 'Login failed' });
    }
});

module.exports = router;