// 'use client';
// import { usePathname } from "next/navigation";
// import Sidebar from "./components/Sidebar";
// import { useState } from "react";
// import React from "react";
// import Home from "./Home";
// import Profile from "./components/Profile";

// export default function Layout({ children }) {
//   const pathname = usePathname();
//   const noSidebarRoutes = ["/login", "/register"];

//   // State for active chat and profile view
//   const [activeChat, setActiveChat] = useState(null);
//   const [showProfile, setShowProfile] = useState(false);

//   // Exclude sidebar for login and registration pages
//   if (noSidebarRoutes.includes(pathname)) {
//     return <>{children}</>;
//   }
//   const onProfileClose = ()=>{
//     setShowProfile(false);
//     setActiveChat(null);
//   }

//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* Sidebar */}
//       <Sidebar
//         chats={[
//           {
//             id: 1,
//             name: "John Doe",
//             lastMessage: "Hey there!",
//             unread: 2,
//             image: "/travel.png",
//             messages: [
//               { id: 1, sender: "John Doe", text: "Hey there! How's it going?", time: "10:15 AM" },
//               { id: 2, sender: "You", text: "Hi John! I'm doing well, thank you. How about you?", time: "10:16 AM" },
//               { id: 3, sender: "John Doe", text: "I'm good, just getting some work done.", time: "10:18 AM" },
//               { id: 4, sender: "You", text: "That’s great! What’s keeping you busy?", time: "10:20 AM" },
//               { id: 5, sender: "John Doe", text: "Just work on some projects, and then I’ll relax over the weekend.", time: "10:22 AM" },
//               { id: 6, sender: "You", text: "Sounds like a good plan! I might do the same.", time: "10:24 AM" },
//               { id: 7, sender: "John Doe", text: "Let’s catch up over the weekend then!", time: "10:26 AM" },
//             ],
//           },
//           {
//             id: 2,
//             name: "Jane Smith",
//             lastMessage: "See you tomorrow!",
//             unread: 0,
//             image: "/travel.png",
//             messages: [
//               { id: 1, sender: "You", text: "Hey Jane, are we still on for tomorrow?", time: "2:45 PM" },
//               { id: 2, sender: "Jane Smith", text: "Yes, absolutely! See you tomorrow!", time: "2:46 PM" },
//               { id: 3, sender: "You", text: "Great! What time should I be there?", time: "2:50 PM" },
//               { id: 4, sender: "Jane Smith", text: "How about 10 AM?", time: "2:52 PM" },
//               { id: 5, sender: "You", text: "Perfect, I’ll be there at 10!", time: "2:55 PM" },
//             ],
//           },
//           {
//             id: 3,
//             name: "Mark Spencer",
//             lastMessage: "Let's catch up soon!",
//             unread: 1,
//             image: "/travel.png",
//             messages: [
//               { id: 1, sender: "Mark Spencer", text: "Hey, do you have time to meet up this weekend?", time: "9:00 AM" },
//               { id: 2, sender: "You", text: "Yes, I’m free on Saturday. How about you?", time: "9:05 AM" },
//               { id: 3, sender: "Mark Spencer", text: "Saturday works! How about we go for lunch?", time: "9:10 AM" },
//               { id: 4, sender: "You", text: "Lunch sounds perfect! What time?", time: "9:15 AM" },
//               { id: 5, sender: "Mark Spencer", text: "How about 12 PM?", time: "9:20 AM" },
//               { id: 6, sender: "You", text: "12 PM works for me!", time: "9:25 AM" },
//               { id: 7, sender: "Mark Spencer", text: "Awesome! Let’s meet at the usual place.", time: "9:30 AM" },
//             ],
//           },
//           {
//             id: 4,
//             name: "Emily Clark",
//             lastMessage: "Don't forget the meeting.",
//             unread: 0,
//             image: "/travel.png",
//             messages: [
//               { id: 1, sender: "Emily Clark", text: "Just a reminder about our meeting at 3 PM.", time: "11:30 AM" },
//               { id: 2, sender: "You", text: "Got it, see you then!", time: "11:35 AM" },
//               { id: 3, sender: "Emily Clark", text: "I’ll send over the agenda before the meeting.", time: "11:40 AM" },
//               { id: 4, sender: "You", text: "Great, I’ll review it before we meet.", time: "11:45 AM" },
//               { id: 5, sender: "Emily Clark", text: "Looking forward to it. See you later!", time: "11:50 AM" },
//             ],
//           },
//           {
//             id: 5,
//             name: "Sophia Johnson",
//             lastMessage: "I’ll send the files by tomorrow.",
//             unread: 0,
//             image: "/travel.png",
//             messages: [
//               { id: 1, sender: "Sophia Johnson", text: "The project files are almost ready. I'll send them by tomorrow.", time: "4:00 PM" },
//               { id: 2, sender: "You", text: "Thanks, I’ll review them as soon as I get them.", time: "4:05 PM" },
//               { id: 3, sender: "Sophia Johnson", text: "No problem, I’ll notify you once I’ve sent them.", time: "4:10 PM" },
//               { id: 4, sender: "You", text: "Great! I’ll be waiting for them.", time: "4:15 PM" },
//               { id: 5, sender: "Sophia Johnson", text: "I’ll make sure everything is in order before sending.", time: "4:20 PM" },
//             ],
//           },
//           {
//             id: 6,
//             name: "Daniel Lee",
//             lastMessage: "See you at the event!",
//             unread: 3,
//             image: "/travel.png",
//             messages: [
//               { id: 1, sender: "Daniel Lee", text: "Don’t forget about the event tomorrow at 5 PM.", time: "1:00 PM" },
//               { id: 2, sender: "You", text: "Thanks for the reminder! I’ll be there.", time: "1:05 PM" },
//               { id: 3, sender: "Daniel Lee", text: "Awesome, I’ll see you there!", time: "1:10 PM" },
//               { id: 4, sender: "You", text: "Is there anything I should bring?", time: "1:15 PM" },
//               { id: 5, sender: "Daniel Lee", text: "Just bring yourself! I'll take care of the rest.", time: "1:20 PM" },
//               { id: 6, sender: "You", text: "Sounds great! Can’t wait!", time: "1:25 PM" },
//             ],
//           },
//           {
//             id: 7,
//             name: "Olivia Brown",
//             lastMessage: "How’s the new project going?",
//             unread: 0,
//             image: "/travel.png",
//             messages: [
//               { id: 1, sender: "Olivia Brown", text: "I heard you started a new project. How’s it going?", time: "12:00 PM" },
//               { id: 2, sender: "You", text: "It’s going great! I’m really excited about it.", time: "12:05 PM" },
//               { id: 3, sender: "Olivia Brown", text: "That’s awesome! What’s the project about?", time: "12:10 PM" },
//               { id: 4, sender: "You", text: "It’s a new messaging app. I’m working on the backend now.", time: "12:15 PM" },
//               { id: 5, sender: "Olivia Brown", text: "Sounds really interesting! Let me know if you need any help.", time: "12:20 PM" },
//               { id: 6, sender: "You", text: "I’ll definitely reach out! Thanks for the offer.", time: "12:25 PM" },
//             ],
//           },
//           {
//             id: 8,
//             name: "James Wilson",
//             lastMessage: "Let's grab lunch sometime.",
//             unread: 1,
//             image: "/travel.png",
//             messages: [
//               { id: 1, sender: "James Wilson", text: "Let’s catch up over lunch next week!", time: "3:30 PM" },
//               { id: 2, sender: "You", text: "Sounds good! I’ll check my schedule.", time: "3:35 PM" },
//               { id: 3, sender: "James Wilson", text: "Let me know when you’re free.", time: "3:40 PM" },
//               { id: 4, sender: "You", text: "How about Thursday at 1 PM?", time: "3:45 PM" },
//               { id: 5, sender: "James Wilson", text: "Thursday works! I’ll see you then.", time: "3:50 PM" },
//             ],
//           },
//         ]}        
//         onChatSelect={(chat) => {
//           setActiveChat(chat);
//           setShowProfile(false); // Ensure profile is hidden when a chat is selected
//         }}
//         onProfileClick={() => {
//           setShowProfile(true);
//           setActiveChat(null); // Ensure no chat is selected when viewing the profile
//         }
//         }
//       />
//       {/* Main Content */}
//       <main className="flex-1">
//         {showProfile ? (
//           <Profile
//             user={{
//               name: "Majid Khadim",
//               email: "majidkhadim768@gmail.com",
//               image: "/user.png",
//             }}
//             onProfileClose={onProfileClose}
//           />
//         ) : children ? (
//           React.cloneElement(children, { activeChat })
//         ) : (
//           <Home activeChat={activeChat} />
//         )}
//       </main>
//     </div>
//   );
// }

