/** @type {import('tailwindcss').Config} */
const plugin1 = require('daisyui')
const plugin2 = require('flowbite/plugin')
module.exports = {
    darkMode: 'class',
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
        './node_modules/flowbite-react/**/*.js', './pages/**/*.{ts,tsx}', './public/**/*.html'
      
    ],
    theme: {
        themeMode: "manual",
        extend: {
            animation:{
                'bounce-slow': 'bounce 3s infinite',
               
                

              },
            backgroundImage: {
                
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            backgroundColor: theme =>({
                ...theme('colors'),
                'primary': '#0b1437',
                'secondary': '#111c44',
                'light': '#f5f8fe',
                

            }),
            textColor: theme => ({
                ...theme('colors'),
                'light': '#1b254b',
                'dark': 'white',
            }),
            // costumize border radius
            borderRadius: {
                'main': '16px'
            }
            
            
        },
    },
    // plugins: [require("daisyui")],
    plugins: [
        plugin1,
        plugin2,
      ],

}
