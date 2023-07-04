<<<<<<< HEAD

import Image from "next/image"
import { DoughnutChart } from "@/components/DoughnutChart"
import Link from "next/link"
import { BASE_URL } from "@/app/api/BaseAPI"

export const Page = () => {

	
	
	return (
		<div className={"w-full p-5 mx-auto h-full dark:bg-primary"}>
			<div className='db-bg dark:bg-primary sticky top-20 z-40'>
				<h1
					className={
						"text-[32px] text-light dark:text-white font-semibold mb-5"
					}
				>
					Reporting And Statistics
				</h1>
			
				{/* breadcrumbs */}
				<div className='text-sm breadcrumbs mb-3'>
					<ul className='font-extralight text-light dark:text-white'>
						<li>
							<Link href='/admin/dashboard'>Admin</Link>
						</li>
						<li>
							<Link href={"/admin/dashboard/tutorialmanagement"}>
								Tutorial Management
							</Link>
						</li>
					</ul>
				</div>
			</div>
			{/* end of header section */}
=======
"use client"
import Image from "next/image"
import { DoughnutChart } from "@/components/DoughnutChart"
import Link from "next/link"
import { useEffect, useState } from 'react';
export default function Page() {

  const [tutorialView, setTutorialView] = useState(0);
  const [totalOldUser, setTotalOldUser] = useState(0);
  const [totalNewUser, setTotalNewUser] = useState(0);
  const [totalUser, setTotalUser] = useState(0);
  const [totalOfEditedPhoto, setTotalOfEditedPhoto] = useState(0);
  const [totalOfGeneratedCertificate, setTotalOfGeneratedCertificate] = useState(0);
  const [totalOfRequestTutorial, setTotalOfRequestTutorial] = useState(0);
  const [totalOfTutorial, setTotalOfTutorial] = useState(0);
 

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://136.228.158.126:8002/api/v1/statistics");
      const responeData = await response.json();
      const dataRs = await responeData.data;
      setTutorialView(dataRs.tutorialView);
      setTotalOldUser(dataRs.totalOldUser);
      setTotalNewUser(dataRs.totalNewUser);
      setTotalUser(dataRs.totalUser);
      setTotalOfEditedPhoto(dataRs.totalOfEditedPhoto);
      setTotalOfGeneratedCertificate(dataRs.totalOfGeneratedCertificate);
      setTotalOfRequestTutorial(dataRs.totalOfRequestTutorial);
      setTotalOfTutorial(dataRs.totalOfTutorial);
    };
>>>>>>> be03944a494de7cf6ded0d939322b54dc439957f

    fetchData();
  }, []);
      return (
            <div className={"w-full p-5 mx-auto h-full dark:bg-primary"}>
            <div className='db-bg dark:bg-primary sticky top-20 z-40'>
                  <h1
                        className={
                              "text-[32px] text-light dark:text-white font-semibold mb-5"
                        }
                  >
                        Reporting And Statistics
                  </h1>
                  {/*start breadcrumbs */}
                  <div className='text-sm breadcrumbs mb-3'>
                        <ul className='font-extralight text-light dark:text-white'>
                              <li>
                                    <Link href='/admin/dashboard'>Admin</Link>
                              </li>
                              <li>
                                    <Link href={"/admin/dashboard/tutorialmanagement"}>
                                          Tutorial Management
                                    </Link>
                              </li>
                        </ul>
                  </div>
                  {/* end breadcrumbs */}
            </div>
            {/* start Reprot and Statistic */}
            <div className='h-full xl:h-screen'>
                  <div className='grid grid-cols-1 lg:grid-cols-4 gap-4'>
                        {/*box 1*/}
                        <div
                              className={
                                    "bg-white shadow-sm dark:bg-secondary flex flex-col mainround h-[168px] justify-center items-center dark:box-dark"
                              }
                        >
                              <p className={"font-extralight text-light dark:text-white"}>
                                    Tutorial Views
                              </p>
                              <h2 className={"text-[40px] font-black text-light dark:text-white"}>
                                    {tutorialView}
                              </h2>
                        </div>
                        {/* end box 1 */}
                        {/*box 2*/}
                        <div
                              className={
                                    "bg-white shadow-sm dark:bg-secondary col-span-1  lg:col-span-2  flex mainround h-[168px] justify-around items-center "
                              }
                        >
                              <div>
                                    <p className={"font-extralight text-light dark:text-white"}>
                                          Average Users
                                    </p>
                                    <div className={"flex space-x-5 "}>
                                          <div>
                                                <h2
                                                      className={
                                                            "font-black text-[32px] text-light dark:text-white"
                                                      }
                                                >
                                                      {totalNewUser}
                                                </h2>
                                                <p className='text-light dark:text-dark'>New User</p>
                                          </div>
                                          <div>
                                                <h2
                                                      className={
                                                            "font-black text-[32px] text-light dark:text-white"
                                                      }
                                                >
                                                      {totalOldUser}
                                                </h2>
                                                <p className='text-light dark:text-dark'>Old User</p>
                                          </div>
                                    </div>
                              </div>
                              <div>
                                    <Image
                                          width={90}
                                          height={90}
                                          src={"/assets/icons/profile2user.svg"}
                                          className={"dark:invert"}
                                          alt={"2 user "}
                                    />
                              </div>
                        </div>
                        {/* end box 2 */}
                        {/*box 3*/}
                        <div
                              className={
                                    "bg-white shadow-sm dark:bg-secondary flex flex-col mainround h-[168px] justify-center items-center "
                              }
                        >
                              <p className={"font-extralight text-light dark:text-dark"}>
                                    Total of Users
                              </p>
                              <h2 className={"text-[40px] font-black text-light dark:text-dark"}>
                                    {totalUser}
                              </h2>
                        </div>
                        {/* end box 3 */}
                        {/*box 4*/}
                        <div
                              className={
                                    "bg-white shadow-sm dark:bg-secondary  lg:col-span-3 row-span-2 flex flex-col mainround h-[350px]  justify-center items-center "
                              }
                        >
                              <div className={"w-full h-[90%] p-2.5 py-4 "}>
                                    <p
                                          className={
                                                "font-extralight  text-light dark:text-dark  ml-5"
                                          }
                                    >
                                          Reports / Today
                                    </p>
                                    <div className="flex w-full gap-x-32 items-center space-x-8">
                                          <DoughnutChart />
                                          <ul className=" space-y-5 font-extralight text-md">
                                                <li>{totalOfEditedPhoto} Watermark created</li>
                                                <li>{totalOfGeneratedCertificate} Certificate created</li>
                                          </ul>
                                    </div>
                              </div>
                        </div>
                        {/* end box 4 */}
                        {/*box 5*/}
                        <div
                              className={
                                    "bg-white shadow-sm dark:bg-secondary flex flex-col mainround h-[168px] justify-center items-center "
                              }
                        >
                              <p className={"font-extralight text-light dark:text-dark"}>
                                    Total of Edited photos
                              </p>
                              <h2 className={"text-[40px] font-black text-light dark:text-dark"}>
                                    {totalOfEditedPhoto}
                              </h2>
                        </div>
                        <div
                              className={
                                    "bg-white shadow-sm dark:bg-secondary flex flex-col mainround h-[168px] justify-center items-center "
                              }
                        >
                              <p className={"font-extralight text-light dark:text-dark"}>
                                    Total of Generated Certificate
                              </p>
                              <h2 className={"text-[40px] font-black text-light dark:text-dark"}>
                                    {totalOfGeneratedCertificate}
                              </h2>
                        </div>
                        {/* end box 5 */}
                        {/*box 6*/}
                        <div
                              className={
                                    "bg-white shadow-sm dark:bg-secondary flex flex-col mainround  justify-center items-center h-[168px]"
                              }
                        >
                              <p className={"font-extralight text-light dark:text-dark "}>
                                    Total of Requested Tutorials
                              </p>
                              <h2 className={"text-[40px] font-black text-light dark:text-dark"}>
                                    {totalOfRequestTutorial}
                              </h2>
                        </div>
                        {/* end box 6 */}
                        {/*box 7*/}
                        <div
                              className={
                                    "bg-white dark:bg-secondary shadow-sm flex flex-col lg:col-start-4 lg:col-end-4   mainround  justify-center items-center h-[168px]"
                              }
                        >
                              <p className={"font-extralight text-light dark:text-dark"}>
                                    Total of Tutorials
                              </p>
                              <h2 className={"text-[40px] font-black text-light rounded-main dark:text-dark"}>
                                    {totalOfTutorial}
                              </h2>
                        </div>
                        {/* end box 7 */}
                  </div>
            </div>
            {/* end Reprot and Statistic */}

      </div>
      )
}
