'use client'

import {BASE_URL} from "@/app/api/BaseAPI";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {useState} from "react";
//import toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function FormREQ() {
    // data user
    const { data: session } = useSession()
    const emailUser = session?.user.email

	const router = useRouter()
    const [submitting, setSubmitting] = useState(false);
    const handleSubmit = async (e) => {
        if(emailUser==undefined) {
           router.push("/login")
        }
        await e.preventDefault();
        const email = e.target.email.value;
        const description = e.target.description.value;
        console.log('Email:', email);
        console.log('Description:', description);
        console.log("hello", setSubmitting);
        let myHeaders = new Headers()
        //find user by email
        myHeaders.append("Content-Type", "application/json")
        let request = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
        }
        try {

            const res = await fetch(BASE_URL +
                "users/email?email=" + emailUser,
                request
            );
            const dataUser = await res.json();
            console.log("User infor", dataUser )

                //sent request 
            var raw = JSON.stringify({
                userId:dataUser.data.id,
                description,
            })
            console.log("it eaw:::",raw);
            let requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow",
            }
            const response = await fetch(BASE_URL +
                "request-tutorials",
                requestOptions
            );
            const data = await response.json();
            toast.success('🦄 successfully', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                theme: "light",
                });
                e.target.reset();
                setSubmitting(true);
            setTimeout(() => {
                setSubmitting(false);
            }, 5000);
        } catch (error) {
            console.log("error", error);
        }
    }
    return (
        <>
        <form onSubmit={handleSubmit}>
            <div className="mb-6">
                <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                   Subject
                </label>
                <input
                    type="email"
                    id="email"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-[16px] focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    placeholder="photostad"
                />
            </div>
            <div className="mb-6">
                <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    Message
                </label>
                <textarea
                    id="description"
                    className="shadow-sm rounded-[16px] w-full  h-52 bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                />
            </div>
            <div className="w-full flex justify-end   ">
                <button
                    type="submit"
                    disabled={submitting}
                    className="bg-red-500 p-2.5 w-full md:w-fit text-white rounded-main px-7"
                >
                    Send
                </button>
            </div>
        </form>
        <ToastContainer
            position="top-right"
            autoClose={1000}
            limit={3}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover={false}
            theme="light"
            />
        </>
    )
}