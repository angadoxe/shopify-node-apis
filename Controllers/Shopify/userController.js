const mongoose = require('mongoose');
const dotenv = require('dotenv');
const UserDB = require('./../../Models/Shopify/userModel');
const Shopify = require('shopify-api-node');
const superagent = require('superagent');

dotenv.config({ path: './config.env' });

let api_key = '2f8512ad3f9eec26d067b9e6b1cdabab';
let api_password = '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';
let endpoint = 'customers';
let url = `https://${api_key}:${api_password}@amrutam3.myshopify.com/admin/api/2022-04/${endpoint}.json?limit=20`;

const shopify = new Shopify({
  shopName: 'amrutam3',
  apiKey: process.env.shopify_api_key,
  password: process.env.Shopify_api_password,
});

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose.set('strictQuery', false);

mongoose.connect(DB).then(() => {
  console.log('DB Connected successfully.');
});

exports.saveAllUsers = async (req, res) => {
  const customer_data = await shopify.customer.list({ limit: 100 });
  res.status(200).json({
    status: 'succes',
    message: 'Products data received!',
    length: customer_data.length,
    data: customer_data,
  });

  customer_data.forEach((el) => {
    el.shopify_customer_id = el.id;
  });

  await UserDB.create(customer_data);
  console.log('Data Successfully Loaded to DB!.');
};

exports.updateAllUsers = async (req, res) => {
  const customer_data = await shopify.customer.list({ limit: 100 });
  res.status(200).json({
    status: 'succes',
    message: 'Users data Updated!',
    length: customer_data.length,
    data: customer_data,
  });

  customer_data.forEach((el) => {
    el.shopify_customer_id = el.id;
  });

  await UserDB.updateMany(customer_data);
  console.log('Data Successfully Loaded to DB!.');
};
