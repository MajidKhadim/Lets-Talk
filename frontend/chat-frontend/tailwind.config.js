/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}", // Add all relevant paths
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  devIndicators: {
    buildActivity: false,
    buildActivityPosition: 'bottom-right', // Change position or disable completely
  },
  reactStrictMode: false, // Disable React Strict Mode (optional)
};
