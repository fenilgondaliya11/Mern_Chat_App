import Chat from "../models/chatModel.js";

const createChat = async (req, res) => {
  const { firstId, secondId } = req.body;

  try {
    const chat = await Chat.findOne({
      members: { $all: [firstId, secondId] },
    });

    if (chat) return res.status(200).json(chat);

    const newChat = new Chat({
      members: [firstId, secondId],
    });

    const response = await newChat.save();
    var data = {
      status: true,
      message: "success",
      response
    }
    res.send(data)
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const findUserChats = async (req, res) => {
  const userId = req.params.userId;

  try {
    const data = await Chat.find({
      members: { $in: [userId] },
    });
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

const findChat = async (req, res) => {
  // const firstId = req.params.firstId;
  const { firstId, secondId } = req.params;

  try {
    const data = await Chat.findOne({
      members: { $all: [firstId, secondId] },
    });
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

export { createChat, findUserChats, findChat };
