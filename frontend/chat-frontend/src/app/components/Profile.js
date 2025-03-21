// 'use client';
// import { useRouter } from "next/navigation";
// import { IoClose } from "react-icons/io5"; // Import a close icon from react-icons

// export default function Profile({user,onProfileClose}) {
//   const router = useRouter();

//   return (
//     <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-800">
//       {/* Profile Header */}
//       <div className="relative flex flex-col items-center justify-center bg-white dark:bg-gray-700 py-8 shadow-md">
//         {/* Close Button */}
//         <button
//           onClick={onProfileClose}
//           className="absolute top-4 left-4 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white focus:outline-none"
//         >
//           <IoClose size={24} />
//         </button>
//         <img
//           src={user.image}
//           alt="Profile Picture"
//           className="w-24 h-24 rounded-full shadow-lg"
//         />
//         <h1 className="mt-4 text-2xl font-semibold text-gray-800 dark:text-white">
//           {user.name}
//         </h1>
//         <p className="text-gray-500 dark:text-gray-400">{user.email}</p>
//       </div>

//       {/* Profile Details */}
//       <div className="flex-1 p-6 overflow-y-auto">
//         <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow divide-y divide-gray-200 dark:divide-gray-600">
//           <div className="py-4">
//             <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase">
//               Username
//             </h2>
//             <p className="text-gray-800 dark:text-gray-200">{user.name}</p>
//           </div>
//           <div className="py-4">
//             <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase">
//               Email
//             </h2>
//             <p className="text-gray-800 dark:text-gray-200">{user.email}</p>
//           </div>
//           <div className="py-4">
//             <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase">
//               Phone
//             </h2>
//             <p className="text-gray-800 dark:text-gray-200">+1 (123) 456-7890</p>
//           </div>
//           <div className="py-4">
//             <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase">
//               Address
//             </h2>
//             <p className="text-gray-800 dark:text-gray-200">
//               1234 Elm Street, Springfield, IL 62704
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Edit Profile Button */}
//       <div className="p-6 bg-gray-100 dark:bg-gray-700">
//         <button className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
//           Edit Profile
//         </button>
//       </div>
//     </div>
//   );
// }



// "use client";
// import { useState } from "react";
// import { IoClose } from "react-icons/io5";

