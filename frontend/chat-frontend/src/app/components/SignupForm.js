//'use client';
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import axios from "axios";

// export default function SignupForm() {
//   const [username, setUsername] = useState(""); // Added username state
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const router = useRouter();

//   const handleSignup = async (e) => {
//     e.preventDefault();

//     if (password !== confirmPassword) {
//       alert("Passwords do not match!");
//       return;
//     }

//     const formData = {
//       userName: username, // Added username
//       email,
//       password,
//       confirmPassword,
//     };

//     try {
//       const response = await axios.post("https://localhost:7216/api/Auth/register", formData, {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       if (response.data.isSuccess) {
//         router.push(`/verify-email?email=${encodeURIComponent(email)}`);
//       } else {
//         alert(response.data.message || "Registration failed. Please try again.");
//       }
//     } catch (error) {
//       console.error("Signup error:", error);
//       alert(error.response?.data?.messege || "An error occurred during signup.");
//     }
//   };

//   const handleGoogleSignup = () => {
//     console.log("Google Signup triggered");
//   };

//   return (
//     <div className="w-full max-w-lg mx-auto mt-10 bg-gray-900 text-white p-8 rounded-lg shadow-lg">
//       <h2 className="text-4xl font-bold mb-6 text-center">Sign Up</h2>
//       <form onSubmit={handleSignup}>
//         {/* Username Field */}
//         <div className="mb-4">
//           <label htmlFor="username" className="block text-md font-medium mb-2">
//             Username
//           </label>
//           <input
//             type="text"
//             id="username"
//             className="w-full p-2 bg-gray-800 rounded-lg text-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="Enter your username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//           />
//         </div>

//         {/* Email Field */}
//         <div className="mb-4">
//           <label htmlFor="email" className="block text-md font-medium mb-2">
//             Email Address
//           </label>
//           <input
//             type="email"
//             id="email"
//             className="w-full p-2 bg-gray-800 rounded-lg text-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="Enter your email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>

//         {/* Password Field */}
//         <div className="mb-4">
//           <label htmlFor="password" className="block text-md font-medium mb-2">
//             Password
//           </label>
//           <input
//             type="password"
//             id="password"
//             className="w-full p-2 bg-gray-800 rounded-lg text-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="Enter your password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>

//         {/* Confirm Password Field */}
//         <div className="mb-6">
//           <label htmlFor="confirmPassword" className="block text-md font-medium mb-2">
//             Confirm Password
//           </label>
//           <input
//             type="password"
//             id="confirmPassword"
//             className="w-full p-2 bg-gray-800 rounded-lg text-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="Confirm your password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             required
//           />
//         </div>

//         {/* Signup Button */}
//         <button type="submit" className="w-full bg-blue-500 p-2 rounded-full text-white font-semibold hover:bg-blue-600 text-lg">
//           Sign Up
//         </button>
//       </form>

//       {/* Google Signup Button */}
//       <div className="mt-6">
//         <button onClick={handleGoogleSignup} className="w-full bg-white p-2 rounded-full text-black font-semibold hover:bg-slate-200 flex items-center justify-center space-x-2 text-lg">
//           <img src="/google.png" alt="Google" className="w-5 h-5" />
//           <span>Sign Up with Google</span>
//         </button>
//       </div>

//       <p className="text-sm text-center mt-4">
//         Already have an account?{" "}
//         <a href="/login" className="text-blue-500 hover:underline">
//           Login
//         </a>
//       </p>
//     </div>
//   );
// }

'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function SignupForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]); // Added state for errors
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrors([]); // Clear previous errors

    if (password !== confirmPassword) {
      setErrors(["Passwords do not match!"]);
      return;
    }

    const formData = {
      userName: username,
      email,
      password,
      confirmPassword,
    };

    try {
      const response = await axios.post(
        "https://localhost:7216/api/Auth/register",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.isSuccess) {
        router.push(`/verify-email?email=${encodeURIComponent(email)}`);
      } else {
        setErrors(response.data.errors || [response.data.messege || "Registration failed. Please try again."]);
      }
    } catch (error) {
      console.error("Signup error:", error);
      setErrors(error.response?.data?.errors || [error.response?.data?.messege || "An error occurred during signup."]);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto mt-10 bg-gray-900 text-white p-8 rounded-lg shadow-lg">
      <h2 className="text-4xl font-bold mb-6 text-center">Sign Up</h2>
      {errors.length > 0 && (
        <div className="mb-4 p-3 bg-red-600 text-white rounded-lg">
          <ul>
            {errors.map((error, index) => (
              <li key={index}>• {error}</li>
            ))}
          </ul>
        </div>
      )}
      <form onSubmit={handleSignup}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-md font-medium mb-2">Username</label>
          <input
            type="text"
            id="username"
            className="w-full p-2 bg-gray-800 rounded-lg text-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-md font-medium mb-2">Email Address</label>
          <input
            type="email"
            id="email"
            className="w-full p-2 bg-gray-800 rounded-lg text-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-md font-medium mb-2">Password</label>
          <input
            type="password"
            id="password"
            className="w-full p-2 bg-gray-800 rounded-lg text-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="confirmPassword" className="block text-md font-medium mb-2">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            className="w-full p-2 bg-gray-800 rounded-lg text-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="w-full bg-blue-500 p-2 rounded-full text-white font-semibold hover:bg-blue-600 text-lg">
          Sign Up
        </button>
      </form>

      <p className="text-sm text-center mt-4">
        Already have an account?{" "}
        <a href="/login" className="text-blue-500 hover:underline">
          Login
        </a>
      </p>
    </div>
  );
}

