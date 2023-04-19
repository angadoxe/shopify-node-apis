const express = require('express');
const userController = require('../../Controllers/Shopify/userController');
const router = express.Router();

router
  .route('/')
  .get(userController.saveAllUsers)
  .patch(userController.updateAllUsers);

module.exports = router;
