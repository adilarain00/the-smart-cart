// Controller for conversation creation, retrieval, and updates
const Conversation = require('../models/Conversation');
const errorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');

// Create a new conversation or return existing one
exports.newConversation = catchAsyncErrors(async (req, res, next) => {
  try {
    const { groupTitle, userId, sellerId } = req.body;

    const isConversationExist = await Conversation.findOne({ groupTitle });
    if (isConversationExist) {
      const conversation = isConversationExist;
      res.status(201).json({
        success: true,
        conversation,
      });
    } else {
      const conversation = await Conversation.create({
        members: [userId, sellerId],
        groupTitle: groupTitle,
      });
      res.status(201).json({
        success: true,
        conversation,
      });
    }
  } catch (error) {
    return next(new errorHandler(error), 500);
  }
});

// Get all conversations for a seller
exports.getSellerConversations = catchAsyncErrors(async (req, res, next) => {
  try {
    const conversations = await Conversation.find({
      members: {
        $in: [req.params.id],
      },
    }).sort({ updatedAt: -1, createdAt: -1 });

    res.status(201).json({
      success: true,
      conversations,
    });
  } catch (error) {
    return next(new errorHandler(error), 500);
  }
});

// Get all conversations for a user
exports.getUserConversations = catchAsyncErrors(async (req, res, next) => {
  try {
    const conversations = await Conversation.find({
      members: {
        $in: [req.params.id],
      },
    }).sort({ updatedAt: -1, createdAt: -1 });

    res.status(201).json({
      success: true,
      conversations,
    });
  } catch (error) {
    return next(new errorHandler(error), 500);
  }
});

// Update last message in a conversation
exports.updateLastMessage = catchAsyncErrors(async (req, res, next) => {
  try {
    const { lastMessage, lastMessageId } = req.body;
    const conversation = await Conversation.findByIdAndUpdate(req.params.id, {
      lastMessage,
      lastMessageId,
    });

    res.status(201).json({
      success: true,
      conversation,
    });
  } catch (error) {
    return next(new errorHandler(error), 500);
  }
});
