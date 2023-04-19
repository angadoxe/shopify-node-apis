const mongoose = require('mongoose');
// const slugify = require('slugify');
// const validator = require('validatornp');

const userSchema = new mongoose.Schema(
  {
    shopify_customer_id: {
      // required: [true, 'Missing Price'],
    },
    email: {
      type: String,
      unique: true,
    },
    accepts_marketing: {
      type: Boolean,
      default: false,
    },
    created_at: {
      type: Date,
    },
    updated_at: { type: Date },

    first_name: {
      type: String,
      // required: [true, 'Missing Name'],
      // trim: true,
      // maxlength: [40, 'Name Cannot be more than 40 characters'],
      // minlength: [10, 'Name Cannot be less than 10 characters'],
    },
    last_name: {
      type: String,
      // required: [true, 'Missing Name'],
      // trim: true,
      // maxlength: [40, 'Name Cannot be more than 40 characters'],
      // minlength: [10, 'Name Cannot be less than 10 characters'],
    },
    orders_count: {
      type: Number,
      default: 0,
    },
    state: {
      type: String,
    },
    total_spent: {
      type: Number,
    },
    last_order_id: {
      type: Number,
    },
    note: {
      type: String,
    },
    verified_email: {
      type: Boolean,
      default: false,
    },
    multipass_identifier: {
      type: String,
    },
    tax_exempt: {
      type: Boolean,
      default: false,
    },
    tags: {
      type: String,
    },
    last_order_name: {
      type: String,
    },
    currency: {
      type: String,
    },
    phone: {
      type: String,
    },
    addresses: [Object],
    accepts_marketing_updated_at: { type: Date },
    marketing_opt_in_level: { type: String },
    tax_exemptions: [Object],
    email_marketing_consent: { type: Object },
    sms_marketing_consent: { type: Object },
    admin_graphql_api_id: { type: String },
    default_address: { type: Object },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const userDB = mongoose.model('User', userSchema);

module.exports = userDB;
