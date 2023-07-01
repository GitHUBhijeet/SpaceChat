import React, { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { auth, db } from "../firebase-config";

const Chat = (props) => {
  const { room } = props;
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const messagesRef = collection(db, "messages");

  useEffect(() => {
    const queryMessages = query(
      messagesRef,
      where("room", "==", room),
      orderBy("createdAt")
    );
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage === "") return;

    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      room,
    });
    setNewMessage("");
  };

  return (
    // <div className="container-2">
    //   <div>
    //     <h1>Welcome to: {room.toUpperCase()}</h1>
    //   </div>
    //   <div className="messages-container">
    //     <div className="messages">
    //       {messages.map((message) => (
    //         <div className="single-message">
    //           <div className="message" key={message.id}>
    //             <span className="user">{message.user}:</span>
    //             {message.text}
    //           </div>
    //         </div>
    //       ))}
    //     </div>
    //   </div>
    //   <form onSubmit={handleSubmit} className="new-message-form">
    //     <input
    //       className="new-message-input"
    //       placeholder="Type message..."
    //       onChange={(e) => setNewMessage(e.target.value)}
    //       value={newMessage}
    //     />
    //     <button className="send-btn" type="submit">
    //       Send
    //     </button>
    //   </form>
    // </div>
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div>
        <h1>Welcome to: {room.toUpperCase()}</h1>
      </div>
      <div className="messages-container" style={{ maxWidth: "300px" }}>
        <div className="">
          {messages.map((message) => (
            <div className="" key={message.id}>
              <div className="message">
                <span className="user">{message.user}:</span>
                {message.text}
              </div>
            </div>
          ))}
        </div>
      </div>
      <form onSubmit={handleSubmit} className="">
        <input
          className=""
          placeholder="Type message..."
          onChange={(e) => setNewMessage(e.target.value)}
          value={newMessage}
        />
        <button className="send-btn" type="submit">
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
