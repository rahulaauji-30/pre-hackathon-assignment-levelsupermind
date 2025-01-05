import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import KeyIcon from '@mui/icons-material/Key';
import NorthIcon from '@mui/icons-material/North';
import gemini from "../assests/images/gemini-icon.svg";
import "./Chat.css";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState("");
  const chatEndRef = useRef(null); // Reference to scroll to the bottom

  // Send message function
  const sendMessage = async (message) => {
    if (message.trim() !== "") {
      const newMessages = [
        ...messages,
        { type: "user", content: message },
        { type: "bot", content: "Loading..." },
      ];

      setMessages(newMessages);
      setUserMessage("");

      // Send API request to get bot's response
      try {
        const response = await fetch("http://127.0.0.1:5000/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message }),
        });

        const data = await response.json();
        const botReply = data.reply;

        // Update bot message with API response
        const updatedMessages = [...newMessages];
        updatedMessages[updatedMessages.length - 1] = {
          type: "bot",
          content: botReply, // Assuming botReply is in Markdown format
        };
        setMessages(updatedMessages);
      } catch (error) {
        console.error("Error fetching API response:", error);
        const updatedMessages = [...newMessages];
        updatedMessages[updatedMessages.length - 1] = {
          type: "bot",
          content: "Oops! Something went wrong. Please try again later.",
        };
        setMessages(updatedMessages);
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage(userMessage);
    }
  };

  const handlePromptClick = (message) => {
    sendMessage(message); // Send the message when a prompt is clicked
  };

  // Scroll to the bottom when a new message is added
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]); // This will trigger whenever messages change

  return (
    <main>
      {messages.length === 0 ? (
        <>
          <div className="greeting-container">
            <div className="greeting">
              <h1>Hey there,</h1>
              <p>What can I help you with today?</p>
            </div>
          </div>
          <div className="default-prompts">
            <div
              className="prompt"
              onClick={() => handlePromptClick("Discover the latest trends and insights.")}
            >
              <AutoGraphIcon />
              <h4 className="prompt-title">
                Discover the latest trends and insights.
              </h4>
            </div>
            <div
              className="prompt"
              onClick={() => handlePromptClick("Get expert analysis tailored to you.")}
            >
              <TipsAndUpdatesIcon />
              <h4 className="prompt-title">
                Get expert analysis tailored to you.
              </h4>
            </div>
            <div
              className="prompt"
              onClick={() => handlePromptClick("Unlock data-driven decisions today.")}
            >
              <KeyIcon />
              <h4 className="prompt-title">
                Unlock data-driven decisions today.
              </h4>
            </div>
          </div>
        </>
      ) : (
        <div className="chat-box">
          <ul id="chat-history" className="chat-history">
            {messages.map((msg, index) => (
              <li
                key={index}
                className={`chat-message ${
                  msg.type === "user" ? "user-message" : "bot-message"
                }`}
              >
                {msg.type === "bot" && (
                  <img
                    src={gemini}
                    alt="AI"
                    style={{
                      width: "30px",
                      height: "30px",
                      padding: "2px",
                      borderRadius: "50%",
                      marginRight: "10px",
                      border: "1px solid white",
                    }}
                  />
                )}
                {msg.type === "bot" ? (
                  <ReactMarkdown className="message-reply">
                    {msg.content}
                  </ReactMarkdown>
                ) : (
                  <span>{msg.content}</span>
                )}
              </li>
            ))}
          </ul>
          <div ref={chatEndRef} />{" "}
          {/* This element ensures scrolling to the bottom */}
        </div>
      )}
      <div className="chat-container">
        <input
          type="text"
          id="user-message"
          autoFocus
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message here..."
        />
        <div className="button">
          <NorthIcon
            id="sendMessage"
            fontSize="small"
            onClick={() => sendMessage(userMessage)}
          />
        </div>
      </div>
    </main>
  );
};

export default Chat;
