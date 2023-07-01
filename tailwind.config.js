/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // src 하위 파일 중 확장자가 .js,.jsx,.ts,.tsx인 파일을 대상으로 한다는 의미 
    './src/**/*.{js,jsx,ts,tsx}',  
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

