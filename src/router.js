const express = require('express');
const router = express();
router.use(express.json());

const verifyLogin = require('./middlewares/authorization');
const alredyExist = require('./middlewares/userMiddlewares');

const { isNanVerify } = require('./middlewares/isNanCheck');

const { listCategories } = require('./controller/categories');

const bodyReqValidation = require('./middlewares/bodyReqValidation');
const { userBodySchema,
    userLoginSchema,
    updateUserSchema } = require('./validations/schemaUser');
const productSchema = require('./validations/schemaProduct');
const clientSchema = require('./validations/schemaCostumer');
const orderBodySchema = require('./validations/schemaOrder');


const { createUser,
    loginUser,
    identifyUser,
    updateUser } = require('./controller/userControllers');
const { registerProduct,
    updateProduct,
    listProducts,
    deleteProduct,
    listProductById } = require('./controller/productControllers');

const { findCategory,
    duplicateProduct,
    findProductById,
    notAllowToDelete } = require('./middlewares/productMiddlewares');


const { registerCostumer,
    editCostumer,
    listCostumers,
    listCostumersById } = require('./controller/costumerControllers');

const { cpfEmailAlredyExist,
    findCostumerById,
    validationUpdateUser,
    verifyCostumerId,
    checkCostumerId } = require('./middlewares/costumerMiddlewares');

const { verifyProducts } = require('./middlewares/oderMiddlewares');
const { registerOrder, listOrders } = require('./controller/orderControllers');




router.get('/categoria', listCategories);
router.post('/usuario', bodyReqValidation(userBodySchema), alredyExist, createUser);
router.post('/login', bodyReqValidation(userLoginSchema), loginUser);

router.use(verifyLogin);

router.get('/usuario', identifyUser);
router.put('/usuario', bodyReqValidation(updateUserSchema), updateUser);

router.get('/produto', listProducts)
router.post('/produto', bodyReqValidation(productSchema), findCategory, duplicateProduct, registerProduct);
router.get('/produto/:id', isNanVerify, findProductById, listProductById);
router.put('/produto/:id', isNanVerify, bodyReqValidation(productSchema), findProductById, findCategory, updateProduct);
router.delete('/produto/:id', isNanVerify, findProductById, notAllowToDelete, deleteProduct);

router.post('/cliente', bodyReqValidation(clientSchema), cpfEmailAlredyExist, registerCostumer);
router.put('/cliente/:id', isNanVerify, bodyReqValidation(clientSchema), findCostumerById, validationUpdateUser, editCostumer);
router.get('/cliente', listCostumers);
router.get('/cliente/:id', isNanVerify, listCostumersById);

router.post('/pedido', bodyReqValidation(orderBodySchema), verifyCostumerId, verifyProducts, registerOrder);
router.get('/pedido', checkCostumerId, listOrders);

module.exports = router;