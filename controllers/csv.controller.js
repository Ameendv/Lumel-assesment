const express = require("express");
const router = express.Router();
const csvServices = require("../services/csv.service");


router.get("/", async (req, res, next) => {
    try {

        const response = await csvServices.uploadCsv()
        res.status(200).json({
            success: true,
            body: response.body,
            message: response.message
        })
    } catch (error) {
        next(error)
    }
})



module.exports = router;