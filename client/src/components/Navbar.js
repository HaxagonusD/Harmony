/** @jsxImportSource @emotion/react */
import tw from "twin.macro";
import { Link } from "react-router-dom";

import logo from "../images/harmony_logo.png";

const Navbar = () => {
	return (
		<div>
			<ul tw="absolute p-3 flex-wrap flex items-center justify-around w-full lg:w-1/4 bg-gradient-to-r sm:mt-5">
				<div tw="hover:bg-darkestPrimary">
					<Link tw="shadow-inner mx-4 text-white font-headings font-bold flex items-center ">
						<img tw="sm:h-10 sm:w-10 w-6 h-6" src={logo} alt="" />
					</Link>
				</div>
				<div tw=" hover:bg-darkestPrimary">
					<Link tw="shadow-inner mx-4 text-white font-headings font-bold">Story</Link>
				</div>
				<div tw=" hover:bg-darkestPrimary">
					<Link tw="shadow-inner mx-4 text-white font-headings font-bold">Profile</Link>
				</div>
			</ul>
		</div>
	);
};

export default Navbar;
