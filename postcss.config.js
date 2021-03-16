const tailwindcss = require('tailwindcss');
const purgecss = require('@fullhuman/postcss-purgecss');

module.exports = {
    plugins: [
        tailwindcss('./tailwind.js'),
        require('autoprefixer'),
        purgecss({
            preserveHtmlElements: true,
            content: [
                './src/**/*.js',
                './public/index.html'
            ]
        })
    ]
}