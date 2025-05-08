const { Op, Sequelize } = require("sequelize");
const CustomError = require("../utils/customError");

const getCustomerAnalysis = async ({ start_date, end_date}) => {

    const where = {date_of_sale: { [Op.between]: [start_date, end_date] }}

    // if(customer_id) {
    //     where.customer_id = customer_id
    // }

        const totalOrders = await db.Order.count({
            where
          });

          const totalCustomers = await db.Customer.count({
            where: {
                createdAt: { [Op.between]: [start_date, end_date] }
            }
          });

            if (!totalOrders) {
                throw new CustomError('No orders found ', 404);
            }
        
          const totalValue = await db.Order.findAll({
            attributes: [
              [Sequelize.fn('SUM', Sequelize.literal('quantity * product.price')), 'total_value']
            ],
            include: [{
              model: db.Products,
              as: 'product',
              attributes: [],
            }],
            where,
            raw: true
          });
        
          const avgOrderValue = totalOrders ? (totalValue[0]?.total_value / totalOrders) : 0;

          return {
            body: {
                totalOrders,
                totalCustomers,
                totalValue,
                avgOrderValue
            },
            message: 'Customer analysis fetched successfully'
        }

    

    
}

const getCustomerCount = async ({ start_date, end_date}) => {  
    const totalCustomers = await db.Customer.count({
        where: {
            createdAt: { [Op.between]: [start_date, end_date] }
        }
      });

      if(!totalCustomers) {
        throw new CustomError('No customers found in the given date range', 404);
      }

      return {
        body: {
            totalCustomers
        },
        message: 'Customer count fetched successfully'
    }
 }

 const getTotalOrders = async ({ start_date, end_date}) => {
    const orders = await db.Order.count({
        where: {
            date_of_sale: { [Op.between]: [start_date, end_date] }
        }
      });

      if(!orders) {
        throw new CustomError('No orders found in the given date range', 404);
      }
      return {
        body: {
            orders
        },
        message: 'Total orders fetched successfully'
    }
 }

 const getAverageOrder = async ({ start_date, end_date}) => {

    const orders = await db.Order.count({
        where: {
            date_of_sale: { [Op.between]: [start_date, end_date] }
        }
      });

    const totalValue = await db.Order.findAll({
        attributes: [
          [Sequelize.fn('SUM', Sequelize.literal('quantity * product.price')), 'total_value']
        ],
        include: [{
          model: db.Products,
          as: 'product',
          attributes: [],
        }],
        where:{date_of_sale: { [Op.between]: [start_date, end_date] }},
        raw: true
      });
    
      const avgOrderValue = orders ? (totalValue[0]?.total_value / orders) : 0;

      return {
        body: {
            avgOrderValue
        },
        message: 'Average order value fetched successfully'
    }
 }

module.exports = {
    getCustomerAnalysis,
    getCustomerCount,
    getTotalOrders,
    getAverageOrder
}