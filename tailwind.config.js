/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontSize: {
        header: '20px',
        captionHeader: '16px',
        body: '14px',
        captionBody: '14px',
        assistive: '12px',
        button: '16px',
      },
      letterSpacing: {
        header: '-0.05em',
      },
      colors: {
        primary: '#08F283', // Primary 색상
        secondary: '#2A3328', // Secondary 색상
        neutral: '#011A11', // Neutral 배경 색상
        addGreen: '#05D976', // 추가 색상 1
        addDarkGreen: '#02733E', // 추가 색상 2
        textLightGray: '#D9D9D9 ', // 텍스트 연회색
        textDarkGray: '#838383', // 텍스트 진회색
        matchLine: '#80C576',
        addRed: '#FE3B34',
      },
      margin: {
        vertical: '16px',
        horizontal: '16px',
      },
      padding: {
        vertical: '16px',
        horizontal: '16px',
      },
      borderRadius: {
        common: '32px',
        modal: '16px',
        box: '24px',
      },
    },
  },
  plugins: [],
};
