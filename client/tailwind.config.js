module.exports = {
	purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
	darkMode: false,
	theme: {
		extend: {
			backgroundImage: (theme) => ({}),
			colors: {
				primary: "#ccccff",
				darkPrimary: "#9191c4",
				darkestPrimary: "#4b4b7d",
				dark: "#2e2e2e",
				spotify: "#1DB954",
			},
			fontFamily: {
				headings: "Josefin Sans",
				body: "Noto Sans JP",
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
