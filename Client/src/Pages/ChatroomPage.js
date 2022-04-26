import React from "react";
import { useParams } from "react-router-dom";

const ChatroomPage = (props) => {
  console.log("props", props);
  let socket = props.socket;
  let params = useParams();
  const chatroomId = params.id;
  console.log("params", params);

  const [messages, setMessages] = React.useState([]);
  const messageRef = React.useRef();

  const sendMessage = () => {
    if (socket) {
      socket.emit("chatroomMessage", {
        chatroomId: chatroomId,
        message: messageRef.current.value,
      });
    }
  };

  React.useEffect(() => {
    if (socket) {
      socket.emit("joinRoom", {
        chatroomId,
      });

      socket.on("newMessage", ({ message, userId, name }) => {
        setMessages(...messages, message);
      });
    }

    return () => {
      if (socket) {
        socket.emit("leaveRoom", {
          chatroomId,
        });
      }
    };
  }, []);

  return (
    <div className="chatroomPage">
      <div className="chatroomSection">
        <div className="cardHeader">Chatroom Name</div>

        <div className="chatroomContent">
          {messages.map((message) => (
            <div key={chatroomId} className="message">
              <span className="otherMessage">{message.name}:</span>{" "}
              {message.message}
            </div>
          ))}
        </div>
        <div className="chatroomActions">
          <div>
            <input
              type="text"
              name="message"
              placeholder="Say something!"
              ref={messageRef}
            />
          </div>
          <div>
            <button className="join" onClick={sendMessage}>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatroomPage;