// export default function Profile({ user, onProfileClose }) {
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState({
//     name: user.name,
//     phone: "+1 (123) 456-7890", // Default phone
//     address: "1234 Elm Street, Springfield, IL 62704", // Default address
//   });

//   // Handle input changes
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Handle save action (mocking an API call)
//   const handleSave = () => {
//     console.log("Updated Profile:", formData);
//     setIsEditing(false); // Exit edit mode
//   };

//   return (
//     <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-800">
//       {/* Profile Header */}
//       <div className="relative flex flex-col items-center justify-center bg-white dark:bg-gray-700 py-8 shadow-md">
//         {/* Close Button */}
//         <button
//           onClick={onProfileClose}
//           className="absolute top-4 left-4 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white focus:outline-none"
//         >
//           <IoClose size={24} />
//         </button>
//         <img
//           src={user.image}
//           alt="Profile Picture"
//           className="w-24 h-24 rounded-full shadow-lg"
//         />
//         <h1 className="mt-4 text-2xl font-semibold text-gray-800 dark:text-white">
//           {user.name}
//         </h1>
//         <p className="text-gray-500 dark:text-gray-400">{user.email}</p>
//       </div>

//       {/* Profile Details */}
//       <div className="flex-1 p-6 overflow-y-auto">
//         <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow divide-y divide-gray-200 dark:divide-gray-600">
//           {/* Name */}
//           <div className="py-4">
//             <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase">
//               Username
//             </h2>
//             {isEditing ? (
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border rounded-lg bg-gray-100 dark:bg-gray-600 dark:text-white"
//               />
//             ) : (
//               <p className="text-gray-800 dark:text-gray-200">{formData.name}</p>
//             )}
//           </div>

//           {/* Email (Read-only) */}
//           <div className="py-4">
//             <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase">
//               Email
//             </h2>
//             <p className="text-gray-800 dark:text-gray-200">{user.email}</p>
//           </div>

//           {/* Phone */}
//           <div className="py-4">
//             <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase">
//               Phone
//             </h2>
//             {isEditing ? (
//               <input
//                 type="text"
//                 name="phone"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border rounded-lg bg-gray-100 dark:bg-gray-600 dark:text-white"
//               />
//             ) : (
//               <p className="text-gray-800 dark:text-gray-200">{formData.phone}</p>
//             )}
//           </div>

//           {/* Address */}
//           <div className="py-4">
//             <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase">
//               Address
//             </h2>
//             {isEditing ? (
//               <input
//                 type="text"
//                 name="address"
//                 value={formData.address}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border rounded-lg bg-gray-100 dark:bg-gray-600 dark:text-white"
//               />
//             ) : (
//               <p className="text-gray-800 dark:text-gray-200">{formData.address}</p>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Buttons */}
//       <div className="p-6 bg-gray-100 dark:bg-gray-700">
//         {isEditing ? (
//           <div className="flex gap-4">
//             <button
//               onClick={handleSave}
//               className="w-full py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600"
//             >
//               Save
//             </button>
//             <button
//               onClick={() => setIsEditing(false)}
//               className="w-full py-3 bg-gray-400 text-white font-semibold rounded-lg shadow-md hover:bg-gray-500"
//             >
//               Cancel
//             </button>
//           </div>
//         ) : (
//           <button
//             onClick={() => setIsEditing(true)}
//             className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600"
//           >
//             Edit Profile
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }


"use client";
import { useState , useEffect} from "react";
import { IoClose } from "react-icons/io5";


export default function Profile({ user, onProfileClose }) {
  const [isEditing, setIsEditing] = useState(false);
  const [loggedUser, setLoggedUser] = useState({})
  const [loading , setLoading ] = useState();
  const [formData, setFormData] = useState({
    name: user.name,
    phone: "+1 (123) 456-7890", // Default phone
    address: "1234 Elm Street, Springfield, IL 62704", // Default address
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(user.image); // Show existing image

  useEffect(()=>{
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
          setLoggedUser(data.data); // Set chats from API response
          console.log(data.data);
        } catch (error) {
          console.error("Error fetching Profile:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchProfile();
    },[])
  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle profile image selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file)); // Show preview
    }
  };

  // Handle save action (API call)
  const handleSave = async () => {
    const formDataToSend = new FormData();
    formDataToSend.append("userName", formData.name);
    formDataToSend.append("phoneNumber", formData.phone);
    formDataToSend.append("address", formData.address);
    if (selectedFile) {
      formDataToSend.append("profilePicture", selectedFile);
    }

    // Get token from local storage
    const token = localStorage.getItem("messengerAuth");

    try {
      const response = await fetch("https://localhost:7216/api/user", {
        method: "POST",
        body: formDataToSend,
        headers: {
          Authorization: `Bearer ${token}`, // Include token in the request
        },
      });

      const data = await response.json();
      if (data.isSuccess) {
        alert("Profile updated successfully!");
      } else {
        alert("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }

    setIsEditing(false); // Exit edit mode
  };


  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-800">
      {/* Profile Header */}
      <div className="relative flex flex-col items-center justify-center bg-white dark:bg-gray-700 py-8 shadow-md">
        {/* Close Button */}
        <button
          onClick={onProfileClose}
          className="absolute top-4 left-4 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white focus:outline-none"
        >
          <IoClose size={24} />
        </button>
        <label htmlFor="profileImage" className="cursor-pointer">
          <img
            src={imagePreview}
            alt="Profile Picture"
            className="w-24 h-24 rounded-full shadow-lg object-cover"
          />
        </label>
        {isEditing && (
          <input
            type="file"
            id="profileImage"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        )}
        <h1 className="mt-4 text-2xl font-semibold text-gray-800 dark:text-white">
          {loggedUser.name}
        </h1>
        <p className="text-gray-500 dark:text-gray-400">{loggedUser.email}</p>
      </div>

      {/* Profile Details */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow divide-y divide-gray-200 dark:divide-gray-600">
          {/* Name */}
          <div className="py-4">
            <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase">
              Username
            </h2>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg bg-gray-100 dark:bg-gray-600 dark:text-white"
              />
            ) : (
              <p className="text-gray-800 dark:text-gray-200">{loggedUser.name}</p>
            )}
          </div>

          {/* Email (Read-only) */}
          <div className="py-4">
            <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase">
              Email
            </h2>
            <p className="text-gray-800 dark:text-gray-200">{loggedUser.email}</p>
          </div>

          {/* Phone */}
          <div className="py-4">
            <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase">
              Phone
            </h2>
            {isEditing ? (
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg bg-gray-100 dark:bg-gray-600 dark:text-white"
              />
            ) : (
              <p className="text-gray-800 dark:text-gray-200">{loggedUser.phone}</p>
            )}
          </div>

          {/* Address */}
          <div className="py-4">
            <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase">
              Address
            </h2>
            {isEditing ? (
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg bg-gray-100 dark:bg-gray-600 dark:text-white"
              />
            ) : (
              <p className="text-gray-800 dark:text-gray-200">{loggedUser.address}</p>
            )}
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="p-6 bg-gray-100 dark:bg-gray-700">
        {isEditing ? (
          <div className="flex gap-4">
            <button
              onClick={handleSave}
              className="w-full py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="w-full py-3 bg-gray-400 text-white font-semibold rounded-lg shadow-md hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600"
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
}



  
  
  

  