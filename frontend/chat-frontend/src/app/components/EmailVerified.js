// "use client";

// import { useRouter } from "next/navigation";

// export default function EmailVerified() {
//   const router = useRouter();

//   const handleGoToLogin = () => {
//     router.push("/login");
//   };

//   return (
//     <div className="flex min-h-screen flex-col items-center justify-center px-6 py-12">
//       <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
//         <div className="flex flex-col items-center">
//           <img
//             src="/travel.png"
//             alt="Your Company"
//             className="h-20 w-auto mb-6"
//           />
//           <h1 className="text-2xl font-bold text-gray-900 mb-2">
//             Email Verified
//           </h1>
//           <p className="text-gray-600 text-center mb-6">
//             Your email has been successfully verified. You can now log in to
//             access our application.
//           </p>
//           <button
//             onClick={handleGoToLogin}
//             className="w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//           >
//             Go to Login
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useRouter } from "next/navigation";

export default function EmailVerified() {
  const router = useRouter();

  const handleGoToLogin = () => {
    router.push("/login");
  };

  return (
    <div className="flex items-center justify-center min-h-max bg-gray-900 text-white p-6 rounded-lg">
      <div className="w-full max-w-md rounded-xl bg-gray-800 p-8 shadow-lg">
        <div className="flex flex-col items-center">
          {/* Logo */}
          <img
            src="/chat.png"
            alt="Logo"
            className="h-20 w-auto mb-4"
          />

          {/* Success Icon */}
          <img
            src="/verified.webp"
            alt="Verified Icon"
            className="w-16 h-16 mb-4 rounded-2xl"
          />

          <h1 className="text-2xl font-bold mb-2 text-center">Email Verified</h1>
          <p className="text-gray-300 text-center mb-6">
            Your email has been successfully verified. You can now log in to access our application.
          </p>

          {/* Button */}
          <button
            onClick={handleGoToLogin}
            className="w-full bg-blue-500 px-4 py-2 rounded-lg text-white font-semibold hover:bg-blue-600 text-lg"
          >
            Go to Login
          </button>
        </div>
      </div>
    </div>
  );
}

