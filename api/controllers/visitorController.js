const Visitor = require('../models/Visitor');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');

// Controller for adding visitors and retrieving visitor count
// Add a new visitor (unique per IP per day)
exports.addVisitor = catchAsyncErrors(async (req, res) => {
  try {
    const ip =
      req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.ip;
    const userAgent = req.headers['user-agent'] || 'unknown';
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const existing = await Visitor.findOne({
      ip,
      createdAt: { $gte: today },
    });
    if (!existing) {
      await Visitor.create({ ip, userAgent });
    }
    res.status(201).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get total unique visitor count for today
exports.getVisitorCount = catchAsyncErrors(async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const count = await Visitor.countDocuments({ createdAt: { $gte: today } });
    res.status(200).json({ success: true, count });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
