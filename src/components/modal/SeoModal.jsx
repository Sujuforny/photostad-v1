"use client"
import React from "react"
import { Button, Modal, Select } from "flowbite-react"
import { AiOutlineCloseCircle, AiOutlinePlusCircle } from "react-icons/ai"
import Image from "next/image"
import { BASE_URL } from "@/app/api/BaseAPI"
import { TbSeo } from "react-icons/tb"
import * as Yup from "yup"
import { Form, Formik } from "formik"

const validationSchema = Yup.object({
	keyword: Yup.string().required("Keyword is required"),
	ogTitle: Yup.string().required("Og Title is required"),
	ogDescription: Yup.string().required("Og Description is required"),
	ogUrl: Yup.string().required("Og Url is required"),
})

export default function SeoModal() {
	const [openModal, setOpenModal] = React.useState(undefined)
	const [modalSize, setModalSize] = React.useState("6xl")
	const props = { modalSize, openModal, setModalSize, setOpenModal }

	return (
		<>
			<button
				onClick={() => props.setOpenModal("size")}
				className='rounded-main p-2.5  text-white  '
			>
				<TbSeo className='text-[23px] text-black dark:text-white' />
			</button>
			<Modal
				show={props.openModal === "size"}
				size={props.modalSize}
				onClose={() => props.setOpenModal(undefined)}
			>
				<button
					className='absolute top-2 right-2 bg-gray-300 rounded-full p-1'
					onClick={() => props.setOpenModal(undefined)}
				>
					<AiOutlineCloseCircle className='text-3xl' />
				</button>

				<Modal.Body>
					<h1 className='font-semibold text-center text-[24px] my-14 dark:text-white'>
						Search Engine Optimization
					</h1>
					<Formik
						initialValues={{
							keyword: "",
							ogTitle: "",
							ogDescription: "",
							ogUrl: "",
						}}
						validationSchema={validationSchema}
						onSubmit={async (values) => {
							console.log(values)
							// wait for api
						}}
					>
						{({
							handleSubmit,
							handleChange,
							handleBlur,
							values,
							errors,
							touched,
							isSubmitting,
						}) => (
							<Form
								onSubmit={handleSubmit}
								className='xl:h-screen h-full w-full'
							>
								{/* zin */}
								<div class='grid gap-10 p-5 mb-6 grid-cols-1  md:grid-cols-2'>
									<div>
										<div className=''>
											<label
												for='first_name'
												class='block mb-2 text-sm font-medium text-light dark:text-white'
											>
												Keywords
											</label>
											<input
												type='text'
												id='first_name'
												className='bg-white border border-gray-300 text-light text-sm rounded-main focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
												placeholder='photostad'
												required
												name='keyword'
												onChange={handleChange}
												onBlur={handleBlur}
												value={values.keyword}
											/>
											{errors.keyword && touched.keyword && (
												<div className='text-red-500 text-sm'>
													{errors.keyword}
												</div>
											)}
										</div>
									</div>

									<div className=''>
										<label className='block mb-3 text-sm font-medium text-light dark:text-white'>
											Opengraph Title
										</label>
										<input
											type='text'
											name='ogTitle'
											id='ogTitle'
											class='bg-white border rounded-main  border-gray-300 text-light text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
											placeholder='photostad'
											required
                                            onChange={handleChange}
											onBlur={handleBlur}
											value={values.ogTitle}
										/>
										{errors.ogTitle && touched.ogTitle && (
											<div className='text-red-500 text-sm'>{errors.ogTitle}</div>
										)}
									</div>
									<div className=''>
										<label class='block mb-3 text-sm font-medium text-light dark:text-white'>
											Opengraph Url
										</label>
										<input
											type='text'
											name='ogUrl'
											id='ogUrl'
											class='bg-white border rounded-main  border-gray-300 text-light text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
											placeholder='photostad'
											required
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.ogUrl}
										/>
										{errors.ogUrl && touched.ogUrl && (
											<div className='text-red-500 text-sm'>{errors.ogUrl}</div>
										)}
									</div>

									<div className=''>
										<label
											for='first_name'
											class='block mb-3 text-sm font-medium text-light dark:text-white'
										>
											Opengraph Description
										</label>
										<input
											type='text'
											name='ogDescription'
											id='ogDescription'
											class='bg-white border rounded-main  border-gray-300 text-light text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
											placeholder='photostad'
											required
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.ogDescription}
										/>
										{errors.ogDescription && touched.ogDescription && (
											<div className='text-red-500 text-sm'>{errors.ogDescription}</div>
										)}
									</div>
								</div>
								<div className='flex justify-end '>
									<button
										type='submit'
										disabled={isSubmitting}
										className='rounded-main px-5 max-sm:px-2 p-2.5 bg-black text-white   mt-5'
									>
										Save
									</button>
								</div>
							</Form>
						)}
					</Formik>
				</Modal.Body>
			</Modal>
		</>
	)
}
