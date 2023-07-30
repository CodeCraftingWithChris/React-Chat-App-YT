import React, { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import ChatMessage from "../components/ChatMessage";
import FlipMove from "react-flip-move";

function HomePage() {
  const [input, setInput] = useState("");
  const [chats, setChats] = useState([]);
  const [user] = useAuthState(auth);
  const lastMessageDiv = useRef(null);

  const sendMessage = (e) => {
    e.preventDefault();

    addDoc(collection(db, `chats`), {
      message: input,
      sender: user?.displayName,
      time: serverTimestamp(),
    })
      .then(() => setInput(""))
      .catch((err) => alert(err.message));

    scrollToBottom();
  };

  useEffect(() => {
    onSnapshot(
      query(collection(db, `chats`), orderBy("time", "asc")),
      (snapshot) => {
        setChats(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            message: doc.data().message,
            time: doc.data().time,
            sender: doc.data().sender,
          }))
        );
      }
    );
  }, [user]);

  const scrollToBottom = () => {
    lastMessageDiv.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  return (
    <div className="flex-col max-w-3xl mx-auto">
      <Header />

      {/* App Body */}
      <div className="max-w-3xl mx-auto">
        <div className="max-w-lg mx-auto flex-1">
          <FlipMove>
            {chats?.map((chat) => (
              <ChatMessage
                key={chat.id}
                message={chat.message}
                time={chat?.time?.toDate()?.getTime()}
                sender={chat.sender}
              />
            ))}
          </FlipMove>
          <div ref={lastMessageDiv} className="mb-5" />
        </div>
        <form className="flex items-center justify-between space-x-1 w-96 mx-auto sticky bottom-2 z-10">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Enter a message"
            className="flex-1 outline-none bg-gray-200 p-3 rounded-lg"
          />
          <button
            onClick={sendMessage}
            className="bg-green-400 text-sm font-bold text-white p-3 rounded-lg hover:scale-95 transition-all duration-200 ease-in-out"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default HomePage;
