// 'use client';
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import { FaFacebookMessenger } from "react-icons/fa";

// export default function Sidebar({ chats, onChatSelect, onProfileClick }) {
//   const [searchQuery, setSearchQuery] = useState("");
//   const router = useRouter();
//   const [user , setUser] = useState({});
//   const [loading,setLoading] = useState(true);

//   // Filter chats based on the search query
//   const filteredChats = chats.filter((chat) =>
//     chat.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   useEffect(()=>{
//     const fetchProfile = async () => {
//       const token = localStorage.getItem("messengerAuth");
//       if (!token) {
//         console.error("No auth token found.");
//         return;
//       }

//       try {
//         const response = await fetch("https://localhost:7216/api/User", {
//           method: "GET",
//           headers: {
//             "Authorization": `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         });

//         if (!response.ok) {
//           throw new Error(`Failed to fetch profile: ${response.status}`);
//         }
//         console.log(response);
//         const data = await response.json();
//         setUser(data.data); // Set chats from API response
//         console.log(data.data);
//       } catch (error) {
//         console.error("Error fetching chats:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProfile();
//   },[])

//   return (
//     <div className="w-4/12 h-full flex flex-col bg-gray-900 text-white shadow-lg">
//       {/* Messenger Logo */}
//       <div className="p-4 flex items-center space-x-2 border-b border-gray-700 justify-center">
//       <FaFacebookMessenger size={25}/>
//         <h1 className="text-2xl font-bold">My Messenger</h1>
//       </div>

//       {/* Search Bar */}
//       <div className="p-4">
//         <div className="relative">
//           <input
//             type="text"
//             placeholder="Search chats..."
//             className="w-full p-2 pl-10 bg-gray-700 rounded-lg text-sm text-white placeholder-gray-400"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)} // Update search query on input change
//           />
//           <span className="absolute left-3 top-2 text-gray-400">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               strokeWidth="2"
//               stroke="currentColor"
//               className="w-5 h-5"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z"
//               />
//             </svg>
//           </span>
//         </div>
//       </div>

//       {/* Chat List
//       <div className="flex-1 overflow-y-auto">
//         {filteredChats.length > 0 ? (
//           filteredChats.map((chat) => (
//             <div
//               key={chat.id}
//               onClick={() => onChatSelect(chat)}
//               className="p-3 hover:bg-gray-700 cursor-pointer flex items-center space-x-3"
//             >
//               <img
//                 src={chat.image}
//                 alt={chat.name}
//                 className="w-16 h-16 rounded-full"
//               />
//               <div>
//                 <p className="font-bold text-xl">{chat.name}</p>
//                 <p className="text-sm text-gray-400">{chat.lastMessage}</p>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="p-4 text-center text-gray-400">No chats found</p>
//         )}
//       </div> */}
//       {/* Chat List */}
// <div className="flex-1 overflow-y-auto">
//   {filteredChats.length > 0 ? (
//     filteredChats.map((chat) => (
//       <div
//         key={chat.id}
//         onClick={() => onChatSelect(chat)}
//         className="p-3 hover:bg-gray-700 cursor-pointer flex items-center space-x-3"
//       >
//         <img
//           src={chat.image}
//           alt={chat.name}
//           className="w-16 h-16 rounded-full"
//         />
//         <div>
//           <p className="font-bold text-xl">{chat.name}</p>
//           <div className="flex items-center">
//           {chat.isLastMessageSentByMe ? (
//               <span className="ml-2 text-blue-500">
//                 <i className="fa fa-check-double"></i> {/* Double tick for sent */}
//               </span>
//             ) : (
//               <span></span>
//             )}
//             <p className="text-sm text-gray-400">{chat.lastMessage}</p>
            
//           </div>
//         </div>
//       </div>
//     ))
//   ) : (
//     <p className="p-4 text-center text-gray-400">No chats found</p>
//   )}
// </div>


//       {/* Profile Section */}
//       <div className="p-4 border-t border-gray-700 flex items-center space-x-3">
//         <img
//           src={user.profilePicture? user.profilePicture:"/user.png"}
//           alt="Profile"
//           className="w-10 h-10 rounded-full cursor-pointer"
//           onClick={onProfileClick}
//         />
//         <div>
//           <p className="font-medium">{user.name}</p>
//           <p
//             className="text-sm text-gray-400 cursor-pointer"
//             onClick={onProfileClick}
//           >
//             View Profile
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }


// 'use client';
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import { FaFacebookMessenger } from "react-icons/fa";
// import SignalRService from "../../../utilities/SignalRService";

