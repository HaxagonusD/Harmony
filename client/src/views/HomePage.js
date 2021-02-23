/** @jsxImportSource @emotion/react */
import tw from "twin.macro";

import { useDispatch } from "react-redux";
import { fetchLoggedInUser } from "../features/users/actions";

import musicGirl from "../images/music-girl.jpeg";
import logo from "../images/harmony_logo.png";
import Navbar from "../components/Navbar";

const Homepage = () => {
	const dispatch = useDispatch();

	// let history = useHistory();
	// useEffect(() => {
	//   const instance = axios.create({
	//     withCredentials: true,
	//   });
	//   instance
	//     .get(`/auth/isloggedin`)
	//     .then(({ data }) => {
	//       if (data !== null) {
	//         history.push(`profile/${data.id}`);
	//       }
	//     })
	//     .catch((error) => console.error(error));
	//   // console.log(process.env.NODE_ENV)
	// }, [history]);

	return (
		<div tw="h-screen">
			<Navbar />
			<div className="HomePage" tw="h-full flex flex-wrap bg-darkestPrimary justify-center">
				<div tw="xl:w-1/2 lg:w-1/2 flex flex-col justify-between sm:justify-center bg-darkestPrimary">
					<img src={logo} tw="block sm:hidden w-24 m-auto mt-20 sm:mt-12" alt="harmony logo" />

					<h1 tw="font-headings font-bold text-center lg:text-left text-3xl sm:text-6xl text-white p-3 sm:px-20 mt-10">
						Listening to <span tw="text-spotify">Spotify?</span> <br />
					</h1>
					<div tw="font-body flex flex-col justify-center items-center">
						<h1 tw="text-center lg:text-left text-lg sm:text-2xl text-white p-3 sm:px-20">
							Sign up and let your friends know about the <br />
							awesome music you are listening to 🎧
						</h1>
						<div tw="text-2xl mt-12 flex flex-col items-center">
							<a tw="my-0 md:my-12" href={process.env.NODE_ENV === "development" ? "http://localhost:5000/auth/spotify" : "/auth/spotify"}>
								<hr tw="hidden sm:block py-5" />
								{/* buttons */}
								<div tw="flex">
									<div tw="font-body font-bold flex items-center bg-darkPrimary w-32 block rounded-lg text-base sm:text-2xl text-white py-2 px-5 m-5 hover:bg-darkestPrimary hover:shadow-2xl w-max">
										Login
									</div>
									<div tw="font-body font-bold flex items-center bg-darkPrimary w-32 block rounded-lg text-base sm:text-2xl text-white py-2 px-5 m-5 hover:bg-darkestPrimary hover:shadow-2xl w-max">
										Sign-Up
									</div>
								</div>
							</a>
						</div>
					</div>
				</div>
				<div tw="relative w-1/2 flex flex-col items-center justify-center bg-darkestPrimary">
					<img
						src={logo}
						tw="hidden lg:block shadow-inner absolute -left-10 md:inset-y-0 w-auto h-36 p-3 m-auto bg-darkPrimary shadow-2xl rounded-2xl"
						alt=""
					/>
					<img tw="shadow-2xl border-indigo-600 hidden lg:block rounded-full w-11/12" src={musicGirl} alt="" />
				</div>
			</div>
		</div>
	);
};

export default Homepage;
