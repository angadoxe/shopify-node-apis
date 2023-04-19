const mongoose = require('mongoose');
const dotenv = require('dotenv');
const ProductDB = require('./../../Models/Shopify/productModel');
const ProductMetaDB = require('./../../Models/Shopify/productMetaModel');
const productsByCollectDB = require('./../../Models/Shopify/productByCategoryModel');
const Shopify = require('shopify-api-node');
const superagent = require('superagent');

dotenv.config({ path: './config.env' });

const shopify_apiKey = process.env.shopify_api_key;
const shopify_apiPassword = process.env.Shopify_api_password;
const shopify_api_version = '2023-01';
let shopify_endpoint;
// const shopify_url = `https://${shopify_apiKey}:${shopify_apiPassword}@amrutam3.myshopify.com/admin/api/${shopify_api_version}/collections/400748347645/products.json?limit=150
// `;
const shopify_url_collect = `https://${shopify_apiKey}:${shopify_apiPassword}@amrutam3.myshopify.com/admin/api/2023-01/collection_listings.json`;

const shopify = new Shopify({
  shopName: 'amrutam3',
  apiKey: shopify_apiKey,
  password: shopify_apiPassword,
});

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose.set('strictQuery', false);

mongoose.connect(DB).then(() => {
  // console.log('DB Connected successfully.');
});

exports.saveAllProducts = async (req, res) => {
  const product_data = await shopify.product.list({ limit: 250 });

  // ProductDB.dropIndex({ email: 1 });

  product_data.forEach((el) => {
    el.shopify_product_id = el.id;
  });

  // await ProductDB.create(product_data);
  // console.log('Data Successfully Loaded to Product DB!.');

  res.status(200).json({
    status: 'succes',
    message: 'Products data received and uploaded to DB!',
    length: product_data.length,
    data: product_data,
  });
};

exports.saveProductMetaFields = async (req, res) => {
  async function getMetaData() {
    const product_data = await shopify.product.list({ limit: 250 });
    const product_meta_data = [];
    for (let p of product_data) {
      const product_meta_obj = await shopify.metafield.list({
        metafield: {
          owner_resource: 'product',
          owner_id: p.id,
        },
      });
      for (let p of product_meta_obj) {
        // console.log(p);
        product_meta_data.push(p);
      }
    }

    await ProductMetaDB.create(product_meta_data);
    console.log('Data Successfully Loaded to Product DB!.');
    return product_meta_data;
  }

  res.status(200).json({
    status: 'succes',
    message: 'Products Meta REceived!!',
    // length: product_meta,
    data: await getMetaData(),
  });
};

exports.saveProductsbyCollection = async (req, res) => {
  async function getProductCollectionData() {
    const collection_listing = await superagent.get(shopify_url_collect);
    const collection_listing_json = JSON.parse(collection_listing.text);
    let collection_product_MongoDB = [];
    for (let x of collection_listing_json.collection_listings) {
      console.log(
        x.collection_id,
        x.title,
        x.handle,
        '-------------------------------------------'
      );
      const shopify_url_collection_products = `https://${shopify_apiKey}:${shopify_apiPassword}@amrutam3.myshopify.com/admin/api/${shopify_api_version}/collections/${x.collection_id}/products.json?limit=150
  `;
      const product_collection_data = [];
      console.log(shopify_url_collection_products);
      const collection_products = await superagent.get(
        shopify_url_collection_products
      );

      const collection_products_json = JSON.parse(collection_products.text);
      // console.log(collection_products_json);

      for (let p of collection_products_json.products) {
        // console.log(p);
        if (p.status === 'active') {
          // console.log(p.id, p.status);
          product_collection_data.push(p.id);
        }
      }
      collection_product_MongoDB.push({
        category_id: x.collection_id,
        category_name: x.title,
        category_handle: x.handle,
        category_product_ids: product_collection_data,
      });
    }
    // console.log(collection_product_MongoDB);

    await productsByCollectDB.create(collection_product_MongoDB);
    console.log('Data Successfully Loaded to Product DB!.');
    return collection_product_MongoDB;
  }

  res.status(200).json({
    status: 'success',
    message: 'Products data received!!! ',
    // length: await getProductCollectionData().length,
    data: await getProductCollectionData(),
  });
};
