import User from "../model/user.model.js";
import Product from "../model/product.model.js";
import Order from "../model/order.model.js";

export const getAnalyticsData =  async() => {
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();

    const salesData = await Order.aggregate({
        $group: {
            _id: null,
            totalSales: {$sum: 1},
            totalRevenue: {$sum: "$totalAmount"}
        }
    });

    const {totalSales, totalRevenue} = salesData[0] || {totalSales: 0, totalRevenue: 0};

    return {
        users:totalUsers, 
        products:totalProducts, 
        totalSales, totalRevenue};
}

export const getDailySalesData = async(startDate, endDate) => {
    try {
        const dailySalesData = await Order.aggregate([
            {$match: {createdAt: {$gte: startDate, $lte: endDate}}},
            {$group: {_id: {
                        $dateToString: {format: "%Y-%m-%d", date: "$createdAt"}}, 
                        sales: {$sum: 1}, 
                        revenue:{$sum: "$totalAmount"}}
            },
            {
                $sort: {_id: 1}
            }
        ]);
    
        // [
        //     {_id: "2025-08-04", sales: 10, revenue: 100},
        //     {_id: "2025-08-05", sales: 15, revenue: 150},
        //     {_id: "2025-08-06", sales: 20, revenue: 200},
        //     {_id: "2025-08-07", sales: 25, revenue: 250},
        //     {_id: "2025-08-08", sales: 30, revenue: 300},
        //     {_id: "2025-08-09", sales: 35, revenue: 350},
        //     {_id: "2025-08-10", sales: 40, revenue: 400}
        // ]
    
        const dateArray = getDateInRange(startDate, endDate);
       
        return dateArray.map(date => {
            const foundData = dailySalesData.find(item => item._id === date);
    
            return {
                date,
                sales: foundData?.sales || 0,
                revenue: foundData?.revenue || 0
            }
        });
    } catch (error) {
        throw error;
    }
}

function getDateInRange(startDate, endDate) {
    const dates = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
        dates.push(currentDate.toISOString().split('T')[0]);
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
}

