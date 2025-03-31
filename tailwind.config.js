module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      spacing: {
        'custom-margin': '1.5rem', // Custom margin value (preserved)
      },
      width: {
        '18': '4.5rem', // For w-18
        '22': '5.5rem', // For w-22
      },
      height: {
        '18': '4.5rem', // For h-18
        '22': '5.5rem', // For h-22
      },
    },
  },
  plugins: [],
};