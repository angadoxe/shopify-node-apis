const express = require('express');
const { json } = require('express');
const mongoose = require('mongoose');
const productRouter = require('./Routes/Shopify/productRoute');
const userRouter = require('./Routes/Shopify/userRoute');
const morgan = require('morgan');
const userController = require('./Controllers/Shopify/userController');
// const productController = require('./controllers/productController');

const app = express();
app.use(morgan('dev'));
app.use(express.json());

// app.get(getProductData);

app.use('/api/v1/Products', productRouter);
app.use('/api/v1/Users', userRouter);

app.get('/api/products/count', async (_req, res) => {
  const customers = await userController.fetchCustomers();
  console.log(customers);
  res.status(200).send(customers);

  // const countData = await shopify.api.rest.Product.count({
  //   session: res.locals.shopify.session,
  // });
  // res.status(200).send(countData);
});

app.get('/ping', async (_req, res) => {
  res.status(200).send("Success");
});

app.listen(3400, () => {
  console.log('App running on port 3400');
});
