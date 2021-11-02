module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts,md}'],

	theme: {
		fontFamily: {
			sans: ['Mulish', 'sans-serif'],
			serif: ['Martel', 'serif'],
			display: ['Nunito', 'sans-serif']
		},
		extend: {
			colors: {
				tm: {
					blue: '#1D409E',
					yellow: '#FCC92E'
				}
			},
			flex: {
				2: '2 2 0%'
			}
		}
	},

	plugins: []
};
