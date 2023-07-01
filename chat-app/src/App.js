import { useRef, useState } from "react";
import "./components/style.css";
import Auth from "./components/Auth";

import Cookies from "universal-cookie";
import Chat from "./components/Chat";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";
const cookies = new Cookies();

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState(null);

  const roomInputRef = useRef(null);

  const signUserOut = async () => {
    await signOut(auth);
    cookies.remove("auth-token");
    setIsAuth(false);
    setRoom(null);
  };

  if (!isAuth) {
    return (
      <div>
        <Auth setIsAuth={setIsAuth} />
      </div>
    );
  }
  return (
    <div className="">
      {room ? (
        <Chat room={room} />
      ) : (
        <div className="room-container">
          <label>Enter Room Name:</label>
          <input ref={roomInputRef} />
          <button
            className="sign-in-btn"
            onClick={() => setRoom(roomInputRef.current.value)}
          >
            Enter Chat
          </button>
        </div>
      )}
      <div className="sign-out-btn-div">
        <button className="sign-out-btn" onClick={signUserOut}>
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default App;
