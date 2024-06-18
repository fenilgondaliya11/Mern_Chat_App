import Message from "../models/messageModel.js";

const createMessage = async (req, res) => {
  const { chatId, senderId, text } = req.body;

  const message = new Message({
    chatId,
    senderId,
    text,
  });

  try {
    const data = await message.save();
    var response = {
      status: true,
      message: "success",
      data
    }
    res.send(response)
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const getMessages = async (req, res) => {
  const { chatId } = req.params;

  try {
    const data = await Message.find({ chatId });
    var response = {
      status: true,
      message: "success",
      data
    }
    res.send(response)
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export { createMessage, getMessages };
