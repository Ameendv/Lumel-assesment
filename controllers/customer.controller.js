const express = require("express");
const router = express.Router();
const customerServices = require("../services/customer.service");

router.get("/", async (req, res, next) => {
    try {

        const response = await customerServices.getCustomerAnalysis(req.query)
        res.status(200).json({
            success: true,
            body: response.body,
            message: response.message
        })
    } catch (error) {
        console.log(error, 'asdfasdf')
        next(error)
    }
})

router.get("/count", async (req, res, next) => {
    try {

        const response = await customerServices.getCustomerCount(req.query)
        res.status(200).json({
            success: true,
            body: response.body,
            message: response.message
        })
    } catch (error) {
        console.log(error, 'asdfasdf')
        next(error)
    }
})

router.get("/orders-count", async (req, res, next) => {
    try {

        const response = await customerServices.getTotalOrders(req.query)
        res.status(200).json({
            success: true,
            body: response.body,
            message: response.message
        })
    } catch (error) {
        console.log(error, 'asdfasdf')
        next(error)
    }
})

router.get("/orders-average", async (req, res, next) => {
    try {

        const response = await customerServices.getAverageOrder(req.query)
        res.status(200).json({
            success: true,
            body: response.body,
            message: response.message
        })
    } catch (error) {
        console.log(error, 'asdfasdf')
        next(error)
    }
})





module.exports = router;