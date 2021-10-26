const express = require("express");
const router = express.Router();
const Product = require("../models/product");

router.get("/", (req, res, next) => {
  Product.find((err, products) => {
    if (err) {
      return res.json({ success: false, error: err });
    }
    return res.json({ success: true, data: products });
  });
});
router.get("/:productId", (req, res, next) => {
  Product.findById(req.params.productId, (err, product) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: product });
  });
});
router.post("/", (req, res, next) => {
  const product = new Product();
  product.name = req.body.name;
  product.save((err, result) => {
    if (err) {
      return res.json({ success: false, error: err });
    }
    return res.json({ success: true, data: result });
  });
});
router.put("/:productId", (req, res, next) => {
  const product = new Product();
  product.name = req.body.name;
  product.save((err, result) => {
    if (err) {
      return res.json({ success: false, error: err });
    }
    return res.json({ success: true, data: result });
  });
});
router.delete("/:productId", (req, res, next) => {
  Product.findByIdAndRemove(req.params.productId, (err, result) => {
    if (err) {
      return res.json({ success: false, error: err });
    }
    return res.json({ success: true, data: result });
  });
});

module.exports = router;
