const { default: mongoose } = require("mongoose");

const messageSchema = new mongoose.Schema({
  chatroom: {
    type: mongoose.Schema.Types.ObjectId,
    required: "Chatroom is required!",
    ref: "Chatroom"
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: "",
    ref: "User"
  },
  message: {
      type: String,
      required: 'Msg is required'
  }
});

module.exports = mongoose.model("Message", chatroomSchema);
