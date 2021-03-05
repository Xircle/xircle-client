module.exports = {
  purge: {
    mode: 'all',
    enabled: true,
    preserveHtmlElements: false,
    content: [
      "./src/**/*.{js,ts,jsx}",
    ],
  },
  theme: {
    extend: {
      fontSize: {
        "7xl": "4.5rem",
        '5xl': '2.5rem',
        '6xl': '2.75rem',
        '7xl': '4.5rem',
        '8xl': '6.25rem',
      },
      boxShadow: {
        sm: '0 5px 10px rgba(0, 0, 0, 0.12)',
        md: '0 8px 30px rgba(0, 0, 0, 0.12)',
      },
    },
  },
  variants: {},
};