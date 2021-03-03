const tailwindcss = require('tailwindcss');

module.exports = {
    plugins: [
        tailwindcss('./tailwind.js'),
        require('autoprefixer'),
        // require('@fullhuman/postcss-purgecss')({
        //     content: [
        //         './src/**/*.js',
        //         './public/index.html'
        //     ],
        // })
    ]
}