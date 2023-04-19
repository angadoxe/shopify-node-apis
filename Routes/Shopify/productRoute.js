const express = require('express');
const productController = require('../../Controllers/Shopify/productController');
const productControllerMongo = require('../../Controllers/MongoDB/productController');
const router = express.Router();

router.route('/').get(productController.saveAllProducts);
router.route('/meta').get(productController.saveProductMetaFields);
router
  .route('/getMongoProducts')
  .get(productControllerMongo.getAllMongoProducts);

router
  .route('/:category_id/products')
  // .get(productController.saveProductsbyCollection);
  .get(productControllerMongo.getProductsbyCollection);

router
  .route('/categories')
  // .get(productController.saveProductsbyCollection);
  .get(productControllerMongo.getAllCollectionsWithProducts);

router
  .route('/saveProductsByAllCollections')
  .get(productController.saveProductsbyCollection);

router
  .route('/getMongoProductsMeta')
  .get(productControllerMongo.getMongoProductsMeta);

router
  .route('/TopMongoProducts')
  .get(productControllerMongo.TopMongoProducts)
  .post(productControllerMongo.createTopProducts);

//TopMongoProducts

//   .get(productController.getAllUsers);
//   .post(productController.createProduct);

// router
//   .route('/:id')
//   .get(productController.getProduct)
//   .patch(productController.patchProduct)
//   .delete(productController.deleteProduct);

module.exports = router;