// export default function Sidebar({ chats, onChatSelect, onProfileClick }) {
//   const [searchQuery, setSearchQuery] = useState("");
//   const router = useRouter();
//   const [user, setUser] = useState({});
//   const [loading, setLoading] = useState(true);

//   // ✅ Start SignalR when the sidebar mounts
//   useEffect(() => {
//     if (typeof window === "undefined") return; // Prevent SSR issues

//     SignalRService.start();

//     // ✅ Listen for new messages globally
//     const handleMessageReceived = (message) => {
//       console.log("📩 New Message Received:", message);
//     };

//     // ✅ Attach listener
//     SignalRService.onMessageReceived(handleMessageReceived);

//     return () => {
//       // ✅ Cleanup when unmounting
//       SignalRService.offMessageReceived(handleMessageReceived);
//     };
//   }, []);

//   // ✅ Fetch user profile
//   useEffect(() => {
//     const fetchProfile = async () => {
//       const token = localStorage.getItem("messengerAuth");
//       if (!token) {
//         console.error("No auth token found.");
//         return;
//       }

//       try {
//         const response = await fetch("https://localhost:7216/api/User", {
//           method: "GET",
//           headers: {
//             "Authorization": `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         });

//         if (!response.ok) {
//           throw new Error(`Failed to fetch profile: ${response.status}`);
//         }

//         const data = await response.json();
//         setUser(data.data);
//       } catch (error) {
//         console.error("Error fetching user profile:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, []);

//   return (
//     <div className="w-4/12 h-full flex flex-col bg-gray-900 text-white shadow-lg">
//       {/* Messenger Logo */}
//       <div className="p-4 flex items-center space-x-2 border-b border-gray-700 justify-center">
//         <FaFacebookMessenger size={25} />
//         <h1 className="text-2xl font-bold">My Messenger</h1>
//       </div>

//       {/* Search Bar */}
//       <div className="p-4">
//         <div className="relative">
//           <input
//             type="text"
//             placeholder="Search chats..."
//             className="w-full p-2 pl-10 bg-gray-700 rounded-lg text-sm text-white placeholder-gray-400"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//           <span className="absolute left-3 top-2 text-gray-400">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               strokeWidth="2"
//               stroke="currentColor"
//               className="w-5 h-5"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z"
//               />
//             </svg>
//           </span>
//         </div>
//       </div>

//       {/* Chat List */}
//       <div className="flex-1 overflow-y-auto">
//         {chats.length > 0 ? (
//           chats.map((chat) => (
//             <div
//               key={chat.id}
//               onClick={() => onChatSelect(chat)}
//               className="p-3 hover:bg-gray-700 cursor-pointer flex items-center space-x-3"
//             >
//               <img
//                 src={chat.image}
//                 alt={chat.name}
//                 className="w-16 h-16 rounded-full"
//               />
//               <div>
//                 <p className="font-bold text-xl">{chat.name}</p>
//                 <div className="flex items-center">
//                   {chat.isLastMessageSentByMe && (
//                     <span className="ml-2 text-blue-500">
//                       <i className="fa fa-check-double"></i>
//                     </span>
//                   )}
//                   <p className="text-sm text-gray-400">{chat.lastMessage}</p>
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="p-4 text-center text-gray-400">No chats found</p>
//         )}
//       </div>

//       {/* Profile Section */}
//       <div className="p-4 border-t border-gray-700 flex items-center space-x-3">
//         <img
//           src={user.profilePicture || "/user.png"}
//           alt="Profile"
//           className="w-10 h-10 rounded-full cursor-pointer"
//           onClick={onProfileClick}
//         />
//         <div>
//           <p className="font-medium">{user.name}</p>
//           <p className="text-sm text-gray-400 cursor-pointer" onClick={onProfileClick}>
//             View Profile
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }


// 'use client';
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import { FaFacebookMessenger } from "react-icons/fa";
// import SignalRService from "../../../utilities/SignalRService";

// export default function Sidebar({ chats, onChatSelect, onProfileClick }) {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [unreadCounts, setUnreadCounts] = useState({});
//   const router = useRouter();
//   const [user, setUser] = useState({});
//   const [loading, setLoading] = useState(true);

//   // ✅ SignalR integration
//   useEffect(() => {
//     SignalRService.start(); // Ensure SignalR is started
  
//     const handleNotificationReceived = (notification) => {
//       const currentUserId = localStorage.getItem("userId");
    
