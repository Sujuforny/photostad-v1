import React from "react"
import Link from "next/link"
import DashboardOverview from "@/components/dashboard-component/DashboardOverview"
export default async function page() {
	return (
		<div className=' db-bg h-full p-5   dark:bg-primary  rounded-md shadow'>
			<div className='sticky top-20 z-30 db-bg dark:bg-primary'>
				<h1 className='text-[32px] font-semibold dark:text-white mb-5'>
					Dashboard Overview
				</h1>
				<div className='text-[14px]  font-extralight text-gray-900 breadcrumbs dark:text-white'>
					<ul>
						<li>
							<Link href={"/admin/dashboard"}>Admin</Link>
						</li>
						<li>
							<Link href={"/admin/dashboard"}>Dashboard Overview</Link>
						</li>
					</ul>
				</div>
			</div>
		<main>
			<DashboardOverview/>

		</main>
		</div>
	)
}