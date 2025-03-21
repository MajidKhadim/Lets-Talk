// import { useState, useEffect, useRef } from "react";

// export default function ChatWindow({ chat, messages: initialMessages }) {
//   const [messages, setMessages] = useState(initialMessages);
//   const [messageInput, setMessageInput] = useState("");
//   const [showMenu, setShowMenu] = useState(false);
//   const [file, setFile] = useState(null);

//   const menuRef = useRef(null);
//   const buttonRef = useRef(null); // Reference for the button
//   const inputRef = useRef(null);

//   useEffect(() => {
//     setMessages(initialMessages);
//   }, [chat, initialMessages]);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         menuRef.current &&
//         !menuRef.current.contains(event.target) &&
//         !buttonRef.current.contains(event.target) // Ensure button clicks don't close the menu
//       ) {
//         setShowMenu(false);
//       }
//     };

//     document.addEventListener("click", handleClickOutside);
//     return () => {
//       document.removeEventListener("click", handleClickOutside);
//     };
//   }, []);

//   const handleMenuToggle = (e) => {
//     e.stopPropagation(); // Prevent event bubbling to the document
//     setShowMenu((prevState) => !prevState);
//   };

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleSendMessage = () => {
//     if (messageInput.trim() === "" && !file) return;

//     const newMessage = {
//       id: messages.length + 1,
//       text: messageInput,
//       sender: "You",
//       time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
//       file: file,
//     };

//     setMessages([...messages, newMessage]);
//     setMessageInput("");
//     setFile(null);
//   };

//   return (
//     <div className="flex flex-col h-full">
//       <div className="p-4 bg-gray-200 dark:bg-gray-700 border-b dark:border-gray-600 flex items-center">
//         <img src="/user.png" alt={chat.name} className="w-8 h-8 rounded-full" />
//         <p className="text-lg font-bold text-gray-900 dark:text-white ml-4">{chat.name}</p>
//       </div>

//       <div className="flex-1 p-4 bg-white dark:bg-gray-800 overflow-y-auto space-y-4">
//         {messages.map((message) => (
//           <div
//             key={message.id}
//             className={`flex ${message.sender === "You" ? "justify-end" : "justify-start"}`}
//           >
//             <div
//               className={`max-w-sm px-4 py-2 rounded-lg shadow ${
//                 message.sender === "You"
//                   ? "bg-blue-500 text-white"
//                   : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
//               }`}
//             >
//               <p className="text-sm">{message.text}</p>
//               {message.file && (
//                 <div className="mt-2">
//                   <p className="text-xs text-gray-500">{message.file.name}</p>
//                   <a
//                     href={URL.createObjectURL(message.file)}
//                     download
//                     className="text-blue-500 text-xs"
//                   >
//                     Download
//                   </a>
//                 </div>
//               )}
//               <p className="text-xs mt-1 text-gray-500">{message.time}</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="p-4 border-t dark:border-gray-700 bg-gray-100 dark:bg-gray-800 flex items-center relative">
//         <button
//           type="button"
//           ref={buttonRef}
//           onClick={handleMenuToggle}
//           className="p-2 rounded-full bg-gray-300 text-gray-700 dark:bg-gray-600 dark:text-white"
//         >
//           <img src="/add.png" alt="Add" className="w-4 h-4" />
//         </button>

//         {showMenu && (
//           <div
//             ref={menuRef}
//             className="absolute bg-white dark:bg-gray-800 border rounded-lg shadow-lg -mt-4 p-2 flex flex-col"
//           >
//             <label
//               htmlFor="document"
//               className="p-2 text-gray-700 dark:text-white cursor-pointer"
//             >
//               📄 Document
//             </label>
//             <label
//               htmlFor="image"
//               className="p-2 text-gray-700 dark:text-white cursor-pointer"
//             >
//               🖼️ Picture
//             </label>
//             <label
//               htmlFor="video"
//               className="p-2 text-gray-700 dark:text-white cursor-pointer"
//             >
//               🎥 Video
//             </label>
//           </div>
//         )}

//         {/* Hidden file inputs */}
//         <input
//           id="document"
//           type="file"
//           accept=".pdf, .doc, .docx"
//           className="hidden"
//           onChange={handleFileChange}
//         />
//         <input
//           id="image"
//           type="file"
//           accept="image/*"
//           className="hidden"
//           onChange={handleFileChange}
//         />
//         <input
//           id="video"
//           type="file"
//           accept="video/*"
//           className="hidden"
//           onChange={handleFileChange}
//         />

//         {/* Display the selected file name */}
//         {file && (
//           <div className="text-xs text-gray-500 mt-2">
//             <p>Selected file: {file.name}</p>
//           </div>
//         )}

//         {/* Message Input */}
//         <input
//           ref={inputRef}
//           type="text"
//           placeholder="Type a message..."
//           value={messageInput}
//           onChange={(e) => setMessageInput(e.target.value)}
//           className="p-2 w-full rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-white ml-2"
//         />

//         <button
//           type="button"
//           onClick={handleSendMessage}
//           className="ml-2 p-2 rounded-full bg-blue-500 text-white"
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 24 24"
//             fill="currentColor"
//             className="w-6 h-6"
//           >
//             <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
//           </svg>
//         </button>
//       </div>
//     </div>
//   );
// }


// this is correct 

'use client'
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import signalRService from "../../../utilities/SignalRService"; // Import SignalR service

export default function ChatWindow({ chat }) {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const messagesEndRef = useRef(null);
  let userId;

  // Function to handle incoming messages
  const handleIncomingMessage = (newMessage) => {
    console.log("Received message:", newMessage); // Debugging
    console.log("------------------------------------------------------------")
    if(newMessage.sender == userId){
      return;
    }
    // Update the state with the incoming message
    setMessages((prevMessages) => {
      // Check if the message is already in the array or if it's from the current user
      const isDuplicate = prevMessages.some((msg) => msg.id === newMessage.id);
      if (isDuplicate) {
        return prevMessages; // Do nothing if it's a duplicate
      }
      return [...prevMessages, newMessage]; // Add the new message to the state
    });
  };

  useEffect(() => {
    if (!chat.id) return;

    // Fetch previous messages from the API
    const fetchMessages = async () => {
      userId = localStorage.getItem("userid");
      console.log(userId);
      const token = localStorage.getItem("messengerAuth");
      if (!token) {
        console.error("No auth token found.");
        return;
      }

      try {
        const response = await axios.get(
          `https://localhost:7216/api/chat/${chat.id}/messages`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response.data);
        signalRService.joinChat(chat.id);
        // Set previous messages from the API response
        setMessages(response.data.messages);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();

    // SignalR Setup
    signalRService.start(); // Start the SignalR connection

    // Join the chat room using the chat ID
    signalRService.joinChat(chat.id);

    // Ensure only one event listener is added
    const handleMessageReceived = handleIncomingMessage; 

    // Listen for incoming messages
    console.log("-------------messege recieved =--------------------");
    signalRService.onMessageReceived(handleMessageReceived);

    // Cleanup function to leave chat and stop listening to messages
    return () => {
      signalRService.offMessageReceived(handleIncomingMessage); // Stop listening for messages
      signalRService.leaveChat(chat.id); // Leave the chat room
    };
  }, [chat.id]);

  // Scroll to the bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    console.log("---------------- Messege Scroll---------------------");
  }, [messages]);

  const handleSendMessage = async (event) => {
    event.preventDefault();

    if (!messageInput.trim()) return;

    const token = localStorage.getItem("messengerAuth");
    if (!token) {
      console.error("No auth token found.");
      return;
    }

    try {
      // Send message via API (for persistence in DB)
      const formData = new FormData();
      formData.append("ChatId", chat.id);
      formData.append("Content", messageInput);
      formData.append("MessageType", "Text");

      const response = await axios.post(
        "https://localhost:7216/api/Chat/send",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Avoid adding the sent message again on the sender's side
      if (response.data.sender === "you") {
        console.log("New Messages: ", response.data);
        setMessages((prevMessages) => [...prevMessages, response.data]);
      }

      setMessageInput(""); // Clear the message input
    } catch (error) {
      console.error("Error sending message:", error.response);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="p-4 bg-gray-200 dark:bg-gray-700 border-b dark:border-gray-600 flex items-center">
        <img src={chat.image? chat.image:"/user.png"} alt="Chat User" className="w-8 h-8 rounded-full" />
        <p className="text-lg font-bold text-gray-900 dark:text-white ml-4">
          {chat.name}
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 bg-white dark:bg-gray-800 overflow-y-auto space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.sender === "you" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-sm px-4 py-2 rounded-lg shadow ${
                message.sender === "you"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
              }`}
            >
              <p className="text-base">{message.content}</p>
              <p className="text-xs mt-1 text-gray-500">
              {new Date(message.sentAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 border-t dark:border-gray-700 bg-gray-100 dark:bg-gray-800 flex items-center">
        <input
          type="text"
          placeholder="Type a message..."
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          className="p-2 w-full rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-white ml-2"
        />
        {/* <button
          type="button"
          onClick={handleSendMessage}
          className="ml-2 p-2 rounded-full bg-blue-500 text-white"
        >
          Send
        </button> */}
        <button
          type="button"
          onClick={handleSendMessage}
          className="ml-2 p-2 rounded-full bg-blue-500 text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        </button>
      </div>
    </div>
  );
}







// 'use client'
// import { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import signalRService from "../../../utilities/SignalRService"; // Import SignalR service

// export default function ChatWindow({ chat }) {
//   const [messages, setMessages] = useState([]);
//   const [messageInput, setMessageInput] = useState("");
//   const messagesEndRef = useRef(null);
//   const userId = localStorage.getItem("userid");

//   const handleIncomingMessage = (newMessage) => {
//     if (newMessage.sender === userId) {
//       return; // Ignore messages sent by the current user
//     }

//     setMessages((prevMessages) => {
//       const isDuplicate = prevMessages.some((msg) => msg.id === newMessage.id);
//       if (isDuplicate) return prevMessages;
//       return [...prevMessages, newMessage];
//     });
//   };

//   // Start SignalR connection once when the component mounts
//   useEffect(() => {
//     signalRService.start();
//     return () => {
//       signalRService.stop();
//     };
//   }, []);

//   useEffect(() => {
//     if (!chat.id) return;

//     const fetchMessages = async () => {
//       const token = localStorage.getItem("messengerAuth");
//       if (!token) {
//         console.error("No auth token found.");
//         return;
//       }

//       try {
//         const response = await axios.get(
//           `https://localhost:7216/api/chat/${chat.id}/messages`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "application/json",
//             },
//           }
//         );
//         setMessages(response.data.messages);
//       } catch (error) {
//         console.error("Error fetching messages:", error);
//       }
//     };

//     const joinChatRoom = async () => {
//       try {
//         await signalRService.start(); // Ensure SignalR is connected
//         await signalRService.joinChat(chat.id);
//       } catch (error) {
//         console.error("Error joining chat:", error);
//       }
//     };

//     fetchMessages();
//     joinChatRoom();
//     signalRService.onMessageReceived(handleIncomingMessage);

//     return () => {
//       signalRService.offMessageReceived(handleIncomingMessage);
//       signalRService.leaveChat(chat.id);
//     };
//   }, [chat.id]);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const handleSendMessage = async (event) => {
//     event.preventDefault();
//     if (!messageInput.trim()) return;

//     try {
//       const formData = new FormData();
//       formData.append("ChatId", chat.id);
//       formData.append("Content", messageInput);
//       formData.append("MessageType", "Text");
//       const token = localStorage.getItem("messengerAuth");
//       const response = await axios.post(
//         "https://localhost:7216/api/Chat/send",
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       // Avoid adding the sent message again on the sender's side
//       if (response.data.sender === "you") {
//         console.log("New Messages: ", response.data);
//         setMessages((prevMessages) => [...prevMessages, response.data]);
//       }
//       setMessageInput("");
//     } catch (error) {
//       console.error("Error sending message:", error);
//     }
//   };

//   return (
//     <div className="flex flex-col h-full">
//       {/* Chat Header */}
//       <div className="p-4 bg-gray-200 dark:bg-gray-700 border-b dark:border-gray-600 flex items-center">
//         <img src="/travel.png" alt="Chat User" className="w-8 h-8 rounded-full" />
//         <p className="text-lg font-bold text-gray-900 dark:text-white ml-4">{chat.name}</p>
//       </div>

//       {/* Messages */}
//       <div className="flex-1 p-4 bg-white dark:bg-gray-800 overflow-y-auto space-y-4">
//         {messages.map((message, index) => (
//           <div
//             key={index}
//             className={`flex ${message.sender === "you" ? "justify-end" : "justify-start"}`}
//           >
//             <div
//               className={`max-w-sm px-4 py-2 rounded-lg shadow ${
//                 message.sender === "you"
//                   ? "bg-blue-500 text-white"
//                   : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
//               }`}
//             >
//               <p className="text-base">{message.content}</p>
//               <p className="text-xs mt-1 text-gray-500">
//                 {new Date(message.sentAt).toLocaleTimeString()}
//               </p>
//             </div>
//           </div>
//         ))}
//         <div ref={messagesEndRef} />
//       </div>

//       {/* Message Input */}
//       <div className="p-4 border-t dark:border-gray-700 bg-gray-100 dark:bg-gray-800 flex items-center">
//         <input
//           type="text"
//           placeholder="Type a message..."
//           value={messageInput}
//           onChange={(e) => setMessageInput(e.target.value)}
//           className="p-2 w-full rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-white ml-2"
//         />
//         <button
//           type="button"
//           onClick={handleSendMessage}
//           className="ml-2 p-2 rounded-full bg-blue-500 text-white"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// }











