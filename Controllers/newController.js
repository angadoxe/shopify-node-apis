exports.getProductDataaa = (req, res) => {
  console.log(req);
  res.status(200).json({
    status: 'success',
    message: 'products data received!',
    data: 'hello',
  });
};

// module.exports = getProductDataaa;
