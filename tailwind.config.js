/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        'container-sm-px': '1rem',  // 16px padding-x for small screens
        'container-sm-py': '1.2rem',  // 32px padding-y for small screens     
        'container-lg-px': '28',  // 64px padding-x for large screens
        'container-lg-py': '1.6rem', 
      },

    },
    fontFamily:{
      poppins:["Poppins","sans-serif"]
    }
  },
  plugins: [
    function ({ addComponents, theme }) {
      const containers = {
        '.container': {
          width: '100%',
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: theme('spacing.container-sm-px'),
          paddingRight: theme('spacing.container-sm-px'),
          paddingTop: theme('spacing.container-sm-py'),
          paddingBottom: theme('spacing.container-sm-py'),

          '@screen lg': {
            paddingLeft: theme('spacing.container-lg-px'),
            paddingRight: theme('spacing.container-lg-px'),
            paddingTop: theme('spacing.container-lg-py'),
            paddingBottom: theme('spacing.container-lg-py'),
          },
        },
      }

      addComponents(containers)
    },
  ],
}