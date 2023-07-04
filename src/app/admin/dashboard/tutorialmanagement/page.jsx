"use client";
import { TutorialDatatable } from "@/components/TutorialDatatable";
import { fetchTutorial, selectAllTutorial } from "@/redux/features/tutorial/tutorialSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Page() {
  const dispatch = useDispatch()
const tutorials = useSelector(selectAllTutorial)

React.useEffect(()=>{
  dispatch(fetchTutorial({limit: 10, page: 1}))

},[dispatch])
console.log(tutorials, "tutorials");
  return (
    <div className={"w-full p-5 mx-auto db-bg h-full  dark:bg-primary"}>
      <div className="db-bg dark:bg-primary sticky top-20 z-40">
        <h1
          className={
            "text-[32px] text-light dark:text-white font-semibold mb-5"
          }
        >
          Tutorial Management
        </h1>
        {/* breadcrumbs */}
        <div className="text-sm breadcrumbs mb-3">
          <ul className="font-extralight text-light dark:text-white">
            <li>
              <a>Admin</a>
            </li>
            <li>
              <a>Tutorial Management</a>
            </li>
          </ul>
        </div>
      </div>
      <section>
        <div className="h-full xl:h-screen">
          <TutorialDatatable />
        </div>
      </section>
    </div>
  ); 
}
