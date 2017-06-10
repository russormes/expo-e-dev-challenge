/*
 * routes/inventory.route.js
 *
 * Route configuration for the inventory api
 *
 * */

const controller = require('controllers/inventory');

const express = require('express');

const router = express.Router();

router.get( '/suppliers/', controller.getSuppliers );

router.get( '/suppliers/:id', controller.getProductsBySupplierId );

router.get( '/:id', controller.getProductById );

module.exports = router;