'use client';
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import React from "react";
import Sidebar from "./components/Sidebar";
import Home from "./Home";
import Profile from "./components/Profile";

export default function Layout({ children }) {
  const pathname = usePathname();
  const noSidebarRoutes = ["/login", "/register"];

  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user , setUser ] = useState({});

  // Fetch user chats from API
  useEffect(() => {
    const fetchChats = async () => {
      const token = localStorage.getItem("messengerAuth");
      if (!token) {
        console.error("No auth token found.");
        return;
      }

      try {
        const response = await fetch("https://localhost:7216/api/Chat/user-chats", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch chats: ${response.status}`);
        }

        const data = await response.json();
        setChats(data); // Set chats from API response
        console.log(data);
      } catch (error) {
        console.error("Error fetching chats:", error);
      } finally {
        setLoading(false);
      }
    };
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
        console.log(response);
        const data = await response.json();
        setUser(data.data); // Set chats from API response
        console.log(data.data);
      } catch (error) {
        console.error("Error fetching chats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
    fetchChats();
  }, []);

  // Exclude sidebar for login and register pages
  if (noSidebarRoutes.includes(pathname)) {
    return <>{children}</>;
  }

  const onProfileClose = () => {
    setShowProfile(false);
    setActiveChat(null);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar
        chats={chats}
        onChatSelect={(chat) => {
          setActiveChat(chat);
          setShowProfile(false);
        }}
        onProfileClick={() => {
          setShowProfile(true);
          setActiveChat(null);
        }}
      />

      {/* Main Content */}
      <main className="flex-1">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <p>Loading chats...</p>
          </div>
        ) : showProfile ? (
          <Profile
            user={{
              name: user.name,
              email: user.email,
              image: user.profilePicture? user.profilePicture: "/user.png",
            }}
            onProfileClose={onProfileClose}
          />
        ) : children ? (
          React.cloneElement(children, { activeChat })
        ) : (
          <Home activeChat={activeChat} />
        )}
      </main>
    </div>
  );
}














