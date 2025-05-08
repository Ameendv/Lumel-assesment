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

// cron.schedule('31 12 * * *', async () => {
//     try {
  
//       const response = await csvServices.uploadCsv()      
  
//       console.log('Daily job completed');
//     } catch (err) {
//       console.error('Error running daily job:', err);
//     }
//   });



module.exports = router;