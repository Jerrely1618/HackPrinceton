"use client";

import React, { useState, useEffect, useRef } from "react";
import { Chatmessage } from "./chatmessage";

export default function Chat() {
  const [messages, setMessages] = useState([
    {
      message: "Hello, how are you doing?",
      timestamp: "08:15 AM",
      sender: "user",
    },
    {
      message: "I'm doing well, thank you! How can I help you today?",
      timestamp: "08:16 AM",
      sender: "bot",
    },
  ]);

  const chatBoxRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (newMessage: string) => {
    const newMessages = [
      ...messages,
      {
        message: newMessage,
        timestamp: new Date().toLocaleTimeString(),
        sender: "user",
      },
    ];
    setMessages(newMessages);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && event.currentTarget.value) {
      handleSend(event.currentTarget.value);
      event.currentTarget.value = "";
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      console.log(file);
    }
  };

  return (
    <div className="">
      <div
        style={{
          background:
            "conic-gradient(from 202deg at 81.78% 23.22%, #4629F2 0deg, #13C6FF 125.62500357627869deg, #B94DFB 215.62499284744263deg, #FF53EE 294.3749928474426deg, #F3B960 360deg), #D9D9D9",
        }}
        className="rounded-3xl"
      >
        <div className="p-[30px] bg-opacity-0  backdrop-blur-[30px] flex-col justify-start items-start gap-5 inline-flex ">
          <div className="flex-col justify-start items-start gap-[5px] flex">
            <div className="text-white text-3xl font-bold font-['Source Sans Pro']">
              Charlie
            </div>
            <div className="w-[370px] text-white text-base font-normal font-['Source Sans Pro'] leading-7">
              Need financial advise? Ask Charlie for help!
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          width: "100%",
          padding: "30px",
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(4px)",
          boxShadow:
            "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
          borderRadius: "0.375rem",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          gap: "35px",
          display: "flex",
          overflowY: "auto",
        }}
        ref={chatBoxRef}
      >
        <div
          style={{
            alignSelf: "stretch",
            height: "350px",
            flexDirection: "column",
            justifyContent: "flex-start",
            gap: "5px",
            display: "flex",
          }}
        >
          {messages.map((msg, index) => (
            <Chatmessage
              key={index}
              message={msg.message}
              timestamp={msg.timestamp}
              sender={msg.sender}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col w-full">
        <div className="h-[84px] px-[30px] py-5 bg-white rounded-bl-lg rounded-br-lg justify-between items-center inline-flex">
          <div className="justify-start items-center gap-5 flex">
            <div className="w-6 h-6 relative" />
            <input
              type="text"
              placeholder="Type your message here..."
              onKeyPress={handleKeyPress}
              style={{
                width: "100%",
                padding: "10px 15px",
                fontSize: "16px",
                border: "1px solid #eaeaea",
                borderRadius: "8px",
                color: "black",
                backgroundColor: "#fff",
                outline: "none",
                transition: "border-color 0.2s",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              }}
              className="placeholder-gray-400"
            />
          </div>
          <div className="justify-start items-center gap-[15px] flex">
            <button onClick={handleSend}>
              <div className="w-10 h-10 bg-indigo-600 rounded-[100px] justify-center items-center gap-2 flex">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M9 18L15 12L9 6"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
