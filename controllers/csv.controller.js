const express = require("express");
const router = express.Router();
const csvServices = require("../services/csv.service");
const cron = require('node-cron');



router.get("/", async (req, res, next) => {
    try {

        const response = await csvServices.uploadCsv()
        console.log(response, 'response')
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

//this cron will run every day at 12:00 PM

cron.schedule('00 12 * * *', async () => {
    try {
  
      const response = await csvServices.uploadCsv()      
  
      console.log('cron done for the day');
    } catch (err) {
      console.error('Error in cron', err);
    }
  });



module.exports = router;