"use client"
import FakeDataTable from "@/components/FakeDataTableListOfReq"
import { selectRequestTutorialTotal} from "@/redux/features/requestTutorial/requestTutorialSlice"
import { selectTotalUnread } from "@/redux/features/tutorial/reqTutorial/unReadTutorialSlice"
import Link from "next/link"
import React from "react"
import { useSelector } from "react-redux"

export default function Page() {
	const total = useSelector(selectRequestTutorialTotal)
	const tolalUnread = useSelector(selectTotalUnread)
	
	
	
	return (
		<div className='w-full p-5 mx-auto db-bg h-full dark:bg-primary'>
			{/* header section */}
			<div className='db-bg dark:bg-primary sticky top-20 z-40'>
				<h1
					className={
						"text-[32px] text-light dark:text-white font-semibold mb-5"
					}
				>
					Tutorial Management
				</h1>
				{/* breadcrumbs */}
				<div className='text-sm breadcrumbs mb-3'>
					<ul className='font-extralight text-light dark:text-white'>
						<li>
							<Link href={"/admin/dashboard"}>Admin</Link>
						</li>
						<li>
							<Link href={"/admin/dashboard/tutorialmanagement"}>
								Tutorial Management
							</Link>
						</li>
						<li>
							<Link href={"/admin/dashboard/tutorialmanagement/listofrequest"}>
								List of Requests
							</Link>
						</li>
					</ul>
				</div>
			</div>
			{/* end of header section */}

			<main>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
					{/* box 1 */}
					<div className='bg-white rounded-main shadow-sm dark:bg-secondary flex flex-col justify-center items-center h-[170px]'>
						<h2 className='font-light text-light dark:text-white '>
							Total Requests
						</h2>
						<h2 className='font-black text-[40px] text-light dark:text-white '>
							{total}
						</h2>
					</div>
					{/* box 2 */}
					<div className='bg-white rounded-main shadow-sm dark:bg-secondary flex flex-col justify-center items-center h-[170px]'>
						<h2 className='font-light text-light dark:text-white '>Readed</h2>
						<h2 className='font-black text-[40px] text-light dark:text-white '>
							10
						</h2>
					</div>
					{/* box 3 */}
					<div className='bg-white rounded-main shadow-sm dark:bg-secondary flex flex-col justify-center items-center h-[170px]'>
						<h2 className='font-light text-light dark:text-white '>Unread</h2>
						<h2 className='font-black text-[40px] text-light dark:text-white '>
						{ tolalUnread}
						</h2>
					</div>
				</div>

				<h1 className='font-semibold text-center text-[24px]  my-14 dark:text-white'>
					List of Requests Tutorial
				</h1>
				{/* react data table component */}
				<FakeDataTable />
			</main>
		</div>
	)
}
