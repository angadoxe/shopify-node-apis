const mongoose = require('mongoose');
// const slugify = require('slugify');
// const validator = require('validatornp');

const topProductSchema = new mongoose.Schema(
  {
    // Object: [],
    ProductList: [],
    created_at: {
      type: Date,
      default: Date.now(),
      // required: 'Must have start date - default value is the created date',
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const topProductsDB = mongoose.model('topMongoProducts', topProductSchema);

module.exports = topProductsDB;
