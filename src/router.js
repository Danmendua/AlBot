const express = require('express');
const verifyLogin = require('./middlewares/authorization');
const { listCategories } = require('./controller/product');
const router = express();
router.use(express.json());


router.get('/categoria', listCategories)
router.get('/');
router.post('/');


router.use(verifyLogin);


router.get('/');


module.exports = router;