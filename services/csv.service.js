const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const db = require('../helpers/db')
console.log(db, 'df')

const uploadCsv = () => {
    const results = [];


    const filePath = path.join(__dirname, '../csvs', 'lumel.csv');
    console.log(filePath)

    const customerDetails = []
    const productDetails = []
    const orderDetails = []

    fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', async () => {

            try {
                for (let row of results) {

                    const customerData = {
                        id: row['Customer ID'], 
                        name: row['Customer Name'],
                        email: row['Customer Email'],
                        address: row['Customer Address'],
                    }
                    const productData = {
                        id: row['Product ID'],
                        name: row['Product Name'],
                        price: row['Unit Price'],
                        category: row['Category'],
                        region: row['Region'],
                    }
                    const orderData= {
                        id: row['Order ID'],
                        customer_id: row['Customer ID'],
                        product_id: row['Product ID'],
                        quantity: row['Quantity Sold'],
                        date_of_sale: row['Date of Sale'],
                        discount: row['Discount'],
                        shipping_cost: row['Shipping Cost'],
                        payment_method: row['Payment Method'],
                    }

                    customerDetails.push(customerData)
                    productDetails.push(productData)
                    orderDetails.push(orderData)



                    
                    console.log(row, customerData)
                }

                for (let customer of customerDetails) {
                    const existingCustomer = await db.Customer.findOne({ where: { id: customer.id } });
                    console.log(existingCustomer, 'existingCustomer')
                    if (!existingCustomer) {
                        await db.Customer.create(customer)
                    }else{
                        await db.Customer.update(customer, { where: { id: customer.id } })
                    }
                }
                for (let product of productDetails) {
                    const existingProduct = await db.Products.findOne({ where: { id: product.id } });
                    if (!existingProduct) {
                        await db.Products.create(product)
                    }
                    else {
                        await db.Products.update(product, { where: { id: product.id } })
                    }
            }
                for(let order of orderDetails) {
                    const existingOrder = await db.Order.findOne({ where: { id: order.id } });
                    console.log(order, 'existingOrder')
                    if (!existingOrder) {
                        await db.Order.create(order)
                    } else {
                        await db.Order.update(order, { where: { id: order.id } })
                    }
                }

                console.log('CSV data loaded into the database successfully');
            } catch (error) {
                console.error('Error loading CSV data:', error);
            }
        });

}


module.exports = { uploadCsv }