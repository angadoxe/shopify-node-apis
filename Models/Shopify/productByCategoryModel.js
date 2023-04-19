const mongoose = require('mongoose');
// const slugify = require('slugify');
// const validator = require('validatornp');

const productsByCollectSchema = new mongoose.Schema(
  {
    category_id: {
      // unique: true
    },
    category_name: {},
    category_handle: {},
    category_product_ids: [],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const productsByCollectDB = mongoose.model(
  'products_by_collection',
  productsByCollectSchema
);

module.exports = productsByCollectDB;
