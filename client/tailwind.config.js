/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {colors: { brightBlue: "#1e85ff",
       hexawareBlue: "#3c2cda", 
       darkBlue: "#07125e",
        customBlack: "#040c42", },
  },
  },
  plugins: [],
}

