/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}





// This project has tailwind v3 since the npm install command was "npm install -D tailwindcss postcss autoprefixer" and this project was old so the latest patch at that time was v3. The config files were created using "npx tailwindcss init -p". i had to use v3 command to generate the config files(bcuz v4 doesnt support that npx, they changed that way).

// npm install -D tailwindcss@3 postcss autoprefixer
//npx tailwindcss init -p

