"use client"
import { BtnThemeToggle } from "@/components/BtnThemeToggle"
import AsideNav from "@/components/dashboard-component/AsideNav"
import { DarkThemeToggle, Flowbite } from "flowbite-react"
import { useTheme } from "next-themes"
import Head from "next/head"

import Image from "next/image"
import Link from "next/link"
import Script from "next/script"
import React, { useEffect, useState } from "react"
import { CgMenuLeft } from "react-icons/cg"

export default function Layout({ children }) {

	// theme check on logo
	const { theme, setTheme } = useTheme()

	const [isOpen, setIsOpen] = useState(false)
	const handleSidebarOpen = () => {
		setIsOpen(!isOpen)
	}
	// handle click anywhere beside sidebar area set isOpen to false
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				document.getElementById("default-sidebar") &&
				!document.getElementById("default-sidebar").contains(event.target)
			) {
				setIsOpen(false)
			}
		}
		document.addEventListener("mousedown", handleClickOutside)
		return () => {
			document.removeEventListener("mousedown", handleClickOutside)
		}
	}, [])
	const [isDropdownOpen, setIsDropdownOpen] = useState(false)
	const handleDropdownOpen = () => {
		//click to remove hidden class and click again to add hidden class
		setIsDropdownOpen(!isDropdownOpen)
		if (isDropdownOpen) {
			document.getElementById("dropdown-example").classList.remove("hidden")
		} else {
			document.getElementById("dropdown-example").classList.add("hidden")
		}
		// check if dropdown-example or dropdown-example2 is hidden then remove hidden class else add hidden class
		// if click on dropdown-example2 then dropdown-example will be hidden and show dropdown-example2
		// and if click on dropdown-example then dropdown-example2 will be hidden and show dropdown-example and so on
	}
	// handle click on example-dropdown to show and hide if click on example-dropdown show example-dropdown not show example-dropdown2
	// but if click on example-dropdown2 show example-dropdown2 not show example-dropdown
	const [isDropdownOpen2, setIsDropdownOpen2] = useState(false)
	const handleDropdownOpen2 = () => {
		setIsDropdownOpen2(!isDropdownOpen2)
		if (isDropdownOpen2) {
			document.getElementById("dropdown2").classList.remove("hidden")
		} else {
			document.getElementById("dropdown2").classList.add("hidden")
		}
	}
	const [isDropdownOpen3, setIsDropdownOpen3] = useState(false)
	const handleDropdownOpen3 = () => {
		setIsDropdownOpen2(!isDropdownOpen2)
		if (isDropdownOpen2) {
			document.getElementById("dropdown3").classList.remove("hidden")
		} else {
			document.getElementById("dropdown3").classList.add("hidden")
		}
	}

	return (
		<Flowbite>
		<div className='bg-light dark:bg-secondary'>
			{/* side ba */}
		 <aside
				id='default-sidebar'
				className={`fixed   top-0 left-0 z-50  w-[300px]  h-screen transition-transform ${
					isOpen ? "" : "-translate-x-full"
				} sm:translate-x-0`}
				aria-label='Sidebar'
			> 
			<div className='h-full overflow-y-auto bg-black  dark:bg-secondary'>
			<AsideNav />
			</div>
			</aside> 
		

			{/* end of side bar */}
			{/* nav bar */}

			<nav className='sticky  top-0 z-40 '>
				<div className='flex bg-white dark:bg-secondary items-center justify-between h-16 px-6 py-10   border-gray-200  '>
					<div className='flex items-center'>
						<button
							className='text-gray-500 rounded-md dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 lg:hidden'
							onClick={handleSidebarOpen}
						>
							<span className='sr-only'>Open sidebar</span>
							<CgMenuLeft className='w-6 h-6' />
						</button>
					</div>
					<div className='flex space-x-3'>
						<BtnThemeToggle />
						
						 <DarkThemeToggle />
						<Image
							className='invert dark:invert-0'
							src={"/assets/icons/profile-2user.svg"}
							width={24}
							height={24}
							alt='element icon'
						/>
						<h1 className='dark:text-white p-1.5'>Cheat Setha</h1>
					</div>
				</div>
			</nav>
			{/* children display */}
			<div className='sm:ml-[300px] dark:bg-primary'>{children}</div>

		</div>
		</Flowbite>
	)
}
