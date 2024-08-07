import flowbite from 'flowbite/plugin'

export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    '../shared/src/**/*.{vue,js,ts,jsx,tsx}',
    '../node_modules/flowbite-vue/**/*.{js,jsx,ts,tsx,vue}',
    '../node_modules/flowbite/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {}
  },
  darkMode: 'selector',
  plugins: [flowbite]
}
