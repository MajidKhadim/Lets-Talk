// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import axios from "axios";

// export default function LoginForm() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState({ email: "", password: "", general: "" });
//   const router = useRouter();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setErrors({ email: "", password: "", general: "" }); // Reset errors before new attempt

//     const formData = { email, password };

//     try {
//       const response = await axios.post(
//         "https://localhost:7216/api/Auth/login",
//         formData,
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (response.data.isSuccess) {
//         router.push("http://localhost:3000"); // Redirect to home page
//       } else {
//         setErrors((prev) => ({ ...prev, general: response.data.message || "Login failed." }));
//       }
//     } catch (error) {
//       console.error("Login error:", error.response.data.messege);
//       const errorMessage = error.response.data.messege ;
//       setErrors((prev) => ({ ...prev, general: errorMessage }));
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGoogleLogin = () => {
//     console.log("Google Login triggered");
//     // Implement Google login logic here
//   };

//   return (
//     <div className="w-full max-w-lg mx-auto mt-10 bg-gray-900 text-white p-8 rounded-lg shadow-lg">
//       <h2 className="text-4xl font-bold mb-6 text-center">Login</h2>
//       <form onSubmit={handleLogin}>
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
//           {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
//         </div>
//         <div className="mb-6">
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
//           {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
//         </div>
//         {errors.general && <p className="text-red-500 text-sm text-center mb-4">{errors.general}</p>}
//         <button
//           type="submit"
//           className="w-full bg-blue-500 p-2 rounded-full text-white font-semibold hover:bg-blue-600 text-lg"
//           disabled={loading}
//         >
//           {loading ? "Logging in..." : "Login"}
//         </button>
//       </form>
//       <div className="mt-6">
//         <button
//           onClick={handleGoogleLogin}
//           className="w-full bg-white p-2 rounded-full text-black font-semibold hover:bg-slate-300 flex items-center justify-center space-x-2"
//         >
//           <img src="/google.png" alt="Google" className="w-5 h-5" />
//           <span>Login with Google</span>
//         </button>
//       </div>
//       <p className="text-sm text-center mt-4">
//         Don't have an account?{" "}
//         <a href="/signup" className="text-blue-500 hover:underline">
//           Sign up
//         </a>
//       </p>
//     </div>
//   );
// }


"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors([]); // Reset errors before new attempt

    const formData = { email, password };

    try {
      const response = await axios.post(
        "https://localhost:7216/api/Auth/login",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.isSuccess) {
        var token = response.data.messege;
        var userId = response.data.data;
        localStorage.setItem("messengerAuth",token);
        localStorage.setItem("userid",userId);
        router.push("http://localhost:3000"); // Redirect to home page
      } else {
        setErrors([response.data.messege || "Login failed."]);
      }
    } catch (error) {
      console.error("Login error:", error.response?.data?.messege);
      const errorMessages = error.response?.data?.errors || [error.response?.data?.messege || "An error occurred."];
      setErrors(errorMessages);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    console.log("Google Login triggered");
  };

  return (
    <div className="w-full max-w-lg mx-auto mt-10 bg-gray-900 text-white p-8 rounded-lg shadow-lg">
      <h2 className="text-4xl font-bold mb-6 text-center">Login</h2>
      {errors.length > 0 && (
        <div className="bg-red-600 text-white p-3 rounded mb-4">
          <ul>
            {errors.map((error, index) => (
              <li key={index} className="text-sm">• {error}</li>
            ))}
          </ul>
        </div>
      )}
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-md font-medium mb-2">
            Email Address
          </label>
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
        <div className="mb-6">
          <label htmlFor="password" className="block text-md font-medium mb-2">
            Password
          </label>
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
        <button
          type="submit"
          className="w-full bg-blue-500 p-2 rounded-full text-white font-semibold hover:bg-blue-600 text-lg"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      <div className="mt-6">
        <button
          onClick={handleGoogleLogin}
          className="w-full bg-white p-2 rounded-full text-black font-semibold hover:bg-slate-300 flex items-center justify-center space-x-2"
        >
          <img src="/google.png" alt="Google" className="w-5 h-5" />
          <span>Login with Google</span>
        </button>
      </div>
      <p className="text-sm text-center mt-4">
        Don't have an account?{" "}
        <a href="/signup" className="text-blue-500 hover:underline">
          Sign up
        </a>
      </p>
    </div>
  );
}