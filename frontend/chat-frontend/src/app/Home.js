// 'use client';
// import { useState } from "react";
// import ChatWindow from "./components/ChatWindow";
// import Profile from "./components/Profile";
// import { useRouter } from "next/navigation";
// import Layout from "./page";

// export default function Home() {
//   const router = useRouter();
//   const [chats, setChats] = useState([
//     {
//       id: 1,
//       name: "John Doe",
//       lastMessage: "Hey there!",
//       unread: 2,
//       image: "/travel.png",
//       messages: [
//         { id: 1, sender: "John Doe", text: "Hey there! How's it going?", time: "10:15 AM" },
//         { id: 2, sender: "You", text: "Hi John! I'm doing well, thank you. How about you?", time: "10:16 AM" },
//         { id: 3, sender: "John Doe", text: "I'm good, just getting some work done.", time: "10:18 AM" },
//       ],
//     },
//     {
//       id: 2,
//       name: "Jane Smith",
//       lastMessage: "See you tomorrow!",
//       unread: 0,
//       image: "/travel.png",
//       messages: [
//         { id: 1, sender: "You", text: "Hey Jane, are we still on for tomorrow?", time: "2:45 PM" },
//         { id: 2, sender: "Jane Smith", text: "Yes, absolutely! See you tomorrow!", time: "2:46 PM" },
//       ],
//     },
//   ]);

//   const [activeChat, setActiveChat] = useState(null);
//   const [showProfile, setShowProfile] = useState(false);

//   // Handle profile click
//   const handleProfileClick = () => {
//     setShowProfile(true); // Show profile page
//     setActiveChat(null);  // Hide chat window
//   };

//   // Handle back to chat
//   const handleBackToChat = () => {
//     setShowProfile(false); // Hide profile
//   };

//   return (
//     <Layout>
//     <div className="flex h-screen">
//       {/* Sidebar is handled by Layout component */}
//       <div className="flex-1 flex flex-col bg-white dark:bg-gray-800">
//         {showProfile ? (
//           <Profile
//             user={{
//               name: "John Doe",
//               email: "john.doe@example.com",
//               image: "/travel.png",
//             }}
//             onBack={handleBackToChat}
//           />
//         ) : activeChat ? (
//           <ChatWindow chat={activeChat} messages={activeChat.messages} />
//         ) : (
//           <div className="flex flex-col items-center justify-center flex-1 text-center p-6">
//             <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
//               Welcome to Messenger
//             </h2>
//             <p className="text-lg text-gray-500 dark:text-gray-400 mb-6">
//               Select a chat from the sidebar to start messaging.
//             </p>
//             <div className="flex justify-center">
//               <img src="/chat.png" alt="Chat Icon" className="w-24 h-24" />
//             </div>
//             <p className="mt-4 text-sm text-gray-400 dark:text-gray-500">
//               Need help? Reach out to support.
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//     </Layout>
//   );
// }

import ChatWindow from "./components/ChatWindow";
import Profile from "./components/Profile";

export default function Home({ activeChat }) {
  return (
    <div className="flex h-screen">
      <div className="flex-1 flex flex-col bg-white dark:bg-gray-800">
        {activeChat ? (
          <ChatWindow chat={activeChat}/>
        ) : (
          <div className="flex flex-col items-center justify-center flex-1 text-center p-6">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
              Welcome to My Messenger
            </h2>
            <p className="text-lg text-gray-500 dark:text-gray-400 mb-6">
              Select a chat from the sidebar to start messaging.
            </p>
            <div className="flex justify-center">
              <img src="/chat.png" alt="Chat Icon" className="w-24 h-24" />
            </div>
            <p className="mt-4 text-sm text-gray-400 dark:text-gray-500">
              Need help? Reach out to support.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
