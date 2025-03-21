// "use client";
// import React, { useState } from "react";
// import { useSearchParams } from "next/navigation";
// import axios from "axios";

// export default function VerifyEmail() {
//   const searchParams = useSearchParams();
//   const email = searchParams.get("email");

//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleResendEmail = async () => {
//     if (!email) {
//       setMessage("Email is not provided in the URL.");
//       return;
//     }

//     setLoading(true);
//     setMessage("");

//     try {
//       const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
//       const response = await axios.post(`${backendUrl}/api/auth/resend-link`, {
//         email,
//       });

//       if (response.data.isSuccess) {
//         setMessage("Verification email resent successfully!");
//       } else {
//         setMessage("Failed to resend the email. Try again.");
//       }
//     } catch (error) {
//       setMessage("An error occurred. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-max bg-gray-900 text-white p-6 rounded-lg">
//       <main className="bg-gray-800 rounded-xl shadow-lg w-full max-w-lg p-8">
//         {/* Logo */}
//         <div className="text-center mb-6">
//           <img src="/travel.png" alt="Logo" className="w-24 h-24 mx-auto" />
//         </div>

//         {/* Email Icon */}
//         <div className="text-center">
//           <img src="/sent.png" alt="Email Sent" className="w-20 h-20 mx-auto mb-4" />
//           <h1 className="text-3xl font-bold mb-2">Verify Your Email</h1>
//           <p className="text-gray-300 mb-4">
//             {email ? (
//               <>
//                 A verification email has been sent to{" "}
//                 <strong className="text-blue-400">{email}</strong>.
//               </>
//             ) : (
//               "No email address provided in the URL."
//             )}
//           </p>
//           <p className="text-gray-400 mb-6">
//             Click the link in the email to verify your account.
//           </p>

//           {/* Buttons */}
//           <div className="flex flex-col sm:flex-row justify-center gap-4">
//             <button
//               className="w-full sm:w-auto bg-gray-600 text-white px-4 py-2 rounded-full hover:bg-gray-700"
//               onClick={() => console.log("Cancelled")}
//             >
//               Cancel
//             </button>
//             <button
//               className="w-full sm:w-auto bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 flex items-center justify-center"
//               onClick={handleResendEmail}
//               disabled={loading}
//             >
//               {loading ? (
//                 <div className="flex items-center space-x-2">
//                   <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
//                   <span>Resending...</span>
//                 </div>
//               ) : (
//                 "Resend Email"
//               )}
//             </button>
//             <a
//               href="https://gmail.com"
//               target="_blank"
//               className="w-full sm:w-auto bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 text-center"
//             >
//               Open Gmail
//             </a>
//           </div>

//           {/* Message Display */}
//           {message && (
//             <p
//               className={`mt-4 text-sm text-center ${
//                 message.includes("successfully") ? "text-green-400" : "text-red-400"
//               }`}
//             >
//               {message}
//             </p>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// }

"use client";
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";

export default function VerifyEmail() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResendEmail = async () => {
    if (!email) {
      setMessage("Email is not provided in the URL.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      const response = await axios.post(`${backendUrl}/api/auth/resend-link`, {
        email,
      });

      if (response.data.isSuccess) {
        setMessage("Verification email resent successfully!");
      } else {
        setMessage("Failed to resend the email. Try again.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-max bg-gray-900 text-white p-6 rounded-lg">
      <main className="bg-gray-800 rounded-xl shadow-lg w-full max-w-md p-6">
        {/* Logo */}
        <div className="text-center mb-6">
          <img src="/chat.png" alt="Logo" className="w-20 h-20 mx-auto" />
        </div>

        {/* Email Icon */}
        <div className="text-center">
          <img src="/sent.png" alt="Email Sent" className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Verify Your Email</h1>
          <p className="text-gray-300 mb-4">
            {email ? (
              <>
                A verification email has been sent to{" "}
                <strong className="text-blue-400">{email}</strong>.
              </>
            ) : (
              "No email address provided in the URL."
            )}
          </p>
          <p className="text-gray-400 mb-6">
            Click the link in the email to verify your account.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <button
              className="w-full sm:w-auto bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
              onClick={() => console.log("Cancelled")}
            >
              Cancel
            </button>
            <button
              className="w-full sm:w-auto bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center justify-center"
              onClick={handleResendEmail}
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                  <span>Resending...</span>
                </div>
              ) : (
                "Resend Email"
              )}
            </button>
            <a
              href="https://gmail.com"
              target="_blank"
              className="w-full sm:w-auto bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 text-center"
            >
              Open Gmail
            </a>
          </div>

          {/* Message Display */}
          {message && (
            <p
              className={`mt-4 text-sm text-center ${
                message.includes("successfully") ? "text-green-400" : "text-red-400"
              }`}
            >
              {message}
            </p>
          )}
        </div>
      </main>
    </div>
  );
}

