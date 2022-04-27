import React from "react";
import { useParams } from "react-router-dom";

const ChatroomPage = (props) => {
  let socket = props.socket;
  let params = useParams();
  const chatroomId = params.id;

  const [messages, setMessages] = React.useState([]);
  const [userId, setUserId] = React.useState("");
  const messageRef = React.useRef();

  console.log(userId);

  const sendMessage = () => {
    if (socket) {
      if (messageRef.current.value) {
        socket.emit("chatroomMessage", {
          chatroomId: chatroomId,
          message: messageRef.current.value,
        });

        messageRef.current.value = "";
      }
    }
  };

  React.useEffect(() => {
    const token = localStorage.getItem("CC_Token");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUserId(payload.id);
    }
    if (socket) {
      socket.on("newMessage", (message) => {
        console.log("Lawngs nghe swj kien");
        const newMessages = [...messages, message];
        setMessages(newMessages);
      });
    }
    //eslint-disable-next-line
  }, [messages]);

  React.useEffect(() => {
    if (socket) {
      socket.emit("joinRoom", {
        chatroomId,
      });
    }

    return () => {
      //Component Unmount
      if (socket) {
        socket.emit("leaveRoom", {
          chatroomId,
        });
      }
    };
    //eslint-disable-next-line
  }, []);

  return (
    <div className="chatroomPage">
      <div className="chatroomSection">
        <div className="cardHeader">Chatroom Name</div>

        <div className="chatroomContent">
          {messages.map((message, i) => (
            <div key={i} className="message">
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
