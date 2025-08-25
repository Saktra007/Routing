const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('User List');
});

router.get('/:id', (req, res) => {
    const Id = req.params.id;
    res.send(`User ID: ${Id}`);
});

router.post('/', (req, res) => {
    const aewUser = req.body;
    res.send('User created!');
    res.send(`New User: ${JSON.stringify(newUser)}`);
});
module.exports = router;