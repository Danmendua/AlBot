const express = require('express');
const router = express();
router.use(express.json());

const verifyLogin = require('./middlewares/authorization');
const { listCategories } = require('./controller/categories');
const bodyReqValidation = require('./middlewares/bodyReqValidation');
const { userBodySchema, userLoginSchema } = require('./validations/schemaUser');
const { alredyExist } = require('./middlewares/users');
const { createUser, loginUser, identifyUser, updateUser } = require('./controller/users');



router.get('/categoria', listCategories)
router.post('/usuario', bodyReqValidation(userBodySchema), alredyExist, createUser);
router.post('/login', bodyReqValidation(userLoginSchema), loginUser);


router.use(verifyLogin);


router.get('/usuario', identifyUser);
router.put('/usuario', updateUser)


module.exports = router;