//       if (notification.sender === currentUserId) {
//         console.log("❌ Ignoring self-notification", notification);
//         return;
//       }
    
//       console.log("🔔 Sidebar Notification Received:", notification);
    
//       // ✅ Update unread count
//       setUnreadCounts((prev) => ({
//         ...prev,
//         [notification.chatId]: (prev[notification.chatId] || 0) + 1,
//       }));
    
//       // ✅ Update last message in the chat list
//       setChats((prevChats) =>
//         prevChats.map((chat) =>
//           chat.id === notification.chatId
//             ? { ...chat, lastMessage: notification.messagePreview }
//             : chat
//         )
//       );
//     };
    
  
//     // ✅ Listen for notifications even when chat is NOT open
//     SignalRService.onNotificationReceived(handleNotificationReceived);
  
//     return () => {
//       SignalRService.offNotificationReceived(handleNotificationReceived);
//     };
//   }, []);
  
  
  
  

//   // ✅ Fetch user profile
//   useEffect(() => {
//     const fetchProfile = async () => {
//       const token = localStorage.getItem("messengerAuth");
//       if (!token) {
//         console.error("No auth token found.");
//         return;
//       }

//       try {
//         const response = await fetch("https://localhost:7216/api/User", {
//           method: "GET",
//           headers: {
//             "Authorization": `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         });

//         if (!response.ok) {
//           throw new Error(`Failed to fetch profile: ${response.status}`);
//         }

//         const data = await response.json();
//         setUser(data.data);
//       } catch (error) {
//         console.error("Error fetching user profile:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, []);

//   const handleChatSelect = (chat) => {
//     SignalRService.markChatAsRead(chat.id);
//     setUnreadCounts((prev) => {
//       const newCounts = { ...prev };
//       delete newCounts[chat.id]; // ✅ Remove unread notification
//       return newCounts;
//     });
//     onChatSelect(chat);
//   };

//   return (
//     <div className="w-4/12 h-full flex flex-col bg-gray-900 text-white shadow-lg">
//       {/* Messenger Logo */}
//       <div className="p-4 flex items-center space-x-2 border-b border-gray-700 justify-center">
//         <FaFacebookMessenger size={25} />
//         <h1 className="text-2xl font-bold">My Messenger</h1>
//       </div>

//       {/* Search Bar */}
//       <div className="p-4">
//         <div className="relative">
//           <input
//             type="text"
//             placeholder="Search chats..."
//             className="w-full p-2 pl-10 bg-gray-700 rounded-lg text-sm text-white placeholder-gray-400"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//           <span className="absolute left-3 top-2 text-gray-400">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               strokeWidth="2"
//               stroke="currentColor"
//               className="w-5 h-5"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 000 16z"
//               />
//             </svg>
//           </span>
//         </div>
//       </div>

//       {/* Chat List */}
//       <div className="flex-1 overflow-y-auto">
//         {chats.length > 0 ? (
//           chats.map((chat) => (
//             <div
//               key={chat.id}
//               onClick={() => handleChatSelect(chat)}
//               className="p-3 hover:bg-gray-700 cursor-pointer flex items-center space-x-3 relative"
//             >
//               <img
//                 src={chat.image}
//                 alt={chat.name}
//                 className="w-16 h-16 rounded-full"
//               />
//               <div>
//                 <p className="font-bold text-xl">{chat.name}</p>
//                 <div className="flex items-center">
//                   {chat.isLastMessageSentByMe && (
//                     <span className="ml-2 text-blue-500">
//                       <i className="fa fa-check-double"></i>
//                     </span>
//                   )}
//                   <p className="text-sm text-gray-400">{chat.lastMessage}</p>
//                 </div>
//               </div>

//               {/* ✅ New Message Notification Badge */}
//               {unreadCounts[chat.id] > 0 && (
//                 <span className="absolute right-2 top-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
//                   {unreadCounts[chat.id]}
//                 </span>
//               )}
//             </div>
//           ))
//         ) : (
//           <p className="p-4 text-center text-gray-400">No chats found</p>
//         )}
//       </div>

//       {/* Profile Section */}
//       <div className="p-4 border-t border-gray-700 flex items-center space-x-3">
//         <img
//           src={user.profilePicture || "/user.png"}
//           alt="Profile"
//           className="w-10 h-10 rounded-full cursor-pointer"
//           onClick={onProfileClick}
//         />
//         <div>
//           <p className="font-medium">{user.name}</p>
//           <p className="text-sm text-gray-400 cursor-pointer" onClick={onProfileClick}>
//             View Profile
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }


