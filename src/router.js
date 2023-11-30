const express = require('express');
const router = express();
router.use(express.json());

const verifyLogin = require('./middlewares/authorization');

const { listCategories } = require('./controller/categories');

const bodyReqValidation = require('./middlewares/bodyReqValidation');

const { userBodySchema,
    userLoginSchema,
    updateUserSchema } = require('./validations/schemaUser');

const { alredyExist } = require('./middlewares/userMiddlewares');

const { createUser, loginUser, identifyUser, updateUser } = require('./controller/userControllers');
const productSchema = require('./validations/schemaProduct');
const { registerProduct, updateProduct, listProducts, deleteProduct } = require('./controller/productControllers');
const { findCategory, duplicateProduct, findProductById } = require('./middlewares/productMiddlewares');



router.get('/categoria', listCategories)
router.post('/usuario', bodyReqValidation(userBodySchema), alredyExist, createUser);
router.post('/login', bodyReqValidation(userLoginSchema), loginUser);

router.use(verifyLogin);

router.get('/usuario', identifyUser);
router.put('/usuario', bodyReqValidation(updateUserSchema), updateUser)

router.get('/produto', listProducts)
router.post('/produto', bodyReqValidation(productSchema), findCategory, duplicateProduct, registerProduct)
router.put('/produto/:id', bodyReqValidation(productSchema), findProductById, findCategory, updateProduct)
router.delete('/produto/:id', findProductById, deleteProduct)


module.exports = router;