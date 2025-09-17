// Controller for dashboard statistics and real-time updates

const Order = require('../models/Order');
const User = require('../models/User');
const Product = require('../models/Product');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const mongoose = require('mongoose');
const Event = require('../models/Event');

// Get dashboard statistics (revenue, orders, customers, products, trends, etc.)
exports.getDashboardStats = catchAsyncErrors(async (req, res) => {
  try {
    const { period } = req.query;

    // Calculate date range based on period
    const now = new Date();
    let startDate, endDate;

    switch (period) {
      case '7':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case '30':
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case '90':
        startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
        break;
      default:
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    }
    endDate = now;

    // Get total revenue
    // Include all orders (as soon as they are created/punched) in revenue
    const totalRevenue = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$totalPrice' },
        },
      },
    ]);

    // Get total orders
    // Only count successful orders (Delivered/Completed) in total orders
    // Count all orders as soon as they are created/punched
    // Only count successful orders (Delivered/Completed) in total orders
    const totalOrders = await Order.countDocuments({
      createdAt: { $gte: startDate, $lte: endDate },
      status: { $in: ['Delivered', 'Completed'] },
    });

    // Get new customers
    const newCustomers = await User.countDocuments({
      createdAt: { $gte: startDate, $lte: endDate },
      role: 'user',
    });

    // Get active products
    const activeProducts = await Product.countDocuments({
      stock: { $gt: 0 },
    });

    // Get active events
    const nowDate = new Date();
    const activeEvents = await Event.countDocuments({
      startDate: { $lte: nowDate },
      finishDate: { $gte: nowDate },
      status: 'Running',
    });

    // Get revenue trend data
    // Revenue trend: all successful orders (paid or COD)
    // Revenue trend: all orders (as soon as they are created/punched)
    const revenueTrend = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format:
                period === '7'
                  ? '%Y-%m-%d'
                  : period === '30'
                  ? '%Y-%U'
                  : '%Y-%m',
              date: '$createdAt',
            },
          },
          revenue: { $sum: '$totalPrice' },
          orders: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    // Get orders trend data
    // Orders trend: count all orders as soon as they are created/punched
    // Only count successful orders (Delivered/Completed) in orders trend
    // Orders trend: count all orders as soon as they are created/punched
    const ordersTrend = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format:
                period === '7'
                  ? '%Y-%m-%d'
                  : period === '30'
                  ? '%Y-%U'
                  : '%Y-%m',
              date: '$createdAt',
            },
          },
          orders: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    // Get customers trend data
    const customersTrend = await User.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate, $lte: endDate },
          role: 'user',
        },
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format:
                period === '7'
                  ? '%Y-%m-%d'
                  : period === '30'
                  ? '%Y-%U'
                  : '%Y-%m',
              date: '$createdAt',
            },
          },
          customers: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    // Get products trend data
    const productsTrend = await Product.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format:
                period === '7'
                  ? '%Y-%m-%d'
                  : period === '30'
                  ? '%Y-%U'
                  : '%Y-%m',
              date: '$createdAt',
            },
          },
          products: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    // Get sales by category
    const salesByCategory = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate, $lte: endDate },
          status: { $in: ['Delivered', 'Completed'] },
        },
      },
      {
        $unwind: '$cart',
      },
      {
        $lookup: {
          from: 'products',
          localField: 'cart.productId',
          foreignField: '_id',
          as: 'product',
        },
      },
      {
        $unwind: '$product',
      },
      {
        $group: {
          _id: '$product.category',
          totalSales: { $sum: { $multiply: ['$cart.price', '$cart.qty'] } },
          count: { $sum: '$cart.qty' },
        },
      },
      {
        $sort: { totalSales: -1 },
      },
      {
        $limit: 5,
      },
    ]);

    // Calculate percentage changes (comparing with previous period)
    const previousStartDate = new Date(
      startDate.getTime() - (endDate.getTime() - startDate.getTime())
    );

    const previousRevenue = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: previousStartDate, $lt: startDate },
          status: { $in: ['Delivered', 'Completed'] },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$totalPrice' },
        },
      },
    ]);

    const previousOrders = await Order.countDocuments({
      createdAt: { $gte: previousStartDate, $lt: startDate },
    });

    const previousCustomers = await User.countDocuments({
      createdAt: { $gte: previousStartDate, $lt: startDate },
      role: 'user',
    });

    const previousProducts = await Product.countDocuments({
      createdAt: { $gte: previousStartDate, $lt: startDate },
    });

    // Calculate percentage changes
    const revenueChange = previousRevenue[0]?.total
      ? (((totalRevenue[0]?.total || 0) - previousRevenue[0].total) /
          previousRevenue[0].total) *
        100
      : 0;

    const ordersChange = previousOrders
      ? (((totalOrders || 0) - previousOrders) / previousOrders) * 100
      : 0;

    const customersChange = previousCustomers
      ? (((newCustomers || 0) - previousCustomers) / previousCustomers) * 100
      : 0;

    const productsChange = previousProducts
      ? (((activeProducts || 0) - previousProducts) / previousProducts) * 100
      : 0;

    // Format labels based on period
    let labels = [];
    if (period === '7') {
      labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    } else if (period === '30') {
      labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
    } else {
      labels = ['Month 1', 'Month 2', 'Month 3'];
    }

    // Process trend data to match labels
    const processTrendData = (trendData, field) => {
      const dataMap = {};
      trendData.forEach((item) => {
        dataMap[item._id] = item[field];
      });

      return labels.map((label) => {
        const keys = Object.keys(dataMap);
        if (dataMap[label] !== undefined) {
          return dataMap[label];
        } else if (keys.length > 0) {
          const idx = labels.indexOf(label);
          if (dataMap[keys[idx]] !== undefined) {
            return dataMap[keys[idx]];
          }
        }
        return 0;
      });
    };

    res.status(200).json({
      success: true,
      data: {
        stats: {
          revenue: totalRevenue[0]?.total || 0,
          orders: totalOrders || 0,
          customers: newCustomers || 0,
          products: activeProducts || 0,
          activeEvents: activeEvents || 0,
          revenueChange: revenueChange.toFixed(1),
          ordersChange: ordersChange.toFixed(1),
          customersChange: customersChange.toFixed(1),
          productsChange: productsChange.toFixed(1),
        },
        trends: {
          labels,
          revenue: processTrendData(revenueTrend, 'revenue'),
          orders: processTrendData(ordersTrend, 'orders'),
          customers: processTrendData(customersTrend, 'customers'),
          products: processTrendData(productsTrend, 'products'),
        },
        salesByCategory: salesByCategory.map((item) => ({
          category: item._id,
          sales: item.totalSales,
          count: item.count,
        })),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Get real-time updates (recent orders, customers, low stock products)
exports.getRealTimeUpdates = catchAsyncErrors(async (req, res) => {
  try {
    const now = new Date();
    const lastHour = new Date(now.getTime() - 60 * 60 * 1000);

    // Get recent orders
    const recentOrders = await Order.find({
      createdAt: { $gte: lastHour },
    })
      .sort({ createdAt: -1 })
      .limit(5);

    // Get recent customers
    const recentCustomers = await User.find({
      createdAt: { $gte: lastHour },
      role: 'user',
    })
      .sort({ createdAt: -1 })
      .limit(5);

    // Get low stock products
    const lowStockProducts = await Product.find({
      stock: { $lt: 10 },
    }).limit(5);

    res.status(200).json({
      success: true,
      data: {
        recentOrders,
        recentCustomers,
        lowStockProducts,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