'use client';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaFacebookMessenger } from "react-icons/fa";
import SignalRService from "../../../utilities/SignalRService";

export default function Sidebar({ chats, onChatSelect, onProfileClick }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [unreadCounts, setUnreadCounts] = useState({});
  const [chatList, setChatList] = useState(chats); // ✅ Store chats in local state
  const router = useRouter();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  // ✅ Keep chatList in sync when `chats` prop changes
  useEffect(() => {
    setChatList(chats);
  }, [chats]);

  // ✅ SignalR integration
  useEffect(() => {
    SignalRService.start(); // Ensure SignalR is started
  
    const handleNotificationReceived = (notification) => {
      const currentUserId = localStorage.getItem("userId");
    
      if (notification.sender === currentUserId) {
        console.log("❌ Ignoring self-notification", notification);
        return;
      }
    
      console.log("🔔 Sidebar Notification Received:", notification);
    
      setUnreadCounts((prev) => ({
        ...prev,
        [notification.chatId]: (prev[notification.chatId] || 0) + 1,
      }));
    
      setChatList((prevChats) =>
        prevChats.map((chat) =>
          chat.id === notification.chatId
            ? {
                ...chat,
                lastMessage: notification.messagePreview,
                isLastMessageSentByMe: false, // ✅ Mark as received
              }
            : chat
        )
      );
    };
    

    // ✅ Listen for notifications even when chat is NOT open
    SignalRService.onNotificationReceived(handleNotificationReceived);
  
    return () => {
      SignalRService.offNotificationReceived(handleNotificationReceived);
    };
  }, []);
  
  // ✅ Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("messengerAuth");
      if (!token) {
        console.error("No auth token found.");
        return;
      }

      try {
        const response = await fetch("https://localhost:7216/api/User", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch profile: ${response.status}`);
        }

        const data = await response.json();
        setUser(data.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChatSelect = (chat) => {
    SignalRService.markChatAsRead(chat.id);
    setUnreadCounts((prev) => {
      const newCounts = { ...prev };
      delete newCounts[chat.id]; // ✅ Remove unread notification
      return newCounts;
    });
    onChatSelect(chat);
  };

  return (
    <div className="w-4/12 h-full flex flex-col bg-gray-900 text-white shadow-lg">
      {/* Messenger Logo */}
      <div className="p-4 flex items-center space-x-2 border-b border-gray-700 justify-center">
        <FaFacebookMessenger size={25} />
        <h1 className="text-2xl font-bold">My Messenger</h1>
      </div>

      {/* Search Bar */}
      <div className="p-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search chats..."
            className="w-full p-2 pl-10 bg-gray-700 rounded-lg text-sm text-white placeholder-gray-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <span className="absolute left-3 top-2 text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 000 16z"
              />
            </svg>
          </span>
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {chatList.length > 0 ? (
          chatList.map((chat) => (
            <div
              key={chat.id}
              onClick={() => handleChatSelect(chat)}
              className="p-3 hover:bg-gray-700 cursor-pointer flex items-center space-x-3 relative"
            >
              <img
                src={chat.image}
                alt={chat.name}
                className="w-16 h-16 rounded-full"
              />
              <div>
                <p className="font-bold text-xl">{chat.name}</p>
                <div className="flex items-center">
                  {chat.isLastMessageSentByMe && (
                    <span className="ml-2 text-blue-500">
                      <i className="fa fa-check-double"></i>
                    </span>
                  )}
                  <p className="text-sm text-gray-400">{chat.lastMessage ?? "No Messeges Yet"}</p>
                </div>
              </div>

              {/* ✅ New Message Notification Badge */}
              {unreadCounts[chat.id] > 0 && (
                <span className="absolute right-2 top-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {unreadCounts[chat.id]}
                </span>
              )}
            </div>
          ))
        ) : (
          <p className="p-4 text-center text-gray-400">No chats found</p>
        )}
      </div>

      {/* Profile Section */}
      <div className="p-4 border-t border-gray-700 flex items-center space-x-3">
        <img
          src={user.profilePicture || "/user.png"}
          alt="Profile"
          className="w-10 h-10 rounded-full cursor-pointer"
          onClick={onProfileClick}
        />
        <div>
          <p className="font-medium">{user.name}</p>
          <p className="text-sm text-gray-400 cursor-pointer" onClick={onProfileClick}>
            View Profile
          </p>
        </div>
      </div>
    </div>
  );
}





  
  