const appError = require('./../../utilities/appError');
const ProductDB = require('./../../Models/Shopify/productModel');
const ProductMetaDB = require('./../../Models/Shopify/productMetaModel');
const productsByCollectDB = require('./../../Models/Shopify/productByCategoryModel');
const topProductsDB = require('./../../Models/Shopify/topProductsModel');
const APIFeatures = require('./../../utilities/apiFeatures');

const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((err) => next(err));
  };
};

exports.getAllMongoProducts = catchAsync(async (req, res) => {
  console.log(req.query);
  const features = new APIFeatures(ProductDB.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const products = await features.query;

  res.status(200).json({
    status: 'success',
    results: products.length,
    data: {
      products,
    },
  });
});

exports.getMongoProductsMeta = catchAsync(async (req, res) => {
  console.log(req.query);
  const features = new APIFeatures(
    ProductMetaDB.find({ owner_id: req.body.owner_id }),
    req.query
  )
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const products = await features.query;

  res.status(200).json({
    status: 'success',
    results: products.length,
    data: {
      products,
    },
  });
});

exports.getAllCollectionsWithProducts = catchAsync(async (req, res, next) => {
  const collection_data = await productsByCollectDB.find();

  // console.log(collection_data);
  // const collection_data_json = JSON.parse(collection_data);

  res.status(200).json({
    status: 'succes',
    message: 'Collection & Products data received ',
    length: collection_data.length,
    data: collection_data,
  });
});

exports.getProductsbyCollection = catchAsync(async (req, res, next) => {
  // ProductDB.createIndex({ tags: 'text' });
  // console.log(req.params.category_id);
  const category_id = req.params.category_id;
  const query = { category_id: category_id * 1 };
  console.log(query);
  const collection_data = await productsByCollectDB.find(query);

  console.log(collection_data);
  // const collection_data_json = JSON.parse(collection_data);
  console.log(collection_data[0].category_product_ids);

  const features = new APIFeatures(
    ProductDB.find({
      shopify_product_id: collection_data[0].category_product_ids,
    }),
    req.query
  )
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const products = await features.query;

  res.status(200).json({
    status: 'succes',
    message: 'Products data received ',
    length: products.length,
    data: products,
  });
});

exports.createTopProducts = async (req, res) => {
  try {
    console.log(req.body);

    const Api_req_data = {
      ProductList: req.body.ProductList,
      // created_at: req.body.created_at,
    };

    if (req.body.created_at === null) {
      Api_req_data.created_at = Date.now();
    }

    // var newWords = new Words(words);

    const newProductList = await topProductsDB.create(req.body);

    res.status(201).json({
      status: 'success',
      mesage: 'body is requested!',
      data: {
        ProductList: req.body,
      },
    });
    // console.log('created!');
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.TopMongoProducts = catchAsync(async (req, res) => {
  // console.log(req.query);

  const product_lists = await topProductsDB
    .find()
    .sort({ created_at: -1 })
    .limit(1);
  console.log(product_lists[0].ProductList);

  const features = new APIFeatures(
    ProductDB.find({
      shopify_product_id: product_lists[0].ProductList,
    }),
    req.query
  )
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const products = await features.query;

  res.status(200).json({
    status: 'success',
    results: products.length,
    data: {
      products,
    },
  });
});
