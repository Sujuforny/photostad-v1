"use client"
import Link from "next/link"
import React, { useEffect, useState } from "react"

import { usePathname, useRouter } from "next/navigation"
import { useSession, signOut } from "next-auth/react"
import { useTheme } from "next-themes"
import ThemeSwitcher from "./ThemeSwitcher"
import Image from "next/image"
import { HiOutlineMenuAlt1 } from "react-icons/hi"
import { darkMode } from "../../tailwind.config"
import { RiMenu3Fill } from "react-icons/ri"
import { BtnThemeToggle } from "@/components/BtnThemeToggle"

import { DarkThemeToggle, Flowbite } from "flowbite-react"
import { useGetUserQuery } from "@/store/features/user/userApiSlice"
import { useDispatch, useSelector } from "react-redux"
import { logout, setCurrentUser } from "@/store/features/auth/authSlice"
import { useGetAllRequestTutorialsQuery } from "@/store/features/requestTutorial/requestTutorialApiSlice"
import { useGetFileByNameQuery } from "@/store/features/file/fileApiSlice"
 
 
 
const MainNavBar = () => {
	// const [logIN, setLogIN] = useState(false)
	// const [userImageUrl, setUserImageUrl] = useState("")
	// const [userName, setUserName] = useState("")
	// // auth
	// const { data: session } = useSession()
	// const dispatch = useDispatch();

    // //get user information
	// const {
	// 	data: user,
	// 	isLoading,
	// 	isSuccess,
	// 	isError,
	// 	error,
	//   } = useGetUserQuery();


	//   console.log("user",user)
	//   useEffect(() => {
  	// 	if (isSuccess) {
	// 	setLogIN(true)
	// 	dispatch(setCurrentUser(user));
	// 	console.log(user,"is user logged in");
	// 	setUserImageUrl(user?.data.avatarUrl)
	// 	setUserName(user?.data.familyName+" "+user?.data.givenName)
	// 	}
	//   }, [user]);
    const router = useRouter()
	const [logIn, setLogIn] = useState(false);
	const [userImageUrl, setUserImageUrl] = useState("");
	const [userName, setUserName] = useState("");
	const { data: session } = useSession();
	const dispatch = useDispatch();
	// Get user information
	const { data: user, isSuccess } = useGetUserQuery();
	console.log("user information", user)
	// const { data:rep, isLoading } = useGetAllRequestTutorialsQuery({ page: 1, limit: 20 });
	// console.log("rep data",rep);
	// const { data: filename } = useGetFileByNameQuery("0ab0d490-efe3-4136-9ba1-a3fd76c106cc.png");
	// console.log(filename,"files name:")
	// Handle successful user retrieval
	useEffect(() => {
	if (isSuccess && user) {
		setLogIn(true);
		dispatch(setCurrentUser(user));
		const { avatarUrl, familyName, givenName } = user?.data;
		setUserImageUrl(avatarUrl);
		setUserName(`${familyName} ${givenName}`);
	}
	}, [dispatch, isSuccess, user]);

	const logouts = () => {
	    dispatch(logout());
		router.push('/');
		window.location.reload();
	}	
	// end of auth config
	const { theme, setTheme } = useTheme()

	//disable in auth part
	const pathName = usePathname()
	if (pathName.includes("/login")) {
		return null
	}
	if (pathName.includes("/signup")) return null
	if (pathName.includes("/otp-verification")) return null

	// end of disable in auth part
	if (pathName.includes("/dashboard")) return null
	if (pathName.includes("/dashboard/*")) return null
	return (
		<Flowbite>
		<div className='bg-white dark:bg-[#1e1e1e] sticky top-0 z-50 '>
			<div className='navbar md:h-[80px] px-5 w-full xl:w-[1290px] mx-auto max-sm:px-5'>
				<div className='navbar-start'>
					<Link href={"/"}>
						{theme === "dark" ? (
							<Image
								height={50}
								width={131}
								className='md:w-[131px] w-[100px]'
								src='/assets/image/mainlogov2.png'
								alt='logo img'
							/>
						) : (
							<Image
								height={50}
								width={131}
								className='md:w-[131px] w-[100px]'
								src='/assets/image/mainlogo-blackv2.png'
								alt='logo dark img'
							/>
						)}
					</Link>
				</div>
				<div className='navbar-center hidden lg:flex'>
					<ul className='space-x-4    menu-horizontal px-1 dark:text-white'>
						<li>
							<Link
								className={
									"nav-item py-2 text-black dark:text-white px-3 rounded-main   hover:dark:text-black  hover:dark:bg-white dark:bg-transparent dark:focus:bg-transparent  dark:active:bg-transparent dark:focus:text-white  active:dark:bg-none active:bg-none "
								}
								href={"/ "}
							>
								Home
							</Link>
						</li>

						<li>
							<Link href="https://photostad-editor.vercel.app/watermark"
								className={
									"nav-item py-2 text-black dark:text-white px-3 rounded-main   hover:dark:text-black  hover:dark:bg-white dark:bg-transparent dark:focus:bg-transparent  dark:active:bg-transparent dark:focus:text-white  active:dark:bg-none active:bg-none "
								}
							>
								Watermark
							</Link>
						</li>

						<li>
							<Link href={"https://photostad-editor.vercel.app/generatecertificate"}
								className={
									"nav-item py-2 text-black dark:text-white px-3 rounded-main   hover:dark:text-black  hover:dark:bg-white dark:bg-transparent dark:focus:bg-transparent  dark:active:bg-transparent dark:focus:text-white  active:dark:bg-none active:bg-none "
								}
							>
								Certificate
							</Link>
						</li>
						<li>
							<Link
								className={
									"nav-item py-2 text-black px-3 rounded-main dark:text-white   hover:dark:text-black  hover:dark:bg-white dark:bg-transparent dark:focus:bg-transparent  dark:active:bg-transparent dark:focus:text-white  active:dark:bg-none active:bg-none "
								}
								href={"/aboutus"}
							>
								About Us
							</Link>
						</li>
						<li>
							<Link
							className={
								"nav-item py-2 text-black px-3 rounded-main dark:text-white   hover:dark:text-black  hover:dark:bg-white dark:bg-transparent dark:focus:bg-transparent  dark:active:bg-transparent dark:focus:text-white  active:dark:bg-none active:bg-none "
							}
								href={"/admin/login"}
							>
								Dashboard
							</Link>
						</li>
					</ul>
				</div>
				<div className='navbar-end '>
					<span className='mr-5'>
						<BtnThemeToggle />
						{/* <DarkThemeToggle /> */}
						{/*<ThemeSwitcher/>*/}
					</span>
					{user ? (
						<div className='dropdown dropdown-end'>
							<label
								tabIndex={0}
								className='w-10 h-10 btn-ghost btn-circle avatar'
							>
								<div className='md:w-10 md:h-10   w-7 h-7 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2'>
									{/* eslint-disable-next-line @next/next/no-img-element */}
									<img
										src={userImageUrl? userImageUrl:'https://photostad-api.istad.co/files/photo-user.jpg'}
										alt={"profile picture"}
									/>
								</div>
							</label>
							<ul
								tabIndex={0}
								className='mt-3  dark:text-white dark:bg-slate-800 space-y-2  p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52'
							>
								<li className='dark:hover:bg-slate-400 '>
									<Link href={'/profile/setting'} className='justify-between'>{userName}</Link>
								</li>
								<li className='dark:hover:bg-slate-400 rounded-sm'>
									<Link href={"/profile/setting"}>Settings</Link>
								</li>
								<li className={"dark:hover:bg-red-500 dark:hover:text-white"}>
									<button
										className='py-2 bg-red-400 '
										onClick={() => {
											logouts()
										}}
									>
										Sign out
									</button>
								</li>
							</ul>
						</div>
					) : (
						<>
							<Link
								href={"./login"}
								className=' me-3   hover:text-white hover:shadow-2xl hover:shadow-blue-600 hover:bg-[#23c483] hover:-translate-y-2 transform transition-all duration-300 ease-in-out
                                bg-[#E85854] hidden md:block text-white font-[35px] text-center py-2  rounded-[16px] w-[88px]  text-[17px]'
							>
								Log in
							</Link>
							<Link
								href={"./signup"}
								className='
                                 hover:text-white hover:shadow-2xl hover:shadow-blue-600 hover:bg-[#23c483] hover:-translate-y-2 transform transition-all duration-300 ease-in-out
                                bg-[#E85854] hidden md:block text-white font-[35px] text-center py-2  rounded-[16px] w-[88px]  text-[17px]'
							>
								Sign Up
							</Link>
						</>
					)}
					<div className='dropdown'>
						<label
							tabIndex={0}
							className=' md:hidden'
						>
							<RiMenu3Fill className='text-2xl ms-3 dark:text-white' />
						</label>
						<ul
							tabIndex={0}
							className='menu dark:text-white relative right-0 menu-sm dropdown-content space-y-3 mt-3 p-2 shadow bg-white dark:bg-slate-600 rounded-box w-52'
						>
							<li className={"dark:hover:text-white"}>
								<Link
									className={"dark:hover:text-white"}
									href={"/"}
								>
									Home
								</Link>
							</li>
							<li className={"dark:hover:text-white"}>
								<Link href={'https://photostad-editor.vercel.app/watermark'} className={"dark:hover:text-white"}>Watermark</Link>
							</li>

							<li className={"dark:hover:text-white"}>
								<Link href={'https://photostad-editor.vercel.app/generatecertificate'} className={"dark:hover:text-white"}>Certificate</Link>
							</li>
							<li className={"dark:hover:text-white"}>
								<Link
									className={"dark:hover:text-white focus:dark:text-black"}
									href={"/aboutus"}
								>
									About Us
								</Link>
							</li>
							<li>
							<Link
								className={
									"hover:dark:text-black hover:dark:bg-gray-100 dark:focus:bg-white"
								}
								href={"/admin/dashboard"}
							>
								Dashboard
							</Link>
						</li>
							{user ? (
								<li className={"dark:hover:text-white"}>
									<Link
										className={"dark:hover:text-white"}
										href={"/profile/setting"}
									>
										profile
									</Link>
								</li>
							) : (
								<>
									<li>
										<Link
											className={"dark:hover:text-white"}
											href={"/login"}
										>
											log in
										</Link>
									</li>
									<li className={"dark:hover:text-white"}>
										<Link
											className={"dark:hover:text-white"}
											href={"/signup"}
										>
											Sign up
										</Link>
									</li>
								</>
							)}
						</ul>
					</div>
				</div>
			</div>
		</div>
		</Flowbite>
	)
}

export default MainNavBar
