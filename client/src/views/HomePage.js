/** @jsxImportSource @emotion/react */
import tw from "twin.macro";

import { useDispatch } from "react-redux";
import { fetchLoggedInUser } from "../features/users/actions";

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
		<div className="HomePage" tw="flex flex-wrap">
			<div tw="xl:w-1/2 lg:w-1/2 bg-primary h-screen flex flex-col">
				<h1 tw="font-headings font-bold xl:text-6xl lg:text-5xl sm:text-2xl text-white m-20">
					Listening to Spotify? <br />
					Share with friends.
				</h1>
				<div tw="font-body flex flex-col items-center p-10">
					<h1 tw="text-center text-2xl">Sign up to this app and let your friends know about the awesome music you are listening to</h1>
					<div tw="text-2xl mt-12 flex flex-col items-center">
						<a tw="my-12" href={process.env.NODE_ENV === "development" ? "http://localhost:5000/auth/spotify" : "/auth/spotify"}>
							<div tw="flex xl:flex-row sm:flex-col items-center flex-wrap justify-center">
								<div tw="bg-darkPrimary w-32 block rounded-lg text-white m-5 py-3 hover:bg-darkestPrimary hover:shadow-2xl  w-max">
									Login
								</div>
								<div tw="bg-darkPrimary w-32 block rounded-lg text-white m-5 py-3 hover:bg-darkestPrimary hover:shadow-2xl  w-max">
									Sign-Up
								</div>
							</div>
						</a>
						{/* <button
              tw="bg-darkPrimary px-12 rounded-lg text-white py-5 hover:bg-darkestPrimary"
              onClick={() => dispatch(fetchLoggedInUser())}
            >
              Get current User
            </button> */}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Homepage;
