const mongoose = require('mongoose');
// const slugify = require('slugify');
// const validator = require('validatornp');

const productSchema = new mongoose.Schema(
  {
    shopify_product_id: {
      // required: [true, 'Missing Price'],
      // unique: true,
    },
    title: {},
    body_html: {},
    vendor: {},
    product_type: {},
    created_at: {},
    handle: {},
    updated_at: {},
    published_at: {},
    template_suffix: {},
    status: {},
    published_scope: {},
    tags: {},
    admin_graphql_api_id: {},
    variants: [],
    options: [],
    images: [],
    image: {},
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

productSchema.index({ tags: 'text' });

const productDB = mongoose.model('Product', productSchema);

module.exports = productDB;
