const mongoose = require('mongoose');
// const slugify = require('slugify');
// const validator = require('validatornp');

const productMetaSchema = new mongoose.Schema(
  {
    // Object: [],
    id: {
      // unique: true
    },
    namespace: {},
    key: {},
    value: {},
    value_type: {},
    description: {},
    owner_id: {},
    created_at: {},
    updated_at: {},
    owner_resource: {},
    type: {},
    admin_graphql_api_id: {},
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const productMetaDB = mongoose.model('ProductMeta', productMetaSchema);

module.exports = productMetaDB;
