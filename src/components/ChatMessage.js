import moment from "moment/moment";
import React, { forwardRef } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

const ChatMessage = forwardRef(({ message, sender, time }, ref) => {
  const [user] = useAuthState(auth);
  return (
    <div
      ref={ref}
      className={
        sender === user?.displayName
          ? "bg-blue-400 w-fit p-2 rounded-md rounded-tr-none mt-3 text-white ml-auto"
          : "bg-gray-400 w-fit p-2 rounded-md rounded-tl-none mt-3 text-white"
      }
    >
      <p>{message}</p>
      <p className="text-xs text-right">{moment(time).format("LT")}</p>
    </div>
  );
});

export default ChatMessage;
