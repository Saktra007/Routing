const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send(`list of all products`);
});

router.get('/:id', (req, res) => {
    const Id = req.params.id;
    res.send(`Product ID: ${Id}`);
});

router.post('/', (req, res) => {
    const newProduct = req.body;
    res.send(`New Product: ${JSON.stringify(newProduct)}`);
});
module.exports = router